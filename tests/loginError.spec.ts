import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { PayementInfo } from '../pages/utils/payementinfo';


test.describe('Login with invalid creds',()=>{

    let loginPage:LoginPage;

    test.beforeEach(async({page})=>{
        await page.goto('');
        loginPage=new LoginPage(page);
    })

    test('Login with invalid creds and veirfy errors',async({})=>{
        await loginPage.login('user4');
        //await loginPage.checkLogin();
        expect(await loginPage.verifyLoginError()).toEqual(await PayementInfo['Error-message-login']);
    })
    
})