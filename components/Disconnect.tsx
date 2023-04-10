import { useDisconnect } from "@thirdweb-dev/react"
import styles from '../styles/Layout.module.css'

const Disconnect = ({ setDisconnect } : { setDisconnect:any }) => {

	const disconnect = useDisconnect()

	return (

		<div className={`${styles.disconnectDiv} Wrapper flex flex-col h-full w-44 `}
		// {styles.imgStyle}"disconnectDiv flex flex-col h-full w-auto
		// "
		>
			<div className="Title animate-pulse text-orange-500 text-center">
				Disconnect Wallet</div>

			<div className="Buttons flex justify-evenly">
				<button 
					className="Yes justify-center items-center bg-blue-600 border-none w-8 rounded"
					onClick={disconnect}
					>
					Yes</button>

				<button 
					className={`${styles.disconnectBut} No justify-center items-center bg-blue-600 border-none w-8 rounded`}
					// "No justify-center items-center bg-blue-600 border-none w-8 rounded"
					onClick={() => setDisconnect(false)}
					>
					No</button>

			</div>

		</div>
	)
}

export default Disconnect