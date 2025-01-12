import {Page} from '@playwright/test';
import {config} from '../config';

class LoginPage{
      private page:Page;
      private email:string;
      private password1:string;
      private loginButton:string;
      private cart:string;
      private errorMessage:string;
    constructor(page: Page){
        this.page = page;
        this.errorMessage='.error-message-container.error>h3';
        this.email = ".form_group:nth-child(1)>input";
        this.password1 = ".form_group:nth-child(2)>input";
        this.loginButton= "form>input";
        this.cart = '.shopping_cart_link';
       }

    async login(user: 'user1' | 'user2' | 'user3' | 'user4'){
        //check if config variables are loaded properly
        const credentials= config[user];
        if(!credentials.username || !credentials.password){
          throw new Error('user name or password are not defined in env file please check again dotenv');
        }

        await this.page.getByPlaceholder('Username').fill(credentials.username);
        await this.page.getByPlaceholder('Password').fill(credentials.password);
        await this.page.getByText('Login').click();
    }
    async isloggedIn(): Promise<boolean>{
      return this.page.isVisible(this.cart);
    }
    async checkLogin(){
       const check = await this.page.url();
       if(!check.includes('inventory')){
          throw new Error('login unsuccessfull');
       }
         
    }

    async verifyLoginError(){
      return await this.page.locator(this.errorMessage).textContent();
    }

  }



export {LoginPage};
