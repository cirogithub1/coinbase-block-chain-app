import Image from 'next/image'
import coinbaseLogo from '../public/assets/cb-logo.png'
import { navItems } from '../static/navItems'
import { useState } from 'react'
const Sidebar = () => {
	const [activeIcon, setActiveIcon] = useState(navItems[0].title)

	return (
		<div className="Wrapper border-r-gray-500 pt-0 pl-2">
			<div className="LogoContainer mt-3">
				<div className="Logo ">
					<Image width={80} height={80} src={coinbaseLogo} alt={'cb-logo.png'} />
				</div>
			</div>

			<div className="NavItemsContainer mt-6 hover:cursor-pointer">
				{navItems.map( (item, index) => (
					<div 
						key={index} 
						className="NavItem flex items-center 
						text-lg font-semibold rounded-lg gap-2
						h-16 hover:bg-[#141518]"
						onClick={() => setActiveIcon(item.title)}>
							<div className={`NavIcon bg-[#14518] p-3 rounded-lg 
								ml-2 grid place-items-center
								${item.title === activeIcon && 'text-[#3773f4]'}`}>
									{item.icon}							
							</div>

							<div className="NavTitle">
								{item.title}
							</div>		
					</div>
				))}
			</div>
		</div>

	)
}

export default Sidebar

