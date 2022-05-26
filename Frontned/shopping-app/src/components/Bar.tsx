import { FormEventHandler } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Cart from "./Cart";
import UserIcon from "./UserIcon";

function Bar() {
    const navigate = useNavigate();
    const barBrand = (
        <img
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
        />
    )

    const barItems = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Catalog",
            href: "/catalog",
        }
    ].map(item => {
        return (
            <Nav.Link href={item.href}> {item.name} </Nav.Link>
        )
    });

    const searchBar = (
        <Nav.Item>
            <Form className="d-flex" style={{width: 250}} onSubmit={(event: any) => {
                // event.preventDefault();
                navigate(`/catalog?query=${event.target[0].value}`)
            }}>
                <FormControl
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    name="query"
                />
                <Button variant="success" type="submit"> <BsSearch /> </Button>
            </Form>
        </Nav.Item>
    );

    return (
        <>
            <Navbar bg="dark" variant="dark" /*expand="lg"*/>
                <Container fluid>
                    <Navbar.Brand href="#">{barBrand}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="bar" />
                    <Navbar.Collapse id="bar">
                        <Nav id="bar" className="me-auto" navbarScroll>
                            {barItems}
                        </Nav>
                        <Nav id="bar" navbarScroll>
                            {searchBar}
                            <Nav.Item style={{paddingLeft: 5}}>
                                <Cart />
                            </Nav.Item>
                        </Nav>
                        <UserIcon navItem />

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Bar;