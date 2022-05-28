import { Button } from 'react-bootstrap';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

interface IToggleProps {
	theme: any
	toggleTheme: any,
}

const Toggle = (props: IToggleProps) => {
	return (
		<Button className="fab-item" style={{fontSize: 24}} variant={props.theme == "light" ? "dark" : "light"} onClick={() => { props.toggleTheme() }} >
			{props.theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
		</Button>
	);
};

export default Toggle;