import '../styles/globals.css'
import type { AppProps } from 'next/app'

// import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import { ThirdwebProvider } from "@thirdweb-dev/react"
import { Mumbai, Polygon, Goerli } from "@thirdweb-dev/chains"
// import { ethers } from "ethers"

// from https://docs.uniswap.org/sdk/core/reference/enums/SupportedChainId
// const supportedChainIds: number[] = [1, 5, 80001]
// const connectors:any = {
//   injected: {}
// }

export default function App({ Component, pageProps }: AppProps) {
  // const ethereum:any = window.ethereum

  // const provider = new ethers.providers.Web3Provider(ethereum, 'any')
  return(
    // <ThirdwebWeb3Provider 
    // supportedChainIds = {supportedChainIds} 
    // connectors = {connectors}>
    // @ts-ignore
    <ThirdwebProvider activeChain="ethereum" chains={[Mumbai, Goerli, Polygon]}>
      <Component {...pageProps} />
    </ThirdwebProvider>
    // </ThirdwebWeb3Provider>
  )
}
