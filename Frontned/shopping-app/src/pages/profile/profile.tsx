import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";

import { useStickyState } from "../../state/stickyState";
import { UsernameCardForm } from "./usernameForm";

import { NameCardForm } from "./nameForm";
import { AddressCardForm } from "./addressForm";
import { CreditCardForm } from "./creditCardForm";
import Title from "../../components/Title";

function Profile() {
	const [user] = useStickyState(null, 'user');
	const navigate = useNavigate();

	if (!user)
		navigate(-1);

	return (
		<>
			<Bar />
			<Title title="Edit Profile" color="#52a352" />
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