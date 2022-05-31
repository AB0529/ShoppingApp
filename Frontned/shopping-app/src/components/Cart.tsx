import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi"
import { setGlobalState, useGlobalState } from "../state/globalState";
import { useStickyState } from "../state/stickyState";

function Cart() {
	const [user] = useStickyState(null, 'user');
	const [cartCount] = useGlobalState('cartCount');

	useEffect(() => {
		if (user != null)
			setGlobalState('cartCount', user.cart.length);
	}, []);

	return (
		<Button variant="secondary" href="/cart">
			<span style={{ color: "#cc3939" }}> <strong> {cartCount !== 0 && cartCount} </strong> </span>
			<strong> <GiShoppingCart size={20} />  </strong>
		</Button>
	);
}

export default Cart;