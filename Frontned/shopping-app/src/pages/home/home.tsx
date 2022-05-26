import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { IItem } from "../../auth/AuthService";
import Bar from "../../components/Bar";
import Footer from "../../components/Footer";
import config from "../../config/config";

function Home() {
    const [items, setItems] = useState<Array<IItem>>([]);

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
                </h1>
            </div>

            <Container fluid className="d-flex align-items-center justify-content-center">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Text>
                            dfgnkodfjsgh kl;sdfhgnklsdfh gkjdfb gjkdfghb kljdf
                        </Card.Text>
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
                                    <Button variant="secondary">Add to Cart</Button>
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