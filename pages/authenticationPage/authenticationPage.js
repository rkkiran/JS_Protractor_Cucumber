'use strict';
var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');

class Authentication {
  /**
   * @onAuthenticationPage fumction will wait for the given element on page to load and present
   *                       and then returs the text of the given element
   */
  async onAuthenticationPage() {
    waitFor.elementToBePresent('.//*[@class="page-heading"]');
    return await protractor.xpath(
      './/*[@class="page-heading"]',
      'getText',
    );
  }
  /**
   * @createAnAccount function is used to enter the email adress in the text box under create an account form
   * @param {*} emailAddress - email value to an create an account with
   *                           and will fill the given email value in the email text box
   */
  async createAnAccount(emailAddress) {
    const pre = await protractor.id('email_create', 'isPresent');
    return await protractor.id(
      'email_create',
      'sendKeys',
      emailAddress,
    );
  }
  /**
   * @createAnAccountBtn function will click Create an account button on Authentication page
   * @waitForPageToload - will wait next page to load
   */
  async createAnAccountBtn(email) {
    if (email.includes('testtesty')) {
      await protractor.id('SubmitCreate', 'click');
      return await waitFor.elementToBePresent(
        './/*[@class="page-heading"]',
      );
    } else {
      await protractor.id('SubmitCreate', 'click');
      return await waitFor.browser();
    }
  }
  /**
   * @login                 - function will be used to an account using email address and password
   * @param {*} emailAdress - email value to login into an account with
   *                          will fill the given email address in the email text box
   * @param {*} password    - password value to an login into an account with
   *                          will fill the given password in the password text box
   */
  async login(emailAdress, password) {
    await protractor.id('email', 'sendKeys', emailAdress);
    await protractor.id('passwd', 'sendKeys', password);
    return await protractor.id('SubmitLogin', 'click');
  }
  /**
   * @errorText function will return the error message
   */
  async errorText() {
    return await protractor.xpath(
      './/*[@class="alert alert-danger"]',
      'getAttribute',
      'innerText',
    );
  }
}
module.exports = new Authentication();
