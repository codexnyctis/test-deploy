import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Mail, 
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  ChevronRight,
  Building,
  GraduationCap,
  Award,
  Radio
} from 'lucide-react';

/* Hi Ryan,
The data of the team members might not be correct, so you need the information confirmed by Adam and Bailey.
The data here is hardcoded, you need it to be retrieved from github. Also you will need the pictures of 
teammembers if they are willing to be displayed. Moreover, you can redesign it as you wish */

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('research');

  // Research Team Members
  const researchTeam = [
    {
      id: 1,
      name: "Dr. Adam Deller",
      role: "Principal Investigator",
      institution: "Swinburne University of Technology",
      country: "Australia",
      bio: "Leading astrophysicist specializing in the physics of compact astronomical objects, with a particular focus on pulsars and fast radio bursts. Principal investigator of the MSPSRPI project.",
      image: "/api/placeholder/300/300",
      email: "adeller@astro.swin.edu.au",
      website: "https://www.swinburne.edu.au/research/our-research/staff-profiles/adam-deller",
      expertise: ["Radio Astronomy", "Very Long Baseline Interferometry", "Pulsar Astrometry"]
    },
    {
      id: 2,
      name: "Dr. Hao Ding",
      role: "Research Lead",
      institution: "Swinburne University of Technology",
      country: "Australia",
      bio: "Specialized in pulsar astrometry and VLBI techniques. Led data analysis for the MSPSRPI project and developed the 'sterne' Bayesian astrometry inference package.",
      image: "/api/placeholder/300/300",
      email: "hdingastro@hotmail.com",
      github: "https://github.com/dingswin",
      expertise: ["Pulsar Astrometry", "Data Analysis", "Bayesian Inference"]
    },
    {
      id: 3,
      name: "Dr. Bettina Posselt",
      role: "Senior Researcher",
      institution: "Max Planck Institute for Radio Astronomy",
      country: "Germany",
      bio: "Expert in neutron star science and radio astronomy techniques. Contributed to data acquisition and calibration strategies for the MSPSRPI project.",
      image: "/api/placeholder/300/300",
      expertise: ["Neutron Stars", "Radio Astronomy", "X-ray Astronomy"]
    },
    {
      id: 4,
      name: "Dr. Shami Chatterjee",
      role: "Radio Astronomy Specialist",
      institution: "Cornell University",
      country: "USA",
      bio: "Distinguished research scientist with expertise in radio astronomy and VLBI techniques. Contributed to observational planning and data interpretation.",
      image: "/api/placeholder/300/300",
      expertise: ["Radio Astronomy", "Pulsar Timing", "VLBI"]
    },
    {
      id: 5,
      name: "Dr. Ben Stappers",
      role: "Pulsar Timing Expert",
      institution: "University of Manchester",
      country: "UK",
      bio: "Leading researcher in pulsar timing arrays and gravitational wave detection using pulsars. Provided crucial pulsar timing data for the MSPSRPI project.",
      image: "/api/placeholder/300/300",
      expertise: ["Pulsar Timing Arrays", "Gravitational Wave Detection", "Radio Astronomy"]
    },
    {
      id: 6,
      name: "Dr. Paulo Freire",
      role: "Binary Pulsar Specialist",
      institution: "Max Planck Institute for Radio Astronomy",
      country: "Germany",
      bio: "Expert in binary and millisecond pulsars. Contributed to the interpretation of binary pulsar systems in the MSPSRPI sample and their implications for testing theories of gravity.",
      image: "/api/placeholder/300/300",
      expertise: ["Binary Pulsars", "Tests of Gravity", "Relativistic Astrophysics"]
    },
    {
      id: 7,
      name: "Dr. Ingrid Stairs",
      role: "Pulsar Physics Specialist",
      institution: "University of British Columbia",
      country: "Canada",
      bio: "Renowned for work on pulsar timing and tests of gravitational theories. Contributed to analysis and interpretation of the MSPSRPI results.",
      image: "/api/placeholder/300/300",
      expertise: ["Pulsar Timing", "Tests of Gravity", "Observational Astrophysics"]
    },
    {
      id: 8,
      name: "Dr. T. Joseph W. Lazio",
      role: "Radio Astronomy Expert",
      institution: "Jet Propulsion Laboratory, Caltech",
      country: "USA",
      bio: "Specialized in radio astronomy and galactic structure. Contributed to the interpretation of pulsar distances in the context of galactic electron distribution models.",
      image: "/api/placeholder/300/300",
      expertise: ["Radio Astronomy", "Galactic Structure", "Interstellar Medium"]
    }
  ];

  // Development Team Members
  const developmentTeam = [
    {
      id: 1,
      name: "Nur Sarikaya",
      role: "UI/UX Design Lead",
      institution: "Swinburne University of Technology",
      country: "Australia",
      bio: "Specializes in UX design with a background in learning experience design. Leads the visual and interaction design of the MSPSRπ website, focusing on making complex astronomical data accessible.",
      image: "/api/placeholder/300/300",
      email: "104520751@student.swin.edu.au",
      expertise: ["User Experience", "Interface Design", "Data Visualization", "Research Methods"]
    },
    {
      id: 2,
      name: "Allen Huang",
      role: "Research & Planning Lead",
      institution: "Swinburne University of Technology",
      country: "Australia",
      bio: "Brings a diverse background combining accounting and software development expertise. Leads project planning and research, ensuring the technical implementation aligns with scientific goals.",
      image: "/api/placeholder/300/300",
      email: "104947567@student.swin.edu.au",
      expertise: ["Project Planning", "Full-stack Development", "Research Methodology"]
    },
    {
      id: 3,
      name: "Xiang Li",
      role: "Visualization Development",
      institution: "Swinburne University of Technology",
      country: "Australia",
      bio: "Specialized in creating interactive data visualizations that make complex pulsar astrometry data comprehensible. Previously studied game development, bringing creative approaches to scientific visualization.",
      image: "/api/placeholder/300/300",
      email: "104099837@student.swin.edu.au",
      expertise: ["Data Visualization", "Interactive Graphics", "Frontend Development"]
    },
    {
      id: 4,
      name: "Nisha Jose",
      role: "Data Processing & Integration",
      institution: "Swinburne University of Technology",
      country: "Australia",
      bio: "Expert in data processing with a background in Computer Science engineering. Leads the integration of pulsar observation data with the website, ensuring accuracy and performance.",
      image: "/api/placeholder/300/300",
      email: "104482424@student.swin.edu.au",
      expertise: ["Data Processing", "System Integration", "Cloud Computing", "Data Analytics"]
    },
    {
      id: 5,
      name: "Ryan Lo",
      role: "Testing & Documentation",
      institution: "Swinburne University of Technology",
      country: "Australia",
      bio: "Leads quality assurance and documentation, ensuring the website functions correctly across platforms and is thoroughly documented for both users and future developers.",
      image: "/api/placeholder/300/300",
      email: "104188201@student.swin.edu.au",
      expertise: ["Software Testing", "Technical Documentation", "Project Management"]
    },
    {
      id: 6,
      name: "HM Kavindu",
      role: "Front-end Development",
      institution: "Swinburne University of Technology",
      country: "Australia",
      bio: "Experienced Site Reliability Engineer specializing in frontend development. Creates responsive and accessible interfaces for the MSPSRπ website, with a focus on performance and browser compatibility.",
      image: "/api/placeholder/300/300",
      email: "104689542@student.swin.edu.au",
      expertise: ["Frontend Development", "DevOps", "SRE", "Cloud Technologies"]
    }
  ];

  // Institutions involved in the project
  const institutions = [
    {
      name: "Swinburne University of Technology",
      country: "Australia",
      logo: "/api/placeholder/200/80"
    },
    {
      name: "Max Planck Institute for Radio Astronomy",
      country: "Germany",
      logo: "/api/placeholder/200/80"
    },
    {
      name: "Cornell University",
      country: "USA",
      logo: "/api/placeholder/200/80"
    },
    {
      name: "University of Manchester",
      country: "UK",
      logo: "/api/placeholder/200/80"
    },
    {
      name: "Jet Propulsion Laboratory, Caltech",
      country: "USA",
      logo: "/api/placeholder/200/80"
    },
    {
      name: "University of British Columbia",
      country: "Canada",
      logo: "/api/placeholder/200/80"
    },
    {
      name: "National Radio Astronomy Observatory",
      country: "USA",
      logo: "/api/placeholder/200/80"
    },
    {
      name: "Observatoire de Paris",
      country: "France",
      logo: "/api/placeholder/200/80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-black text-gray-100">
      {/* Navigation */}
      <nav className="bg-slate-900/90 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">MSPSR<span className="text-indigo-400">π</span></Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Home</Link>
              <Link to="/project" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Project</Link>
              <Link to="/data-release" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Data Release</Link>
              <Link to="/publications" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Publications</Link>
              <Link to="/team" className="text-indigo-400 px-3 py-2 font-medium">Team</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with starry background */}
      <div className="relative pt-16 pb-4">
        <div className="absolute inset-0 overflow-hidden">
          {/* Dark starry background with multiple star layers for depth */}
          <div className="w-full h-full bg-slate-950">
            {/* Large stars layer */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjE3NSIgY3k9IjE1MCIgcj0iMS4yIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjEwMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNTAiIHI9IjEuMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIxNzUiIHI9IjEuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTI1IiBjeT0iMTc1IiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48L3N2Zz4=')] opacity-50"></div>
            
            {/* Small stars layer */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iMzAiIGN5PSIxMCIgcj0iMC4zIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjIwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iMTAiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iOTAiIGN5PSIzMCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjUwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iNzAiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSI5MCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjUwIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iNzAiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iMjAiIGN5PSIzMCIgcj0iMC4zIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMzAiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iODAiIGN5PSI0MCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjgwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNjAiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iNjAiIGN5PSI4MCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjYwIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] opacity-60"></div>
            
            {/* Subtle blue glow effect for nebula-like impression */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/10 to-transparent"></div>
            
            {/* Darker gradient overlay at the edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-40"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">Our Team</h1>
            <p className="text-xl text-indigo-200 mb-4">
              Meet the researchers and developers behind the MSPSRπ project
            </p>
            <p className="text-gray-300 mb-2">
              MSPSRπ brings together astronomers, data scientists, and developers from 
              institutions around the world. Our international collaboration combines 
              diverse expertise in radio astronomy, pulsar timing, and data visualization.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm bg-slate-900/70 backdrop-blur-sm p-1 border border-slate-700/50">
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                activeTab === 'research'
                  ? 'text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.6)] border border-indigo-400/50'
                  : 'text-gray-400 hover:text-indigo-300 hover:shadow-[0_0_8px_rgba(99,102,241,0.3)]'
              }`}
              onClick={() => setActiveTab('research')}
            >
              Research Team
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                activeTab === 'institutions'
                  ? 'text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.6)] border border-indigo-400/50'
                  : 'text-gray-400 hover:text-indigo-300 hover:shadow-[0_0_8px_rgba(99,102,241,0.3)]'
              }`}
              onClick={() => setActiveTab('institutions')}
            >
              Institutions
            </button>
          </div>
        </div>

        {/* Team Section */}
        {activeTab === 'research' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchTeam.map((member) => (
              <div 
                key={member.id}
                className="bg-gradient-to-br from-slate-900/90 via-indigo-950/30 to-slate-900/90 backdrop-blur-sm border border-indigo-500/30 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  {/* Team member image with cosmic overlay */}
                  <div className="h-40 bg-indigo-900/30">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-70"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjE3NSIgY3k9IjE1MCIgcj0iMS4yIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjEwMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNTAiIHI9IjEuMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIxNzUiIHI9IjEuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTI1IiBjeT0iMTc1IiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48L3N2Zz4=')] opacity-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    
                    {/* Profile image or avatar */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <div className="w-20 h-20 rounded-full border-4 border-slate-900 overflow-hidden bg-indigo-800/30 flex items-center justify-center">
                        <Users className="h-10 w-10 text-indigo-300/70" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-12 px-6 pb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-200">{member.name}</h3>
                    <p className="text-cyan-400 text-sm">{member.role}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Building className="h-4 w-4 mr-2 text-indigo-400/70" />
                    <span>{member.institution}, {member.country}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                  
                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise && member.expertise.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-800/60 text-indigo-300 border border-indigo-500/20"
                      >
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Contact links */}
                  <div className="flex space-x-3 mt-4">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`} 
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                        title="Email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                    {member.website && (
                      <a 
                        href={member.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                        title="Website"
                      >
                        <Globe className="h-5 w-5" />
                      </a>
                    )}
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                        title="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'development' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentTeam.map((member) => (
              <div 
                key={member.id}
                className="bg-gradient-to-br from-slate-900/90 via-purple-950/30 to-slate-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  {/* Team member image with cosmic overlay */}
                  <div className="h-40 bg-purple-900/30">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-70"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjE3NSIgY3k9IjE1MCIgcj0iMS4yIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjEwMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNTAiIHI9IjEuMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIxNzUiIHI9IjEuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTI1IiBjeT0iMTc1IiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48L3N2Zz4=')] opacity-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    
                    {/* Profile image or avatar */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <div className="w-20 h-20 rounded-full border-4 border-slate-900 overflow-hidden bg-purple-800/30 flex items-center justify-center">
                        <Users className="h-10 w-10 text-purple-300/70" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-12 px-6 pb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-purple-200">{member.name}</h3>
                    <p className="text-purple-400 text-sm">{member.role}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Building className="h-4 w-4 mr-2 text-purple-400/70" />
                    <span>{member.institution}, {member.country}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                  
                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise && member.expertise.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-800/60 text-purple-300 border border-purple-500/20"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Contact links */}
                  <div className="flex space-x-3 mt-4">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`} 
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        title="Email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                    {member.website && (
                      <a 
                        href={member.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        title="Website"
                      >
                        <Globe className="h-5 w-5" />
                      </a>
                    )}
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        title="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'institutions' && (
          <div className="space-y-8">
            <p className="text-center text-lg text-indigo-200 mb-10">
              The MSPSRπ project is a collaboration between researchers from leading institutions around the world.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {institutions.map((institution, index) => (
                <div 
                  key={index}
                  className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 text-center flex flex-col items-center justify-center shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="mb-4 h-16 flex items-center justify-center">
                    <Radio className="h-12 w-12 text-cyan-400/50" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{institution.name}</h3>
                  <p className="text-indigo-300 text-sm">{institution.country}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Join Our Team Section */}
        <div className="mt-16 bg-gradient-to-br from-indigo-900/30 via-slate-900/50 to-indigo-900/30 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-8 shadow-lg">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Interested in Collaborating?</h2>
            <p className="text-indigo-200 mb-6">
              We welcome collaborations with researchers and institutions around the world. 
              If you're interested in contributing to MSPSRπ or related pulsar astrometry research, 
              please reach out to our team.
            </p>
            <a 
              href="mailto:adeller@astro.swin.edu.au" 
              className="inline-flex items-center px-5 py-3 border border-indigo-500/40 rounded-md text-indigo-200 bg-indigo-900/50 hover:bg-indigo-800/50 transition duration-300 shadow-lg"
            >
              Contact the Principal Investigator
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 border-t border-slate-800/50 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Pulsar Astrometry Research Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;