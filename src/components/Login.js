import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import Footer from "./Footer";
import Icon from "../images/SFRIcon.png";

const formSchema = yup.object().shape({
	username: yup.string().min(3, "Username must be at least 3 characters").required(),
	password: yup.string().required("Password is required"),
});

const initialFormValues = {
	username: "",
	password: "",
};
const initialErrors = {
	username: "",
	password: "",
};
const initialDisabled = true;

export default function Login() {
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
			.post("https://secret-family-recipes-703.herokuapp.com/api/users/login", formValues)
			.then((response) => {
				console.log("success");
				setFormValues(initialFormValues);
				localStorage.setItem("token", response.data.token);
				push("/recipes");
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
			<div className="login-header">
				<img src={Icon} alt="Secret Family Recipes Icon" />
				<h1> SECRET FAMILY RECIPES </h1>
			</div>
			<div className="login-form-contianer">
				<h2>Welcome Back!</h2>
				<h2> LOGIN </h2>
				<form onSubmit={formSubmit}>
					<div className="label-input-group">
						<label className="login-label" htmlFor="username">
							Username&nbsp;&nbsp;&nbsp;
						</label>
						<input
							type="text"
							name="username"
							value={formValues.username}
							onChange={inputChange}
						/>
						{errors.username.length < 0 ? <p className="error">{errors.username}</p> : null}
					</div>
					<br />
					<div className="label-input-group">
						<label className="login-label" htmlFor="password">
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
					<button disabled={buttonDisabled} name="submit">
						LOGIN
					</button>
				</form>
			</div>
			<Footer />
		</>
	);
}
