import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Image } from "react-bootstrap";
import { getItemByID } from "../../auth/api/getItemByID";
import { IItem } from "../../auth/Typings";
import { addToCart } from "../../auth/UserService";
import Bar from "../../components/Bar";
import Footer from "../../components/Footer";
import config from "../../config/config";
import { useStickyState } from "../../state/stickyState";

function Home() {
    const [items, setItems] = useState<Array<IItem>>([]);
    const [user, setUser] = useStickyState(null, 'user');

    useEffect(() => {
        fetch(`${config.apiURL}/items/all/3`).then(resp => resp.json()).then((data) => {
            setItems(data.result);
        }).catch((e) => console.error(`Something went wrong: ${e}`))
    }, []);

    return (
        <>
            <Bar />

            <div className="d-flex align-items-center justify-content-center">
                <h1 className="title">
                    <strong> About Us  </strong>
                    <hr className="title-line" style={{ borderColor: "#a83256" }} />
                    {/* <Image
                    src="/logo.png"
                    width="32"
                    height="32"
                    alt="Logo"
                    fluid
                    style={{marginLeft: 20}}
                    /> */}
                </h1>
            </div>

            <Container fluid className="d-flex align-items-center justify-content-center">
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        <h5>We are a team formed under an intense situation to make something new for our cliental, but we came together to create the most orginal ideaever.</h5>
                        <br />
                        <h5>A shopping website that will allow it's customers to view an item before purchasing, then it will be delivered to the address of the customer.</h5>
                        <br />
                        <h5>This website is totally origianal and any similarities and other websites is only proof they stole from us.</h5>
                    </Card.Body>
                </Card>
            </Container>

            <div className="d-flex align-items-center justify-content-center">
                <h1 className="title">
                    <strong> Our Top 3  </strong>
                    <hr className="title-line" style={{ borderColor: "#7e3299" }} />
                </h1>
            </div>
            <Container fluid>
                <Row md="auto" className="d-flex align-items-center justify-content-center">
                    {items.map((item) => {
                        return (
                            <Col sm={4} py={2}>
                                <Card className="item-card d-flex align-items-center justify-content-center" style={{ width: '18rem' }}>
                                    <Card.Header> <strong>{item.name}</strong> </Card.Header>
                                    <Card.Img variant="top" src={item.image} />
                                    <Card.Body>
                                        <Card.Subtitle>{item.description}</Card.Subtitle>
                                    </Card.Body>
                                    <Card.Footer>
                                        <ul className="tags">
                                            {item.tags.map((tag) => {
                                                return (
                                                    <li> <a className="tag"> {tag.tag} </a> </li>
                                                )
                                            })}
                                        </ul>

                                    </Card.Footer>
                                    <Button variant="secondary" onClick={ async () => {
                                        const item: IItem = await getItemByID(1);
                                        console.log(item);
                                        addToCart(item);
                                    } } >Add to Cart</Button>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Home;