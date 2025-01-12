import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LogoutPage } from '../pages/logout';
import { Inventory } from '../pages/inventory_homepage';
import { CartPage } from '../pages/cartPage';
import { PayementInfo } from '../pages/utils/payementinfo';

test.describe('E2E test',()=>{

    let loginPage:LoginPage;
    let logoutPage:LogoutPage;
    let cartPage:CartPage;
    let inventory:Inventory;

    test.beforeEach(async({page})=>{
        await page.goto('');
        loginPage = new LoginPage(page);
        logoutPage=new LogoutPage(page);
        inventory=new Inventory(page);
        cartPage = new CartPage(page);
    })

    test('Login, add a product to cart, checkout flow',async({})=>{
        await loginPage.login('user1');
        expect(await loginPage.isloggedIn()).toBeTruthy();

        await inventory.addSingleproduct();
        await cartPage.GotoCart();
        expect(await cartPage.checkOut()).toBeTruthy();

        await cartPage.fillDetails();
        expect(await cartPage.verifyCheckoutStepTwoPage()).toContain('step-two');

        expect(await cartPage.verifyPayementInfo()).toBe(PayementInfo['payment information']);
        expect(await cartPage.verifyShippingInfo()).toBe(PayementInfo['Shipping Information']);
        expect(await cartPage.verifyItemTotal()).toBe(PayementInfo['Price Total- item total']);
        expect(await cartPage.verifyTax()).toBe(PayementInfo['Price Total-Tax']);
        expect(await cartPage.verifyTotal()).toBe(PayementInfo['Total Price']);

        await cartPage.completeCheckout();
        expect(await cartPage.verifyCheckoutComplete()).toContain('checkout-complete');

        const {one, two} = await cartPage.verifyOrdered();
        expect(await one).toContain(PayementInfo.Message1);
        expect(await two).toContain(PayementInfo.Message2);
        //back to home
        await cartPage.checkoutCompleteToHome();
        //LOGOUT
        await logoutPage.logout();
        expect(await logoutPage.isloggedOut()).toBeTruthy();
    })

})