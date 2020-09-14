var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');

class MyAccount {
  /**
   * @onMyAccountPage will check is the user on on my account page or not
   * @param {*} userName - given user name
   */
  async onMyAccountPage(userName) {
    waitFor.elementToBePresent(
      `.//*[contains(text(),"${userName}")]`,
    );
    return await protractor.xpath(
      `.//*[contains(text(),"${userName}")]`,
      'getText',
    );
  }
}
module.exports = new MyAccount();
