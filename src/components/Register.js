import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "../Form.css";
import ChefWoman from "../images/woman-chef-kitchen-home.png";
import Footer from "./Footer";
import Styled from "styled-components";

const Img = Styled.img`
	align-self: flex-end;
    width: 323px;
    height: 285px;
@keyframes wiggle {
		0% {
			transform: translateY(250px);
		}
		10% {
			transform: translateY(50px);
		}
		20% {
			transform: translateY(180px);
		}
		30% {
			transform: translateY(50px);
		}
		40% {
			transform: translateY(180px);
		}
		50% {
			transform: translateY(100px);
		}
		60% {
			transform: translateY(100px);
		}
		70% {
			transform: translateY(160px);
		}
		80% {
			transform: translateY(190px);
		}
		90% {
			transform: translateY(190px);
		}
		100% {
			transform: skewX(0deg);
		}
	}
animation-name: wiggle;
animation-timing-function: ease-in;
animation-duration: 8s;
animation-iteration-count: 1;
overflow: hidden;
`;

const formSchema = yup.object().shape({
	username: yup.string().min(3, "Username must be at least 3 characters").required(),
	password: yup.string().required("Password is required"),
	passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Password must match"),
});

const initialFormValues = {
	username: "",
	passwordConfirmation: "",
};
const initialErrors = {
	username: "",
	passwordConfirmation: "",
};
const initialDisabled = true;

export default function Register() {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [errors, setErrors] = useState(initialErrors);
	const [buttonDisabled, setButtonDisabled] = useState(initialDisabled);
	const { push } = useHistory();

	useEffect(() => {
		formSchema.isValid(formValues).then((valid) => {
			setButtonDisabled(!valid);
		});
	}, [formValues]);

	const validateChange = (event) => {
		yup
			.reach(formSchema, event.target.name)
			.validate(event.target.value)
			.then(() => {
				setErrors({
					...errors,
					[event.target.name]: "",
				});
			})
			.catch((error) => {
				setErrors({
					...errors,
					[event.target.name]: error.errors,
				});
			});
	};

	const formSubmit = (event) => {
		event.preventDefault();
		axios
			.post("https://secret-family-recipes-703.herokuapp.com/api/users/register", {
				username: formValues.username,
				password: formValues.password,
			})
			.then((response) => {
				console.log("success");
				setFormValues(initialFormValues);
				push("/login");
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	const inputChange = (event) => {
		event.persist();

		const newFormData = {
			...formValues,
			[event.target.name]: event.target.value,
		};
		validateChange(event);
		setFormValues(newFormData);
	};

	return (
		<>
			<div className="register-header">
				<div className="header-logo"></div>
				<Img className="header-chef-woman" src={ChefWoman} alt="chef women" />
			</div>
			<div className="register-form-contianer">
				<h2> REGISTER </h2>
				<form onSubmit={formSubmit}>
					<div className="label-input-group">
						<label className="reg-label" htmlFor="username">
							Username&nbsp;&nbsp;&nbsp;
						</label>
						<input
							type="text"
							name="username"
							value={formValues.username}
							onChange={inputChange}
						/>
						<br />
					</div>
					{errors.username.length < 0 ? <p className="error">{errors.username}</p> : null}
					<br />
					<div className="label-input-group">
						<label className="reg-label" htmlFor="password">
							Password&nbsp;&nbsp;&nbsp;
						</label>
						<input
							type="password"
							name="password"
							value={formValues.password}
							onChange={inputChange}
						/>
					</div>
					<br />
					<div className="label-input-group">
						<label className="reg-label" htmlFor="passwordConfirmation">
							Confirm Password&nbsp;&nbsp;&nbsp;
						</label>
						<input type="password" name="passwordConfirmation" onChange={inputChange} /> <br />
					</div>
					{formValues.passwordConfirmation !== formValues.password ? (
						<p className="error">{errors.passwordConfirmation}</p>
					) : null}
					<p className="form-terms-text">
						By clicking on the register button you agree with Secret Family Recipes Terms &
						Conditions, Fair Use, forever and ever so help you God.
					</p>
					<button disabled={buttonDisabled} name="submit">
						REGISTER
					</button>
				</form>

				<a className="already-text" href="/login">
					Already Registered?
				</a>
			</div>
			<Footer />
		</>
	);
}
