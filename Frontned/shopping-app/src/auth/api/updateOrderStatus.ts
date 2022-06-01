import config from "../../config/config";
import { IItem, IOrder, ITag, IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

export function updateOrderStatus(status: number, orderID: number) {
	return new Promise<IOrder>(async (resolve, reject) => {
		const resp = await fetch(`${config.apiURL}/orders/updateStatus`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
				status: status,
				orderID: orderID,
			 })
		});

		const order: IOrder = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});


		return resolve(order);
	});
}