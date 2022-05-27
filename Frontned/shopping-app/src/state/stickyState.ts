import React from "react";
import { IUser } from "../auth/Typings";

export function useStickyState(defaultValue: IUser | null, key: string) {
	const [user, setUser] = React.useState(() => {
		const stickyValue = window.localStorage.getItem(key);
		return stickyValue !== null
			? JSON.parse(stickyValue)
			: defaultValue;
	});
	React.useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(user));
	}, [key, user]);

	return [user, setUser];
}