Feature: Ecommerce validations
@Validations
  Scenario Outline:  Placing the order 
    Given a login to ecommerce2 website with "<email>" and "<password>"
    Then Verify error message is displayed 

    Examples:
      | email                     | password   |
      | hishosocaryy@gmail.com    | Test2025#  |
      | hishosoffryy@gmail.com    | Test2027#  |
      