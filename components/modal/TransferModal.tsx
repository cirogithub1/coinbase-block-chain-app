import { useState } from 'react'
import { useContract } from "@thirdweb-dev/react"

import Transfer from './Transfer'
import CoinSelector from './CoinSelector'
import Receive from './Receive'

const TransferModal = ({ 
	sanityTokens, 
	walletAddress,
	thirdwebTokens } : { sanityTokens:any, walletAddress:any, thirdwebTokens:any}) => 
{
	const [action, setAction] = useState("send")
	const [selectedToken, setSelectedToken] = useState(sanityTokens[0])
	// const [prevBalance, setPrevBalance] = useState<any>(0)

	// const { 
	// 	contract: contractToken, 
	// 	error: errorContract }:any = useContract(selectedToken.contractAddress)
	// if (errorContract) console.error("from errorContract =" , errorContract)

	const selectedModal = (option:string) => {
		switch (option) {
			case "send":
				return (
					<Transfer 
						selectedToken={selectedToken} 
						thirdwebTokens={thirdwebTokens}
						setAction={setAction}
						walletAddress={walletAddress} />)
			case "receive":
				return (
					<Receive 
						selectedToken={selectedToken} 
						setAction={setAction}
						walletAddress={walletAddress} />)
			case "select":
				return (
					<CoinSelector 
						setAction = {setAction} 
						selectedToken = {selectedToken}
						setSelectedToken = {setSelectedToken}
						sanityTokens = {sanityTokens}
						walletAddress = {walletAddress}
						thirdwebTokens = {thirdwebTokens} />)
			case "transferring":
				return (
					<Transfer 
						selectedToken={selectedToken} 
						thirdwebTokens={thirdwebTokens}
						setAction={setAction}
						walletAddress={walletAddress} />)
			case "transferred":
				return (
					<div className="Transferring w-full h-auto">
						<div className='Started text-3xl flex items-center
						 	justify-center text-gray-200 mt-4 mb-4'>
							Transfer Started</div>

						<div className="Wallet flex items-center justify-center
							animate-pulse text-base text-green-400">
							Pleas refresh & check your wallet</div>
					</div>
				)
			default:
				return <h2>Sended</h2>
		}
	}

	// async function getSDK() {
	// 	if (contractToken) {
	// 		try {
	// 			// const contract:any = await sdk.getContract(selectedToken.contractAddress)
	// 			const balance = await contractToken.erc20.balance()	
	// 			// console.log("/TransferModal balance =", balance.displayValue)
				
	// 			if (!balance.toString().includes('Promise')) setPrevBalance(balance.displayValue)

	// 		} catch (err) {
	// 			console.error("/TransferModal Error =", err)	
	// 		}
	// 	}
	// }	
	// getSDK()
		
	return (
		<div className='Wrapper flex flex-col h-[29rem] w-[26rem] text-white border 
			border-gray-600 overflow-hidden'>
			<div className="Selector flex justify-evenly items-center max-h-min">
				<div className={`Option h-full w-full grid place-items-center
					text-lg font-semibold hover:cursor-pointer hover:bg-[#111213]
					${action === "send" ? "text-[#3773f4]" : "border border-[#282b2e]"}`}
					onClick={() => setAction("send")}>
						<p className="">
							Send
						</p>
				</div>
				
				<div className={`Option h-full w-full grid place-items-center
					text-lg font-semibold hover:cursor-pointer hover:bg-[#111213]
					${action === "receive" ? "text-[#3773f4]" : "border border-[#282b2e]"}`}
					onClick={() => setAction("receive")}>
						<p className="">
							Receive
						</p>
				</div>
			</div>

			<div className="ModalMain flex-1 p-4">
				{selectedModal(action)}
			</div>
		</div>
	)
}

export default TransferModal
