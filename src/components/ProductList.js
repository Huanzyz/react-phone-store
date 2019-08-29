import React, { Component } from 'react';
import Product from './Product'
import Title from './Title'
import {ProductConsumer} from '../context'
class ProductList extends Component {
    constructor(){
        super();
        this.state = {
            products: []
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <Title name="our" title="products" />
                    <div className="row mx-5">
                    <ProductConsumer>
                        {(value)=>{
                            return value.products.map(product=>(
                                <Product key={product.id} product={product} />
                            ))
                        }}
                    </ProductConsumer>
                    </div>
                    <div className="container"></div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;