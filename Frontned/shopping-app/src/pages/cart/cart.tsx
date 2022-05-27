import { Button, Container, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai"
import { IUser } from "../../auth/Typings";
import { removeFromCart } from "../../auth/UserService";
import Bar from "../../components/Bar";
import Footer from "../../components/Footer";
import { useStickyState } from "../../state/stickyState";

import "./cart.scss";

function ShoppingCart() {
	const [user, setUser] = useStickyState(null, 'user');
	let total = 0;

	const orderTable = (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th />
					<th>Name</th>
					<th>Description</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{user && (user as IUser).cart.map(item => {
					total += item.price;

					return (
						<tr>
							<td valign="middle" align="center" width={50}>
								<Button variant="danger" size="sm" onClick={() => {
									removeFromCart(item);
								}}>
									<AiFillDelete size={25} />
								</Button>
							</td>
							<td valign="middle" align="center" width={100}>
								<img
									className="item-img"
									src={item.image}
									width="64"
									height="64"
									alt="item-img"
								/>
								<h5>{item.name}</h5>
							</td>
							<td>
								<h5>{item.description}</h5>
							</td>
							<td width={100}>
								<h5>${item.price}</h5>
							</td>
						</tr>
					)
				})
				}
				<tr>
					<td />
					<td />
					<td />
					<td>Total: ${total}</td>

				</tr>
				<Button variant="success">Checkout</Button>
			</tbody>
		</Table>
	)

	return (
		<>
			<Bar />
			<div className="d-flex align-items-center justify-content-center">
				<h1 className="title">
					<strong> Your Order  </strong>
					<hr className="title-line" style={{ borderColor: "#c4ad37" }} />
				</h1>
			</div>
			<Container fluid>
				{user && (user as IUser).cart.length > 0 ? (
					(
						<Container fluid>
							{orderTable}
						</Container>
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