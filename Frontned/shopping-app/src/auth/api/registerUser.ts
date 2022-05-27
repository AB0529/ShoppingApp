import config from "../../config/config";
import { IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

export function registerUser(username: string, password: string) {
	return new Promise<IUser>(async (resolve, reject) => {
		if (!username || !password)
			return reject('No username or password provided');

		const resp = await fetch(`${config.apiURL}/users/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		const user: IUser = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});

		// Make sure correct user is returned
		if (user.userName != username)
			return reject('Incorrect username recived');

		return resolve(user);
	});
}