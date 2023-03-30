import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ThirdwebSDKProvider } from "@thirdweb-dev/react"
import { ThirdwebSDK } from '@3rdweb/sdk'

import Header from "@/components/Header"
import Main from "@/components/Main"
import Sidebar from "@/components/Sidebar"

const sanityAdd = `https://j2y3h3rg.api.sanity.io/v2021-10-21/data/query/production?`
const query = `query=*%5B_type%20%3D%3D%20'coins'%5D%20%7B%0A%20%20name%2C%0A%20%20contractAddress%2C%0A%20%20usdPrice%2C%0A%20%20logo%2C%0A%20%20symbol%0A%7D%0A`

// const signingKey:any = process.env.NEXT_PUBLIC_METAMASK_KEY

// const sdk = new ThirdwebSDK(
// 	new ethers.Wallet(
// 		signingKey,
// 		ethers.getDefaultProvider()
// 	)
// )

function Dashboard({ address }:{ address : any}) {
	const ethereum:any = window.ethereum
  const provider = new ethers.providers.Web3Provider(ethereum, 'any')

	const [sanityTokens, setSanityTokens] = useState([])
	const [thirdwebTokens, setThirdwebTokens] = useState<any>([])

	useEffect(() => {
		const getTokens = async () => {
			try {
				const resp = await fetch(sanityAdd + query)
				const data = await resp.json()
				const tokensFromSanity = data.result
				setSanityTokens(tokensFromSanity)

				// setThirdwebTokens(
				// 	tokensFromSanity.map((sanityToken:any) => sdk.getTokenModule(sanityToken.contractAddress))
				// )

			} catch (error) {
				console.error(error)
			}
		}

		getTokens()
	}, [])

	return (
		<ThirdwebSDKProvider
			activeChain={"ethereum"}
			signer={provider.getSigner()}
		>
			<div className="Wrapper flex-1 min-h-screen bg-[#0a0b0c] 
				overflow-hidden text-white grid grid-cols-4">
				<div className="col-start-1">
					<Sidebar />
				</div>

				<div className="MainContainer col-span-3 border-l border-gray-500">
					<Header 
						walletAddress={address} 
						sanityTokens={sanityTokens}
						thirdwebTokens={thirdwebTokens} />
					<Main 
						walletAddress={address} 
						sanityTokens={sanityTokens} 
						thirdwebTokens={thirdwebTokens}/>
				</div>

			</div>
		</ThirdwebSDKProvider>
	)
}

export default Dashboard
