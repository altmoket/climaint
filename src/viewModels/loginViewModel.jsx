import { useEffect, useState } from "react";
import { validatePassword, validateUsername } from "../utils/validations";
import { loginUser } from "../utils/users";


const useLoginViewModel = ({ dispatch, navigate }) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');
  const [loginError, setLoginError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: type === 'checkbox' ? checked : value
    });

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
    !errors.password &&
    userInfo.username &&
    userInfo.password;

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      localStorage.setItem("remember", userInfo.remember);

      if (userInfo.remember) {
        localStorage.setItem("username", userInfo.username);
      } else {
        localStorage.removeItem('username');
      }

      loginUser({ username: userInfo.username, password: userInfo.password })
        .then(({ data }) => {
          console.log(data)
          const { token, userid } = data;
          dispatch({ type: 'SET_TOKEN', payload: token });
          dispatch({ type: 'SET_USERID', payload: userid });
          dispatch({ type: 'SET_ISLOGGED', payload: true });
          dispatch({ type: 'SET_USERNAME', payload: userInfo.username });

          setLoginMessage("Se ha logueado satisfactoriamente")

          setTimeout(() => {
            navigate('/');
          }, 2000);
        })
        .catch(err => {
          console.error(err);
          setLoginError('Nombre de usuario o contraseña incorrectos');
        });
    } else {
      setLoginError("Completa los campos con error antes de registrarte")
    }
  };

  useEffect(() => {
    if (localStorage.getItem('remember')) {
      const username = localStorage.getItem('username') || '';
      setUserInfo(prev => ({ ...prev, username }));
    }
  }, []);

  return {
    userInfo,
    handleChange,
    onSubmit,
    loginMessage,
    loginError,
    errors,
  };
}

export default useLoginViewModel