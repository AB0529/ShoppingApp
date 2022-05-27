import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { IUser } from "../../auth/Typings";
import Bar from "../../components/Bar";
import Footer from "../../components/Footer";
import { useStickyState } from "../../state/stickyState";

import "./cart.scss";

function ShoppingCart() {
	const [user, setUser] = useStickyState(null, 'user');

	const orderTable = (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{user && (user as IUser).cart.map(item => {
						return (
							<tr>
								<td>{item.name}</td>
							</tr>
						)
					})
				}
			</tbody>
		</Table>
	)

	return (
		<>
			<Bar />
			<div className="d-flex align-items-center justify-content-center">
				<h1 className="title">
					<strong> Shopping Cart  </strong>
					<hr className="title-line" style={{ borderColor: "#c4ad37" }} />
				</h1>
			</div>
			<h5 className="order-text">Your Order:</h5>
			<Container fluid>
				{user && (user as IUser).cart.length > 0 ? (
					(
						<div>
							{orderTable}
						</div>
					)) : (
					<h1>No order</h1>
				)
				}
			</Container>
			<Footer />
		</>
	)
}

export default ShoppingCart;