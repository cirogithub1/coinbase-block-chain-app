// size="h-8 w-8"
function Spinner({ size }:{ size:string }) {
	return(
		<div className="flex justify-center items-center p-3">
			<div className={`animate-spin rounded-full ${size ? size: "h-8 w-8"} border-t-2 border-red-700`}/>
		</div>
	)
}

export default Spinner