
import { useEffect, useRef, useState } from "react";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, className = "", children }: SectionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section-padding relative overflow-hidden ${className} ${isVisible ? "animate-fade-up" : "opacity-0"}`}
    >
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
