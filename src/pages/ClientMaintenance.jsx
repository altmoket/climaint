import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Alert, Card, CardContent, CardHeader } from "@mui/material";
import { useGlobalContext } from "../context/globalContext";
import { getInterests, formatDate, getClient, updateClient, createClient } from "../utils/clientUtils";
import ClientForm from "../components/ClientForm";
import LoadingScreen from "../components/LoadingScreen";

const initialClientState = {
    identificacion: "",
    nombre: "",
    apellidos: "",
    celular: "",
    otroTelefono: "",
    direccion: "",
    fNacimiento: "",
    fAfiliacion: "",
    sexo: "",
    resennaPersonal: "",
    imagen: "",
    interesFK: "",
};

const mapClientData = (data) => ({
    identificacion: data.identificacion || "",
    nombre: data.nombre || "",
    apellidos: data.apellidos || "",
    celular: data.telefonoCelular || "",
    otroTelefono: data.otroTelefono || "",
    direccion: data.direccion || "",
    fNacimiento: formatDate(data.fNacimiento),
    fAfiliacion: formatDate(data.fAfiliacion),
    sexo: data.sexo ? data.sexo.toUpperCase() : "",
    resennaPersonal: data.resenaPersonal || "",
    imagen: data.imagen || "",
    interesFK: data.interesesId || "",
});

const ClientMaintenance = () => {
    const [interests, setInterests] = useState([]);
    const [error, setError] = useState(null);
    const [client, setClient] = useState(initialClientState);
    const { state } = useGlobalContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // This controls both loading states

    useEffect(() => {
        if (state.token && state.userId) {
            fetchInterests(state.token);
            if (location.state?.clientId) {
                fetchClient({ token: state.token, userId: state.userId }, location.state.clientId);
            }
        }
    }, [state.token, state.userId, location.state]);

    const fetchInterests = async (token) => {
        try {
            const data = await getInterests(token);
            setInterests(data);
        } catch {
            setError("Failed to fetch interests");
        }
    };

    const fetchClient = async ({ token, userId }, clientId) => {
        try {
            setLoading(true);
            const data = await getClient({ token, userId }, { idCliente: clientId });
            setClient(mapClientData(data));
        } catch (error) {
            console.error("Error fetching client:", error);
            setError("Failed to fetch client data");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (updatedClient) => {
        setLoading(true);
        try {
            if (location.state?.clientId) {
                await updateClient({ token: state.token, userId: state.userId }, { ...updatedClient, id: location.state.clientId });
            } else {
                await createClient({ token: state.token, userId: state.userId }, updatedClient);
            }
            setLoading(false);
            navigate("/client-consult");
        } catch (error) {
            console.error("Error saving client:", error);
            setError("Failed to save client data");
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Card sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
            <ClientForm
                client={client}
                interests={interests}
                onSubmit={handleSubmit}
                setClient={setClient} />
        </Card>
    );
};



export default ClientMaintenance;
