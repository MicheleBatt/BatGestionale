class CountsController < ApplicationController
  before_action :set_count, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /counts or /counts.json
  def index
    @counts = Count.all
  end

  # GET /counts/1 or /counts/1.json
  def show
    now = Date.current
    @current_year = now.year
    @current_month = now.month
    @current_year_month = (@current_year.to_s + @current_month.to_s.rjust(2, '0')).to_i
    @movements = Movement.where(count_id: @count.id, year: @current_year, month: @current_month).order(currency_date: :asc)
    @initial_month_amount = Movement.where(count_id: @count.id).where('movements.year_month < ?', @current_year_month).sum(&:amount)
    @out_month = @movements.where(movement_type: 'out').sum(&:amount)
    @in_month = @movements.where(movement_type: 'in').sum(&:amount)
    @in_out_month = @in_month - @out_month

    @movements_amounts_by_expense_item = Hash.new(0)

    @movements.each do | movement |
      if movement.expense_item_id.present?
        @movements_amounts_by_expense_item[movement.expense_item_id.to_s] += movement.amount
      end
    end

    respond_to do |format|
      format.html { render :show }
      format.json {
        render 'movements.json.jbuilder'
      }
    end
  end

  # GET /counts/new
  def new
    @count = Count.new
  end

  # GET /counts/1/edit
  def edit
  end

  # POST /counts or /counts.json
  def create
    @count = Count.new(count_params)

    respond_to do |format|
      if @count.save
        format.html { redirect_to counts_url, notice: "Conto creato con successo." }
        format.json { render :show, status: :created, location: @count }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @count.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /counts/1 or /counts/1.json
  def update
    respond_to do |format|
      if @count.update(count_params)
        format.html { redirect_to counts_url, notice: "Conto aggiornato con successo." }
        format.json { render :show, status: :ok, location: @count }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @count.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /counts/1 or /counts/1.json
  def destroy
    @count.destroy

    respond_to do |format|
      format.html { redirect_to counts_url, notice: "Conto rimosso con successo." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_count
      @count = Count.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def count_params
      params.require(:count).permit(:name, :description, :initial_amount, :iban)
    end
end
