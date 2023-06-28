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
		<div className="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-col-xxl-5 d-flex card-deck" key="row-key">
			{orders?.map((item, key) => {
				return (
					<div className="col-3 mx-3 card m-2" key={key} >
						<div className='row m-0'>
							<img className="card-img-top product-image mt-2" src={item.productImage} alt="Card cap" />
						</div>

						<div className="card-body m-0">
							<h5 className="card-title">{item.productName}</h5>
							<div className='row border-bottom'>
								<span className="col m-0">{item.discription}</span>
							</div>
							<div className='row border-bottom'>
								<span className="col">Category:</span>
								<span className="col text-end text-danger">{item.category}</span>
							</div>
							<div className='row border-bottom'>
								<span className="col">Shop Name:</span>
								<span className="col text-end">{item.shopName}</span>
							</div>
							<div className='row border-bottom'>
								<span className="col">Color:</span>
								<span className='col text-end'>{item.colors}</span>
							</div>
							<div className='row border-bottom'>
								<span className="col">Price:</span>
								<span className='col text-end text-primary'>{item.price}</span>
							</div>
							<div className='row border-bottom'>
								<span className="col">Quantity:</span>
								<span className='col text-end text-info'>{item.quantity}</span>
							</div>
							<div className='row border-bottom'>
								<span className="col">Discount:</span>
								<span className='col text-end text-info'>{item.discount}</span>
							</div>
							<div className='row border-bottom'>
								<span className="col">Total cost:</span>
								<span className='col text-end text-success'>{(item.price * item.quantity) - (item.price * item.quantity * item.discount / 100)}</span>
							</div>
							<div className='row border-bottom'>
								<span className="col">Mobile:</span>
								<span className='col text-end'>{item.mobile}</span>
							</div>

							<div className='m-2'>
								<button className='btn btn-danger' onClick={() => cancelPurchase(item._id)}>cancel purchase</button>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	</div>
	)
}

export default Orders