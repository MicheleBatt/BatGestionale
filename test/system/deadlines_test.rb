require "application_system_test_case"

class DeadlinesTest < ApplicationSystemTestCase
  setup do
    @deadline = deadlines(:one)
  end

  test "visiting the index" do
    visit deadlines_url
    assert_selector "h1", text: "Deadlines"
  end

  test "should create deadline" do
    visit deadlines_url
    click_on "New deadline"

    fill_in "Description", with: @deadline.description
    fill_in "Expired at", with: @deadline.expired_at
    click_on "Create Deadline"

    assert_text "Deadline was successfully created"
    click_on "Back"
  end

  test "should update Deadline" do
    visit deadline_url(@deadline)
    click_on "Edit this deadline", match: :first

    fill_in "Description", with: @deadline.description
    fill_in "Expired at", with: @deadline.expired_at
    click_on "Update Deadline"

    assert_text "Deadline was successfully updated"
    click_on "Back"
  end

  test "should destroy Deadline" do
    visit deadline_url(@deadline)
    click_on "Destroy this deadline", match: :first

    assert_text "Deadline was successfully destroyed"
  end
end
