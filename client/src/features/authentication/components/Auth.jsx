
export const Auth=({text,icon})=>{
    return (
        <div className="border-2 p-2 flex justify-center items-center">
            <i>{icon}</i>
           <h1 className="text-center text-sm text-gray-700">{text}</h1> 
        </div>
    )
}


