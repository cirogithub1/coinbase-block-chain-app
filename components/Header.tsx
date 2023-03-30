import Modal from 'react-modal'
import { useRouter } from 'next/router'
import TransferModal from './modal/TransferModal'
import Link from 'next/link'

Modal.setAppElement('#__next')

const Header = ({ 
	walletAddress, 
	sanityTokens,
	thirdwebTokens } : { thirdwebTokens:any, walletAddress:any, sanityTokens:any }) => {

	const router = useRouter()

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
		<div className="Wrapper flex justify-center 
			p-1 border-b border-l border-gray-500">
				<div className="Title flex-1 text-3xl font-sans">
					<h1>
						Assets
					</h1>
				</div>

				<div className="WalletLink text-sm border border-gray-500 rounded-full
					mx-4 px-4 flex flex-col items-center justify-center">
						<div className="WallerTitle   
							text-[#27ad74] font-semibold">
								MyWallet
						</div>

						<div className="WalletAddress text-xs text-gray-500">
							{walletAddress.slice(0,5)}...
						</div>
				</div>

				<div className="ButtonContainer flex pb-1 space-x-2">
					<div className='Button border-none p-2 pt-1 pb-2 
						text-lg font-bold rounded-md bg-[#3773f4] text-black cursor-pointer'>
							Buy / Sell            
					</div>

					<Link href={'/?transfer=1'}>
						<div className='Button p-2 pt-1 pb-2 text-lg font-bold 
							border rounded-md cursor-pointer border-gray-500'>
								Send / Receive            
						</div>
					</Link>
					
				</div>

				<Modal 
					isOpen={!!router.query.transfer}
					onRequestClose={() => router.push('/')}
					style={customStyles}>
						<TransferModal 
							walletAddress={walletAddress} 
							sanityTokens={sanityTokens}
							thirdwebTokens={thirdwebTokens} />
				</Modal>
		</div>
	)
}

export default Header
