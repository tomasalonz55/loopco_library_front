import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/auth";

const Nav = ({ existingTokens }) => {
	const { setAuthTokens } = useAuth();

	function logOut() {
		setAuthTokens();
		localStorage.removeItem("tokens");
	}
	return (
		<StyledNav>
			<h1>
				<Link id="Logo" to="/">
					Library
				</Link>
			</h1>
			<ul>
				<li>
					<Link to="/">Home Page</Link>
				</li>
				<li>
					<Link to="/admin">Admin Page</Link>
				</li>
				{existingTokens && (
					<li>
						<Button onClick={logOut}>Log out</Button>
					</li>
				)}
			</ul>
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	min-height: 10vh;
	display: flex;
	margin: auto;
	font-family: "Sofia Pro", cursive;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 10rem;
	background-color: #2b2928;
	position: sticky;
	top: 0;
	z-index: 10;
	a {
		color: white;
		text-decoration: none;
	}
	ul {
		display: flex;
		list-style: none;
		align-items: center;
	}
	#Logo {
		font-size: 1.5rem;
		font-family: "Sofia Pro", cursive;
		font-weight: lighter;
	}
	li {
		padding-left: 7rem;
		position: relative;
	}
	@media (max-width: 1300px) {
		flex-direction: column;
		padding: 0.5rem 0.5rem;
		#Logo {
			display: inline-block;
			margin: 0.5rem;
		}
		ul {
			padding: 0.5rem;
			justify-content: space-around;
			width: 100%;
			li {
				padding: 0;
			}
		}
	}
`;

const Button = styled.button`
	border: 2px solid black;
	background-color: #2b2928;
	color: black;
	padding: 10px 20px;
	font-size: 1rem;
	border-color: #8fd1c0;
	color: #8fd1c0;
	&:hover {
		cursor: pointer;
	}
`;

export default Nav;
