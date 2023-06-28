import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Login from "./components/Login";
import Cart from "./components/Cart";
import NoPage from "./components/NoPage";
import { useState } from "react";
import Loader from "./components/Loader";
import Account from "./components/Account";
import Orders from "./components/Orders";
import CompletedOrders from "./components/CompletedOrders";
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
							<Route path="/" element={<Dashboard />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="product" element={<Product />} />
							<Route path="cart" element={<Cart />} />
							<Route path="orders" element={<Orders />} />
							<Route path="completedOrders" element={<CompletedOrders />} />
							<Route path="account" element={<Account />} />
							<Route path="*" element={<NoPage />} />
						</Routes>
					</Sidebar>
				}
			</BrowserRouter>
		</div>
	);
}

export default App;
