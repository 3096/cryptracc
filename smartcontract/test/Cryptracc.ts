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

    it("Should not be able to submit id if already submitted", async function () {
      const { cryptracc } = await loadFixture(deployFixture);
      const fakeId = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
      await cryptracc.submitId(fakeId);
      await expect(cryptracc.submitId(fakeId)).to.be.revertedWith("identity hash already exists");
    });
  });

  describe("Contract", function () {
    describe("Create", function () {
      it("Should be able to create contract", async function () {
        const { cryptracc, owner } = await loadFixture(deployFixture);
        const fakeId = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
        await cryptracc.submitId(fakeId);
        const fakeContract = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdee";
        await cryptracc.createContract(fakeContract, [owner.address]);
        expect(await cryptracc.contractSignStatus(fakeContract, owner.address)).to.equal(1);
        expect(await cryptracc.contractSigners(fakeContract, 0)).to.eql(owner.address);
      });

      it("Should not be able to create contract if no identity", async function () {
        const { cryptracc, owner } = await loadFixture(deployFixture);
        const fakeContract = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdee";
        await expect(cryptracc.createContract(fakeContract, [owner.address])).to.be.revertedWith(
          "an address does not have an identity hash"
        );
      });

      it("Should not be able to create contract if contract already exists", async function () {
        const { cryptracc, owner } = await loadFixture(deployFixture);
        const fakeId = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
        await cryptracc.submitId(fakeId);
        const fakeContract = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdee";
        await cryptracc.createContract(fakeContract, [owner.address]);
        await expect(cryptracc.createContract(fakeContract, [owner.address])).to.be.revertedWith(
          "contract already exists"
        );
      });
    });

    describe("Signing", function () {
      it("Should not be able to sign if no identity", async function () {
        const { cryptracc } = await loadFixture(deployFixture);
        const fakeContract = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
        await expect(cryptracc.signContract(fakeContract)).to.be.revertedWith("no identity hash");
      });

      it("Should not be able to sign if contract does not exist", async function () {
        const { cryptracc } = await loadFixture(deployFixture);
        const fakeId = "0x6923456789abcdef0123456789abcdef0123456789abcdef0123456789abcdff";
        await cryptracc.submitId(fakeId);
        const fakeContract = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
        await expect(cryptracc.signContract(fakeContract)).to.be.revertedWith("cannot sign contract");
      });
    });
  });
});
