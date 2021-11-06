import {Given,When,Then} from 'cucumber';
import { browser } from 'protractor';
var _= require("underscore");

import {BookProductPage} from "../pages/bookProducts.po";

const bookProductPage= new BookProductPage();


Given(/^.*?user at my store website$/, {timeout: 6 * 50000},async () => {
    await bookProductPage.titleAssertion();
});

When(/^.*?user start searching with (.*)$/, {timeout: 6 * 50000},async (product) => {
    await bookProductPage.search_products(product);
});

Then(/^.*?data will populate with atleast 3 (.*)$/,{timeout: 6 * 50000}, async (value) => {
    await bookProductPage.validate_data_populated(value);
});

When(/^.*?user search for (.*)$/, {timeout: 6 * 50000},async (product) => {
    await bookProductPage.search_products(product);
    await bookProductPage.search()
});

Then(/^.*?validate the searched (.*) results$/,{timeout: 6 * 50000}, async (value) => {
    await bookProductPage.validate_searched_data(value);
    await bookProductPage.validate_search_result("true");
});

When(/^.*?user selects T-shirt section$/, {timeout: 6 * 50000},async () => {
    await bookProductPage.select_Tshirts();
});

When(/^.*?apply large size catalouge filter$/, {timeout: 6 * 50000},async () => {
    await bookProductPage.apply_filter()
});

Then(/^.*?validate the large size T-shirt$/,{timeout: 6 * 50000}, async () => {
    await bookProductPage.validate_search_result("true");
});

When(/^.*?user adds 5 products into the cart (.*)$/, {timeout: 6 * 50000},async (index) => {
    await browser.sleep(2000)
    if(index==5){
        await browser.executeScript('window.scrollTo(0,900);').then(function () {
            console.log('++++++SCROLLED Down+++++');
        });
    }
    browser.sleep(2000)
    console.log("index",index)
    let test1="(//*[text()='Add to cart'])["+index+"]"
    let test2="(//div[@class='product-image-container'])["+index+"]"
    
    await bookProductPage.add_cart(test1,test2)
});

Then(/^.*?validate total cart amount and individual product price both with and without discount$/,{timeout: 6 * 50000}, async () => {
    await bookProductPage.varify_cart();
});
