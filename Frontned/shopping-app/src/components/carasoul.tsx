import { useState } from "react";
import { Carousel } from "react-bootstrap";
import { IItem } from "../auth/Typings";
import config from "../config/config";

interface IProps {
	items: Array<IItem>
}

export function Carasoul(props: IProps) {
	const [index, setIndex] = useState(0);

	const handleSelect = (i: number, e: any) => {
		setIndex(i);
	};

	return (
		<>
			<Carousel activeIndex={index} onSelect={handleSelect}>
				{props.items.length > 0 && props.items.map((item) => {
					return (
						<Carousel.Item>
								<img
									className="d-block w-100 carousel-img"
									src={item.image}
									alt={item.name}
									height={512}
									width={512}
								/>
							<Carousel.Caption>
								<h3 className="item-name" > <strong>{item.name}</strong> </h3>
								<h5 className="item-name" ><strong>{item.description}</strong></h5>
							</Carousel.Caption>
						</Carousel.Item>
					)
				})
				}
			</Carousel>
		</>
	)
}
