import { ethers } from "hardhat";

async function main() {
  const Cryptracc = await ethers.getContractFactory("Cryptracc");
  const lock = await Cryptracc.deploy();

  await lock.deployed();

  console.log(`Cryptracc deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
