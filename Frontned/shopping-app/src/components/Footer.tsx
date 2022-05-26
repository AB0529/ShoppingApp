import { Container } from "react-bootstrap";

import './css/footer.scss';

function Footer() {
	return (
		<footer className='text-center text-lg-left footer-wrapper'>
			<div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
				&copy; {new Date().getFullYear()} Copyright:{' '}
				<a href='https://rainforest.com/'>
					Rainforest.com
				</a>
			</div>
		</footer>
	)
}

export default Footer;