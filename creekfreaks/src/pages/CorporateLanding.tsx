import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, BarChart3, Shield, Globe, Users } from "lucide-react";

const CorporateLanding = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
            {/* Navigation */}
            <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo-ai.jpg" alt="Creek Freaks AI" className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-semibold text-lg tracking-tight">CreekFreaks<span className="text-blue-500">AI</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#platform" className="hover:text-blue-400 transition-colors">Platform</a>
                        <a href="#solutions" className="hover:text-blue-400 transition-colors">Solutions</a>
                        <a href="#about" className="hover:text-blue-400 transition-colors">Company</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">Sign In</Button>
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white border-0">Request Demo</Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            System v2.0 Now Live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                            Enterprise AI for <br />Community Resilience
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Leverage proprietary LLMs and sentiment analytics to measure, predict, and enhance community engagement in niche capability sectors.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-200 h-12 px-8 text-base">
                                Start Free Trial
                            </Button>
                            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-12 px-8 text-base">
                                View Documentation
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-blue-500/30 rounded-full blur-[128px]"></div>
                    <div className="absolute top-[10%] right-[20%] w-96 h-96 bg-purple-500/30 rounded-full blur-[128px]"></div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-10 border-y border-slate-800/50 bg-slate-950/50">
                <div className="container mx-auto px-6">
                    <p className="text-center text-sm font-medium text-slate-500 mb-8">TRUSTED BY INNOVATION TEAMS AT</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Logos styled as text for now, assuming SVGs later */}
                        <div className="text-xl font-bold flex items-center gap-2"><Globe className="w-6 h-6" /> GLOBAL VENTURES</div>
                        <div className="text-xl font-bold flex items-center gap-2"><Shield className="w-6 h-6" /> TECHSTARTERS</div>
                        <div className="text-xl font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6" /> DATACORE</div>
                        <div className="text-xl font-bold flex items-center gap-2"><Users className="w-6 h-6" /> OPEN COMMUNITY</div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section id="platform" className="py-24 bg-slate-900/30">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800/60 hover:border-slate-700 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Sentiment & Grief Analytics</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Real-time tracking of community emotional health using our proprietary "Resilience Score" algorithm.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800/60 hover:border-slate-700 transition-colors">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 text-purple-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Community Vector Mapping</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Identify key influencers and support nodes within your user base using high-dimensional vector embeddings.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800/60 hover:border-slate-700 transition-colors">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 text-emerald-400">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Enterprise Governance</h3>
                            <p className="text-slate-400 leading-relaxed">
                                SOC2 Type II compliant infrastructure ensuring your sensitive health data remains secure and private.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Innovation Pipeline (Portfolio) */}
            <section id="solutions" className="py-24 bg-slate-900/50 border-y border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Creek Freaks Labs</h2>
                        <p className="text-slate-400">Our conceptual R&D pipeline powering the next generation of resilient systems.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Project 1: The App (Consumer) */}
                        <div className="group rounded-2xl bg-slate-950 border border-slate-800 p-1 hover:border-blue-500/50 transition-colors">
                            <div className="bg-slate-900/50 rounded-xl p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                                        LIVE BETA
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Project: River (Consumer)</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    The frontend interface for our community resilience engine. Gamified mental health engagement with over 10,000 active nodes.
                                </p>
                                <Link to="/community" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm gap-2">
                                    View Live Deployment <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Project 2: Open Lovable (Tech) */}
                        <div className="group rounded-2xl bg-slate-950 border border-slate-800 p-1 hover:border-purple-500/50 transition-colors">
                            <div className="bg-slate-900/50 rounded-xl p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
                                        CORE INFRA
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Architecture: Open Lovable</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    Autonomous AI code generation infrastructure. Self-healing frontend systems designed for rapid deployment of health-critical interfaces.
                                </p>
                                <a href="#" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium text-sm gap-2">
                                    View Technical Paper <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Project 3: Neural Vesper (ComfyUI) */}
                        <div className="group rounded-2xl bg-slate-950 border border-slate-800 p-1 hover:border-emerald-500/50 transition-colors md:col-span-2 lg:col-span-1">
                            <div className="bg-slate-900/50 rounded-xl p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                        GEN AI ENGINE
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Engine: Neural Vesper</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    Proprietary SDXL pipeline (ComfyUI) for real-time therapeutic imagery. Leveraging custom LoRAs for culturally specific visual anchors.
                                </p>
                                <a href="#" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium text-sm gap-2">
                                    View Model Card <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="about" className="py-24 bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
                        <p className="text-slate-400">Pioneers in predictive community modeling.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* CEO */}
                        <div className="group">
                            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-slate-900 mb-6 border border-slate-800 group-hover:border-blue-500/50 transition-colors relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                                {/* Placeholder for Headshot */}
                                <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-xs">
                                    [CEO_HEADSHOT]
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">J.D. Thorne</h3>
                            <p className="text-blue-500 text-sm font-medium mb-3">Co-Founder & CEO</p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Former Systems Architect at [Redacted]. 12 years in distributed systems and behavioral analytics.
                            </p>
                        </div>

                        {/* CTO */}
                        <div className="group">
                            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-slate-900 mb-6 border border-slate-800 group-hover:border-purple-500/50 transition-colors relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                                {/* Placeholder for Headshot */}
                                <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-xs">
                                    [CTO_HEADSHOT]
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Dr. Elena V.</h3>
                            <p className="text-purple-500 text-sm font-medium mb-3">Co-Founder & CTO</p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Ph.D. in Computational Linguistics. Expert in large-scale vector databases and NLP.
                            </p>
                        </div>

                        {/* COO */}
                        <div className="group">
                            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-slate-900 mb-6 border border-slate-800 group-hover:border-emerald-500/50 transition-colors relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                                {/* Placeholder for Headshot */}
                                <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-xs">
                                    [COO_HEADSHOT]
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Marcus Chen</h3>
                            <p className="text-emerald-500 text-sm font-medium mb-3">Head of Partnerships</p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Serial HealthTech entrepreneur. Specializes in B2G frameworks and enterprise sales cycles.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-800 bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="font-semibold text-slate-300">CreekFreaks AI Inc.</span>
                            <span>© 2024</span>
                        </div>
                        <div className="flex gap-8 text-sm text-slate-500">
                            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CorporateLanding;
