import React from 'react';
import { Code, Zap, Brain, Rocket } from 'lucide-react';

function Experience() {
  const experiences = [
    {
      icon: Code,
      title: 'Web Development Mastery',
      description: 'Proficient in modern React + TypeScript + Tailwind CSS stacks. Built and deployed multiple advanced admin dashboards, landing pages, and interactive apps using AI tools like Open Lovable for rapid cloning and customization.',
      highlights: ['React + TypeScript', 'Tailwind CSS', 'Admin Dashboards', 'AI-Accelerated Development']
    },
    {
      icon: Zap,
      title: 'No-Code Automation Specialist',
      description: 'Designed and implemented seamless workflows with Zapier, Make (Integromat), and n8n. Automated lead capture, CRM syncs, notifications, and team ops for efficiency gains.',
      highlights: ['Zapier', 'Make (Integromat)', 'n8n', 'Workflow Automation']
    },
    {
      icon: Brain,
      title: 'AI-Powered Tools Expert',
      description: 'Leveraged cutting-edge platforms (Open Lovable, E2B sandboxes, Gemini/Groq LLMs) to generate clean, deployable code in days—specializing in turning any design into responsive React projects.',
      highlights: ['Open Lovable', 'E2B Sandboxes', 'Gemini/Groq LLMs', 'Rapid Prototyping']
    },
    {
      icon: Rocket,
      title: 'Deployment & Best Practices',
      description: 'Experienced with Vercel for instant live demos, Git version control, responsive design, dark/light modes, and performance optimization.',
      highlights: ['Vercel Deployment', 'Git Version Control', 'Responsive Design', 'Performance Optimization']
    }
  ];

  return (
    <section id="experience" className="section-container bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center mb-4">Experience & Expertise</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
          I've honed my expertise through intensive hands-on projects, AI-accelerated development, and delivering production-ready solutions.
          Passionate about scalable, user-focused solutions that drive real results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <Icon className="text-indigo-600 dark:text-indigo-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Current Focus</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Currently delivering freelance projects for startups and agencies, specializing in rapid development
            of production-ready admin dashboards and automation solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-lg">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm">Complete Dashboards</div>
            </div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-lg">
              <div className="text-2xl font-bold">AI-Powered</div>
              <div className="text-sm">Development</div>
            </div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-lg">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Production Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;