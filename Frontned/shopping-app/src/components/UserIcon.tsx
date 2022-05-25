import { useState } from "react";
import { Button, Dropdown, Nav } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authenticationService } from "../auth/AuthService";

interface IUserIcon {
    navItem?: boolean
}

function UserIcon(props: IUserIcon) {
    const navigate = useNavigate();

    if (authenticationService.currentUserValue && props.navItem)
        return (
            <Nav.Link>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-light"><strong><BiUserCircle /> {authenticationService.currentUserValue.userName}</strong></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Button variant="secondary" onClick={() => {
                            navigate("/profile");
                        }} >Profile</Button></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Button variant="danger" onClick={authenticationService.logout}>Logout</Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav.Link>
        );
    else if (authenticationService.currentUserValue && !props.navItem)
        return (
            <strong><BiUserCircle /> {authenticationService.currentUserValue.userName}</strong>
        );
    else if (!authenticationService.currentUserValue && props.navItem)
        return (
            <Nav.Link href="/login">
                <Button variant="outline-light"><strong>Login</strong></Button>
            </Nav.Link>
        );

    return (
        <strong>Login</strong>
    );
}

export default UserIcon;