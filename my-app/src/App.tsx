import { useState } from 'react';

export function add(a: number, b: number): number { return a + b; }
export function subtract(a: number, b: number): number { return a - b; }
export function multiply(a: number, b: number): number { return a * b; }
export function divide(a: number, b: number): number | string {
  if (b === 0) return 'Error: Cannot divide by zero';
  return a / b;
}

function App() {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<number | string>('');

  function handleCalculate(type: string) {
    const a = Number(num1);
    const b = Number(num2);
    if (type === 'add') setResult(add(a, b));
    if (type === 'subtract') setResult(subtract(a, b));
    if (type === 'multiply') setResult(multiply(a, b));
    if (type === 'divide') setResult(divide(a, b));
  }

  return (
    <div className="calc-page">
      <div className="calc-card">
        <h2 className="calc-title">Calculator</h2>
        <div className="calc-inputs">
          <input className="input-field" type="number" placeholder="Number 1" value={num1} onChange={(e) => setNum1(e.target.value)} />
          <input className="input-field" type="number" placeholder="Number 2" value={num2} onChange={(e) => setNum2(e.target.value)} />
        </div>
        <div className="calc-grid">
          <button className="btn-op" onClick={() => handleCalculate('add')}>+</button>
          <button className="btn-op" onClick={() => handleCalculate('subtract')}>-</button>
          <button className="btn-op" onClick={() => handleCalculate('multiply')}>×</button>
          <button className="btn-op" onClick={() => handleCalculate('divide')}>÷</button>
        </div>
        <div className="calc-result">
          <label>Result</label>
          <div className="result-value">{result !== '' ? result : '0'}</div>
        </div>
      </div>
    </div>
  );
}

export default App;