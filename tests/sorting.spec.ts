import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LogoutPage } from '../pages/logout';
import { Inventory } from '../pages/inventory_homepage';

test.describe('Login the user and sort the price list and logout',()=>{

    let loginPage:LoginPage;
    let logoutPage:LogoutPage;
    let inventory:Inventory;

    test.beforeEach(async({page})=>{
        await page.goto('');
        loginPage = new LoginPage(page);
        logoutPage = new LogoutPage(page);
        inventory = new Inventory(page);
    })

    test('Login then sort low to high and logout',async({})=>{
        //login 
        await loginPage.login('user1');
        expect(await loginPage.isloggedIn()).toBe(true);

        //verify user is on homescreen
        expect(await inventory.verifyOnHomescreen()).toBe(true);

        //sort low to high
        await inventory.sortLowToHigh();
        expect(await inventory.verifyLowToHighSorting()).toBe(true);

        //logout
        await logoutPage.logout();
        expect(await logoutPage.isloggedOut()).toBe(true);
    })

    //test('Login ')
    test('Login then sort high to low and logout',async({})=>{
        //login
        await loginPage.login('user1');
        expect(await loginPage.isloggedIn()).toBe(true);
        //verify user is on homescreen
        expect(await inventory.verifyOnHomescreen()).toBe(true);
        //sort high to low
        await inventory.sortHighToLow();
        expect(await inventory.verifyHighToLowSorting()).toBe(true);
        //logout
        await logoutPage.logout();
        expect(await logoutPage.isloggedOut()).toBe(true);
    })







})