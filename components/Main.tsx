import Portfolio from "./Portfolio"
import Leyends from './Leyends'
import BalanceChart from './BalanceChart'

const Main = ({ walletAddress, sanityTokens, thirdwebTokens }:{ walletAddress:any, sanityTokens:any, thirdwebTokens:any }) => {

	return (
		<div className="Wrapper px-4 
			justify-between grid grid-cols-3">
				<div className='col-span-2 m-4'>
					<div className="Chart border border-gray-500 rounded-md">
						<div className="Balance p-2">
							<div className="Title text-[#8a919d] text-sm">
								Portfolio Balance								
							</div>

							<div className="BalanceValue text-xl font-bold ">
								$46.000
							</div>
						</div>

						<BalanceChart />
					</div>
				</div>

				<div className="col-start-3">
					<Leyends />
				</div>

				<div className="col-span-2 m-3">
					<Portfolio walletAddress={walletAddress} sanityTokens={sanityTokens} thirdWebTokens={thirdwebTokens}/>
				</div>

		</div>
	)
}

export default Main
