import React, { useState } from 'react';
import { ExternalLink, Github, Star, Zap, Layers, Smartphone } from 'lucide-react';

function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      title: 'Pulse Analytics Admin',
      featured: true,
      description: 'Modern admin dashboard with comprehensive analytics, stat cards, data tables with pagination, and interactive charts using Recharts. Features dark mode and responsive design.',
      tech: ['React', 'Tailwind CSS', 'Recharts', 'Lucide Icons'],
      liveUrl: 'https://pulse-analytics-admin.vercel.app',
      features: ['Analytics Dashboard', 'Data Visualization', 'Dark Mode', 'Responsive Tables'],
      stats: { components: '15+', responsive: true, darkMode: true },
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'VibeFlow Operations',
      featured: true,
      description: 'Vibrant operations management dashboard with energetic purple/blue/teal gradients. Includes workflow visualization with SVG diagrams, kanban board, and real-time charts.',
      tech: ['React', 'Tailwind CSS', 'Recharts', 'SVG Graphics'],
      liveUrl: 'https://vibe-flow-operations.vercel.app',
      features: ['Workflow Diagrams', 'Kanban Board', 'Gradient Design', 'Interactive Charts'],
      stats: { components: '20+', responsive: true, darkMode: true },
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Nexus Insights Admin',
      featured: false,
      description: 'Professional analytics dashboard with clean blue/gray design. Features advanced data visualizations including line, bar, scatter plots, and interactive heatmaps with nexus connection panels.',
      tech: ['React', 'Tailwind CSS', 'Recharts', 'Data Analytics'],
      liveUrl: 'https://nexus-insights-admin.vercel.app',
      features: ['Advanced Charts', 'Heatmaps', 'Connection Analysis', 'Data Filtering'],
      stats: { components: '18+', responsive: true, darkMode: true },
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Echo Control Center',
      featured: true,
      description: 'Sleek dark-mode control room dashboard with deep black theme and glowing accents. Real-time system monitoring, control toggles, and auto-updating log feed with monospace typography.',
      tech: ['React', 'Tailwind CSS', 'Real-time Updates', 'Control Systems'],
      liveUrl: 'https://echo-control-center.vercel.app',
      features: ['System Monitoring', 'Control Toggles', 'Live Logs', 'Dark Theme'],
      stats: { components: '12+', responsive: true, darkMode: true },
      gradient: 'from-gray-700 to-gray-900'
    },
    {
      title: 'CoreOps Team Panel',
      featured: false,
      description: 'Collaborative team management dashboard with kanban board, team member profiles, task tracking, and progress visualization. Features task modals and team metrics.',
      tech: ['React', 'Tailwind CSS', 'Team Management', 'Task Tracking'],
      liveUrl: 'https://coreops-team-panel.vercel.app',
      features: ['Kanban Board', 'Team Profiles', 'Task Management', 'Progress Tracking'],
      stats: { components: '16+', responsive: true, darkMode: true },
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'ShopCore Admin',
      featured: true,
      description: 'E-commerce admin dashboard with AI sales advisor. Product management, inventory tracking, order processing, and revenue analytics with emerald/green theme.',
      tech: ['React', 'Tailwind CSS', 'E-commerce', 'AI Integration'],
      liveUrl: 'https://shopcore-admin.vercel.app',
      features: ['Product Management', 'AI Sales Advisor', 'Inventory Tracking', 'Revenue Analytics'],
      stats: { components: '22+', responsive: true, darkMode: true },
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      title: 'BookFlow CRM',
      featured: false,
      description: 'Booking and CRM dashboard with AI secretary assistant. Calendar management, client database, appointment scheduling, and automated booking workflows.',
      tech: ['React', 'Tailwind CSS', 'CRM', 'AI Assistant'],
      liveUrl: 'https://bookflow-crm.vercel.app',
      features: ['Booking Management', 'AI Secretary', 'Calendar Integration', 'Client Database'],
      stats: { components: '18+', responsive: true, darkMode: true },
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      title: 'HealthMetrics Pro',
      featured: true,
      description: 'Healthcare dashboard with AI health insights. Patient management, appointment scheduling, medical analytics, and treatment tracking with rose/pink healthcare theme.',
      tech: ['React', 'Tailwind CSS', 'Healthcare', 'AI Insights'],
      liveUrl: 'https://healthmetrics-pro.vercel.app',
      features: ['Patient Management', 'AI Health Insights', 'Appointment Scheduling', 'Medical Analytics'],
      stats: { components: '20+', responsive: true, darkMode: true },
      gradient: 'from-rose-500 to-pink-600'
    },
  ];

  return (
    <section id="projects" className="section-container bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Production-ready admin dashboards showcasing modern web development, data visualization, and UI/UX design
          </p>
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <Layers className="text-indigo-600" size={20} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">8 Complete Dashboards</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-indigo-600" size={20} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="text-indigo-600" size={20} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">100% Responsive</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group relative bg-gradient-to-br ${project.gradient} p-[2px] rounded-xl overflow-hidden transition-all duration-300 ${hoveredProject === index ? 'scale-105 shadow-2xl' : 'shadow-lg'
                }`}
            >
              {project.featured && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  FEATURED
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Layers size={14} />
                    <span>{project.stats.components}</span>
                  </div>
                  {project.stats.responsive && (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <Smartphone size={14} />
                      <span>Responsive</span>
                    </div>
                  )}
                  {project.stats.darkMode && (
                    <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                      <span>🌙</span>
                      <span>Dark Mode</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium border border-indigo-200 dark:border-indigo-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${project.gradient} text-white rounded-lg font-semibold hover:shadow-lg transition-all`}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <Github size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl">
            <div className="flex items-center gap-2">
              <Star size={24} fill="currentColor" />
              <span className="text-2xl font-bold">8 Production-Ready AI-Enhanced Dashboards</span>
            </div>
            <p className="text-indigo-100">
              All built with React, Tailwind CSS, AI integration, and modern best practices
            </p>
            <div className="flex gap-6 mt-2">
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-xs text-indigo-200">Responsive</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">150+</div>
                <div className="text-xs text-indigo-200">Components</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-xs text-indigo-200">Unique Designs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;