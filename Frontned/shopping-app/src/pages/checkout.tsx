import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

import Bar from "../components/Bar";

function Checkout() {
    const navigate = useNavigate();
    const img = (
        <Image
            src="/logo.png"
            width="128"
            height="128"
            alt="Logo"
            fluid
        />
    )

    return (
        <>
            <Bar />
            <Container fluid>
            <div className="checkout-wrapper">
					<span className="h1 text-wrap-center cursive-text"><strong>Thank you!</strong></span>
                    <span className="h3 text-wrap-center">Your order has been placed! </span>
                    <Button variant="success" onClick={() => navigate('/catalog')} >Keep browsing</Button>
                        {img}
                </div>
            </Container>
        </>
    )
}

export default Checkout;