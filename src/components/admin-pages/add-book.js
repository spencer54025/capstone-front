import React, { Component } from "react";
import axios from "axios";

export default class AddBook extends Component {
	constructor() {
		super();

		this.state = {
			title: "",
			author: "",
			genre: "",
			price: "",
			summary: "",
			img: "",
			message: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.addBook = this.addBook.bind(this);
	}

	addBook(event) {
		if (
			this.state.title == "" ||
			this.state.author == "" ||
			this.state.genre == "" ||
			this.state.price.isInteger == false ||
			this.state.summary == "" ||
			this.state.img == ""
		) {
			this.setState({
				message: "all fields need to be filled and price only contains numbers",
			});
		} else {
			let book = [];
			book["title"] = this.state.title;
			book["author"] = this.state.author;
			book["genre"] = this.state.genre;
			book["price"] = this.state.price;
			book["img"] = this.state.img;
			book["summary"] = this.state.summary;
			this.props.updateBooks(book);

			axios
				.post("https://svp-capstone-back.herokuapp.com/book/add", {
					title: this.state.title,
					author: this.state.author,
					genre: this.state.genre,
					price: this.state.price,
					img: this.state.img,
					summary: this.state.summary,
				})
				.then((res) => {
					this.setState({
						title: "",
						author: "",
						genre: "",
						price: "",
						summary: "",
						img: "",
					});
					return res;
				})
				.catch((error) => {
					console.log(error);
				});
		}
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		return (
			<div>
				<h1 style={{ width: "100%", height: "50px" }}>{this.state.message}</h1>
				<form onSubmit={this.addBook} className="form-wrapper">
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={this.state.title}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="author"
						placeholder="Author"
						value={this.state.author}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="genre"
						placeholder="Genre"
						value={this.state.genre}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="price"
						placeholder="Price"
						value={this.state.price}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="img"
						placeholder="Image URL"
						value={this.state.img}
						onChange={this.handleChange}
					/>
					<textarea
						type="text"
						placeholder="Summary"
						name="summary"
						value={this.state.summary}
						onChange={this.handleChange}
					></textarea>
					<button className="btn">Save</button>
				</form>
			</div>
		);
	}
}
