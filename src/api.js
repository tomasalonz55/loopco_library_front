//Base URL
const base_url = "http://localhost:8000/api/";

//Books
const books = `books`;

//Categories
const categories = `categories`;

export const booksURL = () => `${base_url}${books}`;
export const categoriesURL = () => `${base_url}${categories}`;
