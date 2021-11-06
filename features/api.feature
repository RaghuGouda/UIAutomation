Feature: Testing  API'S
  Description: Testing  API'S

  Scenario Outline: Add User 
  Description: Add User
    When I pipe contents of file <filepath> to body
    And I POST to <url>
    Then response code should be <status_code>
    And I store the value of body path $.token as token_id in global scope
    And I store the value of body path $.user.firstName as fName in global scope
    And I store the value of body path $.user.lastName as lName in global scope
    And I store the value of body path $.user.email as email in global scope
    Examples:
      |url   |status_code|filepath|
      |/users|201        |./testdata/api/user.json|

  Scenario Outline: get User 
  Description: get User
    Given I set Authorization header to `token_id`
    And I GET <url>
    Then response code should be <status_code>
    And response body path $.firstName should be `fName`
    And response body path $.lastName should be `lName`
    And response body path $.email should be `email`
    And response body should not contain undefined
    Examples:
      |url   |status_code|
      |/users/me|200     |

  Scenario Outline: get User with invalid token 
  Description: get User with invalid token 
    Given I set Authorization header to <tokenid>
    And I GET <url>
    Then response code should be <status_code>
    And response body path $.error should be <message>
    Examples:
      |url   |status_code|tokenid|message|
      |/users/me|401     |"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"|Please authenticate.|

  Scenario Outline: Add Contact
  Description: Add Contact
    Given I set Authorization header to `token_id`
    When I pipe contents of file <filepath> to body
    And I POST to <url>
    Then response code should be <status_code>
    And I store the value of body path $._id as contact_id in global scope
    And I store the value of body path $.phone as phone in global scope
    And I store the value of body path $.firstName as firstName in global scope
    And I store the value of body path $.lastName as lastName in global scope
    And I store the value of body path $.email as Email in global scope
    And I store the value of body path $.street1 as street1 in global scope
    And I store the value of body path $.street2 as street2 in global scope
    And I store the value of body path $.city as city in global scope
    And I store the value of body path $.country as country in global scope

    Examples:
      |url   |status_code|filepath|
      |/contacts|201        |./testdata/api/contact.json|   

  Scenario Outline: get contact 
  Description: get contact
    Given I set Authorization header to `token_id`
    And I GET <url>`contact_id`
    Then response code should be <status_code>
    And response body path $.firstName should be `firstName`
    And response body path $.lastName should be `lastName`
    And response body path $.email should be `Email`
    And response body path $.phone should be `phone`
    And response body path $.street1 should be `street1`
    And response body path $.street2 should be `street2`
    And response body path $.city should be `city`
    And response body path $.country should be `country`
    Examples:
      |url   |status_code|
      |/contacts/|200     |   

  Scenario Outline: Update Contact
  Description: Update Contact
    Given I set Authorization header to `token_id`
    When I pipe contents of file <filepath> to body
    And I PUT <url>`contact_id`
    Then response code should be <status_code>
    And response body path $.phone should be <phone>
    Examples:
      |url   |status_code|filepath|phone|
      |/contacts/|200       |./testdata/api/contact.json|9912121212|

  Scenario Outline: Delete contact 
  Description: Delete contact
    Given I set Authorization header to `token_id`
    When I DELETE <url>`contact_id`
    Then response code should be <status_code>
    Examples:
      |url   |status_code|
      |/contacts/|200     |   

