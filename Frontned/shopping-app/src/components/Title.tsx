interface IProps {
	title: string,
	color: string
}

function Title(props: IProps) {
	return (
		<div className="d-flex align-items-center justify-content-center">
			<h1 className="title">
				<strong> {props.title} </strong>
				<hr className="title-line" style={{ borderColor: props.color }} />
			</h1>
		</div>
	)
}

export default Title;