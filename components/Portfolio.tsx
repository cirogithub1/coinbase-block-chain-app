
import { BsThreeDotsVertical } from 'react-icons/bs'
import { coins } from '../static/coins'
import Coin from './Coin' 
import Spinner from './Spinner'

const Portfolio = () => {

	return (
		<div className="Wrapper min-w-fit]">
			<div className="Content pt-4 pl-2">
				<div className="PortfolioTable mt-4 border border-gray-500 
					rounded-lg">
					<div className="TableItem p-4" >
						<div className="Title text-2xl font-semibold ">
							Your Portfolio
						</div>	
					</div>

					<div className="Divider border-b border-gray-500" />

					<div className="Table">
						<div className="TableItem px-4">
							<div className="TableRow grid grid-cols-6 
								items-center space-x-2 justify-center">
									<div className='flex-initial'>Sign</div>
									<div className='flex-initial'>Name</div>
									<div className='flex-initial'>Balance</div>
									<div className='flex-initial'>Price</div>
									<div className='flex-initial'>Allocation</div>
									<div className=''><BsThreeDotsVertical /></div>
							</div>
						</div>

						<div className=''>{coins.map((coin, index) => (
							<div key={index}>
								<div className="Divider border-b border-gray-500" />
								<Coin coin={coin} />
							</div>
						))}</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default Portfolio
