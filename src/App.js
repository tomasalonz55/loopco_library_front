import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import "./App.css";
import axios from "axios";
import { AuthContext } from "./context/auth";
import GlobalStyles from "./components/GlobalStyles";
import AddCategory from "./pages/AddCategory";

function App() {
	axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.defaults.headers.post["Accept"] = "application/json";
	const existingTokens = JSON.parse(localStorage.getItem("tokens"));
	const [authTokens, setAuthTokens] = useState(existingTokens);
	axios.defaults.headers.common = {
		Authorization: `Bearer ${existingTokens ? existingTokens["token"] : ""}`,
	};
	const setTokens = (data) => {
		localStorage.setItem("tokens", JSON.stringify(data));
		setAuthTokens(data);
	};
	return (
		<div className="App">
			<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
				<GlobalStyles />
				<Router>
					<div>
						<Nav existingTokens={existingTokens} />
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<PrivateRoute path="/admin" component={Admin} />
						<PrivateRoute path={["/editBook/:id"]} component={EditBook} />
						<PrivateRoute path="/addBook" component={AddBook} />
						<PrivateRoute path="/addCategory" component={AddCategory} />
					</div>
				</Router>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
