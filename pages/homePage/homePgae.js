'use strict';
var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');

class HomePage {
  /**
   *
   * @param {*} url - need to pass the home page url or base url
   */
  async gotToHomePage(url) {
    await protractor.getBrowser(url);
  }
  /**
   * @onHomePageOrNot will verify that we or on home page or not
   */
  async onHomePageOrNot() {
    const xpathValue =
      '//a[@class="sf-with-ul"][contains(text(),"Women")]';
    await waitFor.elementToBePresent(xpathValue);
    return await protractor.xpath(xpathValue, 'isPresent');
  }
  /**
   * @clickSignIn function will click on sign and if user is already sign then this function will sign out the user then clicks sign in
   */
  async clickSignIn() {
    const signXpath = await protractor.xpath(
      '//div[@class="nav"]//div[@class="row"]',
      'getAttribute',
      'innerText',
    );
    if (signXpath.includes('Sign out')) {
      await this.clickSignOut();
      await waitFor.elementToBeClickable('//a[@class="login"]');
      return await protractor.xpath('//a[@class="login"]', 'click');
    } else {
      await waitFor.elementToBeClickable('//a[@class="login"]');
      return await protractor.xpath('//a[@class="login"]', 'click');
    }
  }
  /**
   * @clickSignOut function will click on sign out
   */
  async clickSignOut() {
    await waitFor.elementToBeClickable('//a[@class="logout"]');
    return await protractor.xpath('//a[@class="logout"]', 'click');
  }
}
module.exports = new HomePage();
