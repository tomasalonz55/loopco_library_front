import React, { useEffect, useState } from "react";
import axios from "axios";

import {
	Card,
	Form,
	Input,
	Button,
	Error,
	Select,
} from "../components/AuthForms";
import { booksURL, categoriesURL } from "../api";
import { useHistory, useLocation } from "react-router-dom";

function EditBook(props) {
	const location = useLocation();
	const pathId = location.pathname.split("/")[2];
	const [isError, setIsError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState("");
	const [author, setAuthor] = useState("");
	const [category_id, setCategoryID] = useState("");
	const [publication_date, setPublucationDate] = useState("");
	const [image, setImage] = useState("");
	const [categoryName, setCategoryName] = useState("Select a Category");
	const user_id = "";
	let history = useHistory();

	const [categories, setCategories] = useState({
		loading: true,
		categories: null,
	});

	const loadCategories = async () => {
		const categoriesData = await axios.get(categoriesURL());
		setCategories({ loading: false, categories: categoriesData.data });
	};
	const loadCurrentBook = async () => {
		const currentBookData = await axios.get(`${booksURL()}/${pathId}`);
		// setCurrentBook({ loading: true, book: currentBookData.data });
		setName(currentBookData.data.name);
		setAuthor(currentBookData.data.author);
		setCategoryID(currentBookData.data.category_id);
		setPublucationDate(currentBookData.data.publication_date);
		setImage(currentBookData.data.image);
		setCategoryName(currentBookData.data.category.name);
		setLoading(false);
	};
	useEffect(() => {
		loadCategories();
		loadCurrentBook();
	}, []);

	const putBook = async (e) => {
		e.preventDefault();
		try {
			const booksData = await axios.put(`${booksURL()}/${pathId}`, {
				name,
				author,
				category_id,
				publication_date,
				image,
			});
			if (booksData) {
				history.push("/admin");
			}
		} catch (error) {
			setIsError(true);
			console.log(error);
		}
	};

	const handleChange = (e) => {
		setCategoryName(e.target.value);
		setCategoryID(e.target.value);
		console.log(categoryName);
	};

	return (
		<Card>
			<h2>Edit a Book</h2>
			{!loading && (
				<Form onSubmit={putBook}>
					<Input
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						placeholder="Name"
						required
					/>
					<Input
						type="text"
						value={author}
						onChange={(e) => {
							setAuthor(e.target.value);
						}}
						placeholder="Author"
						required
					/>
					<p>Pick the category:</p>
					<Select required onChange={handleChange}>
						<option selected value={category_id}>
							{categoryName}
						</option>
						{!categories.loading &&
							categories.categories.map((categorie) => (
								<option value={categorie.id}>{categorie.name}</option>
							))}
					</Select>

					<p>Publication Date</p>
					<Input
						type="date"
						value={publication_date}
						onChange={(e) => {
							setPublucationDate(e.target.value);
						}}
						required
					/>
					<Input
						type="text"
						value={image}
						onChange={(e) => {
							setImage(e.target.value);
						}}
						placeholder="Image Link"
						required
					/>
					<Button type="submit">Update Book</Button>
				</Form>
			)}
			{isError && <Error>Error on operation</Error>}
		</Card>
	);
}

export default EditBook;
