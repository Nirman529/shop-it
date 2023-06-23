import React from 'react'
import "../App.css"
import { useSelector } from 'react-redux'


const Account = () => {
	const user = useSelector((state) => state.user.user);
	
	return (
		<>
			<div className='body'>
				<div className='col'>
					<div className='d-flex justify-content-center'>

						<img src={user.userImage} className='header-user-image' alt='user photo' />
					</div>
				</div>
				<div className='row m-0 '>
					<div className='col'>
						User Name:
					</div>
					<div className='col'>
						{user.userName}
					</div>
				</div>
				<div className='row m-0 '>
					<div className='col'>
						Qualification:
					</div>
					<div className='col'>
						{user.qualification}
					</div>
				</div>
				<div className='row m-0 '>
					<div className='col'>
						e-mail:
					</div>
					<div className='col'>
						{user.email}
					</div>
				</div>
				<div className='row m-0 '>
					<div className='col'>
						Mobile No.:
					</div>
					<div className='col'>
						{user.mobile}
					</div>
				</div>
				<div className='row m-0 '>
					<div className='col'>
						Office Contact:
					</div>
					<div className='col'>
						{user.officeContact}
					</div>
				</div>

				<div className='row m-0 '>
					<div className='col'>
						Gender:
					</div>
					<div className='col'>
						{user.gender}
					</div>
				</div>
				<div className='row m-0 '>
					<div className='col'>
						Address:
					</div>
					<div className='col'>
						{user.address},<br />
						{user.city},
						{user.state} <br />
						{user.postalCode}
					</div>
				</div>
			</div>
		</>
	)
}

export default Account;