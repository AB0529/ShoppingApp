import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi"
import { IUser } from "../auth/Typings";
import { useStickyState } from "../state/stickyState";

function Cart() {
	const [user, setUser] = useStickyState(null, 'user');
	const [CartCount, SetCartCount] = useState(0);

	useEffect(() => {
		SetCartCount(user ? (user as IUser).cart.length : 0);
	}, [])


	return (
		<Button variant="secondary">
			<span style={{ color: "#cc3939" }}> <strong> {CartCount !== 0 && CartCount} </strong> </span>
			<strong> <GiShoppingCart style={{ fontSize: 20 }} />  </strong>
		</Button>
	);
}

export default Cart;