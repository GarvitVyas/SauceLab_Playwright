import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LogoutPage } from '../pages/logout';
import { CartPage } from '../pages/cartPage';
import { Inventory } from '../pages/inventory_homepage';


test.describe('Cart page tests',()=>{
    let loginPage:LoginPage;
    let logoutPage:LogoutPage;
    let cartPage:CartPage;
    let inventory:Inventory;

    test.beforeEach(async({page})=>{
        await page.goto('');
        loginPage = new LoginPage(page);
        logoutPage = new LogoutPage(page);
        cartPage = new CartPage(page);
        inventory = new Inventory(page);
    })

    test('Add a product to cart and verify if product added in cart via cart page',async({})=>{
        await loginPage.login('user1');
        await loginPage.checkLogin();

        await inventory.addSingleproduct();
        await cartPage.GotoCart();
        await cartPage.continueShopping();
        
    })

    test('Add product to cart, remove from cart',async({})=>{
        await loginPage.login('user1');
        await inventory.addSingleproduct();
        await cartPage.GotoCart();
        await cartPage.removeFromCart();
        expect(await cartPage.verifyRemovedFromCart()).toEqual(1);
       
        await logoutPage.logout();
        expect(await logoutPage.isloggedOut()).toBeTruthy();
    })
})