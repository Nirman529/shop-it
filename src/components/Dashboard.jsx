import React from 'react'
import "../App.css"
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <>
      <div className='body'>Dashboard</div>
      <Outlet />
    </>
  )
}

export default Dashboard