'use strict';
const { element, by, browser } = require('protractor');

class ElementsClass {
  /**
   *
   * @param url - url value or link
   */
  async getBrowser(url) {
    return await browser.get(url);
  }
  /**
   *
   * @param value          - xapth value
   * @param actionType     - protractor action type like to click() or getText() and more
   * @param attributeValue - to find unique value I am using the getAttribute function and passing the attribute value
   */
  async xpath(value, actionType, attributeValue) {
    if (attributeValue === undefined) {
    }
    let returnValue = null;
    switch (actionType) {
      case 'click':
        returnValue = await element(by.xpath(value)).click();
        break;
      case 'isPresent':
        returnValue = await element(by.xpath(value)).isPresent();
        break;
      case 'getAttribute':
        returnValue = await element(by.xpath(value)).getAttribute(
          attributeValue,
        );
        break;
      default:
        returnValue = await element(by.xpath(value)).getText();
        break;
    }
    return returnValue;
  }
  /**
   *
   * @param value       - css value
   * @param actionType  - protractor action type like to click() or getText() and more
   * @param sendKeys    - to send the values in the text box element for example to login
   */
  async css(value, actionType, sendKeys, attributeValue) {
    if (sendKeys && attributeValue === undefined) {
    }
    let returnValue = null;
    switch (actionType) {
      case 'click':
        returnValue = await element(by.css(value)).click();
        break;
      case 'sendKeys':
        returnValue = await element(by.css(value)).sendKeys(sendKeys);
        break;
      default:
        returnValue = await element(by.css(value)).getText();
        break;
    }
    return returnValue;
  }
  /**
   *
   * @param value          - id value
   * @param actionType     - protractor action type like to click() or getText() and more
   * @param sendKeysValue  - to send the values in the text box element for example to login
   */
  async id(value, actionType, sendKeysValue) {
    if (sendKeysValue === undefined) {
    }
    let returnValue = null;
    switch (actionType) {
      case 'click':
        returnValue = await element(by.id(value)).click();
        break;
      case 'sendKeys':
        returnValue = await element(by.id(value)).sendKeys(
          sendKeysValue,
        );
        break;
      case 'isPresent':
        returnValue = await element(by.xpath(value)).isPresent();
        break;
      default:
        returnValue = await element(by.id(value)).getText();
        break;
    }
    return returnValue;
  }
  /**
   *
   * @param value - css value
   * @param text  - css value text
   */
  async cssContainingText(value, text) {
    return await element(by.cssContainingText(value, text)).click();
  }
  /**
   *
   * @param value - xpath value
   */
  async elementAllXpath(value) {
    return await element.all(by.xpath(value)).click();
  }
  /**
   *
   * @param value          - xpath value
   * @param attributeValue - to find unique value I am using the getAttribute function and passing the attribute value
   * @param textContains   - using textContains value will find the value in the elment
   */
  async returnStringValue(value, attributeValue, textContains) {
    const getElmentValue = await element
      .all(by.xpath(value))
      .getAttribute(attributeValue);
    return getElmentValue
      .split(' ')
      .filter((string) => string.includes(textContains));
  }
  /**
   * @selectFromDropDown function will click on drop down and then will select a value from drop down
   * @param {*} element1 - element value to click drop down
   * @param {*} element2 - element value to select the value from drop down
   */
  async selectFromDropDown(element1, element2) {
    await element(by.id(element1)).click();
    return await element(
      by.css(`#${element1} [value= "${element2}"]`),
    ).click();
  }
}
module.exports = new ElementsClass();
