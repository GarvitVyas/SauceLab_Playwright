import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LogoutPage } from '../pages/logout';

test.describe('Login and logout test',()=>{

    let loginPage : LoginPage;
    let logout : LogoutPage;

    test.beforeEach(async({page})=>{
        await page.goto('');
        loginPage = new LoginPage(page);
        logout =new LogoutPage(page);
    })

    test('login into the website', async({})=>{

        await loginPage.login('user1');
        await loginPage.checkLogin();
        expect(await loginPage.isloggedIn()).toBe(true);

    })
    
    test('logout from the website',async({})=>{

        await loginPage.login('user1');
        expect(await loginPage.isloggedIn()).toBe(true);
        await logout.logout();
        expect(await logout.isloggedOut()).toBe(true);
    })


})


