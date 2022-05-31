import config from "../../config/config";
import { IItem, IUser } from "../Typings";
import { handleResponse } from "./handleResponse";

// export function addToCart(item: IItem, userID: number) {
// 	return new Promise<IUser>(async (resolve, reject) => {
// 		if (!item || !userID)
// 			return reject('No cart or userID provided');

// 		const resp = await fetch(`${config.apiURL}/users/addToCart`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({ item, userID })
// 		});
// 		const user: IUser = await handleResponse(resp).catch((e: any) => {
// 			return reject(e)
// 		});

// 		// Make sure correct user is returned
// 		if (user.userID != userID)
// 			return reject('Incorrect user recived');

// 		return resolve(user);
// 	});
// }


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

export function udpateUserCard(cardNumber: string, expiration: string, type: string, cvc: number, userID: number) {
	return new Promise<IUser>(async (resolve, reject) => {
		if (!cardNumber || !expiration || !type || !cvc)
			return reject('Inffucient params provided');

		const resp = await fetch(`${config.apiURL}/users/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				card: {
					cardNumber, expiration, type, cvc
				}, userID
			})
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

export function udpateUserAddress(street: string, city: string, state: string, zipcode: string, userID: number) {
	return new Promise<IUser>(async (resolve, reject) => {
		if (!street || !city || !state || !zipcode)
			return reject('Inffucient params provided');

		const resp = await fetch(`${config.apiURL}/users/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				address: {
					street, city, state, zipcode
				}, userID
			})
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

export function updateUsersName(firstName: string, lastName: string, userID: number) {
	return new Promise<IUser>(async (resolve, reject) => {
		if (!firstName || !lastName || !userID)
			return reject('Inffucient params provided');

		const resp = await fetch(`${config.apiURL}/users/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: {
					firstName, lastName
				}, userID
			})
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