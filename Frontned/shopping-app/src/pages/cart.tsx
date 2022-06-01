import { useEffect, useState } from "react";
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
	const [counts, setCounts] = useState({});
	const navigate = useNavigate();

	if (!user)
		navigate('/login');

	let total = 0;
	useEffect(() => {
		updateCart(user.cart, user.userID).then(u => {
			let _counts: any = {};
			setUser(u);
			user.cart.forEach((i: IItem) => {
				let c = _counts[i.name] ? _counts[i.name].count : 0;

				_counts[i.name] = {
					count: c + 1,
					item: i
				};
			});
			setCounts(_counts);
		}).catch(e => console.error(`UpdateCart: ${e}`));
	}, []);

	return (
		<>
			<Bar />
			<Title title="Your Order" color="#c4ad37" />
			<Container fluid>
				{user && user.cart.length > 0 ? (
					(
						<Container fluid>
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
										let item: any = (counts as any)[k].item;
										
										if (!item)
											return;

										total += item.deal ? item.newPrice : item.price * (counts as any)[k].count;
										
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
													<h5>x<strong>{(counts as any)[k]?.count}</strong></h5>
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
													) : (<span style={{ color: 'green' }}>${item.price * (counts as any)[k].count}</span>)}</h5>
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