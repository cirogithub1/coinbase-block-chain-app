import { useEffect, useState } from 'react'

import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm"

import Header from "@/components/Header"
import Main from "@/components/Main"
import Sidebar from "@/components/Sidebar"
import Spinner from '@/components/Spinner'

const sdk = new ThirdwebSDK("goerli")

const sanityAdd = `https://j2y3h3rg.api.sanity.io/v2021-10-21/data/query/production?`
const query = `query=*%5B_type%20%3D%3D%20'coins'%5D%20%7B%0A%20%20name%2C%0A%20%20contractAddress%2C%0A%20%20usdPrice%2C%0A%20%20logo%2C%0A%20%20symbol%0A%7D%0A`

function Dashboard({ address }:{ address : any}) {
	
	const [sanityTokens, setSanityTokens] = useState([])
	const [thirdwebTokens, setThirdwebTokens] = useState<any>([])

	useEffect(() => {
		const getTokens = async () => {
			const tempTokens = []

			try {
				const resp = await fetch(sanityAdd + query)
				const data = await resp.json()
				const tokensFromSanity = data.result
				setSanityTokens(tokensFromSanity)

			} catch (err:any) {
				console.error(err)
			}

			if (sanityTokens.length > 0) {
				for (const token of sanityTokens) {
					// @ts-ignore
					const contractToken:any = await sdk.getContract(token.contractAddress)
					tempTokens.push(contractToken)
				}
				// console.log('/Dashboard tempTokens ', tempTokens[0].toString().includes('Promise'))
			}
			setThirdwebTokens(tempTokens)
		}
		getTokens()
	}, [sanityTokens])
		
	return (
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

				{thirdwebTokens[0]
				?
					<>
						{!thirdwebTokens[0].toString().includes('Promise')
						?
							<Main 
								walletAddress={address} 
								sanityTokens={sanityTokens} 
								thirdwebTokens={thirdwebTokens}/>
						: <Spinner size="h-20 w-20" />
						}
					</>
				: <Spinner size="h-36 w-36" />
				}
			</div>

		</div>
	)
}

export default Dashboard
