import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useWeb3React } from '@web3-react/core'
import { connectors } from '../../connectors'
import { IoIosClose } from 'react-icons/io'
import Image from 'next/image'

const WalletModal = () => {
  const { setModalShow, setProvider } = useContext(AppContext)
  const { activate } = useWeb3React()

  const setupWallet = async (wallet) => {
    try {
      await activate(wallet)
      setModalShow(false)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="modal" onClick={() => setModalShow(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {/* icon */}
          <p>Connect your wallet</p>
          <IoIosClose onClick={() => setModalShow(false)} />
        </div>
        <p className="select">Select your wallet provider:</p>
        <div className="modal-body">
          <div
            className="modal-body--wallet"
            onClick={() => {
              setProvider('injected')
              setupWallet(connectors.injected)
            }}
          >
            <Image src={'/metamask.png'} height={20} width={20} />
            <p>MetaMask</p>
          </div>
          <div
            className="modal-body--wallet"
            onClick={() => {
              setProvider('coinbaseWallet')
              setupWallet(connectors.coinbaseWallet)
            }}
          >
            <Image
              src={'/coinbase.png'}
              height={20}
              width={20}
              className="coinbase"
            />
            <p>Coinbase</p>
          </div>
        </div>
        <div className="modal-footer">
          <p>What is a wallet?</p>
        </div>
      </div>
    </div>
  )
}

export default WalletModal
