import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useContract, useBalance, useTransferToken } from "@thirdweb-dev/react"
import { ethers } from 'ethers'

import { FaWallet } from 'react-icons/fa'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import Spinner from '../Spinner'

const Transfer = ({ 
	selectedToken, 
	thirdwebTokens,
	setAction,
	walletAddress } : { 
		selectedToken:any,
		thirdwebTokens:any, 
		setAction:any,
		walletAddress:any }) => 
{
	const [amount, setAmount] = useState(0)
	const [recipient, setRecipient] = useState('')
	const [imageUrl, setImageUrl] = useState<any>()
	const [contractToken, setContractToken] = useState()
	const [tokenBalance, setTokenBalance] = useState<any>()
	// const [prevBalance, setPrevBalance] = useState<any>(0)
	
	// const { 
	// 	contract: contractToken, 
	// 	error: errorContract }:any = useContract(selectedToken.contractAddress)
	// if (errorContract) console.error("from errorContract =" , errorContract)

useEffect(() => {
	async function getContract() {
		for (const thirdToken of thirdwebTokens) {
			if (thirdToken.contractWrapper.readContract.address === selectedToken.contractAddress) {
				const balance_hex = await thirdToken.call("balanceOf", walletAddress)
				const balance_str = ethers.utils.formatUnits(balance_hex)
				
				setContractToken(thirdToken)
				setTokenBalance(Math.round(Number(balance_str)))
			}
		}
	}
	getContract()
	
}, [selectedToken, thirdwebTokens, walletAddress])

	// useBalance just read a value from a specific token, no ABI needed
	// const {
	// 	data: tokenBalance, 
	// 	isLoading: isBalanceLoading, 
	// 	error: errorBalance}	= useBalance (selectedToken.contractAddress)
	// if (errorBalance) { 
	// 	console.error("from useBalance =", errorBalance) 
	// }	else if (isBalanceLoading) console.log("/Transfer tokenBalance Loading...") 

	const { mutate: transferTokens, isLoading:isTransfering, error:errorTransfer } = useTransferToken(contractToken)

	if (errorTransfer) { 
		console.error("from useTransferToken =", errorTransfer) 
	} else if (isTransfering) console.log("/Transfer TransferHook Loading...") 

	async function sendCoins(amount:number, to:string) {
		try {
			// recipient: wallet1 0x4d48bCA56270bA8b60446A552558853eA4e9e5d8 
			// wallet2 0x781e919DB1e055C1672E2C6067fE8adBD5db1e50 or 
			// token2 0xb6Bdf1D73A05E7b1CA4D90CfDCc5B3b605935A7B
			transferTokens({
				to: to, // Address to transfer to
				amount: amount, // Amount to transfer
			})
		} catch (error) {
			console.error("/Transfer sendCoins error =", error)
			throw new Error("Trying send coins")
		}
		setRecipient('')
		setAmount(0)
		setAction("transferred")
	} 

	useEffect(() => {
		const url = imageUrlBuilder(client).image(selectedToken.logo).url()
		setImageUrl(url)
	}, [selectedToken])

	return (
		<div className="Wrapper flex flex-col h-full flex-1 ">
			<div className="Amount flex-1 flex flex-col">
				<div className="InputContainer flex-1 flex items-end mb-2">
					<input 
						className="FlexInput border-none bg-transparent 
						outline-none
						text-[#3773f4] text-5xl text-right max-w-[50%] mr-2"
						placeholder="0"
						type="number"
						min={0} 
						value={amount}
						onChange={(e) => setAmount(+e.target.value)}/>

						<span className="text-3xl text-[#3773f4] pb-2">
							{selectedToken.symbol}</span>
				</div>
				
				<div 
					className={`Warning animate-pulse pl-1rem pb-2rem] text-center
					${amount > 0 ? "text-[#0a0b0e]" : "text-red-500"}`}>
					Amount is required</div>
			</div>

			<div 
				className="TransferForm  border border-gray-600 
				rounded-sm">
				<div 
					className="Row grid grid-cols-4 items-center 
						justify-between text-gray-500 py-4 text-lg">
					<div>
						<div className="FieldName flex pl-2">
							To</div>
					</div>

					<div>
						<div 
							className="Icon grid mr-2 h-7 w-7 rounded-full 
							place-items-center">
							<FaWallet /></div>
					</div>

					<div className='col-span-2'>
						<input 
							className="Recipient border-none bg-transparent 
							outline-none text-white text-lg pr-2 w-full truncate"
							placeholder='Address required'
							value={recipient}
							onChange={(e) => setRecipient(e.target.value)}
						/></div>					
					
				</div>

				<div className="Divider border px-4 border-gray-600" />

				<div 
					className="Row grid grid-cols-4 items-center 
					justify-between text-gray-500 py-4 text-lg">
						<div>
							<div className="FieldName pl-2">Pay with</div>
						</div>
						
						<div>
							<div 
								className="CoinSelectList flex flex-[1.3] 
								h-full hover:cursor-pointer"
								onClick={() => setAction('select')}>
								<div 
									className="Icon hover:bg-blue-400 h-8 w-8 grid mr-2 rounded-full 
									place-items-center">
									{imageUrl
										? <Image
												height={20} 
												width={20} 
												src={imageUrl} 
												alt="btc.png" />
										: <FaWallet />
									}</div>
							</div>
						</div>

						<div>
							<div 
								className="CoinName flex-1 border-none 
									bg-transparent text-white outline-none 
									text-lg mr-2">
									{selectedToken.name}</div>
						</div>
				</div>

			</div>

			<div 
				className="Row flex items-center justify-between 
				text-gray-500 pt-4 text-lg">
				<button 
					className={`Continue text-white w-full p-2 
					text-center rounded-lg text-lg hover:cursor-pointer 
					${amount && recipient 
						? "bg-blue-500 hover:bg-blue-600" 
						: "bg-gray-500 hover:cursor-not-allowed"} `}
					disabled={(recipient && amount) ? false : true}
					onClick={() => sendCoins(amount, recipient)}>
						Continue</button>
			</div>

			<div 
				className="Row flex items-center justify-between 
				text-gray-500 pt-4 text-lg">
				<div className='BalanceTitle'>
					{selectedToken.symbol} Balance</div>

				<div className="Balance">
					{tokenBalance 
					// ? (tokenBalance.displayValue).slice(0,5) 
					?	tokenBalance
					: <Spinner size={"h-3 w-3"}/>}
					
					{` ${selectedToken.symbol}`}</div>
			</div>
		</div>
	)
}

export default Transfer
