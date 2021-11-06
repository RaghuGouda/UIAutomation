import { browser, by, element, ElementFinder } from "protractor";
var _= require("underscore");
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

import {ElementHelper} from "../support/elementHelper";

import {Assertions} from "../support/assertions";


const timeOuts=require('../../testdata/time_outs/manageTimeOuts.json');
const jsonData=require('../../testdata/test_details/options.json');

const elementHelper=new ElementHelper
const assertionsHelper =new Assertions()



export class BookProductPage {

    public search_box;data_populate;searched_item;search_button;products;tShirts;filter;add_pro;continue_shopping;home;cart;total_amount;amount;amount1;amount2;amount3;amount4;amount5;amount6: ElementFinder;

    constructor() {
        this.search_box=element(by.id("search_query_top"));
        this.data_populate=element(by.xpath("//div[@class='ac_results']//ul/li"));
        this.searched_item=element(by.xpath("//span[@class='lighter']"))
        this.search_button=element(by.xpath("//button[@name='submit_search']"))
        this.products=element(by.xpath("(//*[@class='product-image-container'])"))
        this.tShirts=element(by.xpath("//*[@class='sf-menu clearfix menu-content sf-js-enabled sf-arrows']/li[3]"))
        this.filter=element(by.id("layered_id_attribute_group_3"))
        this.add_pro=element(by.xpath("(//div[@class='product-image-container'])[4]"))
        this.continue_shopping=element(by.xpath("(//*[@title='Continue shopping'])"))
        this.home=element(by.xpath("(//*[@title='Return to Home'])"))
        this.cart=element(by.xpath("//*[@class='shopping_cart']//a/b"))
        this.total_amount=element(by.xpath("//*[@id='total_price']"))
        this.amount=element(by.xpath("(//tr/td[@class='cart_unit']//span/span)"))
        this.amount1=element(by.xpath("(//tr/td[@class='cart_unit']//span/span)[1]"))
        this.amount2=element(by.xpath("(//tr/td[@class='cart_unit']//span/span)[2]"))
        this.amount3=element(by.xpath("(//tr/td[@class='cart_unit']//span/span)[3]"))
        this.amount4=element(by.xpath("(//tr/td[@class='cart_unit']//span/span)[4]"))
        this.amount5=element(by.xpath("(//tr/td[@class='cart_unit']//span/span)[5]"))
        this.amount6=element(by.xpath("(//tr/td[@class='cart_unit']//span/span)[7]"))
    }


    async titleAssertion(){
        await assertionsHelper.titleAssertion(jsonData.title)
    }

    async search_products(product){
        await elementHelper.elementForClearType(this.search_box,product)

    }

    async validate_data_populated(value){
        await assertionsHelper.elementPresent(this.data_populate,value)
    }

    async search(){
        await elementHelper.elementClick(this.search_button)
    }

    async validate_searched_data(value){
        await assertionsHelper.textAssertion(this.searched_item,value)
    }

    async validate_search_result(value){
        await assertionsHelper.elementPresent(this.products,value) 
        await elementHelper.elementClick(this.home)
    }

    async select_Tshirts(){
        await elementHelper.elementClick(this.tShirts)
    }

    async apply_filter(){
        await elementHelper.elementClick(this.filter)
    }

    async add_cart(ele1,ele2){
        await browser.actions().mouseMove(element(by.xpath(ele2))).perform();
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
        await elementHelper.elementClick(element(by.xpath(ele1)))
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
        await elementHelper.elementClick(this.continue_shopping)
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
            
    }

    async varify_cart(){
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
        await elementHelper.elementClick(this.cart)
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
        await browser.executeScript('window.scrollTo(0,600);').then(function () {
            console.log('++++++SCROLLED Down+++++');
        }); 
        await elementHelper.waitForElement(timeOuts.Duration.shortDuration)
        await assertionsHelper.textAssertion(this.amount1,jsonData.amount[0])
        await assertionsHelper.textAssertion(this.amount2,jsonData.amount[1])
        await assertionsHelper.textAssertion(this.amount3,jsonData.amount[2])
        await assertionsHelper.textAssertion(this.amount4,jsonData.amount[3])
        await assertionsHelper.textAssertion(this.amount5,jsonData.amount[4])
        await assertionsHelper.textAssertion(this.amount6,jsonData.amount[5])
        await assertionsHelper.textAssertion(this.total_amount,jsonData.totalamount)

    }
}
