import { useState } from "react";
import { validateEmail, validatePassword, validateUsername } from "../utils/validations";
import { registerUser } from "../utils/users";
import { useNotification } from "../hooks/NotificationContext";


const useRegisterViewModel = ({ navigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { showNotification } = useNotification()

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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid || Object.keys(errors).length !== 0) {
      showNotification('Arregla los campos con error antes de continuar', 'error')
      return
    }

    const response = await registerUser(formData)
    if (!response.isValid()) {
      showNotification(response.error || "Error desconocido al iniciar sesión", 'error')
      return;
    }

    showNotification(response.message, 'success')
  };

  return {
    onSubmit, formData, errors, handleChange
  }
}

export default useRegisterViewModel