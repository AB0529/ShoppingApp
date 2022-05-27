import { authenticateUser } from "./api/authenticateUser";
import { getUserByID } from "./api/getUserByID";
import { updateCart } from "./api/updateUser";
import { IItem, IUser } from "./Typings";

const user: IUser = JSON.parse(window.localStorage.getItem('user') as string);

export function setUser(user: IUser|null) {
	window.localStorage.setItem('user', JSON.stringify(user));
}

export function addToCart(item: IItem) {
	if (!user)
		return;
	
	(user as IUser).cart.push(item);
	updateCart((user as IUser).cart, (user as IUser).userID).then(u => {
		setUser(u as any);
	}).catch(e => {
		console.error(`AddToCart: ${e}`);
	})
}

export function refreshUser() {
	if (!user)
		return;
	
	// Checks the API to see if user details are still valid
	getUserByID((user as IUser).userID).catch(e => {
		console.error(`RefreshUser: ${e}`);
		logout();
	});

}

export function login(username: string, password: string) {
	return authenticateUser(username, password).then(u => {
		setUser(u as any)
		return u;
	});
}

export function logout() {
	// Set user state to null
	if (!user)
		return;
	
	setUser(null);
	window.location.reload();
}