const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('Maxima');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);
  
    // Call the function.
    let txn = await nftContract.makeWordleNFT("hello wordl 4/6\n" +
        "⬛🟨⬛⬛⬛\n" +
        "🟨⬛🟩⬛⬛\n" +
        "⬛⬛🟨⬛🟩\n" +
        "🟩🟩🟩🟩🟩");
    // Wait for it to be mined.
    await txn.wait()
 
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