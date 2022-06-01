import { useEffect, useRef, useState } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"
import { addOrder } from "../auth/api/addOrder";
import { updateCart, updateUser } from "../auth/api/updateUser";
import { IOrder, IUser } from "../auth/Typings";
import { setUser } from "../auth/UserService";
import emailjs from '@emailjs/browser';

import Bar from "../components/Bar";
import { useStickyState } from "../state/stickyState";
import config from "../config/config";
import ReactDOMServer from 'react-dom/server'

function Shipping() {
    const navigate = useNavigate();
    const [order, setOrder] = useState<IOrder>();
    const [user] = useStickyState(null, 'user');
    const [seen, setSeen] = useState(false);
    let total = 0;
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
        console.log('Among');
        if (!user || user.cart.length <= 0 || seen) {
            navigate('/catalog');
            return;
        }

        (!seen && addOrder(user.cart, user.userID).then((order) => {
            const btn = (
                <a href={`http://localhost:3000/orders/${order?.orderID}`}>
                    <Button variant="success">View Order</Button>
                </a>

            )
            const table = (
                <Table bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.cart && order?.cart.map(i => {
                            total += i.price;

                            return (
                                <tr>
                                    <td width={15}>{i.name}</td>
                                    <td width={15} style={{ color: 'green' }}>${i.price.toFixed(2)}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td />
                            <td width={50}>
                                <span>Total: ${total.toFixed(2)}</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )

            updateCart([], user.userID).then(u => {
                updateUser(u);
                setUser(u);
                setOrder(order);

                // Send order email
                emailjs.send(config.emailKey, config.emailTemplate, {
                    order_number: order.orderID,
                    name: user.name.replace(';', ' '),
                    reciept_table: ReactDOMServer.renderToString(table),
                    view_order: ReactDOMServer.renderToString(btn),
                    user_email: user.email,
                }, config.emailPublicKey).then(r => {
                    console.log(`Email sent status: ${r.status}`);
                    setSeen(true);
                }).catch((e) => console.error(`addOrder: ${e}`));
            }).catch(e => console.error(`Checkout: ${e}`));
        }).catch(e => console.error(`emailSend: ${e}`)));

    }, []);

    return (
        <>
            <Bar />
            <Container fluid>
                <div className="shipping-wrapper">
                    {
                        user && user.cart.length > 0 ? (
                            <>
                                <span className="h1 text-wrap-center cursive-text"><strong>Thank you!</strong></span>
                                <span className="h3 text-wrap-center"><a href={`orders/${order?.orderID}`}>Order #{order?.orderID}</a> has been placed! Check your email for a recipet.</span>
                                <div>
                                <Button variant="success" onClick={() => navigate('/catalog')} >Keep browsing</Button>
                                {' '}
                                <Button variant="success" onClick={() => navigate(`/orders/${order?.orderID}`)} >View order</Button>
                                </div>
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