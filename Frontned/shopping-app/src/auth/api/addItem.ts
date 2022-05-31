import config from "../../config/config";
import { IItem, ITag, IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

export function addItem(name: string, description: string, price: number, image: string, tags: any) {
	return new Promise<IItem>(async (resolve, reject) => {
		const resp = await fetch(`${config.apiURL}/items/add`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
				name: name,
				price: parseInt(price.toString()),
				image: image,
				description: description,
				tags: tags
			 })
		});

		console.log(JSON.stringify(tags));
		const item: IItem = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});


		return resolve(item);
	});
}