import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username1: "",
			username2: "",
			username3: "",
			password1: "",
			password2: "",
			password3: "",
			message: "",
			email: "",
			email2: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.createAccount = this.createAccount.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}

	updatePassword(event) {
		axios
			.put(
				`https://svp-capstone-back.herokuapp.com/user/update/${this.state.username3}/${this.state.email2}`,
				{
					password: this.state.password3,
				}
			)
			.then((res) => {
				if (res.data[1] === "user was updated")
					this.setState({
						message: "password was updated",
						password3: "",
						email2: "",
						username3: "",
					});
				else {
					this.setState({
						message: "couldnt find that user",
						password3: "",
						email2: "",
						username3: "",
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
		event.preventDefault();
	}

	createAccount(event) {
		if (
			this.state.email == "" ||
			this.state.password == "" ||
			this.state.username == ""
		) {
			this.setState({
				message: "please fill out all the fields",
			});
		} else {
			axios
				.post("https://svp-capstone-back.herokuapp.com/signup", {
					username: this.state.username2,
					password: this.state.password2,
					email: this.state.email,
				})
				.then((response) => {
					if (
						response.data == "please pick a different username" ||
						response.data == "please choose a different email"
					) {
						this.setState({
							message: response.data,
						});
					} else {
						this.props.successfulLogin(),
							this.setState({
								message: "welcome! thanks for creating an account with us",
							});
					}
				})
				.catch((error) => {
					console.log(errror);
				});
		}
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleLogin(event) {
		{
			this.state.username1 === "" && this.state.password1 === ""
				? this.setState({
						message: "please enter your credentials",
				  })
				: axios({
						method: "post",
						url: "https://svp-capstone-back.herokuapp.com/user/verify",
						data: {
							username: this.state.username1,
							password: this.state.password1,
						},
				  })
						.then((response) => {
							if (response.data[0] === "user was verified") {
								this.props.successfulLogin(response.data[2]);
								this.setState({
									username1: "",
									password1: "",
									message: `Welcome ${response.data[3]}!`,
								});
							} else {
								this.setState({
									username: "",
									password: "",
									message: "Failed to login, please try again",
								});
							}
						})
						.catch((error) => {
							console.log(error);
						});
			event.preventDefault();
		}
	}

	render() {
		return (
			<div className="auth-wrapper">
				<h1 className="message" style={{ height: "50px", width: "100%" }}>
					{this.state.message}
				</h1>
				<div className="forms-wrapper">
					<div className="left-side">
						<form onSubmit={this.handleLogin}>
							<h1>Login</h1>
							<input
								onChange={this.handleChange}
								type="username"
								name="username1"
								placeholder="your username"
								value={this.state.username1}
							/>
							<input
								onChange={this.handleChange}
								type="password"
								name="password1"
								placeholder="your password"
								value={this.state.password1}
							/>
							<button type="submit">login</button>
						</form>
					</div>
					<div className="right-side">
						{this.state.message !== "Failed to login, please try again" ||
						this.state.message !== "couldnt find that user" ? (
							<form onSubmit={this.createAccount}>
								<h1>Create Account</h1>
								<input
									onChange={this.handleChange}
									type="username"
									name="username2"
									placeholder="username"
									value={this.state.username2}
								/>
								<input
									onChange={this.handleChange}
									type="password"
									name="password2"
									placeholder="password"
									value={this.state.password2}
								/>
								<input
									onChange={this.handleChange}
									type="email"
									name="email"
									placeholder="email"
									value={this.state.email}
								/>
								<button type="submit">Create Account</button>
							</form>
						) : (
							<form onSubmit={this.updatePassword}>
								<h1>Reset Password</h1>
								<input
									onChange={this.handleChange}
									type="username"
									name="username3"
									placeholder="username"
									value={this.state.username3}
								/>
								<input
									onChange={this.handleChange}
									type="email"
									name="email2"
									placeholder="email"
									value={this.state.email2}
								/>
								<input
									onChange={this.handleChange}
									type="password"
									name="password3"
									placeholder="new password"
									value={this.state.password3}
								/>
								<button type="submit">Update Password</button>
							</form>
						)}
					</div>
				</div>
			</div>
		);
	}
}
