import { useState } from "react";

import Form from "./Components/Form/Form";
import Result from "./Components/Result/Result";
// import "./App.css";

function App() {
  const [result, setResult] = useState({});
  const [showresult, setShowResult] = useState(false);

  const resultHandler = (data) => {
    setResult(data);
    setShowResult(true);
  };

  const resetHandler = () => {
    setResult({});
    setShowResult(false);
  };

  return (
    <div className="App">
      <Form onSubmission={resultHandler} onReset={resetHandler} />
      <Result result={result} showResult={showresult} />
    </div>
  );
}

export default App;
