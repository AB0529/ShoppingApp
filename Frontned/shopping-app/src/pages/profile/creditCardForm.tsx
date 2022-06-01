import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Card, FormGroup } from "react-bootstrap";
import { udpateUserCard, updateUsername } from "../../auth/api/updateUser";

import * as Yup from 'yup';
import { IUser } from "../../auth/Typings";
import { setUser } from "../../auth/UserService";

interface IProps {
	user: IUser
}

export function CreditCardForm(props: IProps) {
	const user = props.user;

	return (
		(
			<Card style={{ width: '18rem', height: '25rem' }}>
				<Card.Body>
					<Card.Title>Card</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Edit your card information.</Card.Subtitle>
					<Card.Text>
						<Formik
							initialValues={user.card !== null ? {
								cardNumber: user.card.cardNumber,
								expiration: user.card.expiration,
								type: user.card.type,
								cvc: user.card.cvc
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
								setSubmitting(true);
								udpateUserCard(cardNumber, expiration, type, cvc as number, user.userID)
									.then((user: IUser) => {
										setUser(user);
										// window.location.reload();
									}).catch((e: any) => {
										setSubmitting(false);
										setStatus(e);
									});
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
		)
	)
}