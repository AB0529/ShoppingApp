import { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { IItem } from "../auth/Typings";
import Countdown, { zeroPad } from 'react-countdown';
import config from "../config/config";
import Title from "./Title";
import { BsFillLightningChargeFill } from "react-icons/bs";
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
	const [show, setShow] = useState(false);
	const [cartCount] = useGlobalState('cartCount');
	const [added, setAdded] = useState(false);

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
			<Container fluid>
				{
					
				}
				
				<Countdown
					date={Date.now() + TIMER}
					key={complted}
					zeroPadTime={2}
					onComplete={() => {
						changeItems();
						setCompleted(1);
					}}
					renderer={({ minutes, seconds }) => (
						<h5>
							<BsFillLightningChargeFill /> {zeroPad(minutes)}:{zeroPad(seconds)}
						</h5>
					)}
				/>
				{items.map(item => {
					const oldPrice = item.price;
					const newPrice = item.price * 0.5;

					return (
						<div>
							<Card>
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
									<Button variant='secondary' disabled={added} onClick={() => {
										if (!user)
											navigate('/login');

										setAdded(true);
										item.deal = true;
										item.price = newPrice;
										user.cart.push(item);
										updateCart(user.cart, user.userID).then((user) => {
											setUser(user);
											setGlobalState('cartCount', cartCount + 1);
											handleShow();
										}).catch(e => console.error(`CartItems: ${e}`));
									}}>Add to Cart</Button>
								</Card.Footer>
							</Card>
						</div>
					)
				})}
			</Container>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center" >
					<h5>Item added to cart</h5>
					<Cart />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default LightningDeals;