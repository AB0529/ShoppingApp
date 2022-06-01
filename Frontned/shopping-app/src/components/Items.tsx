import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, Modal, Row } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getItemByID } from "../auth/api/getItemByID";
import { IItem, ITag, IUser } from "../auth/Typings";
import config from "../config/config";
import { useStickyState } from "../state/stickyState";
import Title from "./Title";
import { setGlobalState, useGlobalState } from "../state/globalState";
import { updateCart } from "../auth/api/updateUser";
import { setUser } from "../auth/UserService";
import Cart from "./Cart";
import { deleteItem } from "../auth/api/deleteItem";

function Items() {
	const [items, setItems] = useState<Array<IItem>>([]);
	const [filteredItems, setFilteredItems] = useState<Array<IItem>>([]);
	const [searchParams] = useSearchParams();
	const [show, setShow] = useState(false);
	const [user] = useStickyState(null, 'user');
	const navigate = useNavigate();
	const [cartCount] = useGlobalState('cartCount');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSearch = (event: any, v: string | null) => {
		let value = v ? v : event.target.value.toLowerCase();
		let result = [];

		result = items.filter((item: IItem) => {
			let query = item.tags.map((tag: ITag) => tag.tag).join('!').toLowerCase();

			if (item.name)
				query += item.name.toLowerCase();
			else if (item.description)
				query += item.description.toLowerCase();

			return query.includes(value.toLowerCase());
		});

		setFilteredItems(result);
	}


	useEffect(() => {
		fetch(`${config.apiURL}/items/all`).then(resp => resp.json()).then((data) => {
			setItems(data.result);
			setFilteredItems(data.result);
		}).catch((e) => console.error(`Error getting all items: ${e}`));
	}, [])

	useEffect(() => {
		if (searchParams.get('query'))
			handleSearch(null, searchParams.get('query'))
	});

	return (
		<Container fluid>
			<Title title="Explore Our Items" color="#42f554" />

			<Container>
				<div className="d-flex align-items-center justify-content-center">
					<Form className="w-30">
						<FormControl
							id="searchBar"
							type="text"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							onChange={(event) => handleSearch(event, null)}
						/>
					</Form>
				</div>
				<Row md="auto" className="d-flex align-items-center justify-content-center">
					{filteredItems ? filteredItems.map((item: IItem) => {
						return (
							<Col sm={4} py={2}>
								<Card className="item-card d-flex align-items-center justify-content-center" style={{ width: '18rem', height: '38rem' }}>
									<Card.Header className="item-title"> {user && config.adminIDs.indexOf(user.userID) !== -1 && (
										<span>#{item.itemID}</span>
									)} <strong>{item.name}</strong><br /> </Card.Header>
									<Card.Header><span style={{color: 'green'}}><strong>${item.price.toFixed(2)}</strong></span></Card.Header>
									<Card.Img className="item-img" height={512} variant="top" src={item.image} alt={item.name} />
									<Card.Body>
										<Card.Subtitle>{item.description}</Card.Subtitle>
									</Card.Body>
									<Card.Footer>
										<ul className="tags">
											{item.tags.map((tag) => {
												return (
													<li> <a className="tag"> {tag.tag} </a> </li>
												)
											})}
										</ul>

									</Card.Footer>
									<Button variant="secondary" onClick={async () => {
										if (!user)
											navigate('/login');

										getItemByID(item.itemID).then(i => {
											user.cart.push(i);
											updateCart(user.cart, user.userID).then((user) => {
												setUser(user);
												setGlobalState('cartCount', cartCount + 1);
												handleShow();
											}).catch(e => console.error(`CartItems: ${e}`));
										}).catch(e => console.error(`CartItemsGetItem: ${e}`));
									}}>Add to Cart</Button>
									{user && config.adminIDs.indexOf(user.userID) !== -1 && (
										<Button variant="danger" onClick={() => {
											deleteItem(item.itemID).then(() => {
												if (user.cart.filter((i: IItem) => i.itemID == item.itemID ).length > 0) {
													user.cart.splice(user.cart.indexOf(item), 1);
													updateCart(user.cart, user.userID).then((user) => {
														setUser(user);
														setGlobalState('cartCount', cartCount + 1);
														handleShow();
													}).catch(e => console.error(`CartItems: ${e}`));
												}
												window.location.reload();
											}).catch(e => console.error(`CartItemsDeleteItem: ${e}`));
										}}>Delete</Button>
									)}
								</Card>
							</Col>
						)
					}) : (
						<h1>Loading...</h1>
					)}
				</Row>
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
		</Container >
	)
}

export default Items;