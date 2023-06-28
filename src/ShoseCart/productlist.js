import React, { Component } from "react";
import Productitem from "./productitem";

export default class ProductList extends Component {
  renderListProduct = () => {
    const { listProduct, getDetailProduct, getProductAddCart } = this.props
    return listProduct.map((product) => {
      return <Productitem key={product.id} product={product} getDetailProduct={getDetailProduct} getProductAddCart={getProductAddCart}/>
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.renderListProduct()}
        </div>
      </div>
    );
  }
}
