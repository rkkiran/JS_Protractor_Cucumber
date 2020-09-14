'use strict';
var expect = require('chai').expect;
var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');

class Register {
  /**
   * @onRegisterPage fumction will wait for the given element on page to load and present
   *                       and then returs the text of the given element
   */
  async onRegisterPage() {
    await waitFor.elementToBePresent('.//*[@class="page-heading"]');
    await protractor.xpath('.//*[@class="page-heading"]', 'getText');
    return waitFor.browser(2000);
  }
  /**
   * @yourPersonalInformation  - the bellow function will fill the personal information on the register form
   * @param {*} title          - Will take title and then select the radio button accordingly
   * @param {*} firstName      - will fill the given first name in the first name text box
   * @param {*} lastName       - will fill the given last name in the last name text box
   * @param {*} email          - will fill the given email in the email text box
   * @param {*} password       - will fill the given password in the password text box
   * @param {*} dropDown       - will click on the drop down based on the given element value
   * @param {*} dropDownValue  - will select the value from the drop down based on the given element value
   */
  async yourPersonalInformation(
    title,
    firstName,
    lastName,
    email,
    password,
    dateDropDown,
    dateDropDownValue,
    monthDropDown,
    monthDropDownValue,
    yearDropDown,
    yearDropDownValue,
  ) {
    let idTitle;
    title === 'Mr'
      ? (idTitle = 'id_gender1')
      : (idTitle = 'id_gender2');
    await protractor.id(idTitle, 'click');
    await protractor.id('customer_firstname', 'sendKeys', firstName);
    await protractor.id('customer_lastname', 'sendKeys', lastName);
    const emailTextBoxValue = await protractor.xpath(
      './/*[@id="email"]',
      'getAttribute',
      'value',
    );
    expect(emailTextBoxValue).to.equal(email);
    await protractor.id('passwd', 'sendKeys', password);
    await protractor.selectFromDropDown(
      dateDropDown,
      dateDropDownValue,
    );
    await protractor.selectFromDropDown(
      monthDropDown,
      monthDropDownValue,
    );
    await protractor.selectFromDropDown(
      yearDropDown,
      yearDropDownValue,
    );
    await protractor.id('newsletter', 'click');
    await protractor.id('optin', 'click');
  }
  /**
   * @yourAddress                       - the bellow function will fill the adress information on the register form
   * @param {*} firstName               - user first name
   * @param {*} lastName                - user last name
   * @param {*} company                 - company name
   * @param {*} address                 - user address
   * @param {*} city                    - user city
   * @param {*} stateDropDown           - stateDropDown element value
   * @param {*} stateDropDownValue      - selects the value form state drop down
   * @param {*} postCode                - post code value must be 5 digits
   * @param {*} countryDropDown         - countryDropDown element value
   * @param {*} countryDropDownValue    - selects the value form country Drop Down
   * @param {*} additionalinformation   - additionalinformation text
   * @param {*} phoneNumber             - phone number
   * @param {*} mobilePhoneNum          - mobile phone number
   * @param {*} aliasAddress            - alternative address
   */
  async yourAddress(
    firstName,
    lastName,
    company,
    address,
    city,
    stateDropDown,
    stateDropDownValue,
    postCode,
    countryDropDown,
    countryDropDownValue,
    additionalinformation,
    phoneNumber,
    mobilePhoneNum,
    aliasAddress,
  ) {
    await protractor.id('firstname', 'sendKeys', firstName);
    await protractor.id('lastname', 'sendKeys', lastName);
    await protractor.id('company', 'sendKeys', company);
    await protractor.id('address1', 'sendKeys', address);
    await protractor.id('city', 'sendKeys', city);
    await protractor.selectFromDropDown(
      stateDropDown,
      stateDropDownValue,
    );
    await protractor.id('postcode', 'sendKeys', postCode);
    await protractor.selectFromDropDown(
      countryDropDown,
      countryDropDownValue,
    );
    await protractor.id('other', 'sendKeys', additionalinformation);
    await protractor.id('phone', 'sendKeys', phoneNumber);
    await protractor.id('phone_mobile', 'sendKeys', mobilePhoneNum);
    await protractor.id('alias', 'sendKeys', aliasAddress);
    await protractor.id('submitAccount', 'click');
    await waitFor.browser(3000);
  }
}
module.exports = new Register();
