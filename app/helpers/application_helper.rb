module ApplicationHelper

  def active_class(path)
    if path.match?(/^\//)
      current_page?(path) ? 'active' : ''
    else
      controller_name == path ? 'active' : ''
    end
  end

  def help(title, message, placement: 'top')
    tag.i('', class: 'fas fa-question-circle', title: title, data: { toggle: 'popover', content: "<small>#{message}</small>", html: true, placement: placement })
  end

  def colors
    all_colors = [ '#17A2E2', '#6569F7', '#EB5DA9', '#F58C50', '#F7C050', '#F7EF55', '#5ABC55', '#F24424' ]

    all_expense_items = ExpenseItem.pluck(:color)

    all_colors - all_expense_items
  end

  def from_jbuilder(template, options = {})
    JbuilderTemplate
      .new(self) { |json| json.partial! template, options }.attributes!
  end
end
