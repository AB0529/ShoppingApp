import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";

import { useStickyState } from "../../state/stickyState";
import { UsernameCardForm } from "./usernameForm";

import './profile.scss';
import { NameCardForm } from "./nameForm";
import { AddressCardForm } from "./addressForm";
import { CreditCardForm } from "./creditCardForm";

function Profile() {
	const [user] = useStickyState(null, 'user');
	const navigate = useNavigate();

	if (!user)
		navigate(-1);

	return (
		<>
			<Bar />
			<div className="d-flex align-items-center justify-content-center">
				<h1 className="title">
					<strong> Edit Profile </strong>
					<hr className="title-line" style={{ borderColor: "#52a352" }} />
				</h1>
			</div>
			<Container fluid>
				<Row className="edit-cards">
					<Col>
						<UsernameCardForm user={user} />
					</Col>
					<Col>
						<NameCardForm user={user} />
					</Col>
					<Col>
						<AddressCardForm user={user} />
					</Col>
					<Col>
						<CreditCardForm user={user} />
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Profile;