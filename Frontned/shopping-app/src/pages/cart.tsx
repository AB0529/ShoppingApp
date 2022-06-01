import { useEffect } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { updateCart } from "../auth/api/updateUser";
import { IItem, IUser } from "../auth/Typings";
import { removeFromCart, setUser } from "../auth/UserService";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { useStickyState } from "../state/stickyState";

function ShoppingCart() {
	const [user] = useStickyState(null, 'user');
	const navigate = useNavigate();

	if (!user)
		navigate('/login');

	let total = 0;
	const counts: any = {};

	user.cart.forEach((i: IItem) => {
		let c = counts[i.name] ? counts[i.name].count : 0;

		counts[i.name] = {
			count: c + 1,
			item: i
		};
	});

	const orderTable = (
		<Table bordered hover>
			<thead>
				<tr>
					<th />
					<th>Count</th>
					<th>Name</th>
					<th>Description</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{user && Object.keys(counts).map((k: string) => {
					let item = counts[k].item;
					total += item.deal ? item.newPrice : item.price;

					return (
						<tr>
							<td valign="middle" align="center" width={50}>
								<Button variant="danger" size="sm" onClick={() => {
									removeFromCart(item);
								}}>
									<AiFillDelete size={25} />
								</Button>
							</td>
							<td valign="middle" align="center">
								<h5>x<strong>{counts[k].count}</strong></h5>
							</td>
							<td valign="middle" align="center" width={125}>
								<img
									className="item-img"
									src={item.image}
									width="64"
									height="64"
									alt="item-img"
								/>
								<h5>{item.name} <strong></strong></h5>
							</td>
							<td>
								<h5>{item.description}</h5>
							</td>
							<td width={100}>
								<h5>{item.deal ? (
									<div>
										<span className="dealPrice" style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'red' }}>${item.price.toFixed(2)}</span>{' '}<span style={{ color: 'green' }}>${item.newPrice.toFixed(2)}</span>
									</div>
								) : (<span style={{color: 'green'}}>${(item.price * counts[k].count).toFixed(2)}</span>)}</h5>
							</td>
						</tr>
					)
				})
				}
				<tr>
					<td>
						<Button variant="success" onClick={() => {
							navigate('/checkout');
 						}}>Checkout</Button>
					</td>
					<td />
					<td />
					<td />
					<td>Total: ${total.toFixed(2)}</td>

				</tr>
			</tbody>
		</Table>
	)

	return (
		<>
			<Bar />
			<Title title="Your Order" color="#c4ad37" />
			<Container fluid>
				{user && (user as IUser).cart.length > 0 ? (
					(
						<Container fluid>
							{orderTable}
						</Container>
					)) : (
					<Container fluid className="d-flex align-items-center justify-content-center">
						<Card style={{ width: '18rem' }}>
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
			<Footer className="footer" />
		</>
	)
}

export default ShoppingCart;