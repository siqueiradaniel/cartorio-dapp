import React from 'react';

const CreatePropertyForm = ({ category, setCategory, location, setLocation, area, setArea, createProperty }) => {
    return (
        <div>
            <h2>Crie novas propriedades</h2>
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
            <button onClick={createProperty}>Criar Propriedade</button>
        </div>
    );
};

export default CreatePropertyForm;