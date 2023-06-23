import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Home from "./components/Home";
import Login from "./components/Login";
import Cart from "./components/Cart";
import NoPage from "./components/NoPage";
import { useState } from "react";
import Loader from "./components/Loader";
import Account from "./components/Account";
import Product from "./components/Product";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

const App = () => {

	const [isLogin, setisLogin] = useState(localStorage.getItem('token'))
	return (
		<div className="App">

			<Loader />
			<BrowserRouter>
				{isLogin == null ?
					<Routes>
						<Route path="/" element={<Navigate to='/login' />} />
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<NoPage />} />
					</Routes>
					:
					<Sidebar>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="cart" element={<Cart />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="account" element={<Account />} />
							<Route path="product" element={<Product />} />
							<Route path="*" element={<NoPage />} />
						</Routes>
					</Sidebar>
				}
			</BrowserRouter>
		</div>
	);
}

export default App;
