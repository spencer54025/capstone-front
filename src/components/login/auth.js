import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            username1: "",
            username2: "",
            password1: "",
            password2: "",
            message: "",
            email: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.createAccount = this.createAccount.bind(this)
    }

    


    createAccount(event) {
        if (this.state.email == '' || this.state.password == '' || this.state.username == '') {
            this.setState({
                message: "please fill out all the fields"
            })
        }
        else{
        axios.post('http://127.0.0.1:5000/signup', {
            username: this.state.username2,
            password: this.state.password2,
            email: this.state.email
        })
        .then(response => {
            if (response.data == 'please pick a different username' || response.data == "please choose a different email"){
                this.setState({
                    message: response.data
                })
            }
            else{
                this.props.successfulLogin(),
                this.setState({
                    message: "welcome! thanks for creating an account with us"
                })
            }
        })
        .catch(error => {
            console.log(errror)
        })
    }
    event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleLogin(event) {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/user/verify',
            data: {
                username: this.state.username1,
                password: this.state.password1
            }
        })
        .then(response => {
            console.log(response)
            if(response.data[0] === "user was verified"){
                this.props.successfulLogin(response.data[2])
                this.setState({
                    username1: '',
                    password1: '',
                    message: `Welcome ${response.data[3]}!`, 
                })
            }
            else{
                this.setState({
                    username: "",
                    password: "",
                    message: "Failed to login, please try again"
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
        event.preventDefault()
    }


    render(){
        return(
            <div className='auth-wrapper'>
            <h1 className='message' style={{ height: "50px", width: "100%" }}>{this.state.message}</h1>
            <div className="forms-wrapper">
                    <div className="left-side">
                        <form onSubmit={this.handleLogin}>
                        <h1>Login</h1>
                            <input onChange={this.handleChange} type="username" name='username1' placeholder='your username' value={this.state.username1} />
                            <input onChange={this.handleChange} type="password" name='password1' placeholder='your password' value={this.state.password1} />
                            <button type='submit'>login</button>
                        </form>
                    </div>
                    <div className="right-side">
                        <form onSubmit={this.createAccount}>
                            <h1>Create Account</h1>
                            <input onChange={this.handleChange} type="username" name='username2' placeholder='username' value={this.state.username2} />
                            <input onChange={this.handleChange} type="password" name='password2' placeholder='password' value={this.state.password2} />
                            <input onChange={this.handleChange} type="email" name='email' placeholder='email' value={this.state.email} />
                            <button type='submit'>Create Account</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}