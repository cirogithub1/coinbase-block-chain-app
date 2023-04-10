import { useState } from 'react'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import TransferModal from './modal/TransferModal'
import Link from 'next/link'

import Spinner from './Spinner'
import Disconnect from './Disconnect'

Modal.setAppElement('#__next')

const Header = ({ 
	walletAddress, 
	sanityTokens,
	thirdwebTokens } : { thirdwebTokens:any, walletAddress:any, sanityTokens:any }) => 
{

	const router = useRouter()
	const [disconnect, setDisconnect] = useState(false)

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			transform: 'translate(-50%, -50%)',
			backgroundColor: '#0a0b0e',
			padding: 0,
			border: 'none'
		},
		overlay: {
			backgroundColor: 'rgba(10,11,13,.75)'
		}

	}
	return (
		<div className={`Wrapper flex justify-center p-1 border-b border-l border-gray-500`}>
				<div className="Title flex-1 text-3xl font-sans">
					<h1>
						Assets
					</h1></div>

				<div className="Disconnect">
					{disconnect
						&& <Disconnect setDisconnect={setDisconnect}/>}</div>

				<div 
					className="WalletLink text-sm border border-gray-500 rounded-lg mx-4 px-3 py-1 flex flex-col items-center justify-center hover:bg-blue-600 hover:border-blue-600"
					onClick={() => setDisconnect(true)}>
						<div 
							className="WallerTitle text-[#27ad74] font-semibold hover:cursor-pointer">
								MyWallet</div>

						<>
							{walletAddress
							?
								<div className="WalletAddress text-xs text-gray-500">
									{walletAddress.slice(0,5)}...</div>
							:
								<div className="Spinner">
									<Spinner size="h-32 w-32" /></div>
							}
						</>

				</div>

				<div className="ButtonContainer flex space-x-2">
					<div className='Button border border-blue-600 px-2 pt-2 pb-1 text-lg font-bold rounded-md bg-blue-600 text-black cursor-pointer'>
							Buy / Sell</div>

					<Link href={'/?transfer=1'}>
						<div className='Button border border-gray-500 px-2 pt-2 pb-3 text-lg font-bold rounded-md cursor-pointer'>
								Send / Receive            
						</div>
					</Link>
					
				</div>

				<Modal 
					isOpen={!!router.query.transfer}
					onRequestClose={() => router.push('/')}
					style={customStyles}>
						{thirdwebTokens[0]
						?
							<>
								{!thirdwebTokens[0].toString().includes('Promise') 
								? 
									<TransferModal 
										walletAddress={walletAddress} 
										sanityTokens={sanityTokens}
										thirdwebTokens={thirdwebTokens} />
								: ''
								}
							</>
						: 
							<div className='Wrapper flex flex-col 
								h-96 w-96 text-white border border-gray-600 
								overflow-hidden'>
								<Spinner size='h-10 w-10'/></div>
						}
				</Modal>
		</div>
	)
}

export default Header
