import { BiUserCircle } from "react-icons/bi";
import { authenticationService } from "../auth/AuthService";

function UserIcon() {
    return (
        <strong>
            {authenticationService.currentUserValue ? (
                <>
                    <BiUserCircle /> {authenticationService.currentUserValue}
                </>
            ) : (<a href="/login">Login</a>)}
        </strong>
    )
}

export default UserIcon;