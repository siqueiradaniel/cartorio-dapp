//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Student {
    struct StudentData{
        string codinome;
        uint256 points;
        address addr;
    }

    StudentData public student;

    constructor(string memory _codinome, uint256 _points, address _addr) {
        student = StudentData(_codinome, _points, _addr);
    }
}

contract Token {
    Student[] public students;

    function createStudent(string memory _codinome, uint256 _points, address _addr) public {
        Student student = new Student(_codinome, _points, _addr);
        students.push(student);
    }

    function getDeployedContracts() public view returns (Student[] memory) {
        return students;
    }
}
