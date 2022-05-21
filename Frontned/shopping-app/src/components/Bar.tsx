import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

import Cart from "./Cart";
import UserIcon from "./UserIcon";

interface IBarProps {
    brand: JSX.Element,
    items: Array<{
        name: string,
        href: string
    }>
}

function Bar(props: IBarProps) {
    const barItems = props.items.map(item => {
        return (
            <Nav.Link href={item.href}> {item.name} </Nav.Link>
        )
    });

    const searchBar = (
        <Nav.Item>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success"> <BsSearch /> </Button>
            </Form>
        </Nav.Item>
    );

    return (
        <>
            <Navbar bg="dark" variant="dark" /*expand="lg"*/>
                <Container fluid>
                    <Navbar.Brand href="#">{props.brand}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="bar" />
                    <Navbar.Collapse id="bar">
                        <Nav id="bar" className="me-auto" navbarScroll>
                            {barItems}
                        </Nav>
                        <Nav id="bar" navbarScroll>
                            {searchBar}
                            <Nav.Item>
                                a
                                <Cart />
                            </Nav.Item>
                            <Nav.Link>
                                <UserIcon />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Bar;