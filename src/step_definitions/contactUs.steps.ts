import {Given,When,Then} from 'cucumber';
import { browser } from 'protractor';

import {ContactusPage} from "../pages/contactUs.po";

const contactusPage= new ContactusPage();


Given(/^.*?user goes to contact us page$/, {timeout: 6 * 50000},async () => {
    await contactusPage.contact_us();
});

When(/^.*?uploads file and enter all deatils$/, {timeout: 6 * 50000},async () => {
    await contactusPage.upload_file_details();
});

When(/^.*?submit the message$/, {timeout: 6 * 50000},async () => {
    await contactusPage.submit()
});

Then(/^.*?validate the success message$/,{timeout: 6 * 50000}, async () => {
    await browser.sleep(5000);
    await contactusPage.validate_success();
});

