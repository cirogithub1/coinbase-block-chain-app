import React, { useState, useEffect } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import {client } from '../../lib/sanity'
import Image from 'next/image'
import { BiCopy } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'

const QR_URL = "https://api.qrserver.com/v1/"
const QR_QUERY_DATA = "create-qr-code/?data="
const QR_QUERY_SIZE = "&size=100x100"
const Receive = ({ 
	setAction,
	selectedToken,
	walletAddress } : {
		setAction:any,
		selectedToken:any,
		walletAddress:any
	}) => 
{
	const [imageUrl, setImageUrl] = useState<any>()
	const [copied, setCopied] = useState<boolean>()

	useEffect(() => {
		const url = imageUrlBuilder(client).image(selectedToken.logo).url()
		setImageUrl(url)

	}, [selectedToken])
	
	return (
		<div className='Wrapper h-full w-auto'>
			<div className="Content border rounded-sm flex flex-col
				h-full border-gray-600">
				<div className="QRContainer h-full grid place-items-center">
					<Image
						placeholder='blur'
						blurDataURL='Loading https://api.qrserver.com/...'
						width={200} 
						height={200}
						src={
							QR_URL + 
							QR_QUERY_DATA + 
							`${walletAddress}` +  
							QR_QUERY_SIZE} 
						alt={QR_URL}/>
				</div>

				<div className="Divider border-b border-gray-600"></div>

				<div 
					className=
					"Row ml-2 p-1 flex items-start justify-start text-gray-500">
					<div 
						className=
						"Icon mr-4 h-7 w-7 rounded-xl overflow-hidden">
						<div 
							className="Image w-full h-full">
							{imageUrl
							?<Image 
								src={imageUrl} 
								alt='imageUrl'
								height={25} 
								width={25} />
							: <FaCheck />
							}</div>
					</div>

					<div 
						className=
						"CoinName border-none bg-none text-xl text-white outline-none mr-2">
						{selectedToken.name}</div>
				</div>

				<div 
					className=
					"Divider border-b border-gray-600"></div>

				<div 
					className=
					"Row flex justify-between ml-1 w-full p-1 items-center Xjustify-center text-gray-500 text-xl">
						<div>
							<div className="Title text-gray-300 mb-1 Xflex  Xjustify-between">
								<div>
									{selectedToken.symbol} Address =
								</div>
							</div>

							<div className="Address text-sm">
								{walletAddress}
							</div>
						</div>

						<div 
							className="CopyButton cursor-pointer mr-2"
							onClick={() => {
								navigator.clipboard.writeText(walletAddress)
								setCopied(true)
							}}>
							
							{copied
							? <FaCheck style={{ color:'green' }} />
							:	<BiCopy style={{ color:'gray' }}/>
							}
						</div>

				</div>
			</div>
		</div>
	)
}

export default Receive