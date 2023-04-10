import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm"
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const sdk = new ThirdwebSDK("goerli")

const CheckTransaction = ({ 
	contractToken,
	action,
	setAction,
	walletAddress,
	prevBalance, 
	selectedToken } : { 
		prevBalance:any, 
		selectedToken:any,
		walletAddress:any,
		setAction:any,
		action:any,
		contractToken:any }) => 
{
	// const [contract, setContract] = useState<any>('')
	const [actualBalance, setActualBalance] = useState('')

	useEffect(() => {
		async function getBalance() {
			if (contractToken) {
				
				const balance_hex = await contractToken.call("balanceOf", walletAddress)
				const balance_str = ethers.utils.formatUnits(balance_hex)
				// const balance2 = await contractToken.erc20.balance()
				// setInterval(() => {
					// }, 10000)
				setActualBalance(balance_str)
			}
			console.log("/CheckTransaction wait for balance")
		}
	
		getBalance()
	},[contractToken, walletAddress])

	return (
		<>
			{actualBalance 
			?
			<>
				{(prevBalance === actualBalance) 
				? <div>
						<h2>
							{prevBalance}</h2>
						<h1>===</h1>
						<h2>
							{actualBalance}</h2></div>
				: setAction("transferred")}</>
			:"wait balance"}</> 
	)
}

export default CheckTransaction
