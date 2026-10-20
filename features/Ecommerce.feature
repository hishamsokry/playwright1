Feature: Ecommerce validations
  @regression
  Scenario: Placing the order 
    Given a login to ecommerce website with "hishosocaryy@gmail.com" and "Test2026#"
    When Add product "ZARA COAT 3" to the cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and place the order
    Then Verify the order is present in the OrderHistory

@Validations
  Scenario Outline:  Placing the order 
    Given a login to ecommerce2 website with "<email>" and "<password>"
    Then Verify error message is displayed 

    Examples:
      | email                     | password   |
      | hishosocaryy@gmail.com    | Test2025#  |
      | hishosoffryy@gmail.com    | Test2027#  |
