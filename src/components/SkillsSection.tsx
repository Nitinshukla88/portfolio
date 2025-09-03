
import { useState, useRef, useEffect } from "react";
import { SectionHeading } from "./SectionHeading";
import { SectionWrapper } from "./SectionWrapper";
import { Code2, Database, Globe, Layout, Server, Settings, Zap, CheckCircle2, Cloud } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";

// Skill data with images
const skillCategories = [
  {
    name: "Frontend",
    icon: Layout,
    skills: [
      { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Redux", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    ],
  },
  {
    name: "Backend & Databases",
    icon: Server,
    skills: [
      { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      // { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      // { name: "Django", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      // { name: "FastAPI", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      // { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      // { name: "Spring Boot", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      // { name: "GraphQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    ],
  },
  {
    name: "DevOps & Cloud Tools",
    icon: Cloud,
    skills: [
      { name: "AWS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      // { name: "Azure", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Vercel", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Netlify", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
      // { name: "Redis", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      // { name: "Firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ],
  },
  {
    name: "Coding Languages",
    icon: Code2,
    skills: [
      { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      // { name: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    ],
  },
  {
    name: "Programming",
    icon: Code2,
    skills: [
      { name: "Data Structures", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Algorithms", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Problem Solving", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
  },
  {
    name: "Others",
    icon: Globe,
    skills: [
      // { name: "Jest", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
      // { name: "Cypress", image: "https://asset.brandfetch.io/idFdo8ulhr/idzj3BeQnk.png" },
      { name: "RESTful APIs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "WebSockets", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
      { name: "WebRTC", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
      // { name: "Agile", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
      // { name: "WebRTC", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webRTC/webRTC-original.svg" },
    ],
  },
];

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
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

  // Select 6 skills for the orbital cards
  const orbitalSkills = [
    { name: "HTML", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  ];

  // Center card content
  const centerSkill = {
    name: "Full Stack",
    description: "Development",
    icon: Code2,
  };

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  return (
    <SectionWrapper id="skills" className="bg-secondary/5 relative overflow-hidden">
      {/* Background decoration elements removed */}
      
      <div className="container mx-auto max-w-6xl" ref={sectionRef}>
        <SectionHeading>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            Skills
          </motion.span>
        </SectionHeading>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl md:text-2xl font-medium text-primary mb-3">
            <span className="gradient-text">Technical Expertise</span>
          </h3>
          <p className="text-muted-foreground">
            A comprehensive overview of my technical skills and proficiencies across various domains of software development.
          </p>
        </motion.div>
        

        
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => {
                const cardRef = useRef<HTMLDivElement>(null);
                const [isCardVisible, setIsCardVisible] = useState(false);
                
                // Individual intersection observer for each card
                useEffect(() => {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        setIsCardVisible(true);
                        observer.unobserve(entry.target);
                      }
                    },
                    { threshold: 0.2, rootMargin: "0px 0px -100px 0px" } // Trigger when card is 100px into viewport
                  );
                  
                  if (cardRef.current) {
                    observer.observe(cardRef.current);
                  }
                  
                  return () => {
                    if (cardRef.current) {
                      observer.unobserve(cardRef.current);
                    }
                  };
                }, []);
                
                return (
                  <motion.div
                    ref={cardRef}
                    key={category.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: isCardVisible ? 1 : 0, 
                      y: isCardVisible ? 0 : 50 
                    }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.2 + (categoryIndex * 0.1),
                      type: "spring",
                      stiffness: 50
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="h-full"
                    layout
                  >
                  <Card className="h-full overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 shadow-md relative group">
                    {/* Animated accent line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <CardHeader className="bg-secondary/10 border-b border-border/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center"
                            whileHover={{ rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <category.icon className="h-6 w-6 text-primary" />
                          </motion.div>
                          <div>
                            <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {category.skills.length} skills
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors">
                          <CheckCircle2 className="h-3 w-3 mr-1 text-primary" />
                          <span className="text-xs">Proficient</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.5, x: -10 }}
                            animate={{ 
                              opacity: isCardVisible ? 1 : 0, 
                              scale: isCardVisible ? 1 : 0.5,
                              x: isCardVisible ? 0 : -10
                            }}
                            transition={{ 
                              duration: 0.4, 
                              delay: isCardVisible ? 0.3 + (skillIndex * 0.03) : 0,
                              type: "spring",
                              stiffness: 100
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="group"
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-transparent bg-card/30 hover:border-primary/20 hover:bg-card/50 transition-all duration-300 relative">
                            { skill.image && (
                              <img 
                                src={skill.image} 
                                alt={skill.name}
                                className="h-5 w-5 object-contain" 
                              />
                            )}
                              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{skill.name}</span>
                              
                              {/* Skill highlight effect */}
                              {hoveredSkill === skill.name && (
                                <motion.div 
                                  className="absolute -inset-1 rounded-full bg-primary/5 -z-10"
                                  layoutId="skillHighlight"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Skill count indicator */}
                      <motion.div 
                        className="mt-4 text-xs text-muted-foreground flex items-center justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Zap className="h-3 w-3 mr-1 text-primary" />
                        <span>Constantly expanding my skillset</span>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
