import { useState } from "react";
import { Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi"
import { useStickyState } from "../state/stickyState";


function Cart() {
	const [user] = useStickyState(null, 'user');
	const [cartCount] = useState(user ? user.cart.length : 0);

	return (
		<Button variant="secondary" href="/cart">
			<span style={{ color: "#cc3939" }}> <strong> {cartCount !== 0 && cartCount} </strong> </span>
			<strong> <GiShoppingCart size={20} />  </strong>
		</Button>
	);
}

export default Cart;