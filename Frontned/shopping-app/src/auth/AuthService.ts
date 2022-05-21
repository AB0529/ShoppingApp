import { BehaviorSubject } from 'rxjs';
import { handleResponse } from './HandleResponse';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') as string));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
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
}