import type { NextPage } from 'next'
import { useAddress, ConnectWallet } from "@thirdweb-dev/react"

import Dashboard from './Dashboard'

const Home: NextPage = () => {
  const address = useAddress()

  return (
    <div className='Wrapper flex min-h-full w-auto bg-[#0a0b0d] 
      justify-center items-center text-white'>
      {address 
      ? (
          <Dashboard address={address} />
      )
      : (<div className='WalletConnect flex'>
          <div 
            className='Button border-none pt-1 pb-2 text-lg 
              font-bold rounded-md
            bg-[#3773f4] text-black cursor-pointer' 
            >
              <ConnectWallet 
                accentColor="#3773f4"
                colorMode="dark"
                btnTitle="Connect Wallet"
              />
          </div>
        </div>)
      }
    </div>
  )
}
export default Home
