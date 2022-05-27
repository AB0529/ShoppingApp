import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { IItem, ITag } from "../auth/Typings";
import config from "../config/config";

function Items() {
	const [items, setItems] = useState<Array<IItem>>([]);
	const [filteredItems, setFilteredItems] = useState<Array<IItem>>([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSearch = (event: any, v: string|null) => {
		let value = v ? v : event.target.value.toLowerCase();
		let result = [];
		
		result = items.filter((item: IItem) => {
			let query = item.tags.map((tag: ITag) => tag.tag).join('!').toLowerCase();
			query += item.name.toLowerCase();
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
			<div className="d-flex align-items-center justify-content-center">
				<h1 className="title">
					<strong> Explore our Items </strong>
					<hr className="title-line" style={{ borderColor: "#42f554" }} />
					<Form>
					<FormControl
						id="searchBar"
						type="text"
						placeholder="Search"
						className="me-2"
						aria-label="Search"
						onChange={(event) => handleSearch(event, null)}
					/>
				</Form>
				</h1>
			</div>

			<Container>
				<Row md="auto" className="d-flex align-items-center justify-content-center">
					{filteredItems ? filteredItems.map((item: IItem) => {
						return (
							<Col sm={4} py={2}>
								<Card className="item-card d-flex align-items-center justify-content-center" style={{ width: '18rem', height: '50rem' }}>
									<Card.Header> <strong>{item.name}</strong> </Card.Header>
									<Card.Img variant="top" src={item.image} />
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
									<Button variant="secondary">Add to Cart</Button>
								</Card>
							</Col>
						)
					}) : (
						<h1>Loading...</h1>
					)}
				</Row>
			</Container>
		</Container >
	)
}

export default Items;