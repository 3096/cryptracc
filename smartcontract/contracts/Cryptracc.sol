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
    mapping(bytes32 => uint) public contractSignerCount;

    function submitId(bytes32 identityHash) public {
        require(identityHash != bytes32(0), "identity hash cannot be empty");
        require(
            identityHashes[msg.sender] == bytes32(0),
            "identity hash already exists"
        );
        identityHashes[msg.sender] = identityHash;
    }

    function createContract(
        bytes32 contractHash,
        address[] memory signerAddresses
    ) public {
        require(contractHash != bytes32(0), "contract hash cannot be empty");
        require(
            contractSignerCount[contractHash] == 0,
            "contract already exists"
        );
        require(
            signerAddresses.length > 0,
            "contract must have at least one signer"
        );
        for (uint i = 0; i < signerAddresses.length; i++) {
            require(
                identityHashes[signerAddresses[i]] != bytes32(0),
                "an address does not have an identity hash"
            );
        }
        contractSignerCount[contractHash] = signerAddresses.length;
        for (uint i = 0; i < signerAddresses.length; i++) {
            contractSignStatus[contractHash][signerAddresses[i]] = SignStatus
                .NotSigned;
            contractSigners[contractHash].push(signerAddresses[i]);
        }
    }

    function signContract(bytes32 contractHash) public {
        require(identityHashes[msg.sender] != bytes32(0), "no identity hash");
        require(
            contractSignStatus[contractHash][msg.sender] ==
                SignStatus.NotSigned,
            "cannot sign contract"
        );
        contractSignStatus[contractHash][msg.sender] = SignStatus.Signed;
    }
}
