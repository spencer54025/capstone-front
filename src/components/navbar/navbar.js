import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default class NavBar extends Component {
    constructor(props){
        super(props)

    }




    render(){
        const cartItemsNum = this.props.cart.length
        return(
            <div className='nav-wrapper'>
                <div className="free-shipping-banner">
                    <span>free shipping on orders over $35!</span>
                </div>
                <div className="link-wrapper">
                    <div className="nav-link">
                        <NavLink exact to ='/'>Shop</NavLink>
                    </div>
                    <div className="nav-link">
                        <NavLink to ='/contact'>Contact</NavLink>
                    </div>
                    
                    {this.props.loggedInStatus === "logged_in" ?
                    <div className='nav-link'>
                    <NavLink to='/cart'><FontAwesomeIcon icon={faCartShopping} /> </NavLink>
                    <span>{cartItemsNum}</span>
                     <button onClick={() => this.props.logout()}>logout</button>
                    </div>
                     :
                     <div className='nav-link'>
                     <div >
                        <NavLink to='/login'>login/signup</NavLink>
                     </div>
                        <NavLink className='cart' to='/cart'><FontAwesomeIcon icon={faCartShopping} /> </NavLink>
                        <span>{cartItemsNum}</span>
                     </div>
                    }
                </div>
            </div>
        )
    }
}