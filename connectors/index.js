import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})

const walletConnect = new WalletConnectConnector({
  rpcUrl: process.env.ALCHEMY_KEY,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

const coinbaseWallet = new WalletLinkConnector({
  url: process.env.ALCHEMY_KEY,
  appName: 'web3-react-demo',
})

export const connectors = {
  injected,
  walletConnect,
  coinbaseWallet,
}
