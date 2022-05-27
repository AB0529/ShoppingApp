import { ErrorMessage, Field, Formik, Form } from "formik";
import { Button, Card, Col, Container, Row, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authenticationService } from "../../auth/AuthService";
import Bar from "../../components/Bar";

import * as Yup from 'yup';
import './profile.scss';
import Footer from "../../components/Footer";

// TODO: SUEPR BUGGY, FIX
function Profile() {
	const user = authenticationService.currentUserValue;
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
				{/* <Username> */}
				<Row className="edit-cards">
					<Col>
						<Card style={{ width: '18rem', height: '25rem' }}>
							<Card.Body>
								<Card.Title>Username</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Edit your username, you'll use this to login.</Card.Subtitle>
								<Card.Text>
									<Formik
										initialValues={{
											username: user?.userName,
										}}
										validationSchema={Yup.object().shape({
											username: Yup.string().required('Username is required'),
										})}
										onSubmit={async ({ username }, { setStatus, setSubmitting }) => {
											setStatus();
											setSubmitting(true);
											authenticationService.updateUsername(username as string)
											.then((resp: any) => {
												console.log(resp);
											}).catch((e: any) => {
												setSubmitting(false);
												setStatus(e);
											});
										}}
									
										render={({ errors, status, touched, isSubmitting }) => (
											<Form>
												<FormGroup>
													<Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
													<ErrorMessage name="username" component="div" className="invalid-feedback" />
												</FormGroup>
												<FormGroup>
													<br />
													<Button type="submit" variant="success" disabled={isSubmitting}>Submit</Button>
													{isSubmitting && <img src="/loading.gif" alt="loading" />}
												</FormGroup>
												{status && <div className={'alert alert-danger'}>{status}</div>}
											</Form>
										)}
									>

									</Formik>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				{/* </Row> */}
				{/* </Username> */}
				{/* <Name> */}
				{/* <Row> */}
					<Col>
						<Card style={{ width: '18rem', height: '25rem' }}>
							<Card.Body>
								<Card.Title>Name</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Edit your first and last name.</Card.Subtitle>
								<Card.Text>
									<Formik
										initialValues={user?.name !== null ? {
											firstName: user?.name.firstName,
											lastName: user?.name.lastName,
										} : {
											firstName: '',
											lastName: ''
										}}
										validationSchema={Yup.object().shape({
											firstName: Yup.string().required('First name is required'),
											lastName: Yup.string().required('Last name is required'),
										})}
										onSubmit={({ firstName, lastName }, { setStatus, setSubmitting }) => {
											setStatus();
											console.log('Change Name');
										}}
										render={({ errors, status, touched, isSubmitting }) => (
											<Form>
												<FormGroup>
													<Field placeholder="First name" name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
													<ErrorMessage name="firstName" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<Field placeholder="Last name" name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
													<ErrorMessage name="lastName" component="div" className="invalid-feedback" />
												</FormGroup>
												<FormGroup>
													<br />
													<button type="submit" className="btn btn-success" disabled={isSubmitting}>Submit</button>
													{isSubmitting && <img src="/loading.gif" alt="loading" />}
												</FormGroup>
												{status && <div className={'alert alert-danger'}>{status}</div>}
											</Form>
										)}
									>

									</Formik>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				{/* </Row> */}
				{/* </Name> */}
				{/* <Address> */}
				{/* <Row> */}
					<Col>
						<Card style={{ width: '18rem', height: '25rem' }}>
							<Card.Body>
								<Card.Title>Address</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Edit your address information.</Card.Subtitle>
								<Card.Text>
									<Formik
										initialValues={user?.address !== null ? {
											street: user?.address.street,
											city: user?.address.city,
											state: user?.address.state,
											zipcode: user?.address.zipcode
										} : {

											street: '',
											city: '',
											state: '',
											zipcode: ''
										}}
										validationSchema={Yup.object().shape({
											street: Yup.string().required('Street name is required'),
											city: Yup.string().required('City is required'),
											state: Yup.string().required('State is required'),
											zipcode: Yup.number().required('Zipcode is required').typeError('Zipcode must be a number'),
										})}
										onSubmit={({ street, city, state, zipcode }, { setStatus, setSubmitting }) => {
											setStatus();
											console.log('Change address');
										}}
										render={({ errors, status, touched, isSubmitting }) => (
											<Form>
												<FormGroup>
													<Field placeholder="Enter street" name="street" type="text" className={'form-control' + (errors.street && touched.street ? ' is-invalid' : '')} />
													<ErrorMessage name="street" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<Field placeholder="Enter city" name="street" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
													<ErrorMessage name="city" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<Field placeholder="Enter State" name="state" type="text" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} />
													<ErrorMessage name="state" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<Field placeholder="Enter zipcode" name="zipcode" type="text" className={'form-control' + (errors.zipcode && touched.zipcode ? ' is-invalid' : '')} />
													<ErrorMessage name="zipcode" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<br />
													<button type="submit" className="btn btn-success" disabled={isSubmitting}>Submit</button>
													{isSubmitting && <img src="/loading.gif" alt="loading" />}
												</FormGroup>
												{status && <div className={'alert alert-danger'}>{status}</div>}
											</Form>
										)}
									>
									</Formik>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				{/* </Row> */}
				{/* </Address> */}
				{/* <Card> */}
				{/* <Row> */}
					<Col>
						<Card style={{ width: '18rem', height: '25rem' }}>
							<Card.Body>
								<Card.Title>Card</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Edit your card information.</Card.Subtitle>
								<Card.Text>
									<Formik
										initialValues={user?.card !== null ? {
											cardNumber: user?.card.cardNumber,
											expiration: user?.card.expiration,
											type: user?.card.type,
											cvc: user?.card.cvc
										} : {

											cardNumber: '',
											expiration: '',
											type: '',
											cvc: ''
										}}
										validationSchema={Yup.object().shape({
											cardNumber: Yup.number().required('Card number is required').typeError('Must be a number'),
											expiration: Yup.string().typeError('Not a valid expiration date. Example: MM/YY')
												.max(5, 'Not a valid expiration date. Example: MM/YY')
												.matches(
													/([0-9]{2})\/([0-9]{2})/,
													'Not a valid expiration date. Example: MM/YY'
												)
												.required('Expiration date is required'),
											type: Yup.string().required('Type is required'),
											cvc: Yup.number().required('CVC is requried').typeError('Must be a number'),
										})}
										onSubmit={({ cardNumber, expiration, type, cvc }, { setStatus, setSubmitting }) => {
											setStatus();
											console.log('Change card');
										}}
										render={({ errors, status, touched, isSubmitting }) => (
											<Form>
												<FormGroup>
													<Field placeholder="Enter card number" name="cardNumber" type="text" className={'form-control' + (errors.cardNumber && touched.cardNumber ? ' is-invalid' : '')} />
													<ErrorMessage name="cardNumber" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<Field placeholder="MM/YY" name="expiration" type="text" className={'form-control' + (errors.expiration && touched.expiration ? ' is-invalid' : '')} />
													<ErrorMessage name="expiration" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<Field placeholder="VISA" name="type" type="text" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')} />
													<ErrorMessage name="type" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<Field placeholder="123" name="cvc" type="text" className={'form-control' + (errors.cvc && touched.cvc ? ' is-invalid' : '')} />
													<ErrorMessage name="cvc" component="div" className="invalid-feedback" />
												</FormGroup>
												<br />
												<FormGroup>
													<br />
													<button type="submit" className="btn btn-success" disabled={isSubmitting}>Submit</button>
													{isSubmitting && <img src="/loading.gif" alt="loading" />}
												</FormGroup>
												{status && <div className={'alert alert-danger'}>{status}</div>}
											</Form>
										)}
									>
									</Formik>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				{/* </Card> */}
			</Container>
			<Footer />
		</>
	)
}

export default Profile;