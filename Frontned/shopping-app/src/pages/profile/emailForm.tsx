import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Card, FormGroup } from "react-bootstrap";

import * as Yup from 'yup';
import { updateEmail } from "../../auth/api/updateUser";
import { IUser } from "../../auth/Typings";
import { setUser } from "../../auth/UserService";

interface IProps {
	user: IUser
}

export function EmailCardForm(props: IProps) {
	const user = props.user;

	return (
		(
			<Card style={{ width: '18rem', height: '25rem' }}>
				<Card.Body>
					<Card.Title>Email</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Edit your email.</Card.Subtitle>
					<Card.Text>
						<Formik
							initialValues={{
								email: user.email,
							}}
							validationSchema={Yup.object().shape({
								email: Yup.string().email('Enter a valid email').required('Username is required'),
							})}
							onSubmit={async ({ email }, { setStatus, setSubmitting }) => {
								setStatus();
								setSubmitting(true);
								updateEmail(email, user.userID)
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
										<Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
										<ErrorMessage name="email" component="div" className="invalid-feedback" />
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
		)
	)
}