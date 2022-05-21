import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi"

function Cart() {
	const [CartCount, SetCartCount] = useState(0);

	useEffect(() => {
		// TODO: Impliment API fetch
		SetCartCount(0);
	}, [])


	return (
		<Button variant="secondary">
			<span style={{ color: "#cc3939" }}> <strong> {CartCount != 0 && CartCount} </strong> </span>
			<strong> <GiShoppingCart style={{ fontSize: 20 }} />  </strong>
		</Button>
	);
}

export default Cart;