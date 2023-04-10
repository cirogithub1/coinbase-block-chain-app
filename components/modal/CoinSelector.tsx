import { useState} from 'react'

import CoinItem from './CoinItem'

const CoinSelector = ({
	setAction,
	selectedToken,
	setSelectedToken,
	sanityTokens,
	thirdwebTokens,
	walletAddress
} : {
	setAction:any,
	selectedToken:any,
	setSelectedToken:any,
	sanityTokens:any,
	thirdwebTokens:any,
	walletAddress:any
	}) => 
{
	
	return (
		<div className='Wrapper'>
			<div className="Title w-full text-center text-2xl mb-4">Select Asset</div>
			<div className="CoinList flex flex-col">
				{sanityTokens.map((sanityToken:any, index:number) => (
					<CoinItem 
						key={index}
						sanityToken={sanityToken}
						walletAddress={walletAddress}
						setAction={setAction}
						selectedToken={selectedToken}
						setSelectedToken={setSelectedToken}
						sanityTokens={sanityTokens}
						thirdwebTokens={thirdwebTokens} />
				))}
			</div>
			
		</div>
	)
}

export default CoinSelector
