import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";
import ClientForm from "../components/ClientForm";
import LoadingScreen from "../components/LoadingScreen";
import useClientMantenanceViewModel from "../viewModels/clientMaintenanceViewModel";

const ClientMaintenance = () => {
    const { state } = useGlobalContext();
    const location = useLocation();
    const navigate = useNavigate();

    const { loading,
        client,
        interests,
        handleSubmit,
        setClient
    } = useClientMantenanceViewModel({ token: state.token, userId: state.userId, clientId: location.state?.clientId, navigate })

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <ClientForm
            client={client}
            interests={interests}
            onSubmit={handleSubmit}
            setClient={setClient}
        />
    );
};



export default ClientMaintenance;
