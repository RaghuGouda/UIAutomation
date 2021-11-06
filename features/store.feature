Feature: My Store E2E Flow

    Scenario Outline: Validate search suggestion is not given to user until 3 char are populated.
        Given user at my store website
        When user start searching with <characters>
        Then data will populate with atleast 3 <value> 

        Examples:
            |characters|value|
            |s|false|
            |sh|false|
            |shi|true|

    Scenario: Validate results are displayed according the search made by user.
       Given user at my store website
       When user search for "Printed Dress"
       Then validate the searched ""PRINTED DRESS"" results

    Scenario: Validate user is able to apply the large size catalouge filter for T-shirt section.
      When user selects T-shirt section
      And apply large size catalouge filter
      Then validate the large size T-shirt

    Scenario Outline: Add 5 products in the cart.
        When user adds 5 products into the cart <no>
        Examples:
            |no|
            |1|
            |2|
            |3|
            |4|
            |5|

   Scenario: Validate total cart amount and individual product price both with and without discount.
      Then validate total cart amount and individual product price both with and without discount

   Scenario: Validate user is able to upload a file on contact us page.
       Given user goes to contact us page
       When uploads file and enter all deatils
       And submit the message
       Then validate the success message
