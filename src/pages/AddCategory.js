import React, { useState } from "react";
import axios from "axios";

import { Card, Form, Input, Button, Error } from "../components/AuthForms";
import { categoriesURL } from "../api";
import { useHistory } from "react-router-dom";

function AddCategory(props) {
	const [isError, setIsError] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	let history = useHistory();

	const postCategory = async (e) => {
		e.preventDefault();

		try {
			const categoryData = await axios.post(categoriesURL(), {
				name,
				description,
			});
			if (categoryData) {
				history.push("/admin");
			}
		} catch (error) {
			setIsError(true);
			console.log(error);
		}
	};

	return (
		<Card>
			<h2>Create a new Category</h2>
			<Form onSubmit={postCategory}>
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
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					placeholder="Description"
					required
				/>

				<Button type="submit">Create Category</Button>
			</Form>
			{isError && <Error>Error on operation</Error>}
		</Card>
	);
}

export default AddCategory;
