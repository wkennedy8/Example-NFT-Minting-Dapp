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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
          ratione eveniet dolor non voluptates odit sapiente quae quis ad
          consequatur exercitationem saepe, id culpa illo quidem iusto unde.
          Optio officiis minima provident illo voluptatum incidunt? Ad omnis,
          facilis facere unde, expedita iste consectetur a nam magnam quae
          sapiente! Praesentium asperiores totam veniam aliquid eum, amet enim,
          nemo accusantium quibusdam exercitationem iusto ab molestiae
          voluptatibus consequatur sapiente officia id, suscipit expedita nihil
          corporis culpa officiis. Deserunt sed quaerat quas omnis temporibus
          consequatur commodi ad eligendi vel ex. Illum quidem in, molestiae,
          fugit autem perferendis, modi est impedit iure assumenda inventore
          distinctio!
        </p>
      </div>
    </div>
  )
}

export default Hero
