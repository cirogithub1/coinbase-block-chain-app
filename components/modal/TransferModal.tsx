import { useState } from 'react'
import Transfer from './Transfer'
import CoinSelector from './CoinSelector'

const TransferModal = ({ 
	sanityTokens, 
	walletAddress,
	thirdwebTokens } : { sanityTokens:any, walletAddress:any, thirdwebTokens:any}) => {
	const [action, setAction] = useState("send")
	const [selectedToken, setSelectedToken] = useState(sanityTokens[0])

	const selectedModal = (option:string) => {
		switch (option) {
			case "send":
				return <Transfer 
					selectedToken={selectedToken} 
					setAction={setAction}
					walletAddress={walletAddress}/>
			case "receive":
				return <h2>Receive</h2>
			case "select":
				return <CoinSelector 
					setAction = {setAction} 
					selectedToken = {selectedToken}
					setSelectedToken = {setSelectedToken}
					sanityTokens = {sanityTokens}
					walletAddress = {walletAddress}
					thirdwebTokens = {thirdwebTokens}/>
			default:
				return <h2>Sended</h2>
		}
	}

	return (
		<div className='Wrapper flex flex-col h-96 w-96 text-white border 
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
