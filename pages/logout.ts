import {Page} from '@playwright/test';
import {config} from '../config';

class LogoutPage{
      private page:Page;
      private cart:string;
      private hamburgerMenu : string;
      private logoutbtn : string;

    constructor(page: Page){
        this.page = page;
        this.cart = '.shopping_cart_link';
        this.hamburgerMenu = '.bm-burger-button>#react-burger-menu-btn';
        this.logoutbtn='.bm-item-list>a:nth-child(3)';
    }

    //logout of the app
    async logout(){
      await this.page.locator(this.hamburgerMenu).click();
      await this.page.locator(this.logoutbtn).click();
    }

    async isloggedOut():Promise<boolean>{
      return this.page.isHidden(this.cart);
    }
  }



export {LogoutPage};