import type { NextPage } from 'next'
import { useAddress, ConnectWallet } from "@thirdweb-dev/react"

import Dashboard from './Dashboard'

const Home: NextPage = () => {
  const address = useAddress()

  return (
    <div className={`Wrapper flex ${address ? "min-h-full": "h-screen"}
      w-auto bg-black justify-center items-center text-white`}>
      {address 
      ? <Dashboard address={address} />
      : <div className='WalletConnect flex items-center justify-center 
          Xh-full Xw-auto'>
          <div 
            className='Button border-none pt-1 pb-2 text-lg 
              font-bold rounded-md bg-blue-500 text-black 
              cursor-pointer' 
            >
              <ConnectWallet 
                accentColor="#3773f4"
                colorMode="dark"
                btnTitle="Connect Wallet" /></div>
        </div>
      }
    </div>
  )
}
export default Home
