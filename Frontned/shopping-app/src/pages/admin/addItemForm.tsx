import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Card, FormGroup } from "react-bootstrap";

import * as Yup from 'yup';
import { ITag, IUser } from "../../auth/Typings";
import { setUser } from "../../auth/UserService";
import { addItem } from "../../auth/api/addItem";

export function AddItemForm() {
	return (
		(
			<Card style={{ width: '18rem', height: '25rem' }}>
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
							onSubmit={({ name, description, image, tags, price }, { setStatus, setSubmitting }) => {
								const t = [];

								for (let tag of tags.split(',')) {
									t.push({ tag });
								}

								setStatus();
								setSubmitting(true);
								addItem(name, description, price, image, t).then(() => {
									setStatus('Item added');
									setSubmitting(false);
								}).catch(e => {
									setStatus(e)
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