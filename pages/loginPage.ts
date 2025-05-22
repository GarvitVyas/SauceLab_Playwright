import {Page} from '@playwright/test';
import {config} from '../config';


/**
 * Class representing the login page.
 * Provides methods to interact with the login form elements.
 */
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

    /**
     * @param user : user to be used for performing login
     */   
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

    /**
     * @returns boolean true | false based on the cart icon visible after login 
     */
    async isloggedIn(): Promise<boolean>{
      return this.page.isVisible(this.cart);
    }

    /**
     * method to check if the user is login by verifying the url contains inventory 
     * throws login unsuccessfull error if url not includes inventory.
     */
    async checkLogin(){
       const check = this.page.url();
       if(!check.includes('inventory')){
          throw new Error('login unsuccessfull');
       }
         
    }
    
    /**
     * @returns text of the login error message
     */
    async verifyLoginError(){
      return await this.page.locator(this.errorMessage).textContent();
    }

  }



export {LoginPage};
