// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Cryptracc {
    enum SignStatus {
        NotInvolved,
        NotSigned,
        Signed
    }
    mapping(address => bytes32) public identityHashes;
    mapping(bytes32 => mapping(address => SignStatus))
        public contractSignStatus;
    mapping(bytes32 => address[]) public contractSigners;

    constructor() {}

    function submitId(bytes32 identityHash) public {
        identityHashes[msg.sender] = identityHash;
    }

    function createContract(
        bytes32 contractHash,
        address[] memory addresses
    ) public {
        for (uint i = 0; i < addresses.length; i++) {
            require(
                identityHashes[addresses[i]] != bytes32(0),
                "an address does not have an identity hash"
            );
            contractSignStatus[contractHash][addresses[i]] = SignStatus
                .NotSigned;
            contractSigners[contractHash].push(addresses[i]);
        }
    }

    function signContract(bytes32 contractHash) public {
        require(
            contractSignStatus[contractHash][msg.sender] ==
                SignStatus.NotSigned,
            "cannot sign contract"
        );
        contractSignStatus[contractHash][msg.sender] = SignStatus.Signed;
    }
}
