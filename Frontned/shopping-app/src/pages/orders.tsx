import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
import { Button, Container, Table } from "react-bootstrap";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import { IOrder, IUser } from "../auth/Typings";
import config from "../config/config";
import { useStickyState } from "../state/stickyState";
import { updateOrderStatus } from "../auth/api/updateOrderStatus";
import { getUserByID } from "../auth/api/getUserByID";

function Orders() {
	const [user] = useStickyState(null, 'user');
	const { id } = useParams();
	const [order, setOrder] = useState<IOrder>();
	const [orderUser, setOrderUser] = useState<IUser>();
	const navigate = useNavigate();
	let total = 0;

	useEffect(() => {
		fetch(`${config.apiURL}/orders/${id}`).then(async resp => {
			if (!resp.ok) {
				navigate(-1);
				return;
			}
			const data = await resp.json();
			setOrder(data.result);

			if (!user) {
				navigate('/login');
				return;
			} else if (!config.adminIDs.includes(user.userID) && data.result.userID !== user.userID) {
				navigate('/login');
				return;
			}

			getUserByID(data.result.userID).then(u => {
				setOrderUser(u);
			}).catch(e => console.error(`OrderUser: ${e}`));

		}).catch((e) => console.error(`Orerders: ${e}`));
	}, []);

	return (
		<>
			<Bar />

			<div className="d-flex align-items-center justify-content-center text-center">
				<h1 className="title">
					<strong> Order #{order && order.orderID} </strong>
					<hr className="title-line" style={{ borderColor: '#6a1b9a' }} />
				</h1>
			</div>

			{
				order && (
					<>
						<Container style={{ width: 500 }}>
							<h5><strong>{orderUser?.name.replace(';', ' ')}'s</strong> Order Progress:</h5>
							<ProgressBar completed={order.status === 0 ? order.status + 1 * 10 : order.status * 10} />
						</Container>
						<br />
						<Container>
							<Table bordered hover size="sm">
								<thead>
									<tr>
										<th>Item</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody>
									{order.cart && order.cart.map(i => {
										total += i.price;

										return (
											<tr>
												<td width={15}>{i.name}</td>
												<td width={15} style={{ color: 'green' }}>${i.price.toFixed(2)}</td>
											</tr>
										)
									})}
									<tr>
										<td />
										<td width={50}>
											<span>Total: ${total.toFixed(2)}</span>
										</td>
									</tr>
								</tbody>
							</Table>
							{
								user && config.adminIDs.indexOf(user.userID) !== -1 && (
									<div>
										<Button variant="success" onClick={() => {
											updateOrderStatus(order.status + 1, order.orderID).then((o) => {
												setOrder(o);
											}).catch(e => console.error(`UpdateOrderStatus: ${e}`));
										}}>Add Status</Button>
										{' '}
										<Button variant="danger" onClick={() => {
											updateOrderStatus(order.status - 1, order.orderID).then((o) => {
												setOrder(o);
											}).catch(e => console.error(`UpdateOrderStatus: ${e}`));
										}}>Remove Status</Button>
									</div>
								)
							}
						</Container>
					</>
				)
			}

			<Footer className="footer" />
		</>
	)
}

export default Orders;