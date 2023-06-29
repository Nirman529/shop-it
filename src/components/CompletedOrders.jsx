import React, { useEffect } from 'react'
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCompletedOrders } from '../redux/action/completedOrders';
import { connect } from 'react-redux';
import MyStore from '../redux/store/MyStore';
import { setLoader } from '../Services/LoaderService';

const CompletedOrders = () => {
	let completedOrders = useSelector((state) => state.completedOrders.completedOrders)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCompletedOrders())
		setLoader(true)
	}, [])

	return (
		<div className='body'>
			{console.log('MyStore.getState()', MyStore.getState())}
			<h1 className='justify-content-center text-center'>Completed Orders</h1>

			<div className="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-col-xxl-5 d-flex card-deck" key="row-key">
				{completedOrders?.map((item, index) => {
					return (
						<div className="col-3 mx-3 card m-2" key={index} >
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
								<div className='justify-content-center align-items-center text-center'>
									<i className="bi bi-check2-all complete-orders-card"></i>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

// export default Products;
const mapStateToProps = (state) => ({
	completedOrders: state.completedOrders,
})

export default connect(mapStateToProps)(CompletedOrders);

