const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("Maxima");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  const txn = await nftContract.payToMint(
    "0x",
    "https://ipfs.fleek.co/ipfs/bafybeibidatmi6aav7b6rud6p2agrymwfg2oed2kxfy4dapbgyd4fw3qxm",
    {
      value: hre.ethers.utils.parseEther("0.0005"),
    }
  );
  // Wait for it to be mined.
  await txn.wait();
  console.log(txn);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
