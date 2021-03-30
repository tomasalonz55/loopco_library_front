import React from "react";
import styled from "styled-components";

function Home(props) {
	return (
		<Card>
			<h2>Welcome to the library App!</h2>
			<p>You can go to Admin Page in the header section</p>
			<p>Then please log in or create your user account</p>
			<p>Enjoy!</p>
		</Card>
	);
}

const Card = styled.div`
	margin-top: 3rem;
	padding: 0rem 5rem;
	h2 {
		padding: 2rem 0rem;
	}
	p {
		font-size: 2rem;
		color: #7bb4a6;
	}
`;

export default Home;
