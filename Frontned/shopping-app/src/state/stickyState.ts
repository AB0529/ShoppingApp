import React from "react";
import { getUserByID } from "../auth/api/getUserByID";
import { IUser } from "../auth/Typings";

export function useStickyState(defaultValue: IUser | null, key: string) {
	const [user, setUser] = React.useState(() => {
		let stickyValue = window.localStorage.getItem(key);

		if (JSON.parse(stickyValue as string) !== null) {
			console.log(stickyValue);
			getUserByID(JSON.parse(stickyValue as string).userID).then((u) => {
				stickyValue = JSON.stringify(u);
			});
		}

		return stickyValue !== null
			? JSON.parse(stickyValue)
			: defaultValue;
	});
	React.useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(user));
	}, [key, user]);

	return [user, setUser];
}