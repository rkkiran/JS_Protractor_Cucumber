'use strict';
const { Given, When, Then } = require('cucumber');
var expect = require('chai').expect;
var homePage = require('../pages/homePage/homePgae');
var register = require('../pages/registerPage/registerPage');
var authentication = require('../pages/authenticationPage/authenticationPage');
var onAccountPage = require('../pages/myAccountPage/myAccountPage');
var newdateStamp = new Date().getTime() + '@xyz.com';

Given(
  /^user navigates to automation practice home page and clicks on Sign in$/,
  async () => {
    await homePage.gotToHomePage(
      'http://automationpractice.com/index.php',
    );
    const onHomePage = await homePage.onHomePageOrNot();
    expect(onHomePage).to.equal(true);
    await homePage.clickSignIn();
    await authentication.onAuthenticationPage();
  },
);
When(
  /^user enters '(.*)' in eamil text box on authentication page and clicks on Create an account$/,
  async (emailId) => {
    let email = null;
    let waitForErrorMsg = null;
    emailId.includes('testtesty')
      ? (email = `${emailId}${newdateStamp}`)
      : (email = emailId);
    await authentication.onAuthenticationPage();
    await authentication.createAnAccount(email);
    await authentication.createAnAccountBtn(email);
    await register.onRegisterPage();
  },
);
When(
  /^user creates an accounts by filling the '(.*)' form and then clicks on Register button$/,
  async (formType, dataTable) => {
    let rowHash = dataTable.hashes();
    formType === 'valid'
      ? (rowHash = rowHash[0])
      : (rowHash = rowHash[1]);
    const dobDropDown = rowHash.DatOfBirth.split('-');
    const Email = `${rowHash.Email}${newdateStamp}`;
    await register.onRegisterPage();
    await register.yourPersonalInformation(
      rowHash.Title,
      rowHash.FirstName,
      rowHash.LastName,
      Email,
      rowHash.Password,
      'days',
      dobDropDown[0],
      'months',
      dobDropDown[1],
      'years',
      dobDropDown[2],
    );
    await register.yourAddress(
      rowHash.FirstName,
      rowHash.LastName,
      rowHash.Company,
      rowHash.Address,
      rowHash.City,
      'id_state',
      rowHash.State,
      rowHash.PostalCode,
      'id_country',
      rowHash.Country,
      rowHash.Information,
      rowHash.HPhone,
      rowHash.MPhone,
      rowHash.Alias,
    );
  },
);
When(
  /^user sign in using email as '(.*)' and password as '(.*)'$/,
  async (userName, password) => {
    await authentication.login(
      `${userName}${newdateStamp}`,
      password,
    );
  },
);
Then(
  /^user should '(.*)' successfully and '(.*)' '(.*)' be dispalyed on top right side of the page$/,
  async (type, userName, text) => {
    console.log(text);
    if (type === 'register' || type === 'sign in') {
      const userNameText = await onAccountPage.onMyAccountPage(
        userName,
      );
      expect(userNameText).to.equal('FirstNameIS lastNameIS');
    } else {
      const userNameText = await onAccountPage.onMyAccountPage(
        'Sign in',
      );
      const errorText = await authentication.errorText();
      const errorMessage =
        "The Zip/Postal code you've entered is invalid";
      expect(errorText).to.have.string(errorMessage);
      expect(userNameText).to.not.equal('FirstNameIS lastNameIS');
    }
  },
);
Then(
  /^'(.*)' message should be displayed after clicking create an account button$/,
  async (errorMessage) => {
    const errorText = await authentication.errorText();
    expect(errorText).to.have.string(errorMessage);
  },
);
