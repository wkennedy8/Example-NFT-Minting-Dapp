async function main() {
  const nftContractFactory = await hre.ethers.getContractFactory('WilliamNFT')
  const nftContract = await nftContractFactory.deploy(
    'Will',
    'WKC',
    'ipfs://Qme39FcEcMsEf8RPwaFYHodJszWRakJYvbofdwDuViW8Qe/',
    'ipfs://QmVc1mMrPpE58DHrqbWEL8En8mjkuF6Qx5Wpx8x1NBi8Mj/hidden.json',
  )
  await nftContract.deployed()

  console.log('NFT Contract deployed to:', nftContract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
