import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecond) {
      setDisplay(digit);
      setWaitingForSecond(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForSecond) {
      setDisplay("0.");
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const handleOperator = (nextOp: string) => {
    const inputValue = parseFloat(display);
    if (firstOperand !== null && operator && !waitingForSecond) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    } else {
      setFirstOperand(inputValue);
    }
    setOperator(nextOp);
    setWaitingForSecond(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (firstOperand !== null && operator) {
      const result = calculate(firstOperand, parseFloat(display), operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };

  const clear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const handleButton = (btn: string) => {
    if (btn >= "0" && btn <= "9") inputDigit(btn);
    else if (btn === ".") inputDot();
    else if (btn === "C") clear();
    else if (btn === "=") handleEquals();
    else if (btn === "±") setDisplay(String(-parseFloat(display)));
    else if (btn === "%") setDisplay(String(parseFloat(display) / 100));
    else handleOperator(btn);
  };

  const isOperator = (btn: string) => ["+", "-", "×", "÷"].includes(btn);

  return (
    <div className="container max-w-sm py-12">
      <Card className="animate-fade-in overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-4 rounded-lg bg-muted p-4 text-right">
            <div className="text-sm text-muted-foreground h-5">
              {firstOperand !== null ? `${firstOperand} ${operator || ""}` : ""}
            </div>
            <div className="text-3xl font-mono font-semibold text-foreground truncate">
              {display}
            </div>
          </div>
          <div className="grid gap-2">
            {buttons.map((row, i) => (
              <div key={i} className="grid gap-2" style={{ gridTemplateColumns: i === 4 ? "2fr 1fr 1fr" : "repeat(4, 1fr)" }}>
                {row.map((btn) => (
                  <Button
                    key={btn}
                    variant={isOperator(btn) || btn === "=" ? "default" : btn === "C" ? "destructive" : "secondary"}
                    className="h-14 text-lg font-medium"
                    onClick={() => handleButton(btn)}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
