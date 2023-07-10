import React from 'react'
import "../App.css"
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Account = () => {
	const user = useSelector((state) => state.user.user);

	return (
		<>
			<div className='body'>
				<h1 className='justify-content-center text-center'>Account Details</h1>

				<div className='row m-0 ms-2 me-2 bg-white rounded border'>
					<div className='d-flex justify-content-begin align-items-center'>
						<img src={user.userImage} className='header-user-image justify-content-center align-items-center' alt='user photo' />
						<div className='col'>
							<div className='row m-1 text-muted'>
								User Name: {user.userName}<br />
							</div>
							<div className='row m-1 text-secondary'>
								Qualification: {user.qualification}
							</div>
						</div>
					</div>
				</div>

				<div className='row m-0 mb-2 mt-2 ms-2 me-2 rounded border bg-white'>
					<h5 className='row m-0 mt-2 font-weight-bold'>
						Personal Information:
					</h5>

					<div className='row m-0 mb-3 mt-3'>
						<div className='col'>
							<div className='row text-secondary'>
								Name:
							</div>
							<div className='row'>
								{user.userName}
							</div>
						</div>
						<div className='col'>
							<div className='row text-secondary'>
								Email:
							</div>
							<div className='row'>
								{user.email}
							</div>
						</div>
					</div>

					<div className='row m-0 mb-3'>
						<div className='col'>
							<div className='row text-secondary'>
								Mobile No.:
							</div>
							<div className='row'>
								{user.mobile}
							</div>
						</div>
						<div className='col'>
							<div className='row text-secondary'>
								Office No.:
							</div>
							<div className='row'>
								{user.officeContact}
							</div>
						</div>
					</div>

					<div className='row m-0 mb-2'>
						<div className='col'>
							<div className='row text-secondary'>
								Gender:
							</div>
							<div className='row'>
								{user.gender}
							</div>
						</div>
					</div>
				</div>

				<div className='row m-0 ms-2 me-2 mb-2 rounded border bg-white'>
					<h5 className='row m-0 mt-2'>
						Address:
					</h5>

					<div className='row m-0 mb-3 mt-3'>
						<div className='col'>
							<div className='row text-secondary'>
								Street:
							</div>
							<div className='row'>
								{user.address}
							</div>
						</div>
						<div className='col'>
							<div className='row text-secondary'>
								City:
							</div>
							<div className='row'>
								{user.city}
							</div>
						</div>
					</div>

					<div className='row m-0 mb-2'>
						<div className='col'>
							<div className='row text-secondary'>
								Pin Code:
							</div>
							<div className='row'>
								{user.postalCode}
							</div>
						</div>
						<div className='col'>
							<div className='row text-secondary'>
								Country:
							</div>
							<div className='row'>
								{user.country}
							</div>
						</div>
					</div>
				</div>
				<div className='row d-flex m-0 ms-2 me-2 mb-2 pb-2 justify-content-center align-items-center text-center'>
					<button className='btn btn-danger'> Logout </button>
				</div>
			</div>
		</>
	)
}

// export default Products;
const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps)(Account);

