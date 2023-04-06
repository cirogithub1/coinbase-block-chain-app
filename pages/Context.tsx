import React from "react"

export const TokensContext = React.createContext({
	totalTokensBalance: 0, 
	setTotalTokensBalance: (prev: number) => {}	
})
