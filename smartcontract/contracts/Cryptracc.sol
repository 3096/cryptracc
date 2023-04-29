// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Cryptracc {
    mapping(address => bytes32) public identityHashes;
    mapping(bytes32 => mapping(address => bool)) public contracts;

    constructor() {}

    function submitId(bytes32 hash) public {
        console.log("??????????????????");
        console.log("sender: %s", msg.sender);
        identityHashes[msg.sender] = hash;
    }

    function createContract(bytes32 hash, address[] memory addresses) public {
        for (uint i = 0; i < addresses.length; i++) {
            contracts[hash][addresses[i]] = false;
        }
    }

    function signContract(bytes32 hash) public {
        console.log("Contract: %s", contracts[hash][msg.sender]);
        require(
            contracts[hash][msg.sender] == false,
            "Contract already signed or does not exist or you are not allowed to sign it"
        );
        contracts[hash][msg.sender] = true;
    }
}

// contract Lock {
//     uint public unlockTime;
//     address payable public owner;

//     event Withdrawal(uint amount, uint when);

//     constructor(uint _unlockTime) payable {
//         require(
//             block.timestamp < _unlockTime,
//             "Unlock time should be in the future"
//         );

//         unlockTime = _unlockTime;
//         owner = payable(msg.sender);
//     }

//     function withdraw() public {
//         // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
//         // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

//         require(block.timestamp >= unlockTime, "You can't withdraw yet");
//         require(msg.sender == owner, "You aren't the owner");

//         emit Withdrawal(address(this).balance, block.timestamp);

//         owner.transfer(address(this).balance);
//     }
// }
