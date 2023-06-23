import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import axios from 'axios';
import Auth from '../Auth';
import { connect, useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, deleteFromCart, getCartItems } from '../redux/action/cart'
import apiLink from '../apiLink';

const Cart = () => {
	let dispatch = useDispatch();
	const [currCart, setCurrCart] = useState({})
	const cartItems = useSelector((state) => state.cart.products)

	const fetchCart = async () => {
		const response = await axios
			.get(`${apiLink}/api/addtocart/get`, Auth)
			.catch((err) => {
				console.log('err get product api\n', err)
			});
		dispatch(getCartItems(response.data.data))
		console.log('response', response)
	}

	useEffect(() => {
		fetchCart();
	}, [])

	return (
		<div className='body' key="product-body-key">
			<h1 className='heading'>Your Cart Items:</h1>

			<table className='table table-striped'>
				<thead className='table-head'>
					<tr className='table-row'>
						<th> delete? </th>
						<th> Product Name </th>
						<th> Product Image </th>
						<th> Price </th>
						<th> Quantity </th>
						<th> Price </th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((item, key) => {
						return (
							<tr key={key}>
								<td> <button className='btn btn-danger'>delete</button> </td>
								<td> {item.productName	} </td>
								<td> <img src={item.productImage}/> </td>
								<td> {item.price} </td>
								<td>
									<button className='btn btn-primary'>+</button>
									no
									<button className='btn btn-primary'>-</button>
								</td>
								<td> Price </td>
							</tr>
						)
					})}
					<tr>
						<td colSpan="5" className='text-end'> Total Cost: </td>
						<td> { }total cost </td>
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

