import './../css/App.css';
import { ethers } from 'ethers';
import { React, useState, useEffect, useRef } from 'react';
import TokenArtifact from "../contracts/Token.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const localBlockchainAddress = 'http://localhost:8545';

function App() {
    const [students, setStudents] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const setupContract = async () => {
        
        try {
            if (window.ethereum == null) {
                throw new Error("Usuário não autorizado!");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const _signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, TokenArtifact.abi, _signer);
            // setSignerCodinome(await contract.getSenderCodinome());
            return contract;
        } catch (error) {
            throw new Error(error.reason || error.revert?.args?.[0] || "Usuário não autorizado!");
        }                   
    };

    // Fetch deployed contracts
    const fetchContracts = async () => {
        try {
            const contract = await setupContract();
            const addresses = await contract.getDeployedContracts(); // Ensure function exists in ABI
            setStudents(addresses);
        } catch (error) {
            console.error("Erro ao buscar contratos:", error);
        }
    };

    // Create a new contract
    const createContract = async () => {
        if (inputValue === "") return;
        try {
            const contract = await setupContract();
            const tx = await contract.createStudent("John", 3, '0x5FbDB2315678afecb367f032d93F642f64180aa3');
            await tx.wait();
            fetchContracts(contract);
        } catch (error) {
            console.error("Erro ao criar contrato:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Simple Contract Factory</h2>
            <p>Implante novos contratos com um número inicial:</p>

            <input
                type="number"
                placeholder="Digite um número"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={createContract}>Criar Contrato</button>

            <h3>Contratos Implantados</h3>
            <ul>
                {students.length > 0 ? (
                    students.map((address, index) => (
                        <li key={index}>{address}</li>
                    ))
                ) : (
                    <p>Nenhum contrato implantado ainda.</p>
                )}
            </ul>
        </div>
    );
}

export default App;