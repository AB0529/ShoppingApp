import { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { IItem } from "../auth/Typings";
import Countdown, { zeroPad } from 'react-countdown';
import config from "../config/config";
import Title from "./Title";
import { BsFillLightningChargeFill, BsInfoCircle } from "react-icons/bs";
import Cart from "./Cart";
import { useStickyState } from "../state/stickyState";
import { useNavigate } from "react-router-dom";
import { updateCart } from "../auth/api/updateUser";
import { setUser } from "../auth/UserService";
import { setGlobalState, useGlobalState } from "../state/globalState";

function LightningDeals() {
	const TIMER = 10e3;
	const navigate = useNavigate();
	const [user] = useStickyState(null, 'user');
	const [items, setItems] = useState<Array<IItem>>([]);
	const [complted, setCompleted] = useState(0);
	const [cartCount] = useGlobalState('cartCount');
	const [added, setAdded] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getItems = () => {
		fetch(`${config.apiURL}/items/random/3`).then(resp => resp.json()).then((data) => {
			setItems(data.result);
		}).catch((e) => console.error(`Error getting all items: ${e}`));
	}
	useEffect(() => {
		getItems();
	}, []);

	const changeItems = () => {
		fetch(`${config.apiURL}/items/random/3`).then(resp => resp.json()).then((data) => {
			setItems(data.result);
		}).catch((e) => console.error(`Error getting all items: ${e}`));
	}

	return (
		<>
			<Title title="Lightning Deals" color="#a83281" />
			<Countdown
				date={Date.now() + TIMER}
				key={complted}
				onComplete={() => {
					changeItems();
					setCompleted(1);
				}}
				onStart={() => {
					setCompleted(0);
				}}
				renderer={({ minutes, seconds }) => (
					<h5>
						<BsFillLightningChargeFill /> {zeroPad(minutes)}:{zeroPad(seconds)}
						<Button style={{ paddingBottom: 11 }} variant="link" onClick={handleShow}><BsInfoCircle/></Button>
					</h5>
				)}
			/>
			<Container fluid className="d-flex justify-content-center align-items-center">
				{items.map(item => {
					const oldPrice = item.price;
					const newPrice = item.price * 0.5;

					return (
						<div>
							<Card style={{ height: '20rem' }}>
								<Card.Title>{item.name}</Card.Title>
								<Card.Header>
									DEAL: <span className="dealPrice" style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'red' }}>${oldPrice}</span>{' '}<span style={{ color: 'green' }}>${newPrice}</span>
								</Card.Header>
								<Card.Body>
									<Card.Text>
										<img src={item.image} width={64} height={64} /> {item.description}
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<Button variant='success' disabled={added} onClick={() => {
										if (!user)
											navigate('/login');

										updateCart(user.cart, user.userID).then((user) => {
											user.cart.push(item);
											item.deal = true;
											item.newPrice = newPrice;
											setUser(user);
											setGlobalState('cartCount', cartCount + 1);
											setAdded(true);
											navigate('/cart');
										}).catch(e => console.error(`CartItems: ${e}`));
									}}>Buy</Button>
								</Card.Footer>
							</Card>
						</div>
					)
				})}
			</Container>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Lightning Deals</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Lightning deals are special deals where normal items are heavily discoutned.
					<br />
					<br />
					You may only have one lightning deal per session, and must buy it right away.
					If you add a another item while you have a lightning deal in your cart, the deal will revert to it's normal price.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Got it
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default LightningDeals;