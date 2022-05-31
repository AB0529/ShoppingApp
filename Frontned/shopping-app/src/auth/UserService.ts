import { authenticateUser } from "./api/authenticateUser";
import { getUserByID } from "./api/getUserByID";
import { updateCart, updateUser } from "./api/updateUser";
import { IItem, IUser } from "./Typings";

const user: IUser = JSON.parse(window.localStorage.getItem('user') as string);

export function setUser(user: IUser|null) {
	window.localStorage.setItem('user', JSON.stringify(user));
	if (user)
		updateUser(user);
}

export function removeFromCart(item: IItem) {
	if (!user)
		return;
	
	user.cart.splice(user.cart.indexOf(item));
	updateCart(user.cart, user.userID).then(u => {
		setUser(u);
		window.location.reload();
	}).catch(e => {
		console.error(`RemoveFromCart: ${e}`);
	})
}

export function refreshUser() {
	if (!user)
		return;
	
	// Checks the API to see if user details are still valid
	getUserByID(user.userID).catch(e => {
		console.error(`RefreshUser: ${e}`);
		logout();
	});

}

export function login(username: string, password: string) {
	return authenticateUser(username, password).then(u => {
		setUser(u);
		return u;
	});
}

export function logout() {
	// Set user state to null
	if (!user)
		return;
	
	// Update user in database
	updateUser(user);

	setUser(null);
	window.location.reload();
}