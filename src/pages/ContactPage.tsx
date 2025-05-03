
import React from 'react';
import { Card, CardContent } from '@/components/ui/shared';
import { Linkedin, Github, Mail, Phone, User } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold gradient-text">Get in Touch</h1>
        <p className="text-muted-foreground mt-2">Feel free to reach out for any questions about PillPal</p>
      </div>

      <Card className="gradient-card overflow-hidden border-none">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-gradient-to-tr from-[#1a1a1a] to-[#2d1f3d] p-8 flex flex-col items-center justify-center text-white">
            <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center mb-4 shadow-lg">
              <User className="h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold gradient-text">Mohammed Hanzala</h2>
            <p className="text-white/70 mt-2">PillPal Developer</p>
          </div>
          
          <div className="md:col-span-2 p-8">
            <h3 className="text-xl font-semibold mb-6 gradient-text">Connect With Me</h3>
            
            <div className="space-y-6">
              <a 
                href="https://www.linkedin.com/in/mohammed-hanzala-0ab14424a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 hover:bg-primary/10 rounded-lg transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-[#0077B5]/10 flex items-center justify-center group-hover:bg-[#0077B5]/20">
                  <Linkedin className="h-6 w-6 text-[#0077B5]" />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <p className="text-sm text-muted-foreground">linkedin.com/in/mohammed-hanzala-0ab14424a</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/Hanzala044/HANZALA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 hover:bg-primary/10 rounded-lg transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-[#333]/10 flex items-center justify-center group-hover:bg-[#333]/20">
                  <Github className="h-6 w-6 text-[#333] dark:text-white" />
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-sm text-muted-foreground">github.com/Hanzala044/HANZALA</p>
                </div>
              </a>
              
              <a 
                href="mailto:mohammedhanzala441@gmail.com" 
                className="flex items-center gap-4 p-3 hover:bg-primary/10 rounded-lg transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-[#EA4335]/10 flex items-center justify-center group-hover:bg-[#EA4335]/20">
                  <Mail className="h-6 w-6 text-[#EA4335]" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-sm text-muted-foreground">mohammedhanzala441@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 p-3 hover:bg-primary/10 rounded-lg transition-colors group">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20">
                  <Phone className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-sm text-muted-foreground">Available upon request</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="gradient-card overflow-hidden border-none mt-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 gradient-text">Send a Message</h3>
          <p className="mb-4 text-muted-foreground">
            Have questions about PillPal or need support? Feel free to reach out directly through any of the contact methods above.
          </p>
          <p className="text-muted-foreground">
            I'm always open to discussing new projects, opportunities and partnerships.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
