import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import contractABI from '../../artifacts/contracts/Will.sol/WilliamNFT.json'
const contractAddress = '0xdEEa09A458B57F4681024f345dA36E5A0E54b5f4'

const Mint = () => {
  const [contractOwner, setContractOwner] = useState('')
  const [whitelistedUser, setWhitelistedUser] = useState(false)
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
      const mintedNft = await contract.mint(account, 1, { gasLimit: 1000000 })
      // console.log(mintedNft)
      await mintedNft.wait()
      console.log(mintedNft)

      contract.on('NewMint', (from, tokenId) => {
        setNewMint(tokenId.toNumber())
        setLoading(false)
      })
    } catch (error) {
      console.log(`Minting Error: ${error.message}`)
    }
  }

  const handleWhitelist = async () => {
    setLoading(true)
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        library.getSigner(),
      )
      const addedToWhitelist = await contract.whitelistUser(account)
      // console.log(mintedNft)
      await addedToWhitelist.wait()
      console.log(addedToWhitelist)
      setLoading(false)
    } catch (error) {
      console.log(`Whitelist Error: ${error.message}`)
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
      let whitelist = await contract.whitelisted(account)
      setWhitelistedUser(whitelist)
    } catch (error) {
      console.log(`Fetching Error: ${error.message}`)
    }
  }

  useEffect(() => {
    if (account && active) {
      getContract()
    }
  }, [account, loading])

  const renderActionableButton = () => {
    if (!whitelistedUser) {
      return (
        <button className="mint-whitelist-button" onClick={handleWhitelist}>
          {loading ? 'Processing...' : 'Get On The Whitelist'}
        </button>
      )
    } else {
      return (
        <button className="mint-button" onClick={handleMint}>
          {loading ? 'Processing...' : 'Mint NFT'}
        </button>
      )
    }
  }

  return (
    <div className="mint">
      {account ? (
        <>
          <div>
            <h1>Pre-Sale Minting Open!!</h1>
            {renderActionableButton()}
            {newMint && (
              <div style={{ marginTop: 20 }}>
                <a
                  href={`https://testnets.opensea.io/assets/${contractAddress}/${newMint}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Minted NFT
                </a>
              </div>
            )}
            <div>
              <p>
                {contractSupply} / {contractMax} Minted
              </p>
            </div>
            {contractOwner == account && (
              <div>
                <button className="mint-button" onClick={handleReveal}>
                  {loading ? 'Revealing NFT Metadata...' : 'Reveal'}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Please connect wallet to mint.</p>
      )}
    </div>
  )
}

export default Mint
