import { Col, Container, Row } from "react-bootstrap";
import Bar from "../../components/Bar";
import Title from "../../components/Title";
import { AddItemForm } from "./addItemForm";
import { DeleteItemForm } from "./deleteItemForm";

function AdminPage() {
	return (
		<>
			<Bar />
			<Title title="Admin" color="#fc0339"/>
			<Container fluid>
				<Row className="edit-cards">
					<Col>
						<AddItemForm />
					</Col>
					<Col>
						<DeleteItemForm />
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default AdminPage;