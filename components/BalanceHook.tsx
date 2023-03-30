import { useContractRead  } from "@thirdweb-dev/react"
import Spinner from "./Spinner"
import { useEffect } from "react"

const BalanceHook = ({ contract }:{ contract:any }) => {
	const { data, isLoading, error } = useContractRead(contract, "balanceOf")

	useEffect(() => {
		if(isLoading) {
			<Spinner size={"h-8 w-8"} />
		} else {
			if (error) {
				console.log(error)
			}
		}
	
		if (data) { 
			console.log('data =', data)
		} 
	}, [data, isLoading, error])

	return data
}

export default BalanceHook
