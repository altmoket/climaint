import { useState } from "react";
import { validateEmail, validatePassword, validateUsername } from "../utils/validations";
import { registerUser } from "../utils/users";


const useRegisterViewModel = ({ navigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'email') {
      const validatedEmail = validateEmail(value);
      setErrors({
        ...errors,
        email: !validatedEmail.isValid() ? validatedEmail.getErrors().join(', ') : null
      });
    }

    if (name === 'password') {
      const validatedPassword = validatePassword(value);
      setErrors({
        ...errors,
        password: !validatedPassword.isValid() ? validatedPassword.getErrors().join(', ') : null
      });
    }

    if (name === 'username') {
      const validatedUsername = validateUsername(value)
      setErrors({
        ...errors,
        username: !validatedUsername.isValid() ? validatedUsername.getErrors().join(', ') : null
      });
    }
  };

  const isFormValid =
    !errors.username &&
    !errors.email &&
    !errors.password &&
    formData.username &&
    formData.email &&
    formData.password;

  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      if (Object.keys(errors).length === 0) {
        registerUser(formData)
          .then((data) => {
            navigate('/login', { state: { message: "Se ha registrado correctamente" } });
          })
          .catch((err) => console.error(err));
      }
    } else {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  return {
    onSubmit, formData, errors, handleChange, showNotification
  }
}

export default useRegisterViewModel