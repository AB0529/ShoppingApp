import { useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"
import { addOrder } from "../auth/api/addOrder";
import { updateCart, updateUser } from "../auth/api/updateUser";
import { IOrder, IUser } from "../auth/Typings";
import { setUser } from "../auth/UserService";

import Bar from "../components/Bar";
import { useStickyState } from "../state/stickyState";

function Shipping() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(0);
    const img = (
        <Image
            src="/logo.png"
            width="128"
            height="128"
            alt="Logo"
            fluid
        />
    )

    useEffect(() => {
        if (!state)
            navigate('/catalog');

        addOrder((state as IUser).cart, (state as IUser).userID).then((order) => {
            setOrder(order.orderID);
            updateCart([], (state as IUser).userID).then(u => {
                updateUser(u);
                setUser(u);
            }).catch(e => console.error(`Checkout: ${e}`));
        }).catch((e) => console.error(`addOrder: ${e}`));
    }, []);

    return (
        <>
            <Bar />
            <Container fluid>
                <div className="shipping-wrapper">
                    {
                        state ? (
                            <>
                                <span className="h1 text-wrap-center cursive-text"><strong>Thank you!</strong></span>
                                <span className="h3 text-wrap-center"><a href={`orders/${order}`}>Order #{order}</a> has been placed! </span>
                                <Button variant="success" onClick={() => navigate('/catalog')} >Keep browsing</Button>
                                {img}
                            </>
                        ) : (
                            <h1>Get outta here</h1>
                        )
                    }
                </div>
            </Container>
        </>
    )
}

export default Shipping;