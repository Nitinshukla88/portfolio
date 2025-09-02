
import { useEffect, useState } from "react";

interface TypedTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  cursorColor?: string;
  prefix?: string;
}

export function TypedText({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1500,
  className = "",
  cursorColor = "bg-primary",
  prefix = "",
}: TypedTextProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (phrases.length === 0) return;

    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (currentText === currentPhrase) {
        // Finished typing, wait before starting to delete
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenPhrases);
      } else {
        // Continue typing
        timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    } else {
      if (currentText === "") {
        // Finished deleting, move to next phrase
        setIsTyping(true);
        setCurrentPhraseIndex((prevIndex) =>
          prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // Continue deleting
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentPhraseIndex, delayBetweenPhrases, isTyping, phrases, typingSpeed, deletingSpeed]);

  return (
    <div className={`font-mono flex items-center ${className}`}>
      {prefix && (
        <span className="mr-2 text-muted-foreground">{prefix}</span>
      )}
      <div className="relative">
        <span className="inline-block">{currentText}</span>
        <span className={`absolute inline-block w-0.5 h-5/6 ml-0.5 ${cursorColor} animate-blink`}></span>
      </div>
    </div>
  );
}
