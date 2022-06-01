import { ErrorMessage, Field, Form, Formik } from "formik";
import { Card, FormGroup } from "react-bootstrap";

import * as Yup from 'yup';
import { deleteItem } from "../../auth/api/deleteItem";

export function DeleteItemForm() {
	return (
		(
			<Card style={{ width: '18rem', height: '35rem' }}>
				<Card.Body>
					<Card.Title>Delete Item</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Delete an item from the database</Card.Subtitle>
					<Card.Text>
						<Formik
							initialValues={{
								itemID: null,
							}}
							validationSchema={Yup.object().shape({
								itemID: Yup.number().required('ID is required').typeError('ID must be a valid number')
							})}
							onSubmit={({ itemID}, { setStatus, setSubmitting, resetForm }) => {
								setStatus();
								setSubmitting(true);

								if (!itemID) {
									setStatus({type: 'fail', msg: 'ItemID not provided!'});
									setSubmitting(false);
								}

								deleteItem(itemID).then(() => {
									resetForm();
									setStatus({type: 'success', msg: 'Item removed!'});
									setTimeout(() => {
										setStatus();
									}, 3e3);
									setSubmitting(false);
								}).catch(e => {
									setStatus({type: 'fail', msg: 'Item does not exist'})
									setSubmitting(false);
								});
							}}
							render={({ errors, status, touched, isSubmitting }) => (
								<Form>
									<FormGroup>
										<Field placeholder="Enter ID" name="itemID" type="text" className={'form-control' + (errors.itemID && touched.itemID ? ' is-invalid' : '')} />
										<ErrorMessage name="itemID" component="div" className="invalid-feedback" />
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