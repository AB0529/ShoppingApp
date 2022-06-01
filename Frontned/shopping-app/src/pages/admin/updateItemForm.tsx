import { ErrorMessage, Field, Form, Formik } from "formik";
import { Card, FormGroup } from "react-bootstrap";

import * as Yup from 'yup';
import { addItem } from "../../auth/api/addItem";
import { getItemByID } from "../../auth/api/getItemByID";
import { updateItem } from "../../auth/api/updateItem";

export function UpdateItemForm() {
	return (
		(
			<Card style={{ width: '18rem', height: '35rem' }}>
				<Card.Body>
					<Card.Title>Update Item</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Update an existing item</Card.Subtitle>
					<Card.Text>
						<Formik
							initialValues={{
								itemID: null,
								name: '',
								description: '',
								image: '',
								tags: '',
								price: 0
							}}
							validationSchema={Yup.object().shape({
								itemID: Yup.number().required('ID is required').typeError('ID must be a valid number'),
								name: Yup.string().required('Name is required'),
								description: Yup.string().required('Description is required'),
								image: Yup.string().required('Image URL is required'),
								tags: Yup.string().required('Tags are requried'),
								price: Yup.number().required('Price is required').typeError('Price must be a valid number')
							})}
							onSubmit={({ itemID, name, description, image, tags, price }, { setStatus, setSubmitting, resetForm }) => {
								let t: any = [];

								for (let tag of tags.split(',')) {
									t.push({ tag });
								}

								setStatus();
								setSubmitting(true);
								getItemByID(itemID ? itemID : 1).then((i) => {
									if (name.toLowerCase().startsWith('{current}'))
										name = i.name;
									if (description.toLowerCase().startsWith('{current}'))
										description = i.description;
									if (price === -1)
										price = i.price;
									if (image.toLowerCase().startsWith('{current}'))
										image = i.image;
									if (t[0].tag.toLowerCase().startsWith('{current}'))
										t = i.tags;

									updateItem(itemID, name, description, price, image, t).then(() => {
										resetForm();
										setStatus({ type: 'success', msg: 'Item updated!' });
										setTimeout(() => {
											setStatus();
										}, 3e3);
										setSubmitting(false);
									}).catch(e => {
										setStatus({ type: 'fail', msg: e })
										setSubmitting(false);
									});
								}).catch(e => setStatus({ type: 'fail', msg: 'Item does not exist' }));

							}}
							render={({ errors, status, touched, isSubmitting }) => (
								<Form>
									<FormGroup>
										<Field placeholder="Enter ID" name="itemID" type="text" className={'form-control' + (errors.itemID && touched.itemID ? ' is-invalid' : '')} />
										<ErrorMessage name="itemID" component="div" className="invalid-feedback" />
									</FormGroup>
									<br />
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