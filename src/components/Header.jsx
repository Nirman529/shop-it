import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { fetchUser } from "../redux/action/user.js"
import { NavLink } from 'react-router-dom';

const Header = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    return (
        <>
            <div className='header row align-items-center m-0'>
                <div className='col justify-content-center text-left'>
                    Welcome to admin panel
                </div>
                <div className='col'>
                    <div className='d-flex flex-row-reverse align-items-center'>
                        <NavLink to="/account">
                            <div className='d-flex justify-content-end'>
                                <img src={user.userImage} className='header-user-image' alt="user" />
                            </div>
                        </NavLink>
                        <NavLink to="/account" className="navlink">
                            <div className='d-flex m-3 justify-content-end'><i className="bi bi-person icon"></i>{user.userName}</div>
                        </NavLink>
                        <NavLink to="/cart" className="navlink">
                            <div><i className="bi bi-cart icon"></i>cart</div>
                        </NavLink>
                    </div>
                </div>
            </div >
        </>
    )
}

// export default Account;
const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps)(Header);

