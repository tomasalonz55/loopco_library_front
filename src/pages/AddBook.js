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
import { useHistory } from "react-router-dom";

function AddBook(props) {
	const [isError, setIsError] = useState(false);
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
	useEffect(() => {
		loadCategories();
	}, []);

	const postBooks = async (e) => {
		e.preventDefault();
		try {
			const booksData = await axios.post(booksURL(), {
				name,
				author,
				category_id,
				publication_date,
				user_id,
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
		setCategoryID(e.target.value);
	};

	return (
		<Card>
			<h2>Create a new Book</h2>
			<Form onSubmit={postBooks}>
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
					<option selected value="">
						Select a Category
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
				<Button type="submit">Create Book</Button>
			</Form>
			{isError && <Error>Error on operation</Error>}
		</Card>
	);
}

export default AddBook;
