import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Cryptracc", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Cryptracc = await ethers.getContractFactory("Cryptracc");
    const cryptracc = await Cryptracc.deploy();

    return { cryptracc, owner, otherAccount };
  }

  describe("Identity", function () {
    it("Should be able to submit id", async function () {
      const { cryptracc, owner } = await loadFixture(deployFixture);
      const fakeId = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
      await cryptracc.submitId(fakeId);
      expect(await cryptracc.identityHashes(owner.address)).to.equal(fakeId);
    });

    it("Identity hash should be 0x0 if not submitted", async function () {
      const { cryptracc } = await loadFixture(deployFixture);
      expect(await cryptracc.identityHashes("0xffffffffffffffffffffffffffffffffffffffff")).to.equal(
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
    });
  });

  describe("Contract", function () {
    describe("Signing", function () {
      it("Should not be able to sign if contract does not exist", async function () {
        const { cryptracc } = await loadFixture(deployFixture);
        const fakeId = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
        await expect(cryptracc.signContract(fakeId)).to.be.revertedWith("cannot sign contract");
      });
    });
  });
});
