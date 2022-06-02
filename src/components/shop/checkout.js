import React, { Component } from "react";
import { v4 } from "uuid";

export default class Checkout extends Component {
	constructor() {
		super();
	}

	render() {
		let orderNum = v4();
		return (
			<div className="checkout-page-container">
				<h1>Thank you for shopping with us!</h1>
				<br />
				<h2>Your order code is {orderNum.slice(0, 12)}</h2>
			</div>
		);
	}
}
