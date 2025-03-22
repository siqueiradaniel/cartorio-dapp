//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Property {
    struct PropertyData {
        uint256 id;
        string category;
        string location;
        uint256 area;
        address owner;
    }

    PropertyData public propertyData;

    event OwnerChanged(uint256 id, address indexed previousOwner, address indexed newOwner);

    constructor(uint256 id, string memory category, string memory location, uint256 area, address owner) {
        propertyData = PropertyData(id, category, location, area, owner);
    }

    function getPropertyData() public view returns (uint256, string memory, string memory, uint256, address) {
        return (propertyData.id, propertyData.category, propertyData.location, propertyData.area, propertyData.owner);
    }

    function changeOwner(address newOwner) public {
        require(msg.sender == propertyData.owner, "Only the owner can change the owner");
        address previousOwner = propertyData.owner;
        propertyData.owner = newOwner;
        emit OwnerChanged(propertyData.id, previousOwner, newOwner);
    }
}

contract Token {
    Property[] public properties;
    uint256 public nextPropertyId;
    address public admin;

    event PropertyCreated(uint256 id, string category, string location, uint256 area, address indexed owner);
    event PropertySold(uint256 id, address indexed previousOwner, address indexed newOwner);

    constructor() {
        admin = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        nextPropertyId = 1653245;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }

    function createProperty(string memory category, string memory location, uint256 area, address owner) public onlyAdmin {
        Property property = new Property(nextPropertyId, category, location, area, owner);
        properties.push(property);
        emit PropertyCreated(nextPropertyId, category, location, area, owner);
        nextPropertyId += 13;
    }

    function getDeployedContracts() public view returns (uint256[] memory, string[] memory, string[] memory, uint256[] memory, address[] memory) {
        uint length = properties.length;

        uint256[] memory ids = new uint256[](length);
        string[] memory categories = new string[](length);
        string[] memory locations = new string[](length);
        uint256[] memory areas = new uint256[](length);
        address[] memory owners = new address[](length);

        for (uint i = 0; i < length; i++) {
            (ids[i], categories[i], locations[i], areas[i], owners[i]) = properties[i].getPropertyData();
        }

        // Return all arrays containing struct data
        return (ids, categories, locations, areas, owners);
    }

    function sellProperty(uint256 id, address newOwner) public {
        for (uint i = 0; i < properties.length; i++) {
            (uint256 propertyId, , , , address propertyOwner) = properties[i].getPropertyData();
            if (propertyId == id) {
                address previousOwner = propertyOwner;
                properties[i].changeOwner(newOwner);
                emit PropertySold(id, previousOwner, newOwner);
                return;
            }
        }
        revert("Property not found");
    }
}
