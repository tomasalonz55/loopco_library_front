import React, { useEffect, useState } from "react";
//Styling and Animation
import styled from "styled-components";
import { Card } from "../components/AuthForms";
// import { motion } from "framer-motion";
import Modal from "react-modal";
import { Link, useHistory } from "react-router-dom";
import { customModalStyles } from "../components/AuthForms";
import axios from "axios";
import { booksURL, userURL } from "../api";

const Book = ({
	bookName,
	bookImage,
	bookAuthor,
	bookPublicationDate,
	bookCategoryId,
	bookUser,
	bookId,
	loadBooks,
	categoryName,
	userName,
}) => {
	const [user, setUser] = useState({
		loading: true,
		user: null,
	});

	const loadUser = async () => {
		const userData = await axios.get(userURL());
		setUser({ loading: false, user: userData.data.id });
	};
	useEffect(() => {
		loadUser();
	}, []);

	//MODAL
	var subtitle;
	const [modalIsOpen, setIsOpen] = useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = "#2b2928";
	}

	function closeModal() {
		setIsOpen(false);
	}
	//Fin Modal
	const putUserID = async (action) => {
		let user_id = null;
		if (action === "borrow") {
			user_id = user.user;
		} else if (action === "return") {
			user_id = "";
		}

		try {
			const succes = await axios.put(`${booksURL()}/${bookId}`, {
				user_id,
			});
			if (succes) {
				closeModal();
				loadBooks();
			}
		} catch (error) {
			alert(error);
			console.log(error);
		}
	};
	const handleBorrow = () => {
		putUserID("borrow");
	};
	const handleReturn = () => {
		putUserID("return");
	};
	return (
		<>
			<StyledBook>
				<Link onClick={openModal}>
					<h3>{bookName}</h3>
					<p>{bookAuthor}</p>

					<img src={bookImage} alt={bookName} />
				</Link>
			</StyledBook>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customModalStyles}
				contentLabel="Book Modal"
			>
				<Card>
					<h1 ref={(_subtitle) => (subtitle = _subtitle)}>{bookName}</h1>
					{/* <button onClick={closeModal}>close</button> */}
					<p>Author: {bookAuthor}</p>
					<p>Publication Date: {bookPublicationDate}</p>
					<p>Category: {categoryName}</p>
					{bookUser ? (
						<>
							<p>User Has Borrow: {userName}</p>
							{user.user === bookUser && (
								<Button onClick={handleReturn}> Return Book</Button>
							)}
						</>
					) : (
						<>
							{!user.loading && (
								<Button onClick={handleBorrow}>Borrow Book</Button>
							)}
						</>
					)}
					<Link to={`/editBook/${bookId}`}>
						<Button>Edit Book</Button>
					</Link>
				</Card>
			</Modal>
		</>
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
const Button = styled.button`
	border: 2px solid black;
	background-color: #ffffff;
	color: black;
	padding: 10px 20px;
	font-size: 1rem;
	width: 10rem;
	border-color: #2b2928;
	color: #2b2928;
	transition: ease-in 0.5s;
	&:hover {
		cursor: pointer;
		background-color: #8fd1c0;
	}
`;

export default Book;
