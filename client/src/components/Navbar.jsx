import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/userActions'

const Navbar = () => {

    const cartState = useSelector(state => state.cartReducer)
    const loggedInUser = useSelector(state => state.loginUserReducer.currentUser)
    if (loggedInUser) {
        var { userType } = loggedInUser
    }
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
                <div className="container">
                    <Link style={{ textDecoration: 'none' }} to={'/'}><a className="navbar-brand" >FavFoods</a></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {loggedInUser ? (
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={loggedInUser.name}
                                    menuVariant="dark"
                                >
                                    {loggedInUser.userType === 'restaurant' ? (<Link to={'/food/new'} style={{ color: 'inherit', textDecoration: 'none' }}><NavDropdown.Item href="/food/new">Add New Item</NavDropdown.Item></Link>) : ''}
                                    <Link to={'/orders'} style={{textDecoration: 'none'}}><NavDropdown.Item href="#action/3.1">Orders</NavDropdown.Item></Link>
                                    {!(loggedInUser.userType === 'deliveryMan') && <Link to={'/requests'} style={{ textDecoration: 'none', color: 'inherit' }}><NavDropdown.Item href='/requests'>Requests</NavDropdown.Item></Link>}
                                    <NavDropdown.Item onClick={logout}><Link to={'/logout'} style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link></NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <li className="nav-item">
                                    <Link to='/login' style={{ textDecoration: 'none' }}><a className="nav-link" >Login</a></Link>
                                </li>
                            )}
                            {userType !== 'restaurant' && userType !== 'deliveryMan' && <li className="nav-item">
                                <Link style={{ textDecoration: 'none' }} to="/cart"><a className="nav-link" >Cart {cartState.cartItems.length}</a></Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar