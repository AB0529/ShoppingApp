import config from "../../config/config";
import { IItem, IOrder, ITag, IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

export function addOrder(cart: Array<IItem>, userID: number) {
	return new Promise<IOrder>(async (resolve, reject) => {
		const resp = await fetch(`${config.apiURL}/orders/add`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
				cart: cart,
				userID: userID,
			 })
		});

		const order: IOrder = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});


		return resolve(order);
	});
}