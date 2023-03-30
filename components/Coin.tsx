import {BsThreeDotsVertical } from 'react-icons/bs'
import Image from 'next/image'

const Coin = ({ coin }:{ coin:any}) => {
	return (
		<div className='Wrapper '>
			<div className='pt-2 pb-2 px-4'>
				<div className="NameCol grid grid-cols-6 
					items-center space-x-2 justify-center">
					<div >
						<div className="CoinIcon w-8">
							<Image src={coin.logo} alt={coin.name}/>
						</div>
					</div>
					
					<div >
						<div className="Primary ">
							{coin.name}
						</div>

						<div className="Secondary text-[#8a919d] text-sm ">
							{coin.sign}
						</div>
					</div>

					<div >
						<div className="Primary ">
							{'$'}
							{coin.balanceUsd}
						</div>

						<div className="Secondary text-[#8a919d] text-sm">
							{coin.balanceCoin}
						</div>
					</div>

					<div>
						<div>
							<div className="Primary">
								{'$'}
								{coin.priceUsd}
							</div>

							<div className={`text-sm ${coin.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
								{coin.change > 0 && '+'}
								{coin.change}%
							</div>
						</div>
					</div>

					<div>
						{coin.allocation}%
					</div>
					
					<div>
						<BsThreeDotsVertical />
					</div>

				</div>
			</div>
		</div>
	)
}

export default Coin
