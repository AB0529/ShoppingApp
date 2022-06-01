import config from "../../config/config";
import { IItem, ITag, IUser } from "../Typings";
import { getItemByID } from "./getItemByID";
import { handleResponse } from "./handleResponse";

export function updateItem(itemID: number | null, name: string, description: string, price: number, image: string, tags: any) {
	return new Promise<IItem>(async (resolve, reject) => {
		if (!itemID)
			return reject('No ID provided');

		const resp = await fetch(`${config.apiURL}/items/update`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				itemID: parseInt(itemID.toString()),
				name: name,
				price: parseInt(price.toString()),
				image: image,
				description: description,
				tags: tags
			})
		});

		const item: IItem = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});


		return resolve(item);
	});
}