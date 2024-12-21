import React from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../context/globalContext';
import userService from '../services/userService';

function Login() {
  const service = userService()
  const { dispatch } = useGlobalContext()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    service.loginUser(data).then(({ token, userid }) => {
      dispatch({ type: 'SET_TOKEN', payload: token })
      dispatch({ type: 'SET_USERID', payload: userid })
      console.log("Login successful")
    })
  };
  return (
    <>
      <p className="title">Login Form</p>
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Username' {...register("username", { required: true })} />
        {errors.email && <span style={{ color: "red" }}> *Email* is mandatory </span>}

        <input type="password" placeholder='Password' {...register("password", { required: true })} />
        {errors.password && <span style={{ color: "red" }}> *Password* is mandatory </span>}

        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}

export default Login;
