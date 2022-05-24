import { BehaviorSubject } from 'rxjs';
import { handleResponse } from './HandleResponse';

interface ITag {
    tagID: number,
    tag: string,
    item: IItem,
}

interface IItem {
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

interface IUser {
    userID: number
    name: string
    userName: string,   
    passWord: string,
    address: string,
    cart: ICart,
    card: ICard
}

const currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') as string));

export const authenticationService = {
    login,
    logout,
    register,
    checkLogin,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function register(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };

    return fetch(`http://localhost:9080/users/register`, requestOptions)
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

    return fetch(`http://localhost:9080/users/authenticate`, requestOptions)
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
    let user: IUser | null = currentUserSubject.getValue();

    if (!user || user === undefined)
        return;

    fetch(`http://localhost:9080/users/id/${user?.userID}`).then(handleResponse).then((res) => {
        if (!res) {
            logout();
            window.location.reload();
        }
    }).catch((e) => console.log(e));
}