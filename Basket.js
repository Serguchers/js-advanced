class Basket{
    constructor(){
        this.products = [];
        this.basket_cost = 0;
    }
    countBasketCost(){
        this.basket_cost = this.products.reduce((sum, elem)=>{return sum+elem.price}, 0)
    }
    removeProduct(product){
        this.products = this.products.filter(function(item){
            return product.id !== item.id
        })
    }
    addProduct(product){
        this.products.push(product);
    }
    clearBasket(){
        this.products = [];
    }
    getBasketCost(){
        this.countBasketCost()
        console.log(this.basket_cost)
    }
}

class BasketItem{
    constructor(id, name, price){
        this.id = id;
        this.product_name = name;
        this.price = price;
    }
    setPrice(new_price){
        this.price = new_price
    }
    setName(new_name){
        this.product_name = new_name
    }
}

product_1 = new BasketItem(1, 'test_1', 100)
product_2 = new BasketItem(2, 'test_2', 200)
product_3 = new BasketItem(3, 'test_3', 300)
product_4 = new BasketItem(4, 'test_4', 400)
basket = new Basket()
basket.addProduct(product_1)
basket.addProduct(product_2)
basket.addProduct(product_3)
basket.addProduct(product_4)
console.log(basket.products)
basket.removeProduct(product_2)
console.log(basket.products)
basket.getBasketCost()