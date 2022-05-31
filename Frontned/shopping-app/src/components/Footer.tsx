interface IProps {
	className?: string
}

function Footer(props: IProps) {
	return (
		<footer className={`page-footer ${props.className}`}>
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