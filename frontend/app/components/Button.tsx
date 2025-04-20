"use client"
export const PrimaryButton = ({children , onClick } : {
    children : React.ReactNode,
    onClick : () => void
}) =>
     {
    return <button type="button" onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
     focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 mb-2">
         {children}
        </button>
}

export const SecondaryButton = ({children , onClick , prefix} : {
    children : React.ReactNode,
    onClick : () => void ,
    prefix? : React.ReactNode
}) => {
    return <button type="button" onClick={onClick} className="text-white bg-blue-500 hover:bg-gray-900 focus:outline-none focus:ring-4
    focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 flex">
       <div>
        {prefix}
       </div>
       <div>
        {children}
       </div>
       </button>
}