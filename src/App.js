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

  const convertToTokens = (code) => {
    let results = [];
    let tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;

    let matchArray;
    while ((matchArray = tokenRegExp.exec(code)) !== null)
        results.push(matchArray[1]);
    return results;
  } 

  const isNumber = (token) => {
      return token !== undefined && token.match(/^[0-9]+$/) !== null;
  }

  const parse = (code) => {
    let tokens = convertToTokens(code);
    let position = 0;
      function peekAtNextToken() {
          return tokens[position];
      }
    const advanceToken = () => {
          position++;
      }
    const parsePrimaryExpr = () => {
          let token = peekAtNextToken();
          if (isNumber(token)) {
              advanceToken();
              return {type: "number", value: token};
          } else if (token === "(") {
              advanceToken();
              let expr = parseExpr();
              if (peekAtNextToken() !== ")")
                  throw new SyntaxError("expected )");
              advanceToken();
              return expr;
          } else {
              throw new SyntaxError("expected a different input");
          }
      }

    const parseExpoExpr = () => {
      let expr = parsePrimaryExpr();
      let token = peekAtNextToken();
      while (token === "^") {
          advanceToken(token);
          let rhs = parsePrimaryExpr();
          expr = {type: token, left: expr, right: rhs};
          token = peekAtNextToken();
      }
      return expr;
      }

    const parseMulExpr = () => {
        let expr = parseExpoExpr();
        let token = peekAtNextToken();
        while (token === "*" || token === "/") {
          advanceToken();
          let rhs = parsePrimaryExpr();
          expr = {type: token, left: expr, right: rhs};
          token = peekAtNextToken();
        }
        return expr;
        }

    const parseExpr = () => {
      let expr = parseMulExpr();
      let token = peekAtNextToken();
      while (token === "+" || token === "-") {
        advanceToken();
        let rhs = parseMulExpr();
        expr = {type: token, left: expr, right: rhs};
        token = peekAtNextToken();
      }
      return expr;
      }
    let result = parseExpr();
    return result;
  }


  const evaluateAsFloat = (code) => {
    const evaluate = (obj) => {
        switch (obj.type) {
        case "number":  return parseInt(obj.value);
        case "+":  return evaluate(obj.left) + evaluate(obj.right);
        case "-":  return evaluate(obj.left) - evaluate(obj.right);
        case "*":  return evaluate(obj.left) * evaluate(obj.right);
        case "/":  return evaluate(obj.left) / evaluate(obj.right);
        case "^":  return Math.pow(evaluate(obj.left),(evaluate(obj.right))) ;
        }
    }
  return evaluate(parse(code));
  }

  const handleEqualsClick = () => {
    setDisplay(evaluateAsFloat(display))
  }

  return (
    <main className="App">
      <div className="calculator-container">
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
        <button className="ac" onClick={handleClick}>
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
          *
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
        <button className="equal" onClick={handleEqualsClick}>
          =
        </button>
        <button className="operation" onClick={handleClick}>
          +
        </button>
      </section>
      </div>
    </main>
  );
}

export default App;
