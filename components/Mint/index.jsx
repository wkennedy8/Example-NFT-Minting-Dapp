import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import contractABI from '../../artifacts/contracts/Will.sol/WilliamNFT.json'
import AdminControls from '../AdminControls'
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const Mint = () => {
  const [contractPaused, setContractPaused] = useState(false)
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
      const mintedNft = await contract.mint(account, 1, {
        gasLimit: 1000000,
        value: ethers.utils.parseEther('0.05'),
      })
      // console.log(mintedNft)
      await mintedNft.wait()
      console.log(mintedNft)

      contract.on('NewMint', (from, tokenId) => {
        setNewMint(tokenId.toNumber())
        setLoading(false)
      })
    } catch (error) {
      console.log(`Minting Error: ${error.message}`)
      setLoading(false)
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
      //provide wallet address to add to whitelist
      const addedToWhitelist = await contract.whitelistUser(
        'WALLET_ADDRESS_HERE',
      )
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
      let paused = await contract.paused.call()
      setContractPaused(paused)
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
    if (!whitelistedUser && !contractPaused) {
      return <h3>Unfortunately, you are not on a whitelisted user.</h3>
    } else if (whitelistedUser && !contractPaused) {
      return (
        <button className="mint-button" onClick={handleMint}>
          {loading ? 'Processing...' : 'Mint NFT'}
        </button>
      )
    } else {
      return null
    }
  }

  const handlePause = async () => {
    setLoading(true)
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        library.getSigner(),
      )
      const pause = await contract.pause(!contractPaused)
      await pause.wait()
      setLoading(false)
    } catch (error) {
      console.log(`Minting Error: ${error.message}`)
    }
  }

  return (
    <div className="mint">
      {account ? (
        <>
          <div>
            <h1>
              {contractPaused
                ? 'Minting Currently Unavailable'
                : 'Pre-Sale Minting Open!!'}
            </h1>
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
              <AdminControls
                handleWhitelist={handleWhitelist}
                handlePause={handlePause}
                handleReveal={handleReveal}
              />
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
