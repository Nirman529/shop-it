import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../App.css"
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useSelector, connect, useDispatch } from 'react-redux';
import { setProducts, addProduct, updateProduct, deleteProduct } from '../redux/action/products';
import { addToCart, deleteFromCart } from '../redux/action/cart';
import { addOrders } from '../redux/action/orders';
import Swal from 'sweetalert2';

const Product = () => {
    // const dispatch = useDispatch();
    let firstObj = {
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
    const [count, setCount] = useState(0)
    const [editCurrProduct, setEditCurrProduct] = useState({ firstObj })
    const [showBuyNow, setShowBuyNow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const dispatch = useDispatch()

    // ----------------- DELETE PRODUCTS ----------------- done
    const deleteThisProduct = (item) => {
        Swal.fire({
            icon: 'question',
            title: `Are You Sure You Want To Delete ${item.productName}?`,
            confirmButtonText: 'Yes!',
            showDenyButton: true,
            denyButtonText: 'No!',
        }).then((result) => {
            if (result['isConfirmed']) {
                dispatch(deleteProduct(item._id))
            }
        })
    }
    //  ----------------- EDIT/ADD PRODUCT  -----------------
    // Edit Modal actions
    const editModalClose = () => {
        setCurrProduct(firstObj)
        setShowEdit(false)
    }

    const editModalOpen = (item) => {
        setEditCurrProduct(item);
        setShowEdit(true);
    }

    //  ----------------- BUY NOW  -----------------
    // Buy Now actions
    const buyNowModalClose = () => {
        setCount(0)
        setShowBuyNow(false)
    }

    const buyNowModalOpen = (props) => {
        setCurrProduct(props);
        setShowBuyNow(true);
    }

    const buyNow = () => {
        if (count > 0) {
            Swal.fire(
                'Purchased '+currProduct.productName+' successfully',
                'Check Orders menu for confirmation',
                'success'
            )
            dispatch(addOrders({ID:currProduct._id, quantity:count}))
            buyNowModalClose()
        }
        else {
            Swal.fire(
                'Improper quantity',
                'Keep quantity 1 or more than 1!!!',
                'info'
              )
        }
    }

    // ----------------- FORM DATA MANIPULATE -----------------
    const UpdateData = (e) => {
        if (e.target.files) {
            editCurrProduct[e.target.name] = e.target.files[0];
            setEditCurrProduct({ ...editCurrProduct });
        } else {
            setEditCurrProduct({ ...editCurrProduct, [e.target.name]: e.target.value });
        }
    };

    // --------------------- FORM SUBMIT ---------------------
    const submit = (e) => {
        e.preventDefault();

        if (editCurrProduct._id === undefined) {
            console.log(' new product submitted',)
            dispatch(addProduct(editCurrProduct))

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
                try {
                    dispatch(updateProduct(editCurrProduct));
                } catch (error) {
                    console.log('error submit button', error)
                    setEditCurrProduct(firstObj)
                }
            }
        }
        setEditCurrProduct(firstObj)
    };

    const addThisToCart = (obj) => {
        Swal.fire({
            icon: 'success',
            title: `Added ${obj.productName} to cart`,
        })
        dispatch(addToCart(obj))
    }


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
                    <button className='btn btn-primary m-3 p-3 text-end' onClick={editModalOpen}>Add new product</button>
                </div>
            </div>

            <div className="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-col-xxl-5 d-flex card-deck" key="row-key">
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
                                        <button className='btn btn-danger  m-0' onClick={() => deleteThisProduct(item)}>Delete</button>
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
                            <button className="btn btn-info card-link" onClick={() => { addThisToCart(item) }}>Add to Cart</button>
                        </div>
                    </div>)
                })}

                {/* ------------- buy now modal ------------- */}
                <Modal show={showBuyNow} size='lg' onHide={buyNowModalClose} key="buy-now-modal-body">
                    <Modal.Header>
                        <Modal.Title>Buy {currProduct.productName} now</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className='row m-0'>
                            <div className='col'>
                                <div className='row m-0'>
                                    <img src={currProduct.productImage} className='buynow-image' />
                                </div>
                                <div className='row m-0 justify-content-center align-items-center text-center'>
                                    Quantity:
                                    <div className='col'>
                                        <button className='btn btn-primary' onClick={() => setCount(count - 1)}>-</button>
                                        <span className='btn btn-secondary'>{count}</span>
                                        <button className='btn btn-primary' onClick={() => setCount(count + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='row my-1 border'>
                                    <div className='col'>Product Name : </div>
                                    <div className='col'>{currProduct.productName}</div>
                                </div>
                                <div className='row my-1 border'>
                                    <div className='col'>Price: </div>
                                    <div className='col'>{currProduct.price}</div>
                                </div>
                                <div className='row my-1 border'>
                                    <div className='col'>Category: </div>
                                    <div className='col'>{currProduct.category}</div>
                                </div>
                                <div className='row my-1 border'>
                                    <div className='col'>Shop Name: </div>
                                    <div className='col'>{currProduct.shopName}</div>
                                </div>
                                <div className='row my-1 border'>
                                    <div className='col'>Mobile Number: </div>
                                    <div className='col'>{currProduct.mobile}</div>
                                </div>
                                <div className='row my-1 border'>
                                    <div className='col'>Discount: </div>
                                    <div className='col'>{currProduct.discount}%</div>
                                </div>
                                <div className='row my-1 border'>
                                    <div className='col'>Description: </div>
                                    <div className='col'>{currProduct.discription}</div>
                                </div>
                                <div className='row my-1 border'>
                                    <div className='col'>Colors: </div>
                                    <div className='col'>{currProduct.colors}</div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={() => buyNow()}>Buy Now</button>
                        <button className='btn btn-danger' onClick={buyNowModalClose}>Close</button>
                    </Modal.Footer>
                </Modal>

                {/* ------------------- Add/Edit Modal ------------------- */}
                <Modal show={showEdit} onHide={editModalClose} key="edit-modal-body">
                    <Modal.Header>
                        <Modal.Title>Product Details are:</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label>Product Name:</label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.productName} onChange={UpdateData} id='productName' name='productName' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label>Price:</label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.price} onChange={UpdateData} id='price' name='price' type="number" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Category: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.category} onChange={UpdateData} id='category' name='category' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Shop Name: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.shopName} onChange={UpdateData} id='shopName' name='shopName' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Mobile No.: </label>
                                </div>

                                <div className='col'>
                                    <input value={editCurrProduct.mobile} onChange={UpdateData} id='mobile' name='mobile' type="number" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Discount:  </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.discount} onChange={UpdateData} id='discount' name='discount' type="number" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Discription: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.discription} onChange={UpdateData} id='discription' name='discription' type="text" />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Colors: </label>
                                </div>
                                <div className='col'>
                                    <input value={editCurrProduct.colors} onChange={UpdateData} type="text" name='colors' />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col'>
                                    <label> Product Image: </label>
                                </div>
                                <div className='col'>
                                    <input onChange={UpdateData} name='productImage' type="file" />
                                </div>
                            </div>

                            <div className='col text-center m-1 p-1'>
                                <button type="submit" className="btn btn-primary" onClick={submit}>
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
            </div>
        </div>
    )
}

// export default Products;
const mapStateToProps = (state) => ({
    products: state.products,
})

export default connect(mapStateToProps)(Product);

