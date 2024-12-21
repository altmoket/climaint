import React from 'react';
import { useForm } from 'react-hook-form';

const Validation = (value, error = null) => {
  let errors = []
  return {
    getValue: () => value,
    getErrors: () => errors,
    isValid: () => errors.length === 0,
    chain: (fn) => {
      let result = fn(value)
      let newValue = result.getValue()
      if (errors || result.isValid()) {
        return Validation(newValue)
      }
      return Validation(newValue, [...errors, error])
    }
  }
}

const validateMinLength = (minLength) => (password) => {
  return password.length > minLength
    ? Validation(password)
    : Validation(password, `Password length must be greater than ${minLength}`)
}

const validateMaxLength = (maxLength) => (password) => {
  return password.length <= maxLength
    ? Validation(password)
    : Validation(password, `Password length must be less than or equal to ${maxLength}`)
}

const validateContainsNumber = (value) => {
  const hasNumber = /\d/;
  return hasNumber.test(value)
    ? Validation(value)
    : Validation(value, 'Password must contain at least one number')
};

const validateContainsUppercaseLetter = (value) => {
  const hasLetter = /[A-Z]/; // Check for at least one letter
  return hasLetter.test(value)
    ? Validation(value)
    : Validation(value, 'Password must contain at least one uppercase letter.')
};

const validateContainsLowercaseLetter = (value) => {
  const hasLetter = /[a-z]/; // Check for at least one letter
  return hasLetter.test(value)
    ? Validation(value)
    : Validation(value, 'Password must contain at least one lowercase letter.')
};

const validateEmail = (email) => {
  // Regular expression for validating an Email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email)
    ? Validation(email)
    : Validation(email, 'Invalid email format.');
};

const validatePassword = (password) => {
  const minLength = 8
  const maxLength = 20

  return Validation(password)
    .chain(validateMinLength(minLength))
    .chain(validateMaxLength(maxLength))
    .chain(validateContainsNumber)
    .chain(validateContainsUppercaseLetter)
    .chain(validateContainsLowercaseLetter)
}

function Register({ registerUser }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = ({ username, email, password }) => {
    console.log("Register")
    const validatedPassword = validatePassword(password)
    const validatedEmail = validateEmail(email)
    if (validatedEmail.isValid() && validatedPassword.isValid()) {
      registerUser({ username, email, password })
    }
    console.log([...validatedEmail.getErrors(), ...validatedPassword.getErrors()])
  };

  return (
    <>
      <p className="title">Register</p>
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Username' {...register("username", { required: true })} />
        {errors.username && <span style={{ color: "red" }}> *Username* is mandatory </span>}

        <input type="email" placeholder='Email' {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
        {errors.email && <span style={{ color: "red" }}> *Email* is mandatory </span>}

        <input type="password" placeholder='Password' {...register("password", { required: true })} />
        {errors.password && <span style={{ color: "red" }}> *Password* is mandatory </span>}

        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}

export default Register;