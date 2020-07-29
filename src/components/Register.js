import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "../App.css";
import "../Form.css";
import ChefWoman from "../images/woman-chef-kitchen-home.png";
import Logo from "../images/SFRLogo.png";
import Footer from "./Footer";

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
				<img className="header-chef-woman" src={ChefWoman} alt="chef women" />
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
