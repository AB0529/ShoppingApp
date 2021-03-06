import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { BiUserCircle, BiLock } from "react-icons/bi";
import * as Yup from 'yup';

import { Card } from "react-bootstrap";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
import { registerUser } from "../auth/api/registerUser";
import { setUser } from "../auth/UserService";
import { BsFillPencilFill, BsPencil } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

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
								firstName: '',
								lastName: '',
								email: '',
								password: '',
								confirmPassword: '',
							}}
							validationSchema={Yup.object().shape({
								username: Yup.string().required('Username is required'),
								firstName: Yup.string().required('First name is required'),
								lastName: Yup.string().required('Last name is required'),
								email: Yup.string().email('Enter a valid email').required('Email is required'),
								password: Yup.string().required('Password is required'),
								confirmPassword: Yup.string().required('Type your password again').oneOf([Yup.ref('password'), null], 'Passwords must match')
							})}
							onSubmit={async ({ username, firstName, lastName, email, password }, { setStatus, setSubmitting }) => {
								setSubmitting(true);
								setStatus();

								registerUser(username, firstName, lastName, email, password)
									.then((u) => {
										setUser(u);
										navigate("/");
									}).catch((e: any) => {
										setSubmitting(false);
										setStatus("Something went wrong: " + e);
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
										<label htmlFor="firstName"> <BsFillPencilFill /> <strong>First Name</strong></label>
										<Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
										<ErrorMessage name="firstName" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<label htmlFor="lastName"> <BsPencil /> <strong>Last Name</strong></label>
										<Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
										<ErrorMessage name="lastName" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<label htmlFor="email"> <AiOutlineMail /> <strong>Email</strong></label>
										<Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
										<ErrorMessage name="email" component="div" className="invalid-feedback" />
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
			<Footer className="footer" />
		</>
	)
}

export default Register;

