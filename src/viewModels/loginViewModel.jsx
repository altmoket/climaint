import { useEffect, useState, useCallback } from "react";
import { validatePassword, validateUsername } from "../utils/validations";
import { loginUser } from "../utils/users";
import { useNotification } from "../hooks/NotificationContext";

const useLoginViewModel = ({ dispatch, navigate }) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '', remember: false });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const { showNotification } = useNotification()

  const validateField = useCallback((name, value) => {
    if (name === 'username') {
      const validatedUsername = validateUsername(value);
      return validatedUsername.isValid() ? '' : validatedUsername.getErrors().join(', ');
    }
    if (name === 'password') {
      const validatedPassword = validatePassword(value);
      return validatedPassword.isValid() ? '' : validatedPassword.getErrors().join(', ');
    }
    return '';
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setUserInfo((prev) => ({ ...prev, [name]: fieldValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, fieldValue) }));
  };

  const isFormValid = !Object.values(errors).some((error) => error) &&
    userInfo.username &&
    userInfo.password;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      showNotification("Completa los campos con error antes de registrarte", 'error')
      return;
    }

    localStorage.setItem("remember", userInfo.remember);
    if (userInfo.remember) {
      localStorage.setItem("username", userInfo.username);
    } else {
      localStorage.removeItem("username");
    }

    try {
      const response = await loginUser({ username: userInfo.username, password: userInfo.password });
      if (!response.isValid()) {
        showNotification(response.error || "Error desconocido al iniciar sesión", 'error')
        return;
      }
      console.log(response)
      const { token, userid, expiration, username, message } = response;
      dispatch({ type: "SET_TOKEN", payload: token });
      dispatch({ type: "SET_USERID", payload: userid });
      dispatch({ type: "SET_ISLOGGED", payload: true });
      dispatch({ type: "SET_USERNAME", payload: username });

      showNotification(message, 'success')
      navigate("/")
    } catch (err) {
      console.error("Error inesperado:", err);
      showNotification("Error inesperado al iniciar sesión", 'error');
    }
  };

  useEffect(() => {
    if (localStorage.getItem("remember")) {
      const username = localStorage.getItem("username") || '';
      setUserInfo((prev) => ({ ...prev, username }));
    }
  }, []);

  return {
    userInfo,
    handleChange,
    onSubmit,
    errors,
  };
};

export default useLoginViewModel;
