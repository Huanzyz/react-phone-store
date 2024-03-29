import React, { Component } from 'react';
import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'
class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const {id, title, img, price, company, info, inCart} = value.detailProduct;
                    return(
                        <div className="container py-5">
                            {/* Title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5"><h1>{title}</h1></div>
                            </div>
                            {/* Product Info */}
                            <div className="row">
                                {/* Image */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <img src={img} className="img-fluid"  alt="product"/>
                                </div>
                                {/* Info */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>model: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mb-2 mt-3">made by: {company}</h4>
                                    <h4 className="text-blue"><strong>price: <span className="mr-1">$</span>{price}</strong></h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">some info about the product:</p>
                                    <p className="text-muted lead">{info}</p>
                                    {/* Buttons */}
                                    <div>
                                        <Link to="/"><ButtonContainer>back to products</ButtonContainer></Link>
                                        <ButtonContainer 
                                            cart
                                            disabled={inCart? true: false}
                                            onClick = {() => {
                                                value.addToCart(id)
                                                value.openModal(id)
                                            }}
                                        >{inCart?'in cart':'add to cart'}</ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        );
    }
}

export default Details;