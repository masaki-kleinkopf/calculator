import { useState } from "react"
import './App.scss';

const App = () => {
  const [display, setDisplay] = useState("");

    const handleClick = (event) => {
    if (event.target.innerHTML === "AC") {
      setDisplay("");
    } else {
      setDisplay(display + event.target.innerHTML);
    }
  };

  return (
    <main className="App">
      <input type="text" value={display}></input>
      <section className="button-container">
        <button className="button" onClick={handleClick}>
          (
        </button>
        <button className="button" onClick={handleClick}>
          )
        </button>
        <button className="button" onClick={handleClick}>
          ^
        </button>
        <button className="button" onClick={handleClick}>
          AC
        </button>
        <button className="number" onClick={handleClick}>
          7
        </button>
        <button className="number" onClick={handleClick}>
          8
        </button>
        <button className="number" onClick={handleClick}>
          9
        </button>
        <button className="operation" onClick={handleClick}>
          /
        </button>
        <button className="number" onClick={handleClick}>
          4
        </button>
        <button className="number" onClick={handleClick}>
          5
        </button>
        <button className="number" onClick={handleClick}>
          6
        </button>
        <button className="operation" onClick={handleClick}>
          x
        </button>
        <button className="number" onClick={handleClick}>
          1
        </button>
        <button className="number" onClick={handleClick}>
          2
        </button>
        <button className="number" onClick={handleClick}>
          3
        </button>
        <button className="operation" onClick={handleClick}>
          -
        </button>
        <button className="number" onClick={handleClick}>
          0
        </button>
        <button className="number" onClick={handleClick}>
          .
        </button>
        <button className="equal" onClick={handleClick}>
          =
        </button>
        <button className="operation" onClick={handleClick}>
          +
        </button>
      </section>
    </main>
  );
}

export default App;
