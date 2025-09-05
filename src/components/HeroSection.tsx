import { ArrowDown, Code, Database, Server, Laptop, Smartphone, Globe, Braces, Cpu, Star, CheckCircle2, Github, Flame, Zap, Brain, Rocket, Play, ChevronRight, Eye, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const codeSnippets = [
  {
    id: "welcome",
    language: "tsx",
    title: "Welcome Message",
    code: " function WelcomeVisitor() {\n  const [visitor, setVisitor] = useState('friend');\n  \n  useEffect(() => {\n    // Personalized greeting\n    console.log('Thanks for visiting my portfolio!');\n    \n    return () => {\n      // Hope to connect soon\n      console.log('Hope you enjoyed exploring my work!');\n    };\n  }, []);\n  \n  return (\n    <div className=\"welcome-container\">\n      <h1>Hello, {visitor}! 👋</h1>\n      <p>Welcome to my portfolio. I'm excited to share my work with you.</p>\n      <button onClick={() => setVisitor('future collaborator')}>Let's Connect</button>\n    </div>\n  );\n}"
  },
  {
    id: "funny",
    language: "javascript",
    title: "Developer Jokes",
    code: " function DevHumor() {\n  const jokes = [\n    { setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs! 🐛' },\n    { setup: 'How many programmers does it take to change a light bulb?', punchline: 'None. It\'s a hardware problem! 💡' }\n  ];\n  \n  const [index, setIndex] = useState(0);\n  const nextJoke = () => setIndex(1 - index); // Toggle between 0 and 1\n  \n  return (\n    <div className=\"joke-container\">\n      <p>{jokes[index].setup}</p>\n      <p>{jokes[index].punchline}</p>\n      <button onClick={nextJoke}>Next Joke</button>\n    </div>\n  );\n}"
  },
  {
    id: "contact",
    language: "typescript",
    title: "Coffee Chat Invitation",
    code: " function scheduleCoffeeChat(availability: string[]): string {\n  // No boring contact forms here!\n  const coffeeEmojis = ['☕', '🍵', '🧋', '🥤', '🧃'];\n  const randomEmoji = coffeeEmojis[Math.floor(Math.random() * coffeeEmojis.length)];\n  \n  // Check if we can meet\n  if (availability.length === 0) {\n    return `No time for coffee? That's espresso-ly sad! ${randomEmoji}`;\n  }\n  \n  // Suggest meeting times with terrible puns\n  console.log('Brewing up some meeting times...');\n  \n  return `\n    Great! Let's have a brew-tiful conversation! ${randomEmoji}\n    \n    I'm free on: ${availability.join(', ')}\n    \n    Warning: I might talk a latte about coding.\n    \n    P.S. I promise my code is better than my coffee puns!\n  `;\n}"
  }
];

export function HeroSection() {
  const [activeSnippet, setActiveSnippet] = useState(codeSnippets[0]);
  const [typedCode, setTypedCode] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const getNextSnippet = useCallback((currentSnippet: typeof codeSnippets[0]) => {
    const currentIndex = codeSnippets.findIndex(s => s.id === currentSnippet.id);
    const nextIndex = (currentIndex + 1) % codeSnippets.length;
    return codeSnippets[nextIndex];
  }, []);
  
  useEffect(() => {
    if (activeSnippet) {
      setIsTyping(true);
      setTypedCode("");
      
      let i = 0;
      const code = activeSnippet.code;
      
      const typingInterval = setInterval(() => {
        if (i < code.length) {
          setTypedCode(prev => prev + code.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          
          const pauseTimeout = setTimeout(() => {
            setActiveSnippet(getNextSnippet(activeSnippet));
          }, 3000); 
          
          return () => clearTimeout(pauseTimeout);
        }
      }, 20); 
      
      return () => clearInterval(typingInterval);
    }
  }, [activeSnippet, getNextSnippet]);
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  const formattedCode = typedCode.split('\n').map((line, index) => (
    <div key={index} className="flex">
      <span className="text-muted-foreground w-8 text-right pr-3 select-none">{index + 1}</span>
      <span className="flex-1">{line}</span>
    </div>
  ));
  
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 overflow-hidden"
    >
      
      <div className="container relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-2 sm:px-4">
          <motion.div 
            className="lg:col-span-7 bg-muted/20 backdrop-blur-sm rounded-lg border border-muted/30 overflow-hidden shadow-xl w-full order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between bg-muted/30 px-4 py-2 border-b border-muted/30 gap-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-sm font-mono text-muted-foreground order-first sm:order-none">{activeSnippet.title}</div>
              <div className="flex space-x-2">
                {codeSnippets.map(snippet => (
                  <button 
                    key={snippet.id}
                    onClick={() => setActiveSnippet(snippet)}
                    className={`text-xs py-1 px-2 rounded ${activeSnippet.id === snippet.id ? 'bg-primary/20 text-primary' : 'hover:bg-muted/50'}`}
                  >
                    {snippet.id}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 font-mono text-sm">
              <pre className="text-left whitespace-pre-wrap break-words">
                <code>
                  {formattedCode}
                  {cursorVisible && !isTyping && <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse"></span>}
                </code>
              </pre>
            </div>
            
            <div className="flex justify-between items-center bg-muted/30 px-4 py-2 border-t border-muted/30 text-xs text-muted-foreground">
              <div>language: {activeSnippet.language}</div>
              <div className="flex items-center gap-2">
                <Play size={12} />
                <span className="hidden sm:inline">Run Code</span>
                <span className="inline sm:hidden">Run</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-5 text-left space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, y: 20, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <motion.div 
              className="text-base md:text-lg font-light tracking-wider text-primary mb-1 relative inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="relative">
                Hai👋, I am
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/30"></span>
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Nitin Shukla
            </h1>
            
            <h2 className="text-xl md:text-2xl text-primary font-medium">
              Full Stack Developer & Open Source Contributor
            </h2>
            
            <p className="text-muted-foreground">
              I build exceptional digital experiences with clean code and thoughtful architecture.
              Specialized in React, TypeScript, and algorithmic problem-solving.
            </p>
            
            {/* Key stats */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Brain size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">200+</div>
                  <div className="text-xs text-muted-foreground">Coding Problems</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Rocket size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">6+</div>
                  <div className="text-xs text-muted-foreground">Projects Built</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Github size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Open Source</div>
                  <div className="text-xs text-muted-foreground">Contributor</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Flame size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Full Stack</div>
                  <div className="text-xs text-muted-foreground">Development</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <Button 
                variant="default" 
                size="lg" 
                asChild 
                className="rounded-md px-6 bg-primary hover:bg-primary/90 transition-all duration-300"
              >
                <a href="#projects" className="flex items-center gap-2">
                  View Projects
                  <Eye size={16} />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="rounded-md px-6 border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
              >
                <a href="#contact" className="flex items-center gap-2">
                  Contact Me
                  <Mail size={16} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-12">
          <motion.div 
            className="animate-bounce-subtle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a href="#about" className="flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <span>Explore More</span>
              <ArrowDown className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}