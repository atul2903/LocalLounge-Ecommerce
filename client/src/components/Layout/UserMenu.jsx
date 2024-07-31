import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from './Layout'

const UserMenu = () => {
  return (

    <div className="text-center">
    <h4>DashBoard</h4>
   <div className="list-group">
  <NavLink  to='/dashboard/user/profile' className="list-group-item list-group-item-action " aria-current="true">
    Profile
  </NavLink>
  <NavLink to='/dashboard/user/orders' className="list-group-item list-group-item-action">All Orders</NavLink>
  
</div>
</div>


  )
}

export default UserMenu