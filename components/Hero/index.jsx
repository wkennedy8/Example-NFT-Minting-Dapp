import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

const Hero = () => {
  return (
    <div className="hero">
      <h1 className="hero-title">
        <span>Will&apos;s</span>
      </h1>
      <h1 className="hero-subtitle">
        <span>NFT</span>
        <span>Collection</span>
      </h1>
      <div className="hero-description">
        <p>
          test description test description test description test description
          test description test description test description test description
          test description test description test description test
          descriptiontest descriptiontest description test descriptiontest
          description test descriptiontest description test description
        </p>
      </div>
    </div>
  )
}

export default Hero
