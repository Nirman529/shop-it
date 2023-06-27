import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../App.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Auth from '../Auth';
import { Modal } from 'react-bootstrap';
import { useSelector, connect, useDispatch } from 'react-redux';
import { fetchProducts, setProducts } from '../redux/action/products';
import { addToCart } from '../redux/action/cart';
import MyStore from '../redux/store/MyStore';
import Swal from 'sweetalert2';
import apiLink from '../apiLink';

const Product = () => {
    // const dispatch = useDispatch();
    let firstObj = {
        _id: "",
        productImage: "",
        productName: "",
        price: 0,
        category: "",
        shopName: "",
        mobile: 0,
        discount: 0,
        discription: "",
        colors: "",
    }

    const products = useSelector((state) => state.products.products);

    const [currProduct, setCurrProduct] = useState([])
    const [editCurrProduct, setEditCurrProduct] = useState(firstObj)
    const [showBuyNow, setShowBuyNow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showAdd, setShowAdd] = useState(false)

    const dispatch = useDispatch()

    // ----------------- DELETE PRODUCTS -----------------
    const deleteProduct = (item) => {
        setCurrProduct(item);
        Swal.fire({
            icon: 'question',
            title: 'Are You Sure You Want To Delete This Product?',
            confirmButtonText: 'Yes!',
            showDenyButton: true,
            denyButtonText: 'No!',
        }).then((result) => {
            if (result['isConfirmed']) {
                
                deleteProductApi(item._id);
            }
        })
    }

    // Delete API implementation done
    const deleteProductApi = async (_id) => {
        // obj.id as query only required
        axios
            .delete(
                `https://oscar-student-api.cyclic.app/api/product/delete?id=${_id}`,
                Auth
            ).then((response) => {
                // get api
            })
            .catch((err) => console.log("err deleteapi", err));
    };

    //  ----------------- EDIT PRODUCT  -----------------
    // Edit Modal actions
    const editModalClose = () => {
        setShowEdit(false)
    }

    const editModalOpen = (item) => {
        setEditCurrProduct(item);
        setShowEdit(true);
    }

    const updateProduct = async (obj) => {
        let formData = new FormData()
        formData.append('_id', obj._id)
        formData.append('productName', obj.productName)
        formData.append('productImage', obj.productImage)
        formData.append('price', obj.price)
        formData.append('category', obj.category)
        formData.append('shopName', obj.shopName)
        formData.append('mobile', obj.mobile)
        formData.append('discount', obj.discount)
        formData.append('discription', obj.discription)
        formData.append('colors', obj.colors)

        const res = await axios
            .patch(
                `${apiLink}/product/update?id=${obj._id}`,
                formData,
                Auth
            )
            .then((response) => {
                console.log('response 1 in edits', response)
            })
            .catch((err) => {
                console.log("err put method", err);
            });
    }

    //  ----------------- ADD PRODUCT  -----------------
    // Add Modal actions
    const addModalClose = () => {
        setShowAdd(false)
    }

    const addModalOpen = () => {
        setShowAdd(true);
    }

    //  ----------------- BUY NOW  -----------------
    // Buy Now actions
    const buyNowModalClose = () => {
        setShowBuyNow(false)
    }

    const buyNowModalOpen = (props) => {
        setCurrProduct(props);
        setShowBuyNow(true);
    }

    //  ----------------- PRODUCT CART -----------------
    const addProductToCart = async (obj) => {
        const response = await axios
            .post(`${apiLink}/addtocart/add`, { productId: obj._id }, Auth)
            .then()
            .catch((err) => {
                console.log('err in add to cart', err)
            });
        MyStore.dispatch(addToCart(response.data.data))
        console.log('response add prod to cart', response)
    }

    // ----------------- FORM DATA MANIPULATE -----------------
    const UpdateData = async (e) => {
        if (e.target.files) {
            editCurrProduct[e.target.name] = e.target.files[0];
            setEditCurrProduct({ ...editCurrProduct });
        } else {
            setEditCurrProduct({ ...editCurrProduct, [e.target.name]: e.target.value });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (editCurrProduct._id === "") {
            console.log(' new product submitted',)

        } else {
            if (editCurrProduct.productImage === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Field!!!',
                    text: 'Make sure you have submited an updated image',
                })
            }
            else {
                console.log('updating to', editCurrProduct)
                updateProduct(editCurrProduct);
            }
        }
        setEditCurrProduct(firstObj)
    };


    useEffect(() => {
        dispatch(setProducts())
    }, [])

    return (
        <div className='body' key="product-body-key">
            <div className='row m-1 p-1'>
                <div className='col'>
                    <h1 className='text-left m-3' key='product-heading-key'> Welcome to products section</h1>
                </div>
                <div className='col justify-content-center align-items-end text-end'>
                    <button className='btn btn-primary m-3 p-3 text-end' onClick={() => addModalOpen()}>Add new product</button>
                </div>
            </div>

            <div className="row d-flex card-deck m-0" key="row-key">
                {products?.map((item, index) => {
                    return (<div className="col-3 mx-3 card m-2" key={index} >
                        <div className='col'>
                            <span className='d-flex justify-content-end'>
                                <span className="dropdown">
                                    <button className="btn justify-content-end pe-0">
                                        <i className="bi bi-three-dots-vertical pe-0"></i>
                                    </button>
                                    <div className="dropdown-content">
                                        <button className='btn btn-warning m-0' onClick={() => editModalOpen(item)}>Edit</button>
                                        <button className='btn btn-danger  m-0' onClick={() => deleteProduct(item)}>Delete</button>
                                    </div>
                                </span>
                            </span>
                            <div className='row'>
                                <img className="card-img-top product-image" src={item.productImage} alt="Card cap" />
                            </div>
                        </div>

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
                            <button className="btn btn-primary card-link" onClick={() => { buyNowModalOpen(item) }}>Buy Now</button>
                            <button className="btn btn-info card-link" onClick={() => { addProductToCart(item) }}>Add to Cart</button>
                        </div>
                    </div>)
                })}

                {/* ------------- buy now modal ------------- */}
                <Modal show={showBuyNow} onHide={buyNowModalClose} key="buy-now-modal-body">
                    <Modal.Header>
                        <Modal.Title>{currProduct.productName} for buy now</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{currProduct.discription}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn ' onClick={buyNowModalClose}>Close Modal</button>
                    </Modal.Footer>
                </Modal>

                {/* ------------- edit modal ------------------- */}
                <Modal show={showEdit} onHide={editModalClose} key="edit-modal-body">
                    <Modal.Header>
                        <Modal.Title>Edit Product Details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={submit}>
                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label>Product Name:</label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.productName} onChange={(e) => UpdateData(e)} id='productName' name='productName' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label>Price:</label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.price} onChange={(e) => UpdateData(e)} id='price' name='price' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Category: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.category} onChange={(e) => UpdateData(e)} id='category' name='category' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Shop Name: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.shopName} onChange={(e) => UpdateData(e)} id='shopName' name='shopName' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Mobile No.: </label>
                                </div>

                                <div className='col'>
                                    <input value={editCurrProduct.mobile} onChange={(e) => UpdateData(e)} id='mobile' name='mobile' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Discount:  </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.discount} onChange={(e) => UpdateData(e)} id='discount' name='discount' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Discription: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.discription} onChange={(e) => UpdateData(e)} id='discription' name='discription' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Colors: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.colors} onChange={(e) => UpdateData(e)} type="text" name='colors' />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Product Image: </label>
                                </div>
                                <div className='col'>
                                    <input onChange={(e) => UpdateData(e)} name='productImage' type="file" />
                                </div>
                            </div>

                            <div className='col text-center m-1 p-1'>
                                <button type="submit" className="btn btn-primary">
                                    submit
                                </button>
                            </div>
                            <div className='col text-center m-1 p-1'>
                                <button className='btn btn-danger' onClick={editModalClose}>Cancel Edit</button>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                {/* ------------- Add New Item modal ------------------- */}
                <Modal show={showAdd} onHide={addModalClose} key="add-modal-body">
                    <Modal.Header>
                        <Modal.Title>Add your product details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={submit}>
                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label>Product Name:</label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.productName} onChange={(e) => UpdateData(e)} id='productName' name='productName' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label>Price:</label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.price} onChange={(e) => UpdateData(e)} id='price' name='price' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Category: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.category} onChange={(e) => UpdateData(e)} id='category' name='category' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Shop Name: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.shopName} onChange={(e) => UpdateData(e)} id='shopName' name='shopName' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Mobile No.: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.mobile} onChange={(e) => UpdateData(e)} id='mobile' name='mobile' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Discount:  </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.discount} onChange={(e) => UpdateData(e)} id='discount' name='discount' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Discription: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.discription} onChange={(e) => UpdateData(e)} id='discription' name='discription' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Colors: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.colors} onChange={(e) => UpdateData(e)} type="text" name='colors' />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Product Image: </label>
                                </div>
                                <div className='col'>
                                    <input onChange={(e) => UpdateData(e)} name='productImage' type="file" />
                                </div>
                            </div>


                            <div className='col text-center m-1 p-1'>
                                <button type="submit" className="btn btn-primary">
                                    submit
                                </button>
                            </div>
                            <div className='col text-center m-1 p-1'>
                                <button className='btn btn-danger' onClick={addModalClose}>Cancel add</button>
                            </div>

                        </form>
                    </Modal.Body>

                    <Modal.Footer>
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

