
import { useState, useRef } from "react";
import { Github, Linkedin, Mail, MessageSquare, Send, CheckCircle, ArrowRight, MapPin, Phone, Clock, Link, FileText } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { SectionWrapper } from "./SectionWrapper";
import { toast } from "@/components/ui/use-toast";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Social links with enhanced data
  const socialLinks = [
    {
      name: "Email",
      value: "nitin.shukla12004@gmail.com",
      href: "mailto:nitin.shukla12004@gmail.com",
      icon: Mail,
      color: "bg-gradient-to-r from-pink-500 to-violet-500"
    },
    {
      name: "GitHub",
      value: "github.com/Nitinshukla88",
      href: "https://github.com/Nitinshukla88",
      icon: Github,
      color: "bg-gradient-to-r from-gray-700 to-gray-900"
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/nitin-shukla",
      href: "https://www.linkedin.com/in/nitin-shukla-463730259/",
      icon: Linkedin,
      color: "bg-gradient-to-r from-blue-600 to-blue-800"
    },
  ];
  
  // Contact info cards
  const contactInfo = [
    {
      title: "Resume",
      value: "View My Resume",
      icon: FileText,
      color: "from-blue-400 to-indigo-600",
      link : "https://drive.google.com/file/d/11WOPHXbLQAQYndaFwZtrdFL1Nzh4C0LY/view?usp=sharing"
    },
    {
      title: "Location",
      value: "Kanpur, UP",
      icon: MapPin,
      color: "from-green-400 to-emerald-600"
    },
    {
      title: "Phone",
      value: "+91 8924029381",
      icon: Phone,
      color: "from-amber-400 to-orange-600"
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const result = await emailjs.send(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.PUBLIC_KEY
      );
  
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
  
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(true);
  
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message.",
        description: "Please try again later or use a different contact method.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <SectionWrapper id="contact">
      <div className="container px-4 sm:px-6 mx-auto max-w-5xl" ref={sectionRef}>
        <SectionHeading>Contact Me</SectionHeading>
        
        {/* Animated header section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 mt-4 px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Let's Connect & Collaborate</span>
          </h3>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
            Whether you have a question or just want to say hello, I'll try my best to get back to you as soon as possible.
          </p>
        </motion.div>
        
        {/* Contact info cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {contactInfo.map((info, index) => (
            <motion.div 
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {info.link ? (<a href={info.link} target="_blank" rel="noopener noreferrer" className="block h-full"><Card className="border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-3 xs:p-4 sm:p-6 flex flex-col xs:flex-row items-center gap-2 xs:gap-3 sm:gap-4 h-full">
                  <div className={`h-10 w-10 xs:h-12 xs:w-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg shrink-0`}>
                    <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-center xs:text-left">
                    <h4 className="text-xs xs:text-sm font-medium text-muted-foreground mb-0.5 xs:mb-1">{info.title}</h4>
                    <p className="text-sm xs:text-base font-semibold break-words">{info.value}</p>
                  </div>
                </CardContent>
              </Card></a>) : (<Card className="border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-3 xs:p-4 sm:p-6 flex flex-col xs:flex-row items-center gap-2 xs:gap-3 sm:gap-4 h-full">
                  <div className={`h-10 w-10 xs:h-12 xs:w-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg shrink-0`}>
                    <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-center xs:text-left">
                    <h4 className="text-xs xs:text-sm font-medium text-muted-foreground mb-0.5 xs:mb-1">{info.title}</h4>
                    <p className="text-sm xs:text-base font-semibold break-words">{info.value}</p>
                  </div>
                </CardContent>
              </Card>)}
            </motion.div>
          ))}

        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 mt-8 sm:mt-10 items-start px-4 sm:px-0">
          {/* Left column - Social links */}
          <motion.div 
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <span className="relative">
                  Get In Touch
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-1 bg-primary/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? "100%" : 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                Have a project in mind? Looking to collaborate or hire? Feel free to reach out using the form or through my social links.
              </p>
            </div>
            
            <div className="space-y-5">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`h-10 w-10 xs:h-12 xs:w-12 rounded-lg ${link.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}>
                    <link.icon className="h-4 w-4 xs:h-5 xs:w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs xs:text-sm font-medium text-muted-foreground">{link.name}</h4>
                    <p className="text-sm xs:text-base font-semibold group-hover:text-primary transition-colors truncate">{link.value}</p>
                  </div>
                  <ArrowRight className="h-3 w-3 xs:h-4 xs:w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
            
            {/* Additional message space if needed in the future */}
          </motion.div>
          
          {/* Right column - Contact form */}
          <motion.div 
            className="md:col-span-3 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative z-10 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    className="py-12 flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, times: [0, 0.7, 1] }}
                    >
                      <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                      className="group"
                    >
                      <span>Send Another Message</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3.5 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                          placeholder="Your name"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3.5 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                          placeholder="your.email@example.com"
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3.5 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none"
                        placeholder="How can I help you?"
                      ></textarea>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="pt-2"
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-base font-medium bg-primary hover:bg-primary/90 text-white rounded-lg relative overflow-hidden group"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div 
                              key="submitting"
                              className="flex items-center justify-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                              <span>Sending Message...</span>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="default"
                              className="flex items-center justify-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Send className="h-5 w-5" />
                              <span>Send Message</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Button shine effect */}
                        <motion.div 
                          className="absolute top-0 bottom-0 left-0 w-20 bg-white/20 skew-x-[-20deg]"
                          initial={{ left: "-30%" }}
                          animate={{ left: "130%" }}
                          transition={{ repeat: Infinity, repeatDelay: 3, duration: 1.5 }}
                        />
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
