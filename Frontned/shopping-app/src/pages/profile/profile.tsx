import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authenticationService } from "../../auth/AuthService";
import Bar from "../../components/Bar";

import './profile.scss';

function Profile() {
	const user = authenticationService.currentUserValue;
	const navigate = useNavigate();

	if (!user)
		navigate(-1);

	return (
		<>
			<Bar />
			<Container fluid>
				<h1>{user?.userName.toUpperCase()}</h1>
			</Container>
		</>
	)
}

export default Profile;