import config from "../../config/config";
import { IItem, ITag, IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

export function deleteItem(itemID: number|null) {
	return new Promise<IItem>(async (resolve, reject) => {
		if (!itemID)
			return reject('ItemID must be provided');

		const resp = await fetch(`${config.apiURL}/items/delete/${itemID}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({itemID})
		});

		const item: IItem = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});


		return resolve(item);
	});
}