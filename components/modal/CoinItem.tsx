import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import { FaCheck } from 'react-icons/fa'

const CoinItem = ({
	sanityToken,
	walletAddress,
	setAction,
	selectedToken,
	setSelectedToken,
	sanityTokens,
	thirdwebTokens
} : {
		sanityToken:any,
		walletAddress:any,
		setAction:any,
		selectedToken:any,
		setSelectedToken:any,
		sanityTokens:any,
		thirdwebTokens:any
}) => {
	const [balance, setBalance] = useState('fetching ...')
	const [imageUrl, setImageUrl] = useState<any>()

	useEffect(() => {
		async function getBalance() {
			// let activeThirweb
			for (const token of thirdwebTokens) {
				if (token.contractWrapper.readContract.address === sanityToken.contractAddress) {
					const balance_hex = await token.call("balanceOf", walletAddress)
					const balance_str = ethers.utils.formatUnits(balance_hex)	
					setBalance(balance_str)
				}
			}			
		}

		async function getImgUrl() {
			const url = imageUrlBuilder(client).image(sanityToken.logo).url()
			setImageUrl(url)	
		}

		getBalance()
		getImgUrl()

	}, [thirdwebTokens, sanityToken, walletAddress])

	return (
		<div className={`Wrapper flex items-center justify-between 
			py-2 px-2 rounded-lg mb-2 
			${selectedToken.name === sanityToken.name && "bg-blue-600"} hover:bg-gray-900`}
			onClick={() => {
				setSelectedToken(sanityToken)
				setAction('send')
			}}>
			<div className="Main flex items-center justify-center">
				<div className="Icon mr-4 h-7 w-7 rounded-xl overflow-hidden 
					place-items-center">
					<div className='Image w-full h-full justify-center'>
						{imageUrl
						? <Image 
								width={28} 
								height={28} 
								src={imageUrl} 
								alt={imageUrl} />
						: <FaCheck />
						}</div>
				</div>

				<div className="NameDetails">
					<div className="CoinName text-base ml-0 mb-0 mr-2">
						{sanityToken.name}</div>

					<div className="Symbol text-gray-400 text-xs">
						{sanityToken.symbol}</div>
				</div>
			</div>

			<div className="Balance flex">
				{`${balance.slice(0,5)} `}
				{sanityToken.symbol}
		
			{selectedToken.name === sanityToken.name &&
				<div className="IsSelected ml-1 mt-1 text-green-600">
					<FaCheck /></div>
			}
			</div>
			
		</div>
	)
}

export default CoinItem