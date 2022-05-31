import { Card, Container } from "react-bootstrap";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
import Title from "../components/Title";

function AboutPage() {
	return (
		<>
			<Bar />
			<Title title="About Us" color="#998b2e" />

			<Container fluid className="d-flex align-items-center justify-content-center">
				<Card style={{ width: '100rem' }}>
					<Card.Img src="rainforestPanerama.jpg" height={512} />
					<Card.Header></Card.Header>
					<Card.Body>
						<div>

							<span className="about-text-header"><strong>Who we are</strong></span><br /><span className="about-text" id="about-wwa">Rainforest is a state of the art shopping experience designed to effortlessly meet each customer's personalized shopping habits. From wallets to dog food rainforest helps you make complex decisions easily by showing side by side comparisons of competitors, easy search by tag or title, and free 1 day shipping on many items</span>
							<br />
							<span className="about-text-header"><strong>What we believe</strong></span><br /><span className="about-text" id="about-wwb">Rainforest believes that we only succeed by giving our customers exactly what they want. We believe that the customer is the most important part of our business and strive everyday to show our customer we mean it.</span>
							<br />
							<span className="about-text-header"><strong>Where we're going</strong></span><br /><span className="about-text" id="about-wwg">Rainforest has it's sights high. We believe our place extends past shopping for toys and shoes to every aspect of our customers lives, from security to home maintenance, from car insurance to cable tv. Rainforest is building a one of a kind environment that will bridge the gap between the web commerce and every other part of our consumer's live.</span>
							<br />
							<span className="about-text-header"><strong>Fun fact:</strong></span>
							<ul className="about-text">
								<li>
									<a>Rainforest</a> is completely carbon neutral
								</li>
								<li>
									<a>Rainforest</a> has donated 1.4MM towards sustainable practices for our worlds rain forests like the Amazon
								</li>
								<li>
									<a>Rainforest</a> delivers 300K packages every month across every state and 141 countries and territories
								</li>
							</ul>
						</div>
					</Card.Body>
				</Card>
			</Container>
			<Footer />
		</>
	)
}

export default AboutPage;