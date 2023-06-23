import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Auth from '../Auth';
import { Modal } from 'react-bootstrap';
import { useSelector, connect, useDispatch } from 'react-redux';
import { setProducts } from '../redux/action/products';
import { addToCart } from '../redux/action/cart';
import apiLink from '../apiLink';

const Product = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const [currProduct, setCurrProduct] = useState([])
    const [show, setShow] = useState(false)

    // console.log('products', products)

    const modalClose = () => {
        setShow(false)
    }

    const openModal = (props) => {
        setCurrProduct(props);
        setShow(true);
    }

    const fetchProducts = async () => {
        const response = await axios
            .get(`${apiLink}/api/product/get`, Auth)
            .catch((err) => {
                console.log('err get product api\n', err)
            });
        dispatch(setProducts(response.data.data))
    }

    const addProductToCart = async (obj) => {
        let formData = new FormData();
        formData.append('productId', obj._id);
        console.log('formData', formData);
        const response = await axios
            .post(`${apiLink}/api/addtocart/add`, {productId : obj._id}, Auth)
            .then(
                )
                .catch((err) => {
                    console.log('err in add to cart', err)
                });
                // dispatch(addToCart(response.data.data))
        console.log('response add prod to cart', response)
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className='body' key="product-body-key">
            <h1 className='text-center' key='product-heading-key'> Welcome to products section</h1>
            <div className="row d-flex card-deck m-0" key="row-key">
                {products.map((item, index) => {
                    return <div className="col-3 mx-3 card m-2" key={index} >
                                <img className="card-img-top product-image" src={item.productImage} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.productName}</h5>
                                    <p className="card-text">{item.discription}</p>
                                </div>
                                <ul className="list-group list-group-flush" key='card-list-key'>
                                    <li className="list-group-item">Category: {item.category}</li>
                                    <li className="list-group-item">Shop Name: {item.shopName}</li>
                                    <li className="list-group-item">Color: {item.colors}</li>
                                </ul>
                                <div className="card-body" key='card-body-key'>
                                    <button className="btn btn-primary card-link" onClick={() => { openModal(item) }}>View details</button>

                                    <button className="btn btn-warning card-link" onClick={() => { addProductToCart(item) }}>Add to Cart</button>
                                </div>
                            </div>
                })}

                <Modal show={show} onHide={modalClose} key="modal-body">
                    <Modal.Header>
                        <Modal.Title>{currProduct.productName}</Modal.Title>
                    </Modal.Header>

                    {/* <Modal.Image    ></Modal.Image> */}

                    <Modal.Body>
                        <p>{currProduct.discription}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn ' onClick={modalClose}>Close Modal</button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
}

// export default Products;
const mapStateToProps = (state) => ({
    products: state.products,
})

export default connect(mapStateToProps)(Product);

