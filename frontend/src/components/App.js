import './../css/App.css';
import { ethers } from 'ethers';
import { React, useState, useEffect, useRef } from 'react';
import TokenArtifact from "../contracts/Token.json";
import Login from './Login';
import AdminView from './AdminView';
import UserView from './UserView';

const contractAddress = "0x94472750B8668b49D6900634884E40eE91D0EA3b";

function App() {
    const [properties, setProperties] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userAddress, setUserAddress] = useState(null);
    
    // Ref to store the contract and signer once set
    const contractRef = useRef(null);

    const setupContract = async () => {
        try {
            if (window.ethereum == null) {
                throw new Error("Usuário não autorizado!");
            }

            // Request account access if not already authorized
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts.length === 0) {
                throw new Error("Usuário não autorizado!");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, TokenArtifact.abi, signer);

            contractRef.current = contract;  // Store the contract in ref
            setUserAddress(signer.address);
        } catch (error) {
            throw new Error(error.reason || error.message || error.revert?.args?.[0] || "Usuário não autorizado!");
        }
    };

    // Fetch deployed properties
    const fetchProperties = async () => {
        try {
            const contract = contractRef.current;
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

    // Event listener for PropertyCreated
    const listeningPropertyCreated = () => {
        const contract = contractRef.current;
        contract.on("PropertyCreated", (id, category, location, area, owner) => {
            console.log(`PropertyCreated event: id=${id}, category=${category}, location=${location}, area=${area}, owner=${owner}`);
            setProperties(prevProperties => [
                ...prevProperties,
                { id, category, location, area: parseInt(area), owner }
            ]);
        });
    };

    // Event listener for PropertySold
    const listeningPropertySold = () => {
        const contract = contractRef.current;
        contract.on("PropertySold", (id, previousOwner, newOwner) => {
            console.log(`PropertySold event: id=${id}, previousOwner=${previousOwner}, newOwner=${newOwner}`);
            setProperties(prevProperties =>
                prevProperties.map(property =>
                    property.id === id
                        ? { ...property, owner: newOwner }
                        : property
                )
            );
        });
    };

    // Handle login
    const handleLogin = async () => {
        try {
            const contract = contractRef.current;
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = signer.address;
            setIsLoggedIn(true);
            const isAdmin = await contract.isAdmin(address);
            setIsAdmin(isAdmin);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    // Handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    // Create a new property
    const createProperty = async (category, location, area, owner) => {
        if (category === "" || location === "" || area === "" || owner === "") return;
        try {
            const contract = contractRef.current;
            const tx = await contract.createProperty(category, location, parseInt(area), owner);
            await tx.wait();
        } catch (error) {
            alert(error.reason || error.message || "Erro ao criar propriedade!");
        }
    };

    // Sell a property
    const sellProperty = async (id, newOwner) => {
        try {
            const contract = contractRef.current;
            const tx = await contract.sellProperty(id, newOwner);
            await tx.wait();
        } catch (error) {
            console.error("Erro ao vender propriedade:", error);
        }
    };

    // Effect to set up contract and event listeners
    useEffect(() => {
        const fetchAndSetup = async () => {
            await setupContract();
            await fetchProperties();

            // Set up listeners once the contract is available
            listeningPropertyCreated();
            listeningPropertySold();
        };

        fetchAndSetup();

        // Cleanup on unmount
        return () => {
            const contract = contractRef.current;
            if (contract) {
                contract.removeAllListeners("PropertyCreated");
                contract.removeAllListeners("PropertySold");
            }
        };
    }, []); // Empty dependency array to run once on mount

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
            userAddress={userAddress}
        />
    );
}

export default App;
