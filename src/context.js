import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'
const ProductContext = React.createContext();

class ProductProvider extends Component {
    constructor(){
        super();
        this.state = {
            products: [...storeProducts],
            detailProduct: detailProduct,
            modalOpen: false,
            modalProduct: detailProduct,
            cart: [],
            cartSubTotal: 0,
            cartTax: 0,
            cartTotal: 0
        }
    }
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(product => {
            const singleProduct  = {...product};
            tempProducts = [...tempProducts, singleProduct];
        })
        this.setState({
            products: tempProducts
        })
    }
    getProduct = (id) => {
        const product =  this.state.products.find(item  => item.id === id);
        return product;
    }
    handleDetail = (id) => {
        const product = this.getProduct(id);
        this.setState({
            detailProduct : product
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getProduct(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        product.total = product.price;
        this.setState(
            {
                products: tempProducts,
                cart: [...this.state.cart, product]
            },
            () => this.addTotal()
        )        
    }
    openModal = id =>{
        const product = this.getProduct(id);
        this.setState({
            modalProduct: product,
            modalOpen: true
        })
    }
    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    }
    increment = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];
        product.count += 1;
        product.total = product.count * product.price;
        this.setState({
            cart: [...tempCart]
        },
        () => {
            this.addTotal();
        }) 
    }
    decrement = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];
        product.count -= 1;
        if(product.count === 0){
            this.removeItem(id);
        }
        else{
            product.total = product.count * product.price;
            this.setState({
                cart: [...tempCart]
            },
            () => {
                this.addTotal();
            }) 
        }
    }
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getProduct(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.total = 0;
        removedProduct.count = 0;
        this.setState({
            cart: [...tempCart],
            products: [...tempProducts]
        },
        () => {
            this.addTotal();
        })
    }
    clearCart = () => {
        this.setState({
            cart: []
        },
        () => {
            this.setProducts();
            this.addTotal();
        })
    }
    addTotal = () => {
        let subTotal = 0;
        this.state.cart.map(item => subTotal += item.total);
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState({
            cartSubTotal: subTotal,
            cartTax: tax,
            cartTotal: total
        })
    }
    render() {
        return (
            <ProductContext.Provider 
                value={{
                ...this.state,
                handleDetail : this.handleDetail,
                addToCart : this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
                }
            }>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};