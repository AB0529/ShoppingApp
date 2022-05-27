import config from "../../config/config";
import { IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

export function getUserByID(id: number) {
	return new Promise<IUser>(async (resolve, reject) => {
		if (!id)
			return reject('No ID provided');

		const resp = await fetch(`${config.apiURL}/users/id/${id}`);
		handleResponse(resp).then((user: IUser) => {
			// Make sure correct user is returned
			if (user.userID != id)
				return reject('Incorrect ID recived');

			return resolve(user);
		}).catch((e: any) => {
			return reject(e)
		});
	});
}