import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Download,
  Map,
  ChevronRight
} from 'lucide-react';

const DataReleasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParallaxRange, setSelectedParallaxRange] = useState('all');
  const [selectedObsPhase, setSelectedObsPhase] = useState('MSPSRPI2');
  const [selectedObsStatus, setSelectedObsStatus] = useState('all');
  const [pulsars, setPulsars] = useState([]);
  const [activePulsar, setActivePulsar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/pulsars.json')
      .then((response) => response.json())
      .then((data) => {
        setPulsars(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading pulsar data:', error);
        setIsLoading(false);
      });
  }, []);

  const filteredPulsars = useMemo(() => {
    return pulsars.filter((pulsar) => {
      const matchesSearch = pulsar.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesParallax = selectedParallaxRange === 'all' ||
        (selectedParallaxRange === 'low' && pulsar.parallax < 0.8) ||
        (selectedParallaxRange === 'medium' && pulsar.parallax >= 0.8 && pulsar.parallax < 1.5) ||
        (selectedParallaxRange === 'high' && pulsar.parallax >= 1.5);
      const matchesPhase = selectedObsPhase === 'all' || pulsar.phase === selectedObsPhase;
      const matchesStatus = selectedObsStatus === 'all' || pulsar.status === selectedObsStatus;
      return matchesSearch && matchesParallax && matchesPhase && matchesStatus;
    });
  }, [pulsars, searchQuery, selectedParallaxRange, selectedObsPhase, selectedObsStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-black text-gray-100">
      <nav className="bg-slate-900/90 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">MSPSR<span className="text-indigo-400">π</span></Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Home</Link>
              <Link to="/project" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Project</Link>
              <Link to="/data-release" className="text-indigo-400 px-3 py-2 font-medium">Data Release</Link>
              <Link to="/publications" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Publications</Link>
              <Link to="/team" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Team</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative pt-16 pb-4">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">Pulsar Data Release</h1>
            <p className="text-xl text-indigo-200 mb-4">
              Explore our catalog of millisecond pulsar astrometric measurements
            </p>
            <p className="text-gray-300 mb-2">
              This catalog includes parallax and proper motion measurements for pulsars observed 
              across all phases of the MSPSRπ program. Data is continuously updated as new observations 
              are processed.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Pulsar Catalog</h2>
            <p className="text-indigo-300">
              {isLoading ? 'Loading data...' : `${filteredPulsars.length} pulsars found`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedObsPhase('MSPSRPI2')}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm transition duration-300 ${selectedObsPhase === 'MSPSRPI2' ? 'border-cyan-500 text-cyan-300 bg-slate-800/80' : 'border-cyan-500/30 text-cyan-300 bg-slate-900/60 hover:bg-slate-800/80'}`}
            >
              MSPSRPI2
            </button>
            <button
              onClick={() => setSelectedObsPhase('MSPSRPI')}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm transition duration-300 ${selectedObsPhase === 'MSPSRPI' ? 'border-purple-500 text-purple-300 bg-slate-800/80' : 'border-purple-500/30 text-purple-300 bg-slate-900/60 hover:bg-slate-800/80'}`}
            >
              MSPSRPI
            </button>
            <Link to="#visualization" className="inline-flex items-center px-4 py-2 border border-cyan-500/30 rounded-md text-cyan-300 bg-slate-900/60 hover:bg-slate-800/80 transition duration-300">
              <Map className="mr-2 h-4 w-4" />
              View Visualizations
            </Link>
            <a href="/downloads/mspsrpi-data.zip" className="inline-flex items-center px-4 py-2 border border-indigo-500/30 rounded-md text-indigo-300 bg-slate-900/60 hover:bg-slate-800/80 transition duration-300">
              <Download className="mr-2 h-4 w-4" />
              Download Dataset
            </a>
          </div>
        </div>
        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-cyan-500/70" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-700/80 rounded-md leading-5 bg-slate-800/60 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30"
            placeholder="Search pulsar name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPulsars.map((pulsar) => (
            <div key={pulsar.id} onClick={() => setActivePulsar(pulsar)} className="cursor-pointer bg-slate-800/40 p-4 rounded-lg border border-slate-700 hover:border-indigo-400 transition">
              <h3 className="text-xl font-semibold text-indigo-200 mb-2">{pulsar.name}</h3>
              {pulsar.image && <img src={pulsar.image} alt={pulsar.name} className="rounded-md h-40 object-cover w-full" />}
            </div>
          ))}
        </div>

        {/* Pulsar Popup Modal */}
        {activePulsar && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-indigo-500/30 rounded-lg p-6 shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">{activePulsar.name}</h3>
                <button 
                  className="text-gray-400 hover:text-white text-2xl" 
                  onClick={() => setActivePulsar(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Display formatted pulsar data here */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1">Phase</h4>
                    <p className="text-white">{activePulsar.phase}</p>
                  </div>
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1">Status</h4>
                    <p className="text-white">{activePulsar.status}</p>
                  </div>
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1">Parallax</h4>
                    <p className="text-white">{activePulsar.parallax} mas</p>
                  </div>
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1">Proper Motion</h4>
                    <p className="text-white">
                      {activePulsar.properMotionRA && `RA: ${activePulsar.properMotionRA} mas/yr`}
                      {activePulsar.properMotionDec && <><br />Dec: {activePulsar.properMotionDec} mas/yr</>}
                    </p>
                  </div>
                </div>
                
                {/* Add more sections based on your data structure */}
                {activePulsar.coordinates && (
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1">Coordinates</h4>
                    <p className="text-white">
                      RA: {activePulsar.coordinates.ra}<br />
                      Dec: {activePulsar.coordinates.dec}
                    </p>
                  </div>
                )}
                
                {activePulsar.description && (
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1">Description</h4>
                    <p className="text-gray-300">{activePulsar.description}</p>
                  </div>
                )}
                
                {/* Display observation details if available */}
                {activePulsar.observations && (
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1">Observations</h4>
                    <div className="bg-slate-800/60 p-3 rounded">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-indigo-200">
                            <th className="pb-2">Date</th>
                            <th className="pb-2">Instrument</th>
                            <th className="pb-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activePulsar.observations.map((obs, index) => (
                            <tr key={index} className="border-t border-slate-700">
                              <td className="py-2">{obs.date}</td>
                              <td className="py-2">{obs.instrument}</td>
                              <td className="py-2">{obs.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {/* Add a download button for this specific pulsar's data */}
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <button
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center"
                    onClick={() => {/* Handle download or link to detailed data */}}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download {activePulsar.name} Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Visualization Section */}
        <div id="visualization" className="pt-6 mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Data Visualizations</h2>
            <p className="text-indigo-300">
              Interactive visualizations of MSPSRπ parallax and proper motion measurements
            </p>
          </div>

          {/* Visualization placeholder - would be replaced with actual interactive components */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Galactic Distribution</h3>
              <div className="h-80 bg-slate-800/50 rounded-md flex items-center justify-center">
                {/* Placeholder for Galactic distribution visualization */}
                <div className="text-center">
                  <svg className="mx-auto h-48 w-48 text-cyan-300" viewBox="0 0 400 400">
                    {/* Simple Galactic plane representation */}
                    <ellipse cx="200" cy="200" rx="150" ry="30" stroke="#0e7490" strokeWidth="1" fill="none" />
                    
                    {/* Stylized spiral arms */}
                    <path d="M200,200 C240,180 270,140 290,90" stroke="#0e7490" strokeWidth="1" fill="none" />
                    <path d="M200,200 C160,180 130,140 110,90" stroke="#0e7490" strokeWidth="1" fill="none" />
                    <path d="M200,200 C240,220 270,260 290,310" stroke="#0e7490" strokeWidth="1" fill="none" />
                    <path d="M200,200 C160,220 130,260 110,310" stroke="#0e7490" strokeWidth="1" fill="none" />
                    
                    {/* Galactic center */}
                    <circle cx="200" cy="200" r="8" fill="#0e7490" />
                    
                    {/* Sample pulsars */}
                    <circle cx="180" cy="170" r="3" fill="#0ea5e9" />
                    <circle cx="220" cy="190" r="3" fill="#0ea5e9" />
                    <circle cx="170" cy="220" r="3" fill="#0ea5e9" />
                    <circle cx="240" cy="160" r="3" fill="#0ea5e9" />
                    <circle cx="160" cy="230" r="3" fill="#0ea5e9" />
                    <circle cx="210" cy="240" r="3" fill="#0ea5e9" />
                    <circle cx="250" cy="210" r="3" fill="#0ea5e9" />
                    <circle cx="150" cy="190" r="3" fill="#0ea5e9" />
                    <circle cx="230" cy="140" r="3" fill="#0ea5e9" />
                    <circle cx="170" cy="250" r="3" fill="#0ea5e9" />
                  </svg>
                  <p className="text-gray-400 text-sm mt-2">Galactic distribution of observed pulsars</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-indigo-300 mb-3">Parallax vs. Proper Motion</h3>
              <div className="h-80 bg-slate-800/50 rounded-md flex items-center justify-center">
                {/* Placeholder for scatter plot */}
                <div className="text-center">
                  <svg className="mx-auto h-48 w-48 text-indigo-300" viewBox="0 0 400 400">
                    {/* Axes */}
                    <line x1="50" y1="350" x2="350" y2="350" stroke="#6366f1" strokeWidth="2" />
                    <line x1="50" y1="350" x2="50" y2="50" stroke="#6366f1" strokeWidth="2" />
                    
                    {/* Axis labels */}
                    <text x="200" y="380" textAnchor="middle" fill="#6366f1" fontSize="12">Parallax (mas)</text>
                    <text x="30" y="200" textAnchor="middle" fill="#6366f1" fontSize="12" transform="rotate(-90, 20, 200)">Proper Motion (mas/yr)</text>
                    
                    {/* Data points */}
                    <circle cx="100" cy="300" r="4" fill="#818cf8" />
                    <circle cx="150" cy="250" r="4" fill="#818cf8" />
                    <circle cx="120" cy="280" r="4" fill="#818cf8" />
                    <circle cx="200" cy="200" r="4" fill="#818cf8" />
                    <circle cx="250" cy="150" r="4" fill="#818cf8" />
                    <circle cx="180" cy="220" r="4" fill="#818cf8" />
                    <circle cx="220" cy="180" r="4" fill="#818cf8" />
                    <circle cx="140" cy="260" r="4" fill="#818cf8" />
                    <circle cx="280" cy="120" r="4" fill="#818cf8" />
                    <circle cx="300" cy="100" r="4" fill="#818cf8" />
                  </svg>
                  <p className="text-gray-400 text-sm mt-2">Correlation between parallax and proper motion</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="/visualizations" className="inline-flex items-center px-5 py-3 border border-cyan-500/40 rounded-md text-cyan-300 bg-slate-900/60 hover:bg-slate-800/80 transition duration-300">
              View Full Interactive Visualizations <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Data Releases Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Data Releases</h2>
            <p className="text-indigo-300">
              Download complete datasets from each project phase
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-green-300 mb-2">PSRPI Data Release 1.0</h3>
              <p className="text-gray-300 mb-4">
                Original pulsar parallax data from 2011-2013 observations of 60 pulsars.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Released: May 2014</span>
                <a href="/downloads/psrpi-v1.0.zip" className="inline-flex items-center px-3 py-1.5 border border-green-500/30 rounded-md text-green-300 text-sm bg-slate-900/60 hover:bg-slate-800/80 transition duration-300">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">MSPSRPI Data Release 2.0</h3>
              <p className="text-gray-300 mb-4">
                Millisecond pulsar data from 2015-2018 observations of 18 millisecond pulsars.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Released: December 2019</span>
                <a href="/downloads/mspsrpi-v2.0.zip" className="inline-flex items-center px-3 py-1.5 border border-purple-500/30 rounded-md text-purple-300 text-sm bg-slate-900/60 hover:bg-slate-800/80 transition duration-300">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">MSPSRPI2 Initial Data</h3>
              <p className="text-gray-300 mb-4">
                Preliminary data from Phase 2 observations (27 of 44 targets completed).
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Updated: March 2025</span>
                <a href="/downloads/mspsrpi2-initial.zip" className="inline-flex items-center px-3 py-1.5 border border-blue-500/30 rounded-md text-blue-300 text-sm bg-slate-900/60 hover:bg-slate-800/80 transition duration-300">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
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

export default DataReleasePage;
