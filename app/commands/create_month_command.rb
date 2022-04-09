module CreateMonthCommand
  def self.call(count)
    begin

      new_month = Month.where(
        count_id: count.id,
        year: Date.current.year,
        month: Date.current.month
      ).first_or_initialize

      if new_month.id.nil?
        new_month.initial_amount = count.amount
        new_month.final_amount = count.amount
        new_month.save!
      end

      new_month

    rescue StandardError => e
      Rails.logger.warn e
      raise e
    end
  end
end