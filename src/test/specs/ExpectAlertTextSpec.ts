import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ExpectAlertText']";
const TRIGGER_ALERT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='ExpectAlertTextTriggerAlert']`;

describeCommon('expectAlertText', () => {
  it('correct text', () => {
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();
    expect(() => BrowserUtils.expectAlertText('Hello! I am an alert box!')).to.not.throw();
  });
  it('incorrect text', () => {
    $(TRIGGER_ALERT_BUTTON_SELECTOR).click();
    expect(() => BrowserUtils.expectAlertText('Hello! I am not alert box!'))
      .to.throw(Error)
      .with.property('message')
      .contains("Incorrect alert's text");
  });

  it('no alert', () => {
    expect(() => BrowserUtils.expectAlertText('Hello! I am an alert box!'))
      .to.throw(Error)
      .with.property('message')
      .contains('Alert not found');
  });
  afterEach(() => {
    try {
      browser.acceptAlert();
    } catch {
      console.log('no alert opened');
    } //some test does not open alert
  });
});
