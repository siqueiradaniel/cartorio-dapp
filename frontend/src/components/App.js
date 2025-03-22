import './../css/App.css';
import { ethers } from 'ethers';
import { React, useState, useEffect } from 'react';
import TokenArtifact from "../contracts/Token.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
    const [properties, setProperties] = useState([]);
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [area, setArea] = useState("");
    const [owner, setOwner] = useState("");

    const setupContract = async () => {
        try {
            if (window.ethereum == null) {
                throw new Error("Usuário não autorizado!");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const _signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, TokenArtifact.abi, _signer);
            return contract;
        } catch (error) {
            throw new Error(error.reason || error.revert?.args?.[0] || "Usuário não autorizado!");
        }
    };

    // Fetch deployed properties
    const fetchProperties = async () => {
        try {
            const contract = await setupContract();
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
    const createProperty = async () => {
        if (category === "" || location === "" || area === "" || owner === "") return;
        try {
            const contract = await setupContract();
            const tx = await contract.createProperty(category, location, parseInt(area), owner);
            await tx.wait();
            fetchProperties();
        } catch (error) {
            console.error("Erro ao criar propriedade:", error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Gerenciamento de Propriedades</h2>
            <p>Crie novas propriedades:</p>

            <input
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Localização"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
                type="number"
                placeholder="Área"
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />
            <input
                type="text"
                placeholder="Proprietário"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />
            <button onClick={createProperty}>Criar Propriedade</button>

            <h3>Propriedades Implantadas</h3>
            <ul>
                {properties.length > 0 ? (
                    properties.map((property, index) => (
                        <li key={index}>
                            <p>ID: {property.id}</p>
                            <p>Categoria: {property.category}</p>
                            <p>Localização: {property.location}</p>
                            <p>Área: {property.area}</p>
                            <p>Proprietário: {property.owner}</p>
                        </li>
                    ))
                ) : (
                    <p>Nenhuma propriedade implantada ainda.</p>
                )}
            </ul>
        </div>
    );
}

export default App;