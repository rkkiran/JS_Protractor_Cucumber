Automation by Ravi

Prerequisites

- install Node
- npm install -g protractor to install protractor
- npm install to install the project dependencies
- browser : Chrome

Description

- run tests: protractor .\conf\config.js from main folder
- After completing the test run the Test report in chrome browser which is loacted under reports folder
- I wrote 6 scenarios 5 for registration scenarios and 1 sign scenario with already registered user
- I used cucumber to write scenarios in BDD style and used JavaScript
- Designed this framework in page object model and with util and helper functions which I have used while writing page functions
- When we run the tests each time it will creating new user which avoid failing of tests if we run for the second time
- Also used prettier for formatting
