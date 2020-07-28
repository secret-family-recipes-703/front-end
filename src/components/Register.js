import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import axios from "axios";
import * as yup from "yup";

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
	const {push} = useHistory()

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
				password: formValues.password
			})
			.then((response) => {
				console.log("success");
				setFormValues(initialFormValues);
				push('/login')
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
		<div className="reister-form-contianer">
			<h2> Register </h2>
			<form onSubmit={formSubmit}>
				<label htmlFor="username">
					Username&nbsp;
					<input
						type="text"
						name="username"
						value={formValues.username}
						onChange={inputChange}
					/>
					{errors.username.length < 0 ? <p className="error">{errors.username}</p> : null}
				</label>
				<br />
				<label htmlFor="password">
					Password&nbsp;
					<input
						type="password"
						name="password"
						value={formValues.password}
						onChange={inputChange}
					/>
				</label>
				<br />
				<label htmlFor="passwordConfirmation">
					Confirm Password&nbsp;
					<input type="password" name="passwordConfirmation" onChange={inputChange} />
					{formValues.passwordConfirmation !== formValues.password ? (
						<p className="error">{errors.passwordConfirmation}</p>
					) : null}
				</label>
				<br />
				<button disabled={buttonDisabled} name="submit">
					Submit
				</button>
			</form>
		</div>
	);
}
