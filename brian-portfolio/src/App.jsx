import React from "react";

function App() {
  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Brian Rice</h1>
        <p className="mt-4 text-xl md:text-2xl">
          Freelance Web Developer & Automation Expert
        </p>
        <p className="mt-2 text-lg">
          I build premium React dashboards with AI features and production-ready admin panels.
        </p>
        <div className="mt-6 space-x-4">
          <a href="http://localhost:5174" target="_blank" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-100 transition">
            View Live Demos
          </a>
          <a href="#contact" className="bg-indigo-800 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-indigo-900 transition">
            Contact Me
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-lg leading-relaxed">
          I specialize in creating modern, production-ready admin dashboards and data visualization applications.
          With expertise in React, TypeScript, and Tailwind CSS, I deliver beautiful, functional interfaces that users love.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Technical Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          {[
            "React & TypeScript",
            "Tailwind CSS",
            "Data Visualization (Recharts)",
            "Responsive Design",
            "Dark Mode",
            "State Management",
            "UI/UX Design",
            "Automation (Zapier, n8n)",
            "AI Integration"
          ].map((skill) => (
            <div key={skill} className="bg-white shadow rounded-lg p-4">{skill}</div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Services</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Service</th>
                <th className="border px-4 py-2">Features</th>
                <th className="border px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Premium Dashboard Templates</td>
                <td className="border px-4 py-2">Production-ready React dashboards with AI features</td>
                <td className="border px-4 py-2">$600 – $2,000</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Custom Dashboard Development</td>
                <td className="border px-4 py-2">Tailored solutions with branding & advanced features</td>
                <td className="border px-4 py-2">$2,000 – $8,000+</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">AI Integration Services</td>
                <td className="border px-4 py-2">Add AI assistants, analytics, or custom AI features</td>
                <td className="border px-4 py-2">$500 – Contact</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            { name: "Pulse Analytics Admin", desc: "Analytics dashboard with charts & tables", tech: "React, Tailwind, Recharts" },
            { name: "VibeFlow Operations", desc: "Gradient operations dashboard with kanban", tech: "React, Tailwind, SVG" },
            { name: "Echo Control Center", desc: "Dark-mode control room with live logs", tech: "React, Tailwind, Real-time" },
            { name: "ShopCore Admin", desc: "E-commerce dashboard with AI sales advisor", tech: "React, Tailwind, AI Integration" },
            { name: "BookFlow CRM", desc: "Client management for authors & publishers", tech: "React, Tailwind, Kanban" },
            { name: "HealthMetrics Pro", desc: "Patient data tracking compliance dashboard", tech: "React, Recharts, HIPAA-ready" },
            { name: "Nexus Insights", desc: "Big data visualization platform", tech: "React, D3.js, Dark Mode" },
            { name: "CoreOps Panel", desc: "Team resource management & calibration", tech: "React, Drag-n-Drop, Grid" },
            { name: "NexusFlow Landing", desc: "High-conversion SaaS landing page", tech: "React, Framer Motion, SEO" }
          ].map((proj) => (
            <div key={proj.name} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{proj.name}</h3>
              <p className="mt-2">{proj.desc}</p>
              <p className="mt-2 text-sm text-gray-600">{proj.tech}</p>
              <a href="http://localhost:5174" target="_blank" className="mt-4 inline-block text-indigo-600 font-medium hover:underline">
                Launch Demo &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Client Testimonials</h2>
        <blockquote className="italic mb-6 text-lg">
          “Brian delivered an exceptional analytics dashboard that exceeded our expectations.”
          <br />— Sarah Chen, CTO at TechStart
        </blockquote>
        <blockquote className="italic mb-6 text-lg">
          “Working with Brian was a pleasure. He delivered in record time.”
          <br />— Mike Johnson, Product Manager
        </blockquote>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-indigo-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="mb-4">Email: hello@brianrice.dev</p>
        <p className="mb-4">Response Time: Within 24 hours</p>
        <p className="mb-6">Location: Remote (Worldwide)</p>
        <a href="mailto:hello@brianrice.dev" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Let’s Work Together
        </a>
      </section>
    </div>
  );
}

export default App;
