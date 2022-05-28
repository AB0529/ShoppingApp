import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { IItem } from "../auth/Typings";
import Bar from "../components/Bar";
import { Carasoul } from "../components/carasoul";
import Footer from "../components/Footer";
import config from "../config/config";

function Home() {
    const [items, setItems] = useState<Array<IItem>>([]);

    useEffect(() => {
        fetch(`${config.apiURL}/items/all/5`).then(resp => resp.json()).then((data) => {
            setItems(data.result);
        }).catch((e) => console.error(`Something went wrong: ${e}`))
    }, []);

    return (
        <>
            <Bar />

            <Carasoul items={items} />
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
                <Card style={{ width: '100rem' }}>
                    <Card.Body>
                        <h5>We are a team formed under an intense situation to make something new for our cliental, but we came together to create the most orginal ideaever.</h5>
                        <br />
                        <h5>A shopping website that will allow it's customers to view an item before purchasing, then it will be delivered to the address of the customer.</h5>
                        <br />
                        <h5>This website is totally origianal and any similarities and other websites is only proof they stole from us.</h5>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />

        </>
    )
}

export default Home;