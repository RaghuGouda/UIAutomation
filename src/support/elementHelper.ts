// tslint:disable-next-line:no-var-requires
import {browser} from "protractor";

export class ElementHelper {
    async elementClick(element){
        await element.click()
    }
    async waitAfterClick(element,time){
        await element.click().then(function () {
            browser.sleep(time);
        });
    }
    async waitForElement(time){
       await browser.sleep(time);
    }
    async mouseMoveClick(element,time){
        await browser.actions().mouseMove(element).click().perform().then(function () {
            browser.sleep(time);
        })
    }
    async elementForType(element,text){
        await element.sendKeys(text)
    }
    async elementForClearType(element,text){
        await element.click().clear().sendKeys(text)
    }


}
