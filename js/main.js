const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = data;
//                 console.log(data);
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
console.log(list.allProducts);

class Basket{
    constructor(container='.basket'){
        this.products = [];
        this.basket_cost = 0;
        this.container = container;
        this.getBasketData();
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
        this.basket_cost = 0;
    }
    getBasketCost(){
        this.countBasketCost()
        console.log(this.basket_cost)
    }
    getBasketData(){
        fetch(`${API}/getBasket.json`)
        .then(result => result.json())
        .then(basketData => {
            this.basket_cost = basketData['amount']
            basketData['contents'].forEach(element => {
                let product = new BasketItem(element['id_product'], element['product_name'], element['price'], element['quantity'])
                this.products.push(product)
            });
            this.render();
        })
    }
    render(){
        const basket_block = document.querySelector(this.container);
        this.products.forEach(product => {
            basket_block.insertAdjacentHTML('afterbegin', product.render())
        })
        document.querySelector('.payout-btn').insertAdjacentHTML('beforebegin', `<div>Общая стоимость: ${this.basket_cost}</div>`)
    }
}

class BasketItem{
    constructor(id, name, price, quantity, img='https://via.placeholder.com/120x40'){
        this.id = id;
        this.product_name = name;
        this.price = price;
        this.quantity = quantity
        this.img = img
    }
    setPrice(new_price){
        this.price = new_price
    }
    setName(new_name){
        this.product_name = new_name
    }
    render(){
        return `<div class="basket-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="basket-item-desc">
                        <h3>${this.product_name}</h3>
                        <p>Цена: ${this.price} $</p>
                        <p>Количество: ${this.quantity} </p>
                    </div>
                </div>`
    }
}

basket = new Basket()