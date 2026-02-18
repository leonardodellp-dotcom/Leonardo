import { useState, useEffect, useCallback } from "react";
import { RefreshCw, ShieldCheck } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  className?: string;
}

export function Captcha({ onVerify, className = "" }: CaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);

  const generateChallenge = useCallback(() => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserInput("");
    setError(false);
    onVerify(false); // Reset verification state
  }, [onVerify]);

  useEffect(() => {
    generateChallenge();
  }, [generateChallenge]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    
    if (parseInt(value) === num1 + num2) {
      setError(false);
      onVerify(true);
    } else {
      onVerify(false);
    }
  };

  const handleBlur = () => {
    if (userInput && parseInt(userInput) !== num1 + num2) {
      setError(true);
    }
  };

  return (
    <div className={`space-y-3 p-4 bg-muted/50 rounded-xl border border-border ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Verificação de Segurança</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary"
          onClick={generateChallenge}
          title="Gerar novo desafio"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 bg-background border border-primary/20 px-4 py-2 rounded-lg font-bold text-lg select-none tracking-widest text-primary shadow-sm italic flex items-center gap-2">
          <span>{num1}</span>
          <span className="text-muted-foreground font-normal">+</span>
          <span>{num2}</span>
          <span className="text-muted-foreground font-normal">=</span>
        </div>

        <div className="flex-grow">
          <Input
            type="number"
            placeholder="Resultado"
            value={userInput}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`text-center font-bold ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
        </div>
      </div>
      
      {error && (
        <p className="text-[10px] text-destructive font-medium animate-pulse">
          * Resultado incorreto. Tente novamente.
        </p>
      )}
      
      <p className="text-[10px] text-muted-foreground leading-tight">
        Resolva este desafio matemático simples para confirmar que você é humano.
      </p>
    </div>
  );
}
