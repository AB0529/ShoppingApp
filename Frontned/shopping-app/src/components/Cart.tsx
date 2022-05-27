import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi"
import { IUser } from "../auth/Typings";
import { useStickyState } from "../state/stickyState";

interface IProps {
	cartCount: number
}

function Cart() {
	const [user] = useStickyState(null, 'user');
	const [cartCount] = useState(user ? user.cart.length : 0);

	return (
		<Button variant="secondary" href="/cart">
			<span style={{ color: "#cc3939" }}> <strong> {cartCount !== 0 && cartCount} </strong> </span>
			<strong> <GiShoppingCart style={{ fontSize: 20 }} />  </strong>
		</Button>
	);
}

export default Cart;