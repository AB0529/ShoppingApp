import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Card, FormGroup } from "react-bootstrap";
import { udpateUserAddress, updateUsername } from "../../auth/api/updateUser";

import * as Yup from 'yup';
import { IUser } from "../../auth/Typings";
import { setUser } from "../../auth/UserService";

interface IProps {
	user: IUser
}

export function AddressCardForm(props: IProps) {
	const user = props.user;

	return (
		(
			<Card style={{ width: '18rem', height: '25rem' }}>
				<Card.Body>
					<Card.Title>Address</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Edit your address information.</Card.Subtitle>
					<Card.Text>
						<Formik
							initialValues={user.address !== null ? {
								street: user.address.replace(',', '').split(' ')[0],
								city: user.address.replace(',', '').split(' ')[1],
								state: user.address.split(' ')[2],
								zipcode: user.address.split(' ')[3]
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
								zipcode: Yup.string().required('Zipcode is required').typeError('Zipcode must be a number'),
							})}
							onSubmit={({ street, city, state, zipcode }, { setStatus, setSubmitting }) => {
								setStatus();
								setSubmitting(true);
								udpateUserAddress(street, city, state, zipcode, user.userID)
									.then((user: IUser) => {
										setUser(user);
										window.location.reload();
									}).catch((e: any) => {
										setSubmitting(false);
										setStatus(e);
									});
							}}
							render={({ errors, status, touched, isSubmitting }) => (
								<Form>
									<FormGroup>
										<Field placeholder="Enter street" name="street" type="text" className={'form-control' + (errors.street && touched.street ? ' is-invalid' : '')} />
										<ErrorMessage name="street" component="div" className="invalid-feedback" />
									</FormGroup>
									<br />
									<FormGroup>
										<Field placeholder="Enter city" name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
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
		)
	)
}