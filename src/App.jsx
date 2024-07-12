import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  // let count = 0;
  // useEffect(()=>{
  //   count = count+1
  // },[])
  useEffect(() => {
    // console.log("dice state changed");
    // const allHeld = dice.find((die)=>(die.isHeld===false))
    const allHeld = dice.every((die) => die.isHeld);
    // const allHeld = dice.filter((die) => die.isHeld == true);

    // dice.find((die)=>(console.log(die.isHeld)));
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    // console.log(allHeld,allSameValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      // console.log("end game");
    }
  }, [dice]);
  function allNewDice() {
    let arr = [];
    for (var i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return arr;
  }

  function hold(id) {
    // console.log(id);
    // const hold=dice.find((val)=>{ return val.id=id});
    // console.log(hold);
    setDice((prevDice) => {
      // const hold=dice.find((val)=>{ return val.id=id});
      const updatedDice = prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
      return updatedDice;
    });
  }
  //  console.log(allNewDice());
  function roll() {
    if (!tenzies) {
      // count = count +1;
      setRollCount((prevCount) => {
        return prevCount + 1;
      });
      // console.log(count);
      setDice((prevDie) => {
        return prevDie.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        });

        // const updatedDie = prevDie.map(die=>((die.isHeld===true)?die:{...die,value:Math.ceil(Math.random()*6)}))
        // return updatedDie;
      });
    } else {
      // count = 0;
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0);
    }
  }

  const dieElement = dice.map((val) => {
    return (
      <Die
        key={val.id}
        dice={val.value}
        id={val.id}
        isHeld={val.isHeld}
        hold={hold}
      />
    );
  });

  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{dieElement}</div>
      <button className="rolldice" onClick={roll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <p className="instructions">number of rolls: {rollCount}</p>}
      {/* {tenzies && count } */}
    </main>
  );
}
