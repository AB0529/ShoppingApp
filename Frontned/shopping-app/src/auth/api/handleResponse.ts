import { logout } from "../UserService";

export function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // Auto logout if 401 unauthorized or 403 response
                logout();
                window.location.reload();
            }

            const error = response.message;
            return Promise.reject(error);
        }

        return data.result;
    });
}