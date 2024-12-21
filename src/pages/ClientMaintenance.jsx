// src/ClientMaintenance.jsx
import React, { useState } from 'react';

const ClientMaintenance = () => {
    const [clientData, setClientData] = useState({
        identificacion: '',
        nombre: '',
        apellidos: '',
        genero: '',
        fechaNacimiento: '',
        fechaAfiliacion: '',
        telefonoCelular: '',
        telefonoOtro: '',
        intereses: [],
        direccion: '',
        reseñaPersonal: ''
    });

    const [interesInput, setInteresInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData({
            ...clientData,
            [name]: value
        });
    };

    const handleInteresChange = (e) => {
        setInteresInput(e.target.value);
    };

    const addInteres = () => {
        if (interesInput && !clientData.intereses.includes(interesInput)) {
            setClientData(prev => ({
                ...prev,
                intereses: [...prev.intereses, interesInput]
            }));
            setInteresInput('');
        }
    };

    const removeInteres = (interes) => {
        setClientData(prev => ({
            ...prev,
            intereses: prev.intereses.filter(i => i !== interes)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Client Data Submitted:', clientData);
        // Here you would typically send the data to a server or API
    };

    return (
        <div>
            <h2>Client Maintenance</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Identificación:</label>
                    <input type="text" name="identificacion" value={clientData.identificacion} onChange={handleChange} required />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={clientData.nombre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Apellidos:</label>
                    <input type="text" name="apellidos" value={clientData.apellidos} onChange={handleChange} required />
                </div>
                <div>
                    <label>Género:</label>
                    <select name="genero" value={clientData.genero} onChange={handleChange} required>
                        <option value="">Seleccione...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div>
                    <label>Fecha de Nacimiento:</label>
                    <input type="date" name="fechaNacimiento" value={clientData.fechaNacimiento} onChange={handleChange} required />
                </div>
                <div>
                    <label>Fecha de Afiliación:</label>
                    <input type="date" name="fechaAfiliacion" value={clientData.fechaAfiliacion} onChange={handleChange} required />
                </div>
                <div>
                    <label>Teléfono Celular:</label>
                    <input type="tel" name="telefonoCelular" value={clientData.telefonoCelular} onChange={handleChange} required />
                </div>
                <div>
                    <label>Teléfono Otro:</label>
                    <input type="tel" name="telefonoOtro" value={clientData.telefonoOtro} onChange={handleChange} />
                </div>
                <div>
                    <label>Intereses:</label>
                    <input type="text" value={interesInput} onChange={handleInteresChange} />
                    <button type="button" onClick={addInteres}>Agregar Interés</button>
                    {clientData.intereses.length > 0 && (
                        <ul>
                            {clientData.intereses.map((interes, index) => (
                                <li key={index}>
                                    {interes}
                                    <button type="button" onClick={() => removeInteres(interes)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label>Dirección:</label>
                    <textarea name="direccion" value={clientData.direccion} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Reseña Personal:</label>
                    <textarea name="reseñaPersonal" value={clientData.reseñaPersonal} onChange={handleChange}></textarea>
                </div>

                <button type="submit">Actualizar Cliente</button>
            </form>

            {/* Display Client Data for Verification */}
            {Object.keys(clientData).length > 0 && (
                <>
                    <h3>Datos del Cliente:</h3>
                    <pre>{JSON.stringify(clientData, null, 2)}</pre>
                </>
            )}
        </div>
    );
};

export default ClientMaintenance;
