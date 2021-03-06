import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { BiUserCircle, BiLock } from "react-icons/bi";
import * as Yup from 'yup';

import { Card } from "react-bootstrap";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
import { login } from "../auth/UserService";

function Login() {
	const navigate = useNavigate();

	return (
		<>
			<Bar />
			<div className="login-wrapper">
				<Card>
					<Card.Header as="h5">Login</Card.Header>
					<Card.Body>
						<Formik
							initialValues={{
								username: '',
								password: ''
							}}
							validationSchema={Yup.object().shape({
								username: Yup.string().required('Username is required'),
								password: Yup.string().required('Password is required')
							})}
							onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
								setStatus();
								setSubmitting(true);
								login(username, password)
									.then(() => {
										setSubmitting(false);
										navigate('/');
									}).catch(() => {
										setSubmitting(false);
										setStatus("Invalid login");
									});
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
										<br />
										<button type="submit" className="btn btn-success" disabled={isSubmitting}>Login</button>
										{isSubmitting && <img src="/loading.gif" alt="loading" />}
										{' '} <a href="/register">Not a member?</a>
									</div>
									{status && <div className={'alert alert-danger'}>{status}</div>}
								</Form>
							)}
						/>
					</Card.Body>
				</Card>
			</div>
			<Footer className="footer" />
		</>
	)
}

export default Login;

