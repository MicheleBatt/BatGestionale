class DeadlinesController < ApplicationController
  before_action :set_deadline, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /deadlines or /deadlines.json
  def index
    @deadlines = Deadline.all.order(expired_at: :asc)
  end

  # GET /deadlines/1 or /deadlines/1.json
  def show
  end

  # GET /deadlines/new
  def new
    @deadline = Deadline.new
  end

  # GET /deadlines/1/edit
  def edit
  end

  # POST /deadlines or /deadlines.json
  def create
    @deadline = Deadline.new(deadline_params)

    respond_to do |format|
      if @deadline.save
        format.html { redirect_to deadlines_url, notice: "Scadenza creata con successo!" }
        format.json { render :index, status: :created, location: @deadline }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @deadline.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /deadlines/1 or /deadlines/1.json
  def update
    respond_to do |format|
      if @deadline.update(deadline_params)
        format.html { redirect_to deadlines_url, notice: "Scadenza modificata con successo!" }
        format.json { render :index, status: :ok, location: @deadline }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @deadline.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /deadlines/1 or /deadlines/1.json
  def destroy
    @deadline.destroy

    respond_to do |format|
      format.html { redirect_to deadlines_url, notice: "Scadenza cancellata con successo!" }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_deadline
      @deadline = Deadline.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def deadline_params
      params.require(:deadline).permit(:expired_at, :description)
    end
end
