Feature: Register a account on automationpractice.com
    Background: Navigate to home page and click on sign
        Given user navigates to automation practice home page and clicks on Sign in

    Scenario Outline: User creates a new account with <Scenario> and clicks register
        Given user enters '<Email>' in eamil text box on authentication page and clicks on Create an account
        When user creates an accounts by filling the '<FormType>' form and then clicks on Register button
            | Title | FirstName   | LastName   | Email      | Password | DatOfBirth | Company    | Address     | City    | State | PostalCode | Country | Information | HPhone     | MPhone    | Alias   |
            | Mr    | FirstNameIS | lastNameIS | testtesty  | 12345678 | 3-12-2000  | NewCompany | New Address | NewCity | 5     | 12345      | 21      | No Info     | 1234567890 | 123456780 | NOAlias |
            | Mr    |             |            | testtesty0 |          | 3-12-2000  | NewCompany |             | NewCity | 5     | 1          | 21      | No Info     |            |           | NOAlias |
        Then user should '<RegisterType>' successfully and '<UserName>' '<OnTopNav>' be dispalyed on top right side of the page
        Examples:
            | Scenario       | Email      | UserName               | FormType | RegisterType | OnTopNav   |
            | a valid form   | testtesty  | FirstNameIS lastNameIS | valid    | register     | should     |
            | a invalid form | testtesty0 | FirstNameIS lastNameIS | invalid  | not register | should not |

    Scenario Outline:  Login with the newly created user
        When user sign in using email as '<Username>' and password as '<Password>'
        Then user should '<RegisterType>' successfully and '<UserName>' '<OnTopNav>' be dispalyed on top right side of the page
        Examples:
            | Username  | Password | UserName               | RegisterType | OnTopNav |
            | testtesty | 12345678 | FirstNameIS lastNameIS | sign in      | should   |

    Scenario Outline: When user creates an account <Scenario> and clicks on create an account button then error message should be displayed
        Given user enters '<Email>' in eamil text box on authentication page and clicks on Create an account
        Then '<Error Message>' message should be displayed after clicking create an account button
        Examples:
            | Scenario                                     | Email     | Error Message                                                                                                        |
            | without passing email text                   | @xyzx.com | Invalid email address.                                                                                               |
            | with an already registered email address     | testtesty | An account using this email address has already been registered. Please enter a valid password or request a new one. |
            | with out passing @gmail.com in email address | noemail   | Invalid email address.                                                                                               |
