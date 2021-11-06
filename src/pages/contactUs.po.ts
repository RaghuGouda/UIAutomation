import { by, element, ElementFinder } from "protractor";
var path = require("path");
import {ElementHelper} from "../support/elementHelper";
import {Assertions} from "../support/assertions";

const timeOuts=require('../../testdata/time_outs/manageTimeOuts.json');
const jsonData=require('../../testdata/test_details/options.json');

const elementHelper=new ElementHelper()
const assertionsHelper =new Assertions()


export class ContactusPage {

    public contact;subject;subject_option;email;id_order;fileUpload;message;submitMessage;success: ElementFinder;

    constructor() {
        this.contact=element(by.id("contact-link"));
        this.subject=element(by.xpath("//*[@id='id_contact']"))
        this.subject_option=element(by.xpath("//*[text()='Customer service']"))
        this.email=element(by.xpath("//*[@id='email']"))
        this.id_order=element(by.xpath("//*[@id='id_order']"))
        this.fileUpload=element(by.xpath("//*[@id='fileUpload']"))
        this.message=element(by.xpath("//*[@id='message']"))
        this.submitMessage=element(by.id("submitMessage"))
        this.success=element(by.xpath("//*[@class='alert alert-success']"))

    }

    async contact_us(){
        await elementHelper.elementClick(this.contact)
    }

    async upload_file_details(){
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
        await elementHelper.elementClick(this.subject)
        await elementHelper.elementClick(this.subject_option)
        await elementHelper.waitForElement(timeOuts.Duration.longDuration)
        await elementHelper.elementForClearType(this.id_order,jsonData.id)
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
        await elementHelper.elementForClearType(this.email,jsonData.email)
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
        await elementHelper.elementForType(this.fileUpload,path.resolve()+"/testdata/test_details/test_file.txt")
        await elementHelper.waitForElement(timeOuts.Duration.longDuration)
        await elementHelper.elementForClearType(this.message,jsonData.message)
    }

    async submit(){
        await elementHelper.elementClick(this.submitMessage)
    }

    async validate_success(){
        await assertionsHelper.textAssertion(this.success,jsonData.success)
    } 


}
