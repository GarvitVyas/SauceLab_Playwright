import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LogoutPage } from '../pages/logout';
import { Inventory } from '../pages/inventory_homepage';


test.describe('Add a product to cart',()=>{

    let loginPage:LoginPage;
    let logoutPage:LogoutPage;
    let inventory:Inventory;

    test.beforeEach(async({page})=>{
        await page.goto('');
        loginPage = new LoginPage(page);
        logoutPage = new LogoutPage(page);
        inventory = new Inventory(page);
    })

    test('Login into the website add a product to cart and logout',async({})=>{
        await loginPage.login('user1');
        expect(await loginPage.isloggedIn()).toBe(true);

        //verify on inventory and add a product to cart
        expect(await inventory.verifyOnHomescreen()).toBe(true);

        await inventory.addSingleproduct();
        //add product to cart

        //verify if added to cart or not 
        expect(await inventory.verifyAddedToCart()).toBe(true);

        //logout
        await logoutPage.logout();
        expect(await logoutPage.isloggedOut()).toBe(true);
    })

    test('login and add all products to cart',async({})=>{
        await loginPage.login('user1');
        expect(await loginPage.isloggedIn()).toBe(true);

        expect(await inventory.verifyOnHomescreen()).toBe(true);

        await inventory.addAllToCart();

        await logoutPage.logout();
        expect(await logoutPage.isloggedOut()).toBe(true);
    })

    test('login add product to cart via cta, remove from cart via cta and logout',async({})=>{
        await loginPage.login('user1');
        await loginPage.checkLogin();

        //add product to cart
        await inventory.addSingleproduct();
        //remove product from cart
        await inventory.removeProductCTA();
        await inventory.verifyRemovedFromCart();

        //logout
        await logoutPage.logout();

    })

})