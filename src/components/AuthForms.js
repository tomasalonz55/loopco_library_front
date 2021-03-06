import styled from "styled-components";

const Card = styled.div`
	box-sizing: border-box;
	max-width: 410px;
	margin: 0 auto;
	padding: 0 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Input = styled.input`
	padding: 1rem;
	border: 1px solid #999;
	margin-bottom: 1rem;
	font-size: 0.8rem;
`;

const Select = styled.select`
	padding: 1rem;
	border: 1px solid #999;
	margin-bottom: 1rem;
	font-size: 0.8rem;
`;

const Button = styled.button`
	background: linear-gradient(to bottom, #7cb6a7, #8fd1c0);
	border-color: #8fd1c0;
	border-radius: 3px;
	padding: 1rem;
	color: white;
	font-weight: 700;
	width: 100%;
	margin-bottom: 1rem;
	font-size: 0.8rem;
	&:hover {
		cursor: pointer;
	}
`;

const Logo = styled.img`
	width: 50%;
	margin-bottom: 1rem;
`;

const Error = styled.div`
	background-color: red;
`;

const customModalStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

export { Form, Input, Button, Logo, Card, Error, Select, customModalStyles };
