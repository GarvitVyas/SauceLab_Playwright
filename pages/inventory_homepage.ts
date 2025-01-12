import {Page} from '@playwright/test';

class Inventory{

    private page:Page;
    private addToCart:string;
    private hamburgerMenu:string;
    private cart:string;
    private sort:string;
    private sort_AtoZ:string;
    private sort_ZtoA:string;
    private sort_LowToHigh:string;
    private sort_HighToLow:string;
    private addToCartBTN:string;
    private product:string;
    private priceTag:string;
    private cartCount:string;
    
    constructor(page:Page){
        this.page = page;
        this.addToCart='';
        this.hamburgerMenu='.bm-burger-button>#react-burger-menu-btn';
        this.cart='.shopping_cart_link';
        this.sort='.product_sort_container';
        this.sort_AtoZ='az';
        this.sort_ZtoA='za';
        this.sort_LowToHigh='lohi';
        this.sort_HighToLow='hilo';
        this.addToCartBTN='.pricebar>button';
        this.product='.inventory_item_name';
        this.priceTag='.inventory_item_price';
        this.cartCount='.shopping_cart_badge';
        }
    

    async openCart(){
        await this.page.locator(this.cart).click();
    }

    async sortAtoZ(){
        await this.page.locator(this.sort).click();
        const sortOptions = await this.page.locator(this.sort);
        await sortOptions.selectOption({value:this.sort_AtoZ});
    }

    async sortZtoA(){
        await this.page.locator(this.sort).click();
        const sortOptions = await this.page.locator(this.sort);
        await sortOptions.selectOption({value:this.sort_ZtoA});
    }

    async sortLowToHigh(){
        await this.page.locator(this.sort).click();
        const sortOptions = await this.page.locator(this.sort);
        await sortOptions.selectOption({value:this.sort_LowToHigh});
    }

    async sortHighToLow(){
        await this.page.locator(this.sort).click();
        const sortOptions = await this.page.locator(this.sort);
        await sortOptions.selectOption({value:this.sort_HighToLow});
    }
    
    async verifyLowToHighSorting(){
        const price = await this.page.locator(this.priceTag).allTextContents();
        return price[0]>price[price.length-1]?true:false;
    }

    async verifyHighToLowSorting(){
        const price = await this.page.locator(this.priceTag).allTextContents();
        return price[price.length-1]>price[0]?true:false;
    }

    async verifyOnHomescreen():Promise<boolean>{
        return this.page.locator(this.cart).isVisible();
    }


    //action 3rd product and add it to cart 
    async addSingleproduct(){
        const products = await this.page.locator('.pricebar>button');
        await products.nth(2).click();
    }

    async removeProductCTA(){
        const products = await this.page.locator(this.addToCartBTN).nth(2);
        if(await products.textContent()=='Remove'){
            await products.click();
        }
        else{
            throw new Error('product is not in the cart, please add one to remove');
        }
    }

    async verifyRemovedFromCart(){
        const products = await this.page.locator(this.addToCartBTN).nth(2).textContent();
        if(products!='Add to cart'){
            throw new Error('Porduct not removed yet!');
        }
        
    }
    async verifyAddedToCart():Promise<boolean>{
        //verify the attribute of list[2] using playwright to verify if product is added or not 
        const products = await this.page.locator('.pricebar>button').nth(2).textContent();
        return products==='Remove'? true : false;
    }

    async addAllToCart(){
        const buttons = await this.page.locator('.pricebar>button').elementHandles();
        for(let i = 0; i<buttons.length;i++){
            await buttons[i].click();
        }
        await this.page.waitForTimeout(6000);
        let cartCount = await this.page.locator(this.cartCount).textContent();
       
        //this is basically checking the number of 'add to cart' cta against count showing on cart icon
       if(buttons.length+'' !=cartCount){
            throw new Error('All products are not added in the cart');
       }
    }

    async PorductName(){
        const name = await this.page.locator(this.product).nth(2).textContent();
        return name;    
    }
}       

export{Inventory};

/**
 
 */