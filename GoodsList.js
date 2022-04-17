class GoodsList {
    constructor() {
        this.goods = [];
        this.fetchGoods()
    }
    fetchGoods() {
        this.goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        ];
    }
    totalCost(){
        let total_cost = this.goods.reduce((sum, elem)=>{
            return sum+elem.price
        }, 0)
        console.log(total_cost)
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.title, good.price);
        listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}
    
goods = new GoodsList()
goods.totalCost()