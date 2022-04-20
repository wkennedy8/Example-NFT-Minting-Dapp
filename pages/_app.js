import '../sass/main.scss'
import { useState, useEffect } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { AppContext } from '../context/AppContext'
import { ethers } from 'ethers'

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000 // frequency provider is polling
  return library
}

const setProvider = (type) => {
  window.localStorage.setItem('provider', type)
}

function MyApp({ Component, pageProps }) {
  const [modalShow, setModalShow] = useState(false)

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppContext.Provider value={{ modalShow, setModalShow, setProvider }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </Web3ReactProvider>
  )
}

export default MyApp
