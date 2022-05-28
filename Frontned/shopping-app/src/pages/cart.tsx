import { Button, Card, Container, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { updateCart } from "../auth/api/updateUser";
import { IItem, IUser } from "../auth/Typings";
import { removeFromCart, setUser } from "../auth/UserService";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
import { useStickyState } from "../state/stickyState";

function ShoppingCart() {
	const navigate = useNavigate();
	const [user] = useStickyState(null, 'user');
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
				{user && user.cart.map((item: IItem) => {
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
				<Button variant="success" onClick={() => {
					// Clears user cart
					updateCart([], user.userID).then((user) => {
						setUser(user);
						navigate('/checkout');
					}).catch(e => console.error(`Checkout: ${e}`));
				}}>Checkout</Button>
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
					<Container fluid className="d-flex align-items-center justify-content-center">
						<Card style={{width: '18rem'}}>
							<Card.Body>
								<Card.Text className="d-flex align-items-center justify-content-center">
									<h5>It's empty...</h5>
								</Card.Text>
								<Button className="d-flex align-items-center justify-content-center" variant="success" href="/catalog">Browse Wares</Button>
							</Card.Body>
						</Card>
					</Container>
				)
				}
			</Container>
			<Footer />
		</>
	)
}

export default ShoppingCart;