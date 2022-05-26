import { BehaviorSubject } from 'rxjs';
import config from '../config/config';
import { handleResponse } from './HandleResponse';

export interface ITag {
    tagID: number,
    tag: string,
    item: IItem,
}

export interface IItem {
    price: number,
    name: string,
    image: string,
    description: string,
    tags: Array<ITag>
}

interface ICart {
    user: IUser,
    items: Array<IItem>,
    cartID: number
}

interface ICard {
    user: IUser,
    cvc: number,
    cardNumber: string,
    type: string,
    expiration: string
}

interface IAddress {
    street: string,
    city: string,
    state: string,
    zipcode: number
}

interface IName {
    firstName: string,
    lastName: string
}

interface IUser {
    userID: number
    name: IName
    userName: string,
    passWord: string,
    address: IAddress
    cart: ICart
    card: ICard
}

const currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') as string));

export const authenticationService = {
    login,
    logout,
    register,
    checkLogin,
    updateUsername,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function updateUsername(username: string) {
    const user = currentUserSubject.getValue();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            userID: user?.userID
        })
    }

    if (!user)
        logout();

    return fetch(`${config.apiURL}/users/update`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        })
}


function register(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };

    return fetch(`${config.apiURL}/users/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // Store user details as jwt token
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiURL}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // Store user details as jwt token
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // Remove from local storage as a logout
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    window.location.reload();
}

function checkLogin() {
    let user = currentUserSubject.getValue();

    if (!user || user === undefined)
        return;

    fetch(`${config.apiURL}/users/id/${user?.userID}`).then(handleResponse).then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
    }).catch((e) => {
        logout();
        window.location.reload()
    });
}