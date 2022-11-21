// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Operations", function () {
  it("test deposit", async function () {
    const [owner] = await ethers.getSigners();
    const Operations = await ethers.getContractFactory("Operations");
    const operations = await Operations.deploy();
    await operations.deployed();
    console.log("operations deployed at:" + operations.address);

    await operations.deposit(100);
    expect(await operations.balances(owner.address)).to.equal(100);
    await expect(operations.deposit(100))
      .to.emit(operations, "DepositEvent")
      .withArgs(100, owner.address);
  });

  it("test transfer", async function () {
    const [owner, user1] = await ethers.getSigners();
    const Operations = await ethers.getContractFactory("Operations");
    const operations = await Operations.deploy();
    await operations.deployed();
    console.log("operations deployed at:" + operations.address);

    await operations.deposit(100);
    expect(await operations.balances(owner.address)).to.equal(100);

    await operations.transfer(25, user1.address);
    expect(await operations.balances(owner.address)).to.equal(75);
    expect(await operations.balances(user1.address)).to.equal(25);
    await expect(operations.transfer(25, user1.address))
      .to.emit(operations, "TransferEvent")
      .withArgs(25, owner.address, user1.address);
  });
});
