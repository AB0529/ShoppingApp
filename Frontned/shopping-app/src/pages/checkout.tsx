import { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { AiFillCreditCard, AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { updateCart, updateUser } from "../auth/api/updateUser";
import { ICard, IItem } from "../auth/Typings";
import { setUser } from "../auth/UserService";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { useStickyState } from "../state/stickyState";
import Shipping from "./shipping";

function Checkout() {
	const [user] = useStickyState(null, 'user');
	const [error1, setError1] = useState('');
	const [error2, setError2] = useState('');
	const [show, setShow] = useState(<></>);
	const navigate = useNavigate();
	let total = 0;

	if (!user)
		navigate(-1);

	const payment: ICard = user.card;
	const address = user.address;
	const cart: Array<IItem> = user.cart;

	const preCheckout = (
		<>
			<Bar />
			<Title title="Checkout" color="blue" />

			<Container fluid className="d-flex align-items-center justify-content-center">
				<Card className={error1} style={{ width: '18rem', height: '15rem' }}>
					<Card.Header>Payment</Card.Header>
					<Card.Body>
						<Card.Text className="d-flex align-items-center justify-content-center">
							{
								payment ? (
									<h5> <AiFillCreditCard /> Card ending in <strong>{payment.cardNumber.slice(-3)}</strong></h5>
								) : (
									<h5>Uh oh.. you have no card added!</h5>
								)
							}
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Button className="d-flex align-items-center justify-content-center" variant="success" href="/profile">{payment ? 'Edit Card' : 'Add Card'}</Button>
					</Card.Footer>
				</Card>
				<Card className={error2} style={{ height: '15rem' }}>
					<Card.Header>Address</Card.Header>
					<Card.Body>
						<Card.Text className="d-flex align-items-center justify-content-center">
							{
								address.length ? (
									<h5> <AiFillHome /> {address}</h5>
								) : (
									<h5>Uh oh.. you have no address added!</h5>
								)
							}
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Button className="d-flex align-items-center justify-content-center" variant="success" href="/profile">{address ? 'Edit Address' : 'Add Address'}</Button>
					</Card.Footer>
				</Card>

			</Container>
			<br />
			<Container>
				<Table bordered hover size="sm">
					<thead>
						<tr>
							<th>Item</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{cart && cart.map(i => {
							total += i.price;

							return (
								<tr>
									<td width={15}>{i.name}</td>
									<td width={15} style={{ color: 'green' }}>${i.price.toFixed(2)}</td>
								</tr>
							)
						})}
						<tr>
							<td />
							<td width={50}>
								<span>Total: ${total.toFixed(2)}</span>
							</td>
						</tr>
					</tbody>
				</Table>

				<Button variant="success" onClick={() => {
					if (!payment) {
						setError1('error-border');
						return;
					}
					if (!address) {
						setError2('error-border');
						return;
					}

					if (cart.length <= 0) {
						navigate('/catalog');
						return;
					}

					// Clear cart
					updateCart([], user.userID).then(u => {
						updateUser(u);
						setUser(u);
						setShow(<Shipping />);
					}).catch(e => console.error(`Checkout: ${e}`));
				}}>Checkout</Button>
			</Container>
		</>
	)

	useEffect(() => {
		console.log(address);
		setShow(preCheckout);
	}, []);

	return (
		<>
			{show}
			<Footer className="footer" />
		</>
	)
}

export default Checkout;