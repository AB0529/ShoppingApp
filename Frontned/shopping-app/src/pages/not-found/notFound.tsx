import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import Bar from "../../components/Bar";
import "./notFound.scss"

function NotFound() {
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
                <div className="not-found-wrapper">
                    <span className="h1 text-wrap-center"> Uh oh.. <strong>page not found</strong>! </span>
                    <Button variant="danger" onClick={() => navigate(-1)} >Take me back!</Button>
                    {img}
                </div>
            </Container>
        </>
    )
}

export default NotFound;