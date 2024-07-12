import { useState } from "react";
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from "react-icons/fa";

export default function Die(props){
    // const [icon,setIcon] = useState()
    let diceNumber ={
        1: <FaDiceOne  />,
        2: <FaDiceTwo  />,
        3: <FaDiceThree  />,
        4: <FaDiceFour  />,
        5: <FaDiceFive  />,
        6: <FaDiceSix />
    }
    return <div className="item"  onClick={()=>{props.hold(props.id)}}>
    <h2 className={props.isHeld?"die-icon-held":"die-icon"}>{diceNumber[props.dice]}</h2>
    </div>

    //when we create an object to map components to the keys, in that case
    //diceNumber[props.dice] will be converted to string, as we are accessing the object property
}