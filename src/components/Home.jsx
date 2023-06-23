import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import React from 'react'
import { Outlet } from 'react-router';

const Home = () => {

	return (
		<>
			<div className='body'>
				Body
			</div>
			<Outlet />
		</>
	)
}

export default Home