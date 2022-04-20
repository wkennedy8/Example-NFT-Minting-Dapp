import Head from 'next/head'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigation, WalletModal, Hero, Mint } from '../components'

export default function App() {
  const { modalShow } = useContext(AppContext)
  return (
    <div>
      {/* Meta Data */}
      <Head>
        <title>Oni Fightwear NFT</title>
        <meta name="description" content="Oni Fightwear NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navigation Component  */}
      <Navigation />
      {/* Hero Section */}
      <Hero />
      {/* Mint Section */}
      <Mint />
      {/* Footer Component */}
      <footer className="footer">
        <a
          href="https://azzurrilabs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Azzurri Labs LLC.
        </a>
      </footer>
      {modalShow && <WalletModal />}
    </div>
  )
}
