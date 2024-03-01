import Tile from "./tile";

function Board() {
    const tile = [['a','b'],['c','d'],['e','f'],['g','h']]
    return ( 
        <div className="flex">
            {tile.map((value,i)=>{
                return(
                    <div className="flex" key={i}>

                    <div key={value[0]}>
                        <Tile tile="even"></Tile>
                    </div>
                    <div key={value[1]}>
                        <Tile tile="odd"></Tile>
                    </div>

                    </div>
                )
            })}
        </div>
     );
}

export default Board;