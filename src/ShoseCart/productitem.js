import React, { Component } from 'react';

export default class Productitem extends Component {
  render() {
    const { product, getDetailProduct, getProductAddCart } = this.props;
    return (
      <div className="col-sm-4">
        <div className="card my-2">
          <img className="card-img-top" src={product.image} alt="" />
          <div className="card-body">
            <h2 className="card-title text-center">{product.name}</h2>
            <h3 className="card-title text-center">{product.price}$</h3>
            <h4 className="card-title text-center text-danger"> Quantity is Only {product.quantity}</h4> 
            <h6 className="card-title">{product.description}</h6>
            <button className="btn btn-info" onClick={() => {
              getDetailProduct(product);
            }}>Chi tiết</button>
            <button className="btn btn-danger ml-2" onClick={()=>{
              getProductAddCart(product);
            }}>Thêm giỏ hàng</button>
          </div>
        </div>
      </div>
    )
  }
}
