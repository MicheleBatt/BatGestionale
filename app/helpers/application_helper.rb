module ApplicationHelper

  def colors
    all_colors = [ '#17A2E2', '#6569F7', '#EB5DA9', '#F58C50', '#F7C050', '#F7EF55', '#5ABC55', '#F24424' ]

    all_expense_items = ExpenseItem.pluck(:color)

    all_colors - all_expense_items
  end

  def from_jbuilder(template, options = {})
    JbuilderTemplate
      .new(self) { |json| json.partial! template, options }.attributes!
  end

  def enable_next_month (count, year_month)
    count.movements.where('movements.year_month > ?', year_month).present?
  end

  def enable_previous_month (count, year_month)
    count.movements.where('movements.year_month < ?', year_month).present?
  end

  def grouped_months_by_year(count)
    count.movements.order(year: :asc, month: :asc).pluck(:year, :month).uniq.group_by { | item | item[0] }
  end
end
