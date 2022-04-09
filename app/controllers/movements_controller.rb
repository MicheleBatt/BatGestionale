class MovementsController < ApplicationController
  before_action :set_movement, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /movements or /movements.json

  # POST /movements or /movements.json
  def create
    @movement = Movement.new(movement_params)

    respond_to do |format|
      if @movement.save
        format.html { redirect_to movements_url, notice: "Movimento di cassa inserito con successo in archivio!" }
        render json: @movement
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @movement.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /movements/1 or /movements/1.json
  def update
    respond_to do |format|
      if @movement.update(movement_params)
        format.html { redirect_to movements_url, notice: "Movimento di cassa modificato con successo!" }
        format.json { render :index, status: :ok, location: @movement }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @movement.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /movements/1 or /movements/1.json
  def destroy
    @movement.destroy

    respond_to do |format|
      format.html { redirect_to movements_url, notice: "Movimento di cassa cancellato con successo!" }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movement
      @movement = Movement.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def movement_params
      params.require(:movement).permit(:movement_type, :amount, :count_id, :month_id, :expense_item_id, :causal, :currency_date)
    end
end
