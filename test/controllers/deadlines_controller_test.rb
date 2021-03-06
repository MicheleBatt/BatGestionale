require "test_helper"

class DeadlinesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @deadline = deadlines(:one)
  end

  test "should get index" do
    get deadlines_url
    assert_response :success
  end

  test "should get new" do
    get new_deadline_url
    assert_response :success
  end

  test "should create deadline" do
    assert_difference("Deadline.count") do
      post deadlines_url, params: { deadline: { description: @deadline.description, expired_at: @deadline.expired_at } }
    end

    assert_redirected_to deadline_url(Deadline.last)
  end

  test "should show deadline" do
    get deadline_url(@deadline)
    assert_response :success
  end

  test "should get edit" do
    get edit_deadline_url(@deadline)
    assert_response :success
  end

  test "should update deadline" do
    patch deadline_url(@deadline), params: { deadline: { description: @deadline.description, expired_at: @deadline.expired_at } }
    assert_redirected_to deadline_url(@deadline)
  end

  test "should destroy deadline" do
    assert_difference("Deadline.count", -1) do
      delete deadline_url(@deadline)
    end

    assert_redirected_to deadlines_url
  end
end
