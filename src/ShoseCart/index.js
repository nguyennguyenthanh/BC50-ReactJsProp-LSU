import React, { Component } from "react";
import ProductList from "./productlist";
import Modal from "./modal";
import data from "./data.json";


export default class ShoesStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: data,
      productDetail: data[0],
      listCart: [],
    }
  }
  //find index product in this.state.listCart
  _findIndex = (id) => this.state.listCart.findIndex((product) => product.id === id);

  /*** SHOW DETAIL PRODUCT **/
  handleDetailProduct = (product) => {
    //get product from productlist <= product
    this.setState({
      productDetail: product,
    })
  }

  /**ADD CART **/
  handleAddCart = (product) => {
    //find product in arr
    const index = this._findIndex(product.id);
    //create new arr from old arr
    let listCart = [...this.state.listCart];
    if (index !== -1) {
      //Udate quantity
      listCart[index].quantity += 1;
    } else {
      //not found => add cart
      const productAddCart = {
        id: product.id,
        name: product.name,
        image: product.image,
        quantity: 1,
        price: product.price,
      };
      listCart.push(productAddCart);
    }
    //Update State
    this.setState({
      listCart,
    })
  }
  /*** PLUS AND MINUS ***/
  handleUpdateQuantity = (id, isPlus) => {
    let listCartClone = [...this.state.listCart];
    const index = this._findIndex(id);
    if (index !== -1) {
      if (isPlus) {
        //increase quantity
        listCartClone[index].quantity += 1;
      } else {
        //reduce quantity if qantity > 1
        if (listCartClone[index].quantity > 1) {
          listCartClone[index].quantity -= 1;
        }
      }
    }
    //Update State
    this.setState({
      listCart: listCartClone,
    })
  }
  /*** DELETE ***/
  handleDeleteProduct = (id) => {
    let listCartClone = [...this.state.listCart];
    const index = this._findIndex(id);
    if (index !== -1) {
      listCartClone.splice(index, 1);
      //Update State
      this.setState({
        listCart: listCartClone,
      })
    }
  }
  /*** TOTAL QUANTITY UI ***/
  totalQuantity = () => {    
    return this.state.listCart.reduce((total, product) => total += product.quantity, 0)
  }
  
  render() {
    const { listProduct, productDetail, listCart } = this.state;
    return (
      <div>
        <h3 className="title">Bài tập giỏ hàng Giày</h3>
        <div className="container">
          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modelId"
          >
            Giỏ hàng ({this.totalQuantity()})
          </button>
        </div>
        <ProductList listProduct={listProduct} getDetailProduct={this.handleDetailProduct} getProductAddCart={this.handleAddCart} />
        <Modal listCart={listCart} getProductUpdate={this.handleUpdateQuantity} getDelProduct={this.handleDeleteProduct} />
        <div className="row">
          <div className="col-sm-5">
            <img className="img-fluid" src={productDetail.image} alt="" />
          </div>
          <div className="col-sm-7">
            <h3>Infomation Shose</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>Name Shose</td>
                  <td>{productDetail.name}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{productDetail.price}$</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{productDetail.description}</td>
                </tr>
                <tr>
                  <td>ShortDescription</td>
                  <td>{productDetail.shortDescription}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{productDetail.quantity}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

    );
  }
}
