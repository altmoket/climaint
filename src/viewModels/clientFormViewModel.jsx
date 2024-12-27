import { useState } from "react";


const useClientFormViewModel = ({ client, setClient, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const validations = [
      { field: "nombre", maxLength: 50 },
      { field: "apellidos", maxLength: 100 },
      { field: "identificacion", maxLength: 20 },
      { field: "celular", maxLength: 20 },
      { field: "otroTelefono", maxLength: 20 },
      { field: "direccion", maxLength: 200 },
      { field: "sexo", validValues: ["M", "F"] },
      { field: "resennaPersonal", maxLength: 200 },
      { field: "fNacimiento" },
      { field: "fAfiliacion" },
      { field: "interesFK" }
    ];

    validations.forEach(({ field, maxLength, validValues }) => {
      if (!client[field]) {
        newErrors[field] = `${labelFor(field)} es requerido(a)`;
      } else if (maxLength && client[field]?.length > maxLength) {
        newErrors[field] = `${labelFor(field)} no puede superar los ${maxLength} caracteres`;
      } else if (validValues && !validValues.includes(client[field])) {
        newErrors[field] = `${labelFor(field)} debe ser 'M' o 'F'`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const labelFor = (field) => {
    const labels = {
      nombre: "El nombre",
      apellidos: "Los apellidos",
      identificacion: "La identificación",
      celular: "El teléfono celular",
      otroTelefono: "El teléfono adicional",
      direccion: "La dirección",
      sexo: "Sexo",
      resennaPersonal: "La reseña personal",
      fNacimiento: "La fecha de nacimiento",
      fAfiliacion: "La fecha de afiliación",
      interesFK: "El interés"
    };
    return labels[field] || field;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(client);
    }
  };

  return { validateForm, handleFormSubmit, errors, handleChange }
}

export default useClientFormViewModel