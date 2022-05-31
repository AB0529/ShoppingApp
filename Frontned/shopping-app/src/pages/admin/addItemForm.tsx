import { ErrorMessage, Field, Form, Formik } from "formik";
import { Card, FormGroup } from "react-bootstrap";

import * as Yup from 'yup';
import { addItem } from "../../auth/api/addItem";

export function AddItemForm() {
	return (
		(
			<Card style={{ width: '18rem', height: '30rem' }}>
				<Card.Body>
					<Card.Title>Add Item</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Add an item to the database</Card.Subtitle>
					<Card.Text>
						<Formik
							initialValues={{
								name: '',
								description: '',
								image: '',
								tags: '',
								price: 0
							}}
							validationSchema={Yup.object().shape({
								name: Yup.string().required('Name is required'),
								description: Yup.string().required('Description is required'),
								image: Yup.string().required('Image URL is required'),
								tags: Yup.string().required('Tags are requried'),
								price: Yup.number().required('Price is required').typeError('Price must be a valid number')
							})}
							onSubmit={({ name, description, image, tags, price }, { setStatus, setSubmitting, resetForm }) => {
								const t = [];

								for (let tag of tags.split(',')) {
									t.push({ tag });
								}

								setStatus();
								setSubmitting(true);
								addItem(name, description, price, image, t).then(() => {
									resetForm();
									setStatus({type: 'success', msg: 'Item added!'});
									setTimeout(() => {
										setStatus();
									}, 3e3);
									setSubmitting(false);
								}).catch(e => {
									setStatus({type: 'fail', msg: e})
									setSubmitting(false);
								});
							}}
							render={({ errors, status, touched, isSubmitting }) => (
								<Form>
									<FormGroup>
										<Field placeholder="Enter name" name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
										<ErrorMessage name="name" component="div" className="invalid-feedback" />
									</FormGroup>
									<br />
									<FormGroup>
										<Field placeholder="Enter description" name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
										<ErrorMessage name="description" component="div" className="invalid-feedback" />
									</FormGroup>
									<br />
									<FormGroup>
										<Field placeholder="Enter URL" name="image" type="text" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
										<ErrorMessage name="image" component="div" className="invalid-feedback" />
									</FormGroup>
									<br />
									<FormGroup>
										<Field placeholder="Enter tags" name="tags" type="text" className={'form-control' + (errors.tags && touched.tags ? ' is-invalid' : '')} />
										<ErrorMessage name="tags" component="div" className="invalid-feedback" />
									</FormGroup>
									<br />
									<FormGroup>
										<Field placeholder="Enter price" name="price" type="text" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
										<ErrorMessage name="price" component="div" className="invalid-feedback" />
									</FormGroup>
									<br />
									<FormGroup>
										<br />
										<button type="submit" className="btn btn-success" disabled={isSubmitting}>Submit</button>
										{isSubmitting && <img src="/loading.gif" alt="loading" />}
									</FormGroup>
									{status && status.type === "fail" ? <div className={'alert alert-danger'}>{status.msg}</div> : status && <div className={'alert alert-success'}>{status.msg}</div>}
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