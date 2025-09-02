
import { Briefcase, Calendar, Building, Star, Link as LinkIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { SectionWrapper } from "./SectionWrapper";
import { useState, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Zenithyuga Tech",
    logo: assets.ztech,
    period: "Feb 2025 - Present",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Web Sockets"],
    description: [
      "Built responsive frontend interfaces using React (TypeScript) and connected them with Node.js/Express backend.",
      "Created and integrated RESTful APIs, dynamic forms, bug tracking dashboard, and a blog section for the platform.",
      "Developed a certificate generator that processes Excel/manual data with predefined templates.",
      "Integrated AWS S3 for secure file handling and implemented a bug tracking dashboard."
    ]
  },
  {
    title: "Python Developer",
    company: "Safe Your Web",
    logo: assets.syw2,
    period: "Oct 2024 - Dec 2024",
    skills: ["Python", "FastAPI", "PostgreSQL", "Django"],
    description: [
      "Developed scalable RESTful APIs using FastAPI for user login, authentication, and dashboard functionalities.",
      "Implemented backend logic for dashboard sections: profile, exam scheduling, upcoming exams, exam history, billing, payment history, and notifications.",
      "Designed and managed relational data using PostgreSQL with optimized schema design.",
      "Ensured modular, secure, and maintainable code structure for smooth integration with frontend systems."
    ]
  },
  {
    title: "CP Lead",
    company: "Algozenith VIIT",
    logo: assets.az,
    link: "https://algozenith-viit.vercel.app/team",
    period: "Jul 2024 - Apr 2025",
    skills: ["Competitive Programming", "Algorithms", "Data Structures", "Java","Python", "C++", "C"],
    description: [
      "Collaborated with teammates to organize hackathons, coding competitions, and technical workshops on CP, UI/UX, and other development topics.",
      "Helped plan and conduct speaker sessions featuring industry professionals and mentors.",
      "Contributed to event execution, promotion, and smooth coordination of chapter-wide initiatives.",
      "Supported junior members by sharing resources and encouraging active participation in coding events."
    ]
  },
];

export function ExperienceSection() {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <SectionWrapper id="experience">
      <div className="container mx-auto max-w-5xl" ref={sectionRef}>
        <SectionHeading>Experience</SectionHeading>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="text-xl md:text-2xl font-medium text-primary mb-3">
            <span className="gradient-text">Professional Journey & Growth</span>
          </h3>
          <p className="text-muted-foreground">
            A timeline of my career progression, highlighting key roles, responsibilities, and achievements 
            that have shaped my expertise and professional development in the tech industry.
          </p>
        </motion.div>
        
        <div className="mt-16 relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary/60 transform md:-translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="relative mb-12 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div 
                className={`absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary transform md:-translate-x-1/2 z-10 cursor-pointer ${expandedExp === index ? 'ring-4 ring-primary/30' : ''}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => setExpandedExp(expandedExp === index ? null : index)}
              >
                {expandedExp === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="hidden md:block md:w-1/2"></div>
                
                <motion.div 
                  className={`ml-6 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (index % 2 === 0 ? -20 : 20) }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  <Card 
                    className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border hover:border-primary/30 bg-card hover:bg-card/80 ${expandedExp === index ? 'shadow-lg -translate-y-1 border-primary/30' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="h-14 w-14 rounded-full overflow-hidden border border-border flex-shrink-0"
                            whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <img 
                              src={exp.logo} 
                              alt={`${exp.company} logo`} 
                              className="h-full w-full object-cover"
                            />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Building className="w-4 h-4" />
                              <span>{exp.company}</span>
                              {exp.link && (
                                <a 
                                  href={exp.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs"
                                  title="Click to visit website"
                                >
                                  <LinkIcon className="w-3 h-3" />
                                  <span>Visit Website</span>
                                </a>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-primary/70" />
                              <p className="text-sm text-muted-foreground">{exp.period}</p>
                            </div>
                          </div>
                        </div>
                        <motion.span 
                          className="inline-flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary"
                          whileHover={{ scale: 1.1, backgroundColor: 'hsla(var(--primary) / 0.15)' }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Briefcase className="size-4" />
                        </motion.span>
                      </div>
                      
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {exp.skills.map((skill, skillIdx) => (
                          <motion.span 
                            key={skillIdx} 
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 + (skillIdx * 0.05) }}
                            whileHover={{ scale: 1.05, backgroundColor: 'hsla(var(--primary) / 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-primary" />
                          <span>Key Responsibilities & Achievements</span>
                        </h4>
                        
                        <ul className="space-y-2">
                          {exp.description.map((item, idx) => (
                            <motion.li 
                              key={idx} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <Star className="h-3.5 w-3.5 text-primary mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
