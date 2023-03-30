import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useContract, useBalance, useTransferToken, Web3Button  } from "@thirdweb-dev/react"

import { FaWallet } from 'react-icons/fa'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import Spinner from '../Spinner'

const Transfer = ({ 
	selectedToken, setAction,
	thirdwebTokens,
	walletAddress } : { selectedToken:any, setAction:any, thirdwebTokens:any, walletAddress:any }) => 
{
	const [amount, setAmount] = useState(0)
	const [recipient, setRecipient] = useState('0x...')
	const [imageUrl, setImageUrl] = useState<any>()
	const [activeThirdwebToken, setActiveThirdwebToken] = useState()
	// const [balance, setBalance] = useState('fetching...')

	const { contract: contractToken }:any = useContract(selectedToken.contractAddress)

	const {data: balance , isLoading: isBalanceLoading, error: errorBalance}	= useBalance (selectedToken.contractAddress)
	if (errorBalance) { console.error(errorBalance) } 
		else { 
			if (isBalanceLoading) {console.log("Balance Loading...")} 
				else {
					if (balance) console.log('balance', balance.displayValue)	 }
		}
		
	const { mutate: transferTokens, isLoading:isTransfering, error:errorTransfer } = useTransferToken(contractToken)
	if (errorTransfer) { console.error(errorTransfer) } 
		else { 
			if (isTransfering) {console.log("TransferHook Loading...")} 
				else {
					if (transferTokens) console.log('transferTokens', transferTokens)
				}
		}

	// useEffect(() => {
	// 	const activeThirdToken = thirdwebTokens.find(
	// 		(token:any) => token.address === selectedToken.contractAddress
	// 	) 
	// 	setActiveThirdwebToken(activeThirdToken)
	// }, [selectedToken, thirdwebTokens])

	async function sendCoins() {
		const send = await transferTokens({
			to: recipient, // Address to transfer to
			amount: amount, // Amount to transfer
		})
	} 

	useEffect(() => {
		const url = imageUrlBuilder(client).image(selectedToken.logo).url()

		setImageUrl(url)
	}, [selectedToken])

	// useEffect(() => {
	// 	async function getBalance() {
	// 		if (activeThirdwebToken) {
	// 			const balance = await activeThirdwebToken.balanceOf(walletAddress)
	// 			setBalance(balance)				
	// 		}
	// 	}

	// 	if (activeThirdwebToken) getBalance()
	// }, [activeThirdwebToken, walletAddress, balance])

	return (
		<div className="Wrapper flex flex-col h-full flex-1 ">
			<div className="Amount flex-1 flex flex-col">
				<div className="InputContainer flex-1 flex items-end mb-2">
					<input className="FlexInput border-none bg-transparent outline-none
						text-[#3773f4] text-5xl text-right max-w-[50%] mr-2"
						placeholder="0"
						type="number"
						min={0} 
						value={amount}
						onChange={(e) => setAmount(+e.target.value)}/>

						<span className="text-3xl text-[#3773f4] pb-2">
							ETH
						</span>
				</div>
				
				<div className={`Warning pl-1rem pb-2rem] text-center 
					${amount > 0 ? "text-[#0a0b0e]" : "text-gray-500"}  `}>
					Amount is required
				</div>
			</div>

			<div className="TransferForm  border border-gray-600 
				rounded-md">
				<div className="Row grid grid-cols-3 items-center justify-between 
					text-gray-500 py-4 text-lg">
					<div>
						<div className="FieldName flex pl-2">To</div>
					</div>

					<div>
						<div className="Icon grid mr-2 h-7 w-7 rounded-full 
							place-items-center">
							<FaWallet />
						</div>
					</div>

					<div>
						<input className="Recipient border-none bg-transparent 
							outline-none text-white text-lg pr-2 w-full truncate"
							placeholder='Address'
							value={recipient}
							onChange={(e) => setRecipient(e.target.value)}
						/>
					</div>					
					
				</div>

				<div className="Divider border px-4 border-gray-600" />

				<div className="Row grid grid-cols-3 items-center 
					justify-between text-gray-500 py-4 text-lg">
						<div>
							<div className="FieldName pl-2">Pay with</div>
						</div>
						
						<div>
							<div className="CoinSelectList flex flex-[1.3] h-full hover:cursor-pointer">
								<div className="Icon h-8 w-8 grid mr-2 rounded-full 
									place-items-center">
									{imageUrl
										? <Image
												height={20} 
												width={20} 
												src={imageUrl} 
												alt="btc.png" />
										: <FaWallet />
									}
								</div>
							</div>
						</div>

						<div>
							<div className="CoinName flex-1 border-none 
								bg-transparent text-white outline-none 
								text-lg mr-2">{selectedToken.name}</div>

						</div>
				</div>

			</div>

			<Web3Button contractAddress={contractToken}	action={() =>
					transferTokens({
						to: recipient, // Address to transfer to
						amount: amount, // Amount to transfer
					})
				}
	    >
				Transfer
			</Web3Button>
			
			<div className="Row flex items-center justify-between 
				text-gray-500 pt-4 text-lg">
				<button className="Continue text-white w-full bg-blue-500 p-2
					text-center rounded-lg text-lg hover:cursor-pointer 
					hover:bg-blue-600">
						Continue
				</button>
			</div>

			<div className="Row flex items-center justify-between 
				text-gray-500 pt-4 text-lg">
				<div className='BalanceTitle'>
					{selectedToken.symbol} Balance
				</div>

				<div className="Balance">{balance ? balance.displayValue : <Spinner size={"h-4 w-4"}/>} {selectedToken.symbol}</div>
			</div>
		</div>
	)
}

export default Transfer
