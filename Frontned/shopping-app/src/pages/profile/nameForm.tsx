import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Card, FormGroup } from "react-bootstrap";
import { updateUsername, updateUsersName } from "../../auth/api/updateUser";

import * as Yup from 'yup';
import { IUser } from "../../auth/Typings";
import { setUser } from "../../auth/UserService";

interface IProps {
	user: IUser
}

export function NameCardForm(props: IProps) {
	const user = props.user;

	return (
		(
			<Card style={{ width: '18rem', height: '25rem' }}>
			<Card.Body>
				<Card.Title>Name</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">Edit your first and last name.</Card.Subtitle>
				<Card.Text>
					<Formik
						initialValues={user.name !== null ? {
							firstName: user.name.split(';')[0],
							lastName: user.name.split(';')[1],
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
							setSubmitting(true);
							updateUsersName(firstName, lastName, user.userID)
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
		)
	)
}