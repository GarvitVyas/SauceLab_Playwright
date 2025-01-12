import{Page} from '@playwright/test';
import { Inventory } from './inventory_homepage';

class CartPage{

    private page:Page;
    private cart:string;
    private continueShoppingBTN : string;
    private productName : string;
    private cartCount:string;
    private removeBTN : string;
    private checkoutBTN:string;
    private finishBTN:string;
    private backhome:string;
   //way to use one page class into another
    private inventory:Inventory;

    constructor(page:Page){
        this.page = page;
        this.backhome='#back-to-products'
        this.finishBTN='button[id="finish"]';
        this.checkoutBTN='#checkout';
        this.removeBTN='.btn.btn_secondary.btn_small.cart_button'
        this.cartCount='a>span.shopping_cart_badge';
        this.cart = '.shopping_cart_link';
        this.continueShoppingBTN='#continue-shopping';
        this.productName='.inventory_item_name';
        this.inventory = new Inventory(page);
    }

    async GotoCart(){
        const productName = await this.inventory.PorductName();
        await this.page.locator(this.cart).click();
        if(!await this.page.url().includes('cart')){
            throw new Error('not navigted to cart page, sorry try again');
        }
        const cartName= await this.page.locator(this.productName).textContent();
        if(productName!=cartName){
            throw new Error('Product not found in cart');
        }
    }

    async continueShopping(){
        await this.page.locator(this.continueShoppingBTN,{hasText:'Continue Shopping'}).click();
        if(await this.page.url().includes('inventory') != true){
            throw new Error('Not Navigated back from cart');
        }else{
            console.log('Navigated back');
        }
    }

    async removeFromCart(){
        //first check if there is product in cart
       const cartNumberText = await this.page.locator(this.cartCount).textContent();
       const cartNumber = parseInt(cartNumberText || '0',10);
       const productname = await this.page.locator(this.productName).textContent();
        //const productName = await this.inventory.PorductName();
         
        if(cartNumber>0){
            const cartProducts = await this.page.locator(this.removeBTN).getAttribute('name');
            if(cartProducts && cartProducts.includes('bolt')){
                await this.page.locator(this.removeBTN).click();
                console.log(`product removed ${productname}`)
            }
            else{
                throw new Error('product not found');
                }
            }else{
                throw new Error('No product in cart')
            }
        }

        async verifyRemovedFromCart(){
         const cartItem=await this.page.locator('div.cart_list>div').count;
         return cartItem.length<1?1:0;
        }

        async checkOut(){
            await this.page.locator(this.checkoutBTN).click();
            return await this.page.url().includes('checkout')?true:false;
        }

        async fillDetails(){
            await this.page.getByPlaceholder('First Name').fill('Garvit');
            await this.page.locator('#last-name').fill('Vyas');
            await this.page.getByPlaceholder('Zip/Postal Code').fill('458441');
            await this.page.getByText('Continue').click();
        }
        async verifyCheckoutStepTwoPage(){
            return await this.page.url();
        }

        async getErrorMessage(x:any){
            return await this.page.textContent(x);
        }

        async fillEmpty(){
            const error = '.error-message-container.error';
            await this.page.getByText('Continue').click();
            this.getErrorMessage(await this.page.locator(error));
        }

        //payment info
        async verifyPayementInfo(){
            return await this.page.locator('.summary_info>div').nth(1).textContent();
        }
        async verifyShippingInfo(){
            return await this.page.locator('.summary_info>div').nth(3).textContent();
        }
        async verifyItemTotal(){
            return await this.page.locator('.summary_info>div').nth(5).textContent();
        }
        async verifyTax(){
            return await this.page.locator('.summary_info>div').nth(6).textContent();
        }
        async verifyTotal(){
            return await this.page.locator('.summary_info>div').nth(7).textContent();
        }

        async completeCheckout(){
            await this.page.locator(this.finishBTN).click();
        }
        async verifyCheckoutComplete(){
            return await this.page.url();
        }

        async verifyOrdered(){
           const one = await this.page.locator('.title').textContent();
           const two = await this.page.locator('.complete-text').textContent();
           return {one,two};
        }

        async checkoutCompleteToHome(){
            await this.page.locator(this.backhome,{hasText:'Back Home'}).click();
        }

    

 

}

export{CartPage};

/**
 * 1. login into the app
 * 2. Go to empty cart 
 * 3. verify user is on cart page
 * 4. Go back to inventory
 * 5. Add product to cart
 * 6. Verify cart count 
 * 7. Go to cart
 * 8. verify the product is added (via product name)
 */