import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import Swal from 'sweetalert2';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCartItems, deleteFromCart } from '../redux/action/cart'
import { Modal } from 'react-bootstrap';
import { addOrders } from '../redux/action/orders';


const Cart = () => {
	let dispatch = useDispatch();
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
	const cartItems = useSelector((state) => state.cart.products)
	const [currProduct, setCurrProduct] = useState(firstObj);
	const [count, setCount] = useState(0)
	const [buyNow, setBuyNow] = useState(false)
	let totalCost = 0;

	const purchaseConfirm = () => {
		if (count > 0) {
            Swal.fire(
                'Purchased '+currProduct.productName+' successfully',
                'Check Orders menu for confirmation',
                'success'
            )
            dispatch(addOrders({ID:currProduct._id, quantity:count}))
            setBuyNow(false)
        }
        else {
            Swal.fire(
                'Improper quantity',
                'Keep quantity 1 or more than 1!!!',
                'info'
              )
        }
	}

	const setBuyNowModal = (item) => {
		setBuyNow(true)
		setCurrProduct(item)
	}

	const deleteItemFromCart = (item) => {
		Swal.fire({
			icon: 'question',
			title: `Are You Sure You Want To Delete ${item.productName}?`,
			confirmButtonText: 'Yes!',
			showDenyButton: true,
			denyButtonText: 'No!',
		}).then((result) => {
			if (result['isConfirmed']) {
				dispatch(deleteFromCart(item._id))
			}
		})
	}

	useEffect(() => {
		dispatch(getCartItems())
	}, [])

	return (
		<div className='body mx-2' key="product-body-key">
			<h1 className=''>Your Cart Items:</h1>
			<table className='table table-striped-columns justify-content-center align-items-center text-center m-1'>
				<thead className='table-head'>
					<tr className='table-row'>
						<th> Actions </th>
						<th> Product Name </th>
						<th> Product Image </th>
						<th> Price </th>
						<th> Price </th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((item, key) => {
						totalCost = totalCost + item.price;
						return (
							<tr key={key}>
								<td>
									<button className='btn btn-danger me-1' onClick={() => deleteItemFromCart(item)}>Delete</button>
									<button className='btn btn-primary' onClick={() => setBuyNowModal(item)}>Buy Now</button>
								</td>
								<td> {item.productName} </td>
								<td> <img src={item.productImage} className='cart-image' alt={key} /> </td>
								<td> {item.price} </td>
								<td> {item.price} </td>
							</tr>
						)
					})}
					<tr>
						<td colSpan="4" className='text-end'> Total Cost: </td>
						<td> {totalCost} </td>
					</tr>
				</tbody>
			</table>
			{/* ------------- buy now modal ------------- */}
			<Modal show={buyNow} size='lg' onHide={() => setBuyNow(false)} key="buy-now-modal-body">
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
					<button className='btn btn-primary' onClick={() => purchaseConfirm()}>Buy Now</button>
					<button className='btn btn-danger' onClick={() => setBuyNow(false)}>Close</button>
				</Modal.Footer>
			</Modal>

		</div>
	)
}

// export default Account;
const mapStateToProps = (state) => ({
	cart: state.cart,
})

export default connect(mapStateToProps)(Cart);

