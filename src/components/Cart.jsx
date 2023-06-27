import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../redux/action/cart'

const Cart = () => {
	let dispatch = useDispatch();
	// const [currCart, setCurrCart] = useState({})
	const cartItems = useSelector((state) => state.cart.products)
	let totalCost = 0;

	useEffect(() => {
		dispatch(getCartItems())
	}, [])

	return (
		<div className='body mx-2' key="product-body-key">
			<h1 className='heading'>Your Cart Items:</h1>
			<table className='table table-striped-columns justify-content-center align-items-center text-center'>
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
									<button className='btn btn-danger me-1'>Delete</button>
									<button className='btn btn-primary'>Buy Now</button>
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
		</div>
	)
}

// export default Account;
const mapStateToProps = (state) => ({
	cart: state.cart,
})

export default connect(mapStateToProps)(Cart);

