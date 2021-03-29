import React, { useState, useEffect } from "react";
import axios from "axios";

import { booksURL } from "../api";
import styled from "styled-components";
import Book from "../components/Book";
import { Link } from "react-router-dom";

function Admin(props) {
	const [appState, setAppState] = useState({
		loading: true,
		books: null,
	});
	const loadBooks = async () => {
		const booksData = await axios.get(booksURL());
		setAppState({ loading: false, books: booksData });
	};
	useEffect(() => {
		loadBooks();
	}, [setAppState]);
	return (
		<div>
			<Link to="/addBook">
				<Button>New Book</Button>
			</Link>{" "}
			<Link to="/addCategory">
				<Button>New Category</Button>
			</Link>
			<BookList>
				{!appState.loading && (
					<div>
						<h2>List of Books</h2>
						<Books>
							{appState.books.data.data.map((book) => (
								<Book
									name={book.name}
									image={book.image}
									author={book.author}
									publication_date={book.publication_date}
									category_id={book.category_id}
									key={book.id}
									id={book.id}
								></Book>
							))}
						</Books>
					</div>
				)}
			</BookList>
			<br />
			<br />
		</div>
	);
}

const BookList = styled.div`
	padding: 0rem 5rem;
	h2 {
		padding: 2rem 0rem;
	}
`;

const Books = styled.div`
	min-height: 80vh;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-column-gap: 3rem;
	grid-row-gap: 5rem;
`;

const Button = styled.button`
	border: 2px solid black;
	background-color: #ffffff;
	margin-top: 0.5rem;
	color: black;
	padding: 10px 20px;
	font-size: 1rem;
	border-color: #2b2928;
	color: #2b2928;
	transition: ease-out 0.5s;
	&:hover {
		cursor: pointer;
		background-color: #8fd1c0;
	}
`;

export default Admin;
