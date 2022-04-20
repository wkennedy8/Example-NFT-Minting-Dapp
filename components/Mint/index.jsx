import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import contractABI from '../../artifacts/contracts/Will.sol/WilliamNFT.json'
const contractAddress = '0x52227F21C1d6cc3d68B8e0d5DdB03829D6E5aDfa'

const Mint = () => {
  const [contractOwner, setContractOwner] = useState('')
  const [loading, setLoading] = useState(false)
  const [contractSupply, setContractSupply] = useState('')
  const [contractMax, setContractMax] = useState('')
  const [newMint, setNewMint] = useState('')
  const { active, account, library } = useWeb3React()

  const handleMint = async () => {
    setLoading(true)
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        library.getSigner(),
      )
      const mintedNft = await contract.mint(account, 1)
      // console.log(mintedNft)
      await mintedNft.wait()
      console.log(mintedNft)

      contract.on('NewMint', (from, tokenId) => {
        setNewMint(tokenId.toNumber())
      })
      setLoading(false)
    } catch (error) {
      console.log(`Minting Error: ${error.message}`)
    }
  }

  const handleReveal = async () => {
    setLoading(true)
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        library.getSigner(),
      )
      const reveal = await contract.reveal()
      // console.log(mintedNft)
      await reveal.wait()
      console.log(reveal)
      setLoading(false)
    } catch (error) {
      console.log(`Minting Error: ${error.message}`)
    }
  }

  const getContract = async () => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        library.getSigner(),
      )
      let owner = await contract.owner.call()
      setContractOwner(owner)
      let supply = await contract.totalSupply()
      supply = ethers.utils.formatUnits(supply, 0)
      setContractSupply(supply)
      let max = await contract.maxSupply.call()
      max = ethers.utils.formatUnits(max, 0)
      setContractMax(max)
      let revealed = await contract.revealed.call()
      console.log(revealed)
    } catch (error) {
      console.log(`Fetching Error: ${error.message}`)
    }
  }

  useEffect(() => {
    if (account) {
      getContract()
    }
  }, [account, loading])

  return (
    <div className="mint">
      {account ? (
        <div>
          <h1>Mint an NFT!</h1>
          <button className="mint-button" onClick={handleMint}>
            Mint
          </button>
          <p>
            {contractSupply} / {contractMax} Minted!
          </p>
          {loading && <p>Minting....</p>}
          {newMint && (
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://testnets.opensea.io/assets/${contractAddress}/${newMint}`}
              >
                Go check out your new NFT!
              </a>
            </div>
          )}
          {contractOwner === account && (
            <button
              style={{ marginTop: 20 }}
              className="mint-button"
              onClick={handleReveal}
            >
              Reveal
            </button>
          )}
        </div>
      ) : (
        <p>Please connect wallet to mint.</p>
      )}
    </div>
  )
}

export default Mint
