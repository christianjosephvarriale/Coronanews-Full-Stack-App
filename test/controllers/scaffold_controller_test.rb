require 'test_helper'

class ScaffoldControllerTest < ActionDispatch::IntegrationTest
  test "should get Subscribers" do
    get scaffold_Subscribers_url
    assert_response :success
  end

end
