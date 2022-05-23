import { useNavigate } from "react-router-dom";
import { authenticationService } from "../../auth/AuthService";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { BiUserCircle, BiLock } from "react-icons/bi";
import * as Yup from 'yup';

import "./register.scss";
import { Card } from "react-bootstrap";
import Bar from "../../components/Bar";

function Register() {
	const navigate = useNavigate();

return (
		<>
			<Bar />
			<div className="register-wrapper">
				<Card>
					<Card.Header as="h5">Register</Card.Header>
					<Card.Body>
						<Formik
							initialValues={{
								username: '',
								password: '',
								confirmPassword: '',
							}}
							validationSchema={Yup.object().shape({
								username: Yup.string().required('Username is required'),
								password: Yup.string().required('Password is required'),
								confirmPassword: Yup.string().required('Type your password again').oneOf([Yup.ref('password'), null], 'Passwords must match')
							})}
							onSubmit={async ({ username, password }, { setStatus, setSubmitting }) => {
								setSubmitting(true);
								setStatus();

								authenticationService.register(username, password)
									.then(() => {
										navigate("/");
									},
										error => {
											setSubmitting(false);
											setStatus(error === 409 ? "Username already in use" : "Error while trying to register");
										}
									);
							}}
							render={({ errors, status, touched, isSubmitting }) => (
								<Form>
									<div className="form-group">
										<label htmlFor="username"> <BiUserCircle /> <strong>Username</strong></label>
										<Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
										<ErrorMessage name="username" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<label htmlFor="password"> <BiLock /> <strong>Password</strong></label>
										<Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
										<ErrorMessage name="password" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<label htmlFor="password"> <BiLock /> <strong>Confirm Password</strong></label>
										<Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword ? ' is-invalid' : '')} />
										<ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<br />
										<button type="submit" className="btn btn-success" disabled={isSubmitting}>Register</button>
										{isSubmitting && <img src="/loading.gif" alt="loading" />}
										{' '} <a href="/login">Already a member?</a>
									</div>
									{status && <div className={'alert alert-danger'}>{status}</div>}
								</Form>
							)}
						/>
					</Card.Body>
				</Card>
			</div>
		</>
	)
}

export default Register;

