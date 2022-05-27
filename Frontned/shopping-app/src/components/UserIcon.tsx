import { useEffect } from "react";
import { Button, Dropdown, Nav } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { IUser } from "../auth/Typings";
import { logout, refreshUser } from "../auth/UserService";
import { useStickyState } from "../state/stickyState";

interface IUserIcon {
    navItem?: boolean
}

function UserIcon(props: IUserIcon) {
    const navigate = useNavigate();
    const [user] = useStickyState(null, 'user');

    // Refresh login
    useEffect(() => {
        refreshUser();
    }, [])

    if (user && props.navItem)
        return (
            <Nav.Link>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-light"><strong><BiUserCircle /> {(user as IUser).userName}</strong></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Button variant="secondary" onClick={() => {
                            navigate("/profile");
                        }} >Profile</Button></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Button variant="danger" onClick={() => {
                                logout();
                            }}>Logout</Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav.Link>
        );
    else if (user && !props.navItem)
        return (
            <strong><BiUserCircle /> {(user as IUser).userName}</strong>
        );
    else if (!user && props.navItem)
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