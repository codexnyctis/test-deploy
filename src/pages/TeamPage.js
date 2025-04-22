import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../assets/TeamBackground.jpg'
import { 
  Mail, 
  Github
} from 'lucide-react';

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('research');
  // (Moved useState and filteredTeam logic below the researchTeam declaration)

  // Research Team Members
  const researchTeam = [
    {
      id: 1,
      name: "Dr. Adam Deller",
      role: "Principal Investigator",
      institution: "Swinburne University of Technology",
      country: "Australia",
      expertise: ["Radio Astronomy"],
      email: "mailto:adam.deller@swin.edu.au",
      github: "https://github.com/adamdeller",
      projects: ["VLBA/24A-213", "MSPSRπ", "MSPSRπ2"],
      responsibilities: [
        "Proposal Lead",
        "Scientific Strategy",
        "ICRF Frame Tie",
        "Pulsar Gate Calibration"
      ],
      highlightedContribution: "Principal architect of the MSPSRπ2 campaign; leading the astrometric VLBI effort targeting PTA MSPs for gravitational wave research."
    },
    {
      id: 2,
      name: "Dr. Hao Ding",
      role: "Research Lead",
      institution: "Swinburne University of Technology",
      country: "Australia",
      expertise: ["Pulsar Astrometry"],
      email: "mailto:hao.ding@swin.edu.au",
      github: "https://github.com/haoding"
    },
    {
      id: 3,
      name: "Bailee Wolfe",
      role: "Teaching Sessional",
      institution: "Swinburne University of Technology",
      country: "Australia",
      expertise: ["Astrometry"],
      email: "mailto:bailee.wolfe@swin.edu.au",
      github: "https://github.com/baileewolfe",
      projects: ["VLBA/24A-213", "MSPSRπ2 Pilot"],
      responsibilities: [
        "Source Coordination",
        "In-beam Calibrator Selection",
        "Astrometric Planning",
        "Observation Logistics"
      ],
      highlightedContribution: "Supported pulsar target matching and source parameter coordination across 44 MSPs; contributed to observation setup for calibrator search sessions."
    },
    {
      id: 4,
      name: "Dr. Bettina Posselt",
      role: "Senior Researcher",
      institution: "Max Planck Institute for Radio Astronomy",
      country: "Germany",
      expertise: ["Neutron Stars"],
      email: "mailto:bettina.posselt@mpifr-bonn.mpg.de",
      github: "https://github.com/bettinaposselt"
    },
    {
      id: 5,
      name: "Dr. Shami Chatterjee",
      role: "Radio Astronomy Specialist",
      institution: "Cornell University",
      country: "USA",
      expertise: ["Radio Astronomy"],
      email: "mailto:shami.chatterjee@cornell.edu",
      github: "https://github.com/shamichatterjee"
    },
    {
      id: 6,
      name: "Dr. Ben Stappers",
      role: "Pulsar Timing Expert",
      institution: "University of Manchester",
      country: "UK",
      expertise: ["Pulsar Timing Arrays"],
      email: "mailto:ben.stappers@manchester.ac.uk",
      github: "https://github.com/benstappers"
    },
    {
      id: 7,
      name: "Dr. Paulo Freire",
      role: "Binary Pulsar Specialist",
      institution: "Max Planck Institute for Radio Astronomy",
      country: "Germany",
      expertise: ["Binary Pulsars"],
      email: "mailto:paulo.freire@mpifr-bonn.mpg.de",
      github: "https://github.com/paulofreire"
    },
    {
      id: 8,
      name: "Dr. Ingrid Stairs",
      role: "Pulsar Physics Specialist",
      institution: "University of British Columbia",
      country: "Canada",
      expertise: ["Pulsar Timing"],
      email: "mailto:ingrid.stairs@ubc.ca",
      github: "https://github.com/ingridstairs"
    },
    {
      id: 9,
      name: "Dr. T. Joseph W. Lazio",
      role: "Radio Astronomy Expert",
      institution: "Jet Propulsion Laboratory, Caltech",
      country: "USA",
      expertise: ["Radio Astronomy"],
      email: "mailto:joseph.lazio@jpl.nasa.gov",
      github: "https://github.com/josephlazio"
    }
  ];
  const publications = [
    {
      id: 1,
      title: "VLBI Astrometry of Millisecond Pulsars",
      year: 2023,
      authors: ["Dr. Adam Deller", "Dr. Hao Ding"],
      projectTags: ["VLBA/24A-213"]
    },
    {
      id: 2,
      title: "Expanding the PTA Network with MSPSRπ2",
      year: 2024,
      authors: ["Bailee Wolfe", "Dr. Adam Deller"],
      projectTags: ["MSPSRπ2"]
    },
    {
      id: 3,
      title: "Proper Motion Studies with VLBA",
      year: 2023,
      authors: ["Dr. Shami Chatterjee", "Dr. Ben Stappers"],
      projectTags: ["VLBA/24A-213"]
    },
    {
      id: 4,
      title: "Astrometry and General Relativity Tests",
      year: 2022,
      authors: ["Dr. Paulo Freire", "Dr. Ingrid Stairs"],
      projectTags: ["MSPSRπ"]
    }
  ];
  const [selectedProject, setSelectedProject] = useState("All");
  const filteredTeam = researchTeam.filter(member =>
    selectedProject === "All" || member.projects?.includes(selectedProject)
  );

  return (
    <div
      id="top"
      className="relative min-h-screen text-gray-100"
      style={{
        background: `linear-gradient(
          to bottom,
          rgba(10, 20, 40, 0.7),
          rgba(10, 20, 40, 0.5)
        ), url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <nav className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold text-white">MSPSRπ</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <Link to="/project" className="hover:text-indigo-400">Project</Link>
          <Link to="/data" className="hover:text-indigo-400">Data Release</Link>
          <Link to="/publications" className="hover:text-indigo-400">Publications</Link>
          <Link to="/team" className="text-indigo-400">Team</Link>
        </div>
      </nav>
      <header className="relative flex flex-col items-center justify-center text-center py-20">
        <div className="relative z-10 animate-fade-in-down">
          <h1 className="text-5xl font-bold mb-4 text-white">Our Team</h1>
          <p className="text-indigo-300">Meet the minds behind the mission.</p>
        </div>
      </header>


      {/* Team Members 區塊 */}
      <section className="py-6">
        <div className="relative mx-auto w-3/4 my-4 flex justify-center items-center">
          <div className="absolute -top-10 left-0 w-full overflow-visible pointer-events-none">
            <div
              className="rocket-fly animate-rocket-fly w-10 h-10 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: "url('https://img.icons8.com/color/48/rocket--v1.png')" }}
            />
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
          <div className="absolute w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
        </div>
        <div className="flex justify-center mb-8 space-x-2">
          {[
            { label: "All", emoji: "🧠" },
            { label: "VLBA/24A-213", emoji: "📡" },
            { label: "MSPSRπ", emoji: "🔭" },
            { label: "MSPSRπ2", emoji: "🌌" }
          ].map(({ label, emoji }) => (
            <button
              key={label}
              onClick={() => setSelectedProject(label)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                ${
                  selectedProject === label
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
              <span className="mr-1">{emoji}</span>{label}
            </button>
          ))}
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition transform hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] duration-300 flex flex-col justify-between group"
            >
              <div className="p-4 flex-grow flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                  {publications.filter(pub => pub.authors.includes(member.name)).length > 0 && (
                    <a
                      href={`/publications?author=${encodeURIComponent(member.name)}`}
                      className="inline-flex items-center gap-1 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full mt-2 hover:bg-indigo-500 transition"
                      title={`View publications by ${member.name}`}
                    >
                      📄 {publications.filter(pub => pub.authors.includes(member.name)).length} publication{publications.filter(pub => pub.authors.includes(member.name)).length > 1 ? 's' : ''}
                    </a>
                  )}
                </div>
                {member.image ? (
                  <div className="w-32 h-32 overflow-hidden rounded">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-600"></div>
                )}
              </div>
              <div className="flex space-x-4 text-gray-300 p-4">
                {member.email && (
                  <a
                    href={member.email}
                    className="hover:text-indigo-400"
                    title="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 py-10 text-center text-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">
            🌌 Curious about the science? Explore our discoveries.
          </h2>
          <p className="text-indigo-200 mb-4">
            Learn more about the pulsars, data, and publications shaping our understanding of the universe.
          </p>
          <Link
            to="/publications"
            className="inline-block bg-white text-indigo-800 px-5 py-2.5 rounded-full font-semibold shadow-md hover:scale-105 transition"
          >
            📄 View Publications
          </Link>
        </div>
      </section>

      {/* Footer 區塊 */}
      <footer className="py-6 text-center border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-gray-500 text-sm">© 2025 MSPSRπ Collaboration. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TeamPage;