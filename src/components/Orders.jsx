import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../App.css"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, deleteOrders } from '../redux/action/orders';

const Orders = () => {
	let dispatch = useDispatch()

	const cancelPurchase = (ID) => {
		console.log('item delete from purchase', ID)
		dispatch(deleteOrders(ID))
	}

	useEffect(() => {
		dispatch(getOrders())
	}, [])


	const orders = useSelector((state) => state.orders.orders)
	return (<div className='body'>
		<div className='row m-0'>
			<h1>Orders section</h1>
		</div>
		<div className='row m-0'>
			<div className='col'>
				{orders?.map((item, key) => {
					return (<div className='row my-1 border rounded' key={key}>
						<div className='col-4'>
							<img src={item.productImage} className='buynow-image' alt="" />
							<div className='m-2'>
								<button className='btn btn-danger' onClick={()=>cancelPurchase(item._id)}>cancel purchase</button>
							</div>
						</div>
						<div className='col' >
							<div className='row my-1 border'>
								<div className='col'>Product Name : </div>
								<div className='col'>{item.productName}</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Price: </div>
								<div className='col'>{item.price}</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Quantity: </div>
								<div className='col'>{item.quantity}</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Discount: </div>
								<div className='col'>{item.discount}%</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Total cost: </div>
								<div className='col'>{item.quantity * item.price * item.discount / 100}</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Category: </div>
								<div className='col'>{item.category}</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Shop Name: </div>
								<div className='col'>{item.shopName}</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Mobile Number: </div>
								<div className='col'>{item.mobile}</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Description: </div>
								<div className='col'>{item.discription}</div>
							</div>
							<div className='row my-1 border'>
								<div className='col'>Colors: </div>
								<div className='col'>{item.colors}</div>
							</div>
						</div>
					</div>)
				})}
			</div>
		</div>
	</div>
	)
}

export default Orders