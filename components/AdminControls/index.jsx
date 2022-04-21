import React from 'react'

const AdminControls = ({ handlePause, handleReveal, handleWhitelist }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Admin Controls</h1>
      <button className="mint-button" onClick={handleReveal}>
        Reveal
      </button>
      <button
        style={{ marginTop: 20 }}
        className="mint-whitelist-button"
        onClick={handleWhitelist}
      >
        Add User to Whitelist
      </button>
      <button
        style={{ marginTop: 20 }}
        className="mint-whitelist-button"
        onClick={handlePause}
      >
        Toggle Pause
      </button>
    </div>
  )
}

export default AdminControls
