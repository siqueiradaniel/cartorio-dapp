import React, { useState, useRef } from "react";

const UserView = ({
    properties,
    sellProperty,
    onLogout,
    userAddress, // Assuming the userAddress is passed as a prop
}) => {
    const [newOwner, setNewOwner] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showDialog, setShowDialog] = useState(false); // Dialog visibility state
    const dialogRef = useRef(null); // Reference to the dialog

    // Filter properties that belong to the logged-in user
    const myProperties = properties.filter((property) => property.owner === userAddress);

    const handleSellClick = async (propertyId) => {
        if (!newOwner) {
            alert("Please enter the new owner's address.");
            return;
        }
        // Call the sellProperty function with the propertyId and newOwner
        await sellProperty(propertyId, newOwner);
        setNewOwner(""); // Clear the input field after selling the property
        toggleDialog();
    };



    // Toggle the dialog visibility
    const toggleDialog = () => setShowDialog(!showDialog);

    const filteredProperties = properties.filter((property) =>
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchClick = () => {
        // This function can be used to perform the search when the button is clicked
        console.log("Search clicked with query:", searchQuery);
    };

    return (
        <div className="min-h-screen bg-red-300">
            {/* Top Navbar */}
            <div className="flex justify-between items-center bg-gray-200 py-6 px-24">

                {/* Input with Search Icon */}
                <div className="relative w-1/2 mx-auto">
                    <input
                        type="text"
                        placeholder="Buscar localização..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ backgroundColor: "#8F4F4F" }}
                        className="text-white placeholder-white px-6 py-4 rounded-full w-full"
                    />
                    {/* Search Icon Button */}
                    <button
                        onClick={handleSearchClick}
                        className="absolute right-0 top-0 mt-4 mr-4 text-white"
                    >
                        <i className="fas fa-search w-6 h-6"></i>
                    </button>
                </div>

                {/* Logout Button */}
                <button
                    onClick={onLogout}
                    className="bg-red-500 text-white px-12 py-4 rounded-lg"
                    style={{ backgroundColor: "#8F4F4F" }}
                >
                    Logout
                </button>
            </div>


            {/* Property List */}
            <div className="flex mt-24 items-center justify-center">
                <div className="w-1/2">
                    {filteredProperties.length > 0 ? (
                        <ul>
                            {(searchQuery === "" ? myProperties : filteredProperties).map((property, index) => (
                                <li key={index} className="bg-white p-4 shadow flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{property.category}</p>
                                        <p className="text-gray-500">{property.location} - {property.area} m²</p>
                                        <p className="text-gray-700">Proprietário: {property.owner}</p>
                                    </div>

                                    {/* Button to toggle the dialog */}
                                    <button
                                        className="text-gray-700 hover:text-red-500 px-4"
                                        onClick={toggleDialog}
                                    >
                                        <i className="fas fa-bars text-xl"></i>
                                    </button>

                                    {/* Dialog */}
                                    {showDialog && (
                                        <div
                                            ref={dialogRef}
                                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                                        >
                                            <div className="bg-white p-6 rounded-lg w-1/3 relative">
                                                {/* Close Button (X) */}
                                                <button
                                                    onClick={() => setShowDialog(false)}
                                                    className="absolute top-0 right-0 text-2xl text-gray-500 hover:text-gray-700 p-3"
                                                >
                                                    &times;
                                                </button>

                                                <h3 className="text-xl font-semibold mb-4">Property Actions</h3>

                                                {/* Actions List */}
                                                <ul className="space-y-4">
                                                    <li className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                                                        <a
                                                            href={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex justify-between items-center w-full"
                                                        >
                                                            <span>View on Google Maps</span>
                                                            <i className="fas fa-arrow-right text-gray-500 w-5 h-5"></i>
                                                        </a>
                                                    </li>

                                                    {/* Conditionally render Sell Property Action */}
                                                    {searchQuery === "" && (
                                                        <li className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                                                            <div className="flex items-center w-full">
                                                                <span>Sell property</span>

                                                                {/* Input field to enter new owner address */}
                                                                <input
                                                                    type="text"
                                                                    className="ml-4 p-2 rounded-md border border-gray-300"
                                                                    placeholder="Enter new owner's address"
                                                                    value={newOwner}
                                                                    onChange={(e) => setNewOwner(e.target.value)} // Update the state with the input value
                                                                />

                                                                {/* Sell icon to trigger the action */}
                                                                <i
                                                                    className="absolute right-9 fas fa-arrow-right text-gray-500 w-5 h-5 ml-4 cursor-pointer"
                                                                    onClick={() => handleSellClick(property.id)} // Trigger sellProperty with the propertyId and newOwner
                                                                ></i>
                                                            </div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}


                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-white text-center">Nenhuma propriedade encontrada.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default UserView;