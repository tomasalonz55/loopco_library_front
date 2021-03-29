import React from "react";
//Styling and Animation
import styled from "styled-components";
// import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const Book = ({ name, image, author, publication_date, category_id, id }) => {
	return (
		<StyledBook>
			<Link to={`/book/${id}`}>
				<h3>{name}</h3>
				<p>{author}</p>

				<img src={image} alt={name} />
			</Link>
		</StyledBook>
	);
};

const StyledBook = styled.div`
	min-height: 30vh;
	box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
	text-align: center;
	border-radius: 1rem;
	cursor: pointer;
	overflow: hidden;

	img {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
		width: 50%;
		height: 40vh;
		object-fit: contain;
	}
`;

export default Book;
