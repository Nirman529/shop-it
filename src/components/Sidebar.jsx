import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import React from 'react'
import Header from "./Header";
import { Link, NavLink } from "react-router-dom";


var Logo = require("../images/png/logo-no-background.png");

const Sidebar = ({ children }) => {

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
            <div className='sidebar-container'>
                <div className='col-2 m-0'>
                    <div className="sidebar m-0">
                        <div className='row sidebar-logo p-3'>
                            <img src={Logo} alt='side photo'/>
                        </div>
                        <div className="row">
                            <NavLink to='/' className="navlink">
                                <div className="sidebar-button text-center">Dashboard</div>
                            </NavLink>
                        </div>
                        <div className="row">
                            <NavLink to='/product' className="navlink">
                                <div className="sidebar-button text-center">Products</div>
                            </NavLink>
                        </div>
                        <div className="row">
                            <NavLink to='/cart' className="navlink">
                                <div className="sidebar-button text-center">Cart</div>
                            </NavLink>
                        </div>
                        
                        <div className="row">
                            <NavLink to='/orders' className="navlink">
                                <div className="sidebar-button text-center">Orders</div>
                            </NavLink>
                        </div>
                        
                        <div className="row">
                            <NavLink to='/completedOrders' className="navlink">
                                <div className="sidebar-button text-center">Completed Orders</div>
                            </NavLink>
                        </div>

                        <div className="row">
                            <NavLink to='/account' className="navlink">
                                <div className="sidebar-button text-center">Account</div>
                            </NavLink>
                        </div>
                        <div className="row">
                            <Link to='../login'>
                                <div className="navlink" >
                                    <button className="sidebar-button text-center" onClick={logout}>log-out</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='col-10'>
                    <Header />
                    {children}
                </div>
            </div>
        </>
    )
}

export default Sidebar