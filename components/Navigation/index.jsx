import React, { useContext, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AppContext } from '../../context/AppContext'
import { connectors } from '../../connectors'
import Image from 'next/image'

const Navigation = () => {
  const { setModalShow } = useContext(AppContext)
  const { activate, deactivate, chainId, account } = useWeb3React()

  const logout = () => {
    if (account && chainId) {
      deactivate()
      window.localStorage.removeItem('provider')
    } else {
      setModalShow(true)
    }
  }

  useEffect(() => {
    const provider = window.localStorage.getItem('provider')
    if (provider) activate(connectors[provider])
  }, [])

  return (
    <div className="navigation">
      <div className="navigation-logo">
        <h3>Will Kennedy</h3>
        <Image src={'/logo.png'} height={100} width={150} objectFit="contain" />
      </div>
      <ul className="navigation-list">
        <li className="navigation-list--item" onClick={logout}>
          <div style={{ backgroundColor: account ? 'green' : 'red' }} />
          <p>
            {account
              ? `${account.substring(0, 4)}...${account.slice(
                  account.length - 4,
                )}`
              : 'Disconnected'}
          </p>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
