import './../css/App.css';
import { ethers } from 'ethers';
import { React, useState, useEffect } from 'react';
import TokenArtifact from "../contracts/Token.json";
import Login from './Login';
import AdminView from './AdminView';
import UserView from './UserView';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
    const [properties, setProperties] = useState([]);
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [area, setArea] = useState("");
    const [owner, setOwner] = useState("");
    const [newOwners, setNewOwners] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userAddress, setUserAddress] = useState(null);

    const setupContract = async () => {
        try {
            if (window.ethereum == null) {
                throw new Error("Usuário não autorizado!");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, TokenArtifact.abi, signer);
            setUserAddress(signer.address);
            return {contract, signer};
        } catch (error) {
            throw new Error(error.reason || error.revert?.args?.[0] || "Usuário não autorizado!");
        }
    };

    // Fetch deployed properties
    const fetchProperties = async () => {
        try {
            const { contract, } = await setupContract();
            const [ids, categories, locations, areas, owners] = await contract.getDeployedContracts();
            const properties = ids.map((id, index) => ({
                id,
                category: categories[index],
                location: locations[index],
                area: areas[index],
                owner: owners[index]
            }));
            setProperties(properties);
        } catch (error) {
            console.error("Erro ao buscar propriedades:", error);
        }
    };

    // Create a new property
    const createProperty = async (category, location, area, owner) => {
        if (category === "" || location === "" || area === "" || owner === "") return;
        try {
            const { contract, } = await setupContract();
            const tx = await contract.createProperty(category, location, parseInt(area), owner);
            await tx.wait();
        } catch (error) {
            console.error("Erro ao criar propriedade:", error);
        }
    };

    // Sell a property
    const sellProperty = async (id, newOwner) => {
        try {
            const { contract, } = await setupContract();
            const tx = await contract.sellProperty(id, newOwner);
            await tx.wait();
        } catch (error) {
            console.error("Erro ao vender propriedade:", error);
        }
    };

    const handleNewOwnerChange = (id, value) => {
        setNewOwners(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleLogin = async () => {
        try {
            const { contract, signer } = await setupContract();
            const address = signer.address;
            setIsLoggedIn(true);
            const isAdmin = await contract.isAdmin(address);
            console.log(isAdmin, address);
            setIsAdmin(isAdmin);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchProperties();

            const listenToEvents = async () => {
                const { contract, } = await setupContract();

                contract.on("PropertyCreated", (id, category, location, area, owner) => {
                    setProperties(prevProperties => [
                        ...prevProperties,
                        { id, category, location, area: parseInt(area), owner }
                    ]);
                });

                contract.on("PropertySold", (id, previousOwner, newOwner) => {
                    setProperties(prevProperties =>
                        prevProperties.map(property =>
                            property.id === id
                                ? { ...property, owner: newOwner }
                                : property
                        )
                    );
                });
            };

            listenToEvents();

            return () => {
                const removeEventListener = async () => {
                    const { contract, } = await setupContract();
                    contract.removeListener("PropertyCreated");
                    contract.removeListener("PropertySold");
                };
                removeEventListener();
            };
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    if (isAdmin) {
        return (
            <AdminView
                properties={properties}
                createProperty={createProperty}
                onLogout={handleLogout}
            />
        );
    }

    return (
        <UserView
            properties={properties}
            sellProperty={sellProperty}
            onLogout={handleLogout}
            //userAddress={userAddress}
        />
    );
}

export default App;