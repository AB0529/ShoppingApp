import { Col, Container, Row, Table } from "react-bootstrap";
import { authenticationService } from "../../auth/AuthService";
import Bar from "../../components/Bar";
import Footer from "../../components/Footer";

import "./cart.scss";

function ShoppingCart() {
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
				{
					authenticationService.currentUserValue?.cart.items.map(item => {
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
				{authenticationService.currentUserValue?.cart ? (
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