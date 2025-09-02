
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 py-10 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <a href="#home" className="text-2xl font-bold gradient-text">
              Portfolio
            </a>
          </div>
          
          <div className="flex gap-4 mb-6">
            <a
              href="https://github.com/Nammi-Kusuma"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/kusumanammi"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:kusumanammi0809@gmail.com"
              className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            <p className="text-[11px] sm:text-sm">&copy; {new Date().getFullYear()} Kusuma Nammi. All rights reserved.</p>
            <div className="mt-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 group">
              <p className="flex items-center gap-1 sm:gap-1.5">
                Crafted with <span className="group-hover:animate-bounce transition-transform duration-200">💻</span> and <span className="animate-heartbeat text-red-500">❤️</span>
              </p>
              <p>by a passionate developer</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
