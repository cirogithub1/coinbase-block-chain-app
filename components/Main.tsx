import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import Portfolio from "./Portfolio"
import Leyends from './Leyends'
import BalanceChart from './BalanceChart'

const Main = ({ walletAddress, sanityTokens, thirdwebTokens }:{ walletAddress:any, sanityTokens:any, thirdwebTokens:any }) => 
{
	const [totalTokensBalance, setTotalTokensBalance ] = useState(0)
	
	useEffect(() => {
		const tokensToUSD:any = []

		for (const token of sanityTokens) {
			// console.log('/Main sanityTokens =', token)
			tokensToUSD[token.contractAddress] = Number(token.usdPrice)
		}

		async function calculateBalance() {
			let total = 0
				// console.log('/Main thirdwebTokens =', thirdwebTokens)
				for (const token of thirdwebTokens) {
	
					const balance_hex = await token.call("balanceOf", walletAddress)
					const tokenAddress = token.contractWrapper.readContract.address
					const balance_str = ethers.utils.formatUnits(balance_hex)	
					total += Number(balance_str) * (tokensToUSD[tokenAddress])
				}

			// console.log('/Main total =', total)
			setTotalTokensBalance(Math.round(total))
		}
		calculateBalance()
		
	}, [sanityTokens, thirdwebTokens, walletAddress])

	return (
		<div className="Wrapper px-4 
			justify-between grid grid-cols-3">
				<div className='col-span-2 m-4'>
					<div className="Chart border border-gray-500 rounded-md">
						<div className="Balance p-2">
							<div className="Title text-[#8a919d] text-sm">
								Portfolio Balance								
							</div>

							<div className="BalanceValue text-xl font-bold ">
								{totalTokensBalance ? totalTokensBalance : "Loading ..."}
							</div>
						</div>

						<BalanceChart />
					</div>
				</div>

				<div className="col-start-3">
					<Leyends />
				</div>

				<div className="col-span-2 m-3">
					<Portfolio walletAddress={walletAddress} sanityTokens={sanityTokens} thirdWebTokens={thirdwebTokens}/>
				</div>

		</div>
	)
}

export default Main
