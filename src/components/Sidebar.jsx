import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import React from 'react'
import Header from "./Header";
import { NavLink } from "react-router-dom";


var Logo = require("../images/png/logo-no-background.png");

const Sidebar = ({ children }) => {
    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <>
            <div className='sidebar-container'>
                <div className='col-2 m-0'>
                    <div className="sidebar m-0">
                        <div className='row sidebar-logo p-3'>
                            <img src={Logo} alt='dashboard-side-pic' />
                        </div>
                        <div className="row">
                            <NavLink to='/' className="navlink">
                                <div className="sidebar-button text-begin"><i className="bi bi-speedometer2 icon me-1"></i>Dashboard</div>
                            </NavLink>
                        </div>
                        <div className="row">
                            <NavLink to='/product' className="navlink">
                                <div className="sidebar-button text-begin"><i className="bi bi-bag-check icon me-1"></i>Products</div>
                            </NavLink>
                        </div>
                        <div className="row">
                            <NavLink to='/cart' className="navlink">
                                <div className="sidebar-button text-begin"><i className="bi bi-cart-dash icon me-1"></i>Cart</div>
                            </NavLink>
                        </div>

                        <div className="row">
                            <NavLink to='/orders' className="navlink">
                                <div className="sidebar-button text-begin"><i className="bi bi-circle icon me-1"></i>Orders</div>
                            </NavLink>
                        </div>

                        <div className="row">
                            <NavLink to='/completedOrders' className="navlink">
                                <div className="sidebar-button text-begin"><i className="bi bi-check2-circle icon me-1"></i>Completed Orders</div>
                            </NavLink>
                        </div>

                        <div className="row">
                            <NavLink to='/account' className="navlink">
                                <div className="sidebar-button text-begin"><i className="bi bi-person icon me-1"></i>Account</div>
                            </NavLink>
                        </div>
                        <div className="row">
                            <div className="navlink" >
                                <div className="sidebar-button text-begin" onClick={logout}><i className="bi bi-power icon me-1"></i>log-out</div>
                            </div>
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