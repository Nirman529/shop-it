import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { fetchUser } from "../redux/action/user.js"
import { NavLink } from 'react-router-dom';
import CountDown from 'react-countdown'

const Header = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const dateSetter = (data) => {
        // console.log(data)
        if (data.total == 0) {
            logout()
        }
		return <div className='m-3'>Time remaining: {data.minutes} mn : {data.seconds} sec</div>
	}

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
                            <div className='d-flex justify-content-end align-items-center'>
                                <img src={user.userImage} className='header-user-image' alt="user" />
                            </div>
                        </NavLink>
                        <NavLink to="/account" className="navlink">
                            <div className='d-flex m-3 justify-content-end align-items-center'><i className="bi bi-person icon m-1"></i>{user.userName}</div>
                        </NavLink>
                        <NavLink to="/cart" className="navlink">
                            <div className='d-flex justify-content-end align-items-center'><i className="bi bi-cart icon m-1"></i>cart</div>
                        </NavLink>
                        <CountDown date={new Date().getTime() + 3599000} renderer={dateSetter}>
                            {/* <p>time remaining</p> */}
                        </CountDown>
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

