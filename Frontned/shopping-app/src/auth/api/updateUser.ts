import config from "../../config/config";
import { IItem, IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

export function updateCart(cart: Array<IItem>, userID: number) {
	return new Promise<IUser>(async (resolve, reject) => {
		if (!cart || !userID)
			return reject('No cart or userID provided');

		const resp = await fetch(`${config.apiURL}/users/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ cart, userID })
		});
		const user: IUser = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});

		// Make sure correct user is returned
		if (user.userID != userID)
			return reject('Incorrect user recived');

		return resolve(user);
	});
}

export function updateUsername(username: String, userID: number) {
	return new Promise<IUser>(async (resolve, reject) => {
		if (!username || !userID)
			return reject('No username or userID provided');

		const resp = await fetch(`${config.apiURL}/users/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, userID })
		});
		const user: IUser = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});

		// Make sure correct user is returned
		if (user.userID != userID)
			return reject('Incorrect user recived');

		return resolve(user);
	});
}

export function updateUser(user: IUser) {
	return new Promise<IUser>(async (resolve, reject) => {
		if (!user)
			return reject('No user or userID provided');

		console.log(user);

		const resp = await fetch(`${config.apiURL}/users/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: user.userName,
				userAddress: user.address,
				card: user.card,
				cart: user.cart,
				userID: user.userID
			})
		});
		const u: IUser = await handleResponse(resp).catch((e: any) => {
			return reject(e)
		});

		// Make sure correct user is returned
		if (user.userID != u.userID)
			return reject('Incorrect user recived');

		return resolve(u);
	});
}