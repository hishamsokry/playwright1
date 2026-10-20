const {LoginPage} = require('./LoginPage');
const {DashBoardPage} = require('./DashBoardPage');
const {CheckoutPage} = require('./CheckoutPage');
const {Cart} = require('./Cart');
const {OrdersPage} = require('./OrdersPage');
class POManager {
    
    constructor(page){
    
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
