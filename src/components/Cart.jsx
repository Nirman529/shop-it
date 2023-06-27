import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import axios from 'axios';
import Auth from '../Auth';
import { connect, useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, deleteFromCart, getCartItems, fetchCartItems } from '../redux/action/cart'
import apiLink from '../apiLink';

const Cart = () => {
	let dispatch = useDispatch();
	const [currCart, setCurrCart] = useState({})
	const cartItems = useSelector((state) => state.cart.products)
	let totalCost = 0;


	// call function to actions
	// const fetchCart = async () => {
	// 	const response = await axios
	// 		.get(`${apiLink}/addtocart/get`, Auth)
	// 		.catch((err) => {
	// 			console.log('err get product api\n', err)
	// 		});
	// 	dispatch(getCartItems(response.data.data))
	// 	// console.log('response carts', response)
	// }

	useEffect(() => {
		fetchCartItems();
	}, [])

	return (
		<div className='body mx-2' key="product-body-key">
			<h1 className='heading'>Your Cart Items:</h1>
			<table className='table table-striped-columns justify-content-center align-items-center text-center'>
				<thead className='table-head'>
					<tr className='table-row'>
						<th> Remove Item? </th>
						<th> Product Name </th>
						<th> Product Image </th>
						<th> Price </th>
						<th> Quantity </th>
						<th> Price </th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((item, key) => {
						totalCost = totalCost + item.price;
						return (
							<tr key={key}>
								<td> <button className='btn btn-danger'>delete</button> </td>
								<td> {item.productName} </td>
								<td> <img src={item.productImage} className='cart-image' /> </td>
								<td> {item.price} </td>
								<td> {item.quantity} </td>
								<td> {item.price} </td>
							</tr>
						)
					})}
					<tr>
						<td colSpan="5" className='text-end'> Total Cost: </td>
						<td> {totalCost} </td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

// export default Account;
const mapStateToProps = (state) => ({
	cart: state.cart,
})

export default connect(mapStateToProps)(Cart);

