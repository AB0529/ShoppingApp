import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { IItem } from "../auth/Typings";
import Bar from "../components/Bar";
import { Carasoul } from "../components/carasoul";
import Footer from "../components/Footer";
import LightningDeals from "../components/LightningDeals";
import Title from "../components/Title";
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
            <LightningDeals />
            <Footer />
        </>
    )
}

export default Home;