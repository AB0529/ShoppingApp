import config from "../../config/config";
import { IItem, IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

export function getItemByID(id: number) {
	return new Promise<IItem>(async (resolve, reject) => {
		if (!id)
			return reject('No ID provided');
		
		const resp = await fetch(`${config.apiURL}/items/${id}`);
		const item: IItem = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});
		
		return resolve(item);
	});
}