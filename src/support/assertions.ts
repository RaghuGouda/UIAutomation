import {browser} from "protractor";

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

export class Assertions {
    async textAssertion(element, value){
        await browser.sleep(3000)
        await element.getText().then(function (res) {
                return expect(value).equal(res);
            },
            function (err) {
                console.log(err);
            });

    }

    async titleAssertion(value){
       await browser.getTitle().then(function (res) {
               return expect(res).equal(value);
            },
            function (err) {
                console.log(err);
            });

    }

    async elementPresent(element,value){
        await browser.sleep(5000)
        await expect(element.isPresent()).to.eventually.equal(JSON.parse(value))

    }

}
