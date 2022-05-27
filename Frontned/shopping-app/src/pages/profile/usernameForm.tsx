import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Card, FormGroup } from "react-bootstrap";
import { updateUsername } from "../../auth/api/updateUser";

import * as Yup from 'yup';
import { IUser } from "../../auth/Typings";
import { setUser } from "../../auth/UserService";

interface IProps {
	user: IUser
}

export function UsernameCardForm(props: IProps) {
	const user = props.user;

	return (
		(
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
								updateUsername(username, user.userID)
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
		)
	)
}