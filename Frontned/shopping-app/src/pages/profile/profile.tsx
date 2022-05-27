import { ErrorMessage, Field, Formik, Form } from "formik";
import { Button, Card, Col, Container, Row, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Bar from "../../components/Bar";

import * as Yup from 'yup';
import './profile.scss';
import Footer from "../../components/Footer";
import { updateUsername } from "../../auth/api/updateUser";
import { IUser } from "../../auth/Typings";
import { useStickyState } from "../../state/stickyState";

// TODO: SUEPR BUGGY, FIX
function Profile() {
    const [user, setUser] = useStickyState(null, 'user');
	const navigate = useNavigate();

	if (!user)
		navigate(-1);

	return (
		<>
			
		</>
	)
}

export default Profile;