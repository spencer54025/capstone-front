import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './login/auth'
import HomePage from './shop/homepage'
import NavBar from './navbar/navbar'
import Contact from './contact'
import BookDetail from './shop/book-detail'
import Cart from './shop/cart'
import AddBook from './admin-pages/add-book'
import Checkout from './shop/checkout'
import { v4 } from 'uuid'

export default class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedInStatus: "not_logged_in",
      cart: [],
      userType: 'common',
      books: []
    }

    this.successfulLogin = this.successfulLogin.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.logout = this.logout.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.removeFromBooks = this.removeFromBooks.bind(this)
    this.updateBooks = this.updateBooks.bind(this)
  }

  updateBooks(book) {
    this.setState({
      books: books.concat(book)
    })
  }

  removeFromBooks(book) {
    this.setState({
      books: this.state.books.filter(item => {
        return item.id != book.id
      })
    })
  }

  clearCart() {
    this.setState({
      cart: []
    })
  }

  removeFromCart(book) {
    this.setState({
      cart: this.state.cart.filter(item => {
        return item.key !== book.key
      })
    })
  }

  addToCart(book){
    book['key'] = v4()
    this.setState({
      cart: [book].concat(this.state.cart)
    })
  }

  successfulLogin(user_type) {
    this.setState({
      loggedInStatus: "logged_in",
      userType: user_type
    })
  }

  logout() {
    this.setState({
      loggedInStatus: "not_logged_in",
      userType: 'common',
    })
  }


  render() {
    return (
      <div className='app'>
        <Router>
          <NavBar logout={this.logout} cart={this.state.cart} userType={this.state.userType} loggedInStatus={this.state.loggedInStatus} />
            <Switch>
              <Route exact path='/' render={props => (
                <HomePage {...props} books={this.state.books} />
              )} />

              <Route
                path='/login'
                  render={props => (
                <Login {...props} loggedInStatus={this.state.loggedInStatus} successfulLogin={this.successfulLogin} userType={this.userType}/> )}
               />

              <Route path="/book/:slug" render={props => (
                <BookDetail  {...props} removeFromBooks={this.removeFromBooks} cart={this.state.cart} userType={this.state.userType} loggedInStatus={this.state.loggedInStatus} addToCart={this.addToCart} />
                )}
              />

              <Route path='/contact' component={Contact} />

              <Route path='/cart' render={props => (
                <Cart {...props} cart={this.state.cart} clearCart={this.clearCart} removeItem={this.removeFromCart}/>
              )} />
              
              <Route path='/add-book' render={props => (
                <AddBook {...props} updateBooks={this.updateBooks} />
              )} />

              <Route path='/checkout' component={Checkout} />
              
            </Switch>
        </Router>
      </div>
    );
  }
}
