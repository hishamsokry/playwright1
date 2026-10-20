import {LoginPage} from './loginpage';
import {DashBoardPage}  from './DashBoardPage';
import {CheckoutPage}  from './CheckoutPage';
import {Cart} from './Cart';
import {OrdersPage} from './OrdersPage';
import {Page} from '@playwright/test';

export class POManager {
    page: Page;
    loginPage: LoginPage;
    dashBoardPage: DashBoardPage;
    checkoutPage: CheckoutPage;
    cart: Cart;
    ordersPage: OrdersPage;

    constructor(page: Page){
    
    this.page = page;    
    this.loginPage = new LoginPage(this.page);
    this.dashBoardPage = new DashBoardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.cart = new Cart(this.page);
    this.ordersPage = new OrdersPage(this.page);

    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashBoardPage(){
        return this.dashBoardPage;

    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getCart(){
        return this.cart;
    }

    getOrdersPage(){
        return this.ordersPage;
    }


}

module.exports = {POManager};
