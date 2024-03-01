import Image from "next/image";
import { FC } from "react";

interface IProps {
    tile:string
}

const Tile:FC<IProps>=({tile})=> {
    const arr = [1,3,5,7]
    return ( 
        <div>
            {tile==="even"?(
                <div className="flex-col-reverse">
                    {arr.map((value)=>{
                        return(
                            <div>
                                <div key={value} className="bg-chessblack flex-none h-24 w-24">
                                    <button className="h-24 w-24"></button>
                                </div>
                                   
                                <div key={value+1} className="bg-chesswhite h-24 w-24"> <button className="h-24 w-24"></button></div>
                            </div>
                        )
                    })}
                </div>
            ):(  
                <div className="flex-col-reverse">
                    {arr.map((value)=>{
                        return(
                            <div>
                                <div key={value} className="bg-chesswhite h-24 w-24">
                                <button className="h-24 w-24"></button>
                                </div>
                                <div key={value+1} className="bg-chessblack h-24 w-24">
                                <button className="h-24 w-24"></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
     );
}

export default Tile;