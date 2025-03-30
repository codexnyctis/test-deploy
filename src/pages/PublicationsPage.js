import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Download, 
  Book, 
  BookOpen, 
  Calendar, 
  Users, 
  FileText, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Tag,
  Archive
} from 'lucide-react';

/* Hi Allen, this data is currently hard coded, but you need to create a page on github for this and retrive
the data from there. It should be designed in a way that makes it easy for Adam and Bailey to add, delete or
edit in the future. Feel free to play with the page and create your own design. I did not think about
the information to show on the publication cards throughly so this was just a prototype. You go nuts! */

const PublicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPhase, setFilterPhase] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [expandedPaper, setExpandedPaper] = useState(null);

  // Publication data organized by project phase
  const publications = {
    psrpi: [
      {
        id: 'deller2019',
        title: 'The PSRπ Pulsar Astrometry Project: Final Results',
        authors: 'Deller, A. T., Goss, W. M., Brisken, W. F., Chatterjee, S., Cordes, J. M., Janssen, G. H., Kovalev, Y. Y., Lazio, T. J. W., Petrov, L., Stappers, B. W., Lyne, A.',
        journal: 'The Astrophysical Journal',
        volume: '875',
        pages: '100',
        year: '2019',
        arxiv: 'https://arxiv.org/abs/1808.09046',
        doi: 'https://doi.org/10.3847/1538-4357/ab11c7',
        abstract: 'Very Long Baseline Interferometry (VLBI) astrometry of pulsars provides a straightforward and model-independent method to obtain distances via the detection of annual geometric parallax. The PSRπ program is a large VLBI pulsar astrometry program that has observed more than 60 pulsars with the Very Long Baseline Array. We summarize the astrometric results of the PSRπ program: parallax measurements (or upper limits) for each pulsar, and a three-dimensional map of the locations of the target pulsars in the Galaxy. The parallax measurements show that pulsar distances derived from the observed dispersion measure combined with Galactic electron density distribution models have an average error of 55% (80% when the predicted distance exceeds 6 kpc). The PSRπ observations also provided high-precision proper motions, enabling the accurate determination of pulsar velocities.',
        keywords: ['astrometry', 'parallax', 'proper motion', 'pulsar'],
        phase: 'PSRPI',
        highlight: true
      },
      {
        id: 'deller2016',
        title: 'Microarcsecond VLBI Pulsar Astrometry with PSRπ II. Parallax Distances for 57 Pulsars',
        authors: 'Deller, A. T., Vigeland, S. J., Kaplan, D. L., Goss, W. M., Brisken, W. F., Chatterjee, S., Cordes, J. M., Janssen, G. H., Lazio, T. J. W., Petrov, L., Stappers, B. W., Lyne, A.',
        journal: 'The Astrophysical Journal',
        volume: '828',
        pages: '8',
        year: '2016',
        arxiv: 'https://arxiv.org/abs/1604.02367',
        doi: 'https://doi.org/10.3847/0004-637X/828/1/8',
        abstract: 'We present the results of astrometric observations of 60 pulsars with the Very Long Baseline Array (VLBA), which were obtained as part of the PSRπ program. We provide improved position measurements and new proper motions for all sources and measure parallaxes for 57 pulsars, with parallax distances ranging from 0.3 to 18 kpc. This represents one of the largest samples of these distances measured with consistent methodology and including pulsars from many regions of the Galaxy. We use these new measurements to study two millisecond pulsars with white dwarf companions, PSRs J1022+1001 and J2145-0750, and characterize the binary companion properties to aid in tests of theories of gravity.',
        keywords: ['astrometry', 'parallax', 'proper motion', 'binary pulsar', 'white dwarf', 'tests of gravity'],
        phase: 'PSRPI',
        highlight: false
      }
    ],
    mspsrpi: [
      {
        id: 'ding2023',
        title: 'The MSPSRπ catalogue: VLBA astrometry of 18 millisecond pulsars',
        authors: 'Ding, H., Deller, A. T., Stappers, B. W., Lazio, T. J. W., Kaplan, D., Chatterjee, S., Brisken, W., Cordes, J., Freire, P. C. C., Fonseca, E., Stairs, I. H., Guillemot, L., Lyne, A., Cognard, I., Reardon, D. J., Theureau, G.',
        journal: 'Monthly Notices of the Royal Astronomical Society',
        volume: '519',
        pages: '4982-5007',
        year: '2023',
        arxiv: 'https://arxiv.org/abs/2212.06351',
        doi: 'https://doi.org/10.1093/mnras/stac3725',
        abstract: 'With unparalleled rotational stability, millisecond pulsars (MSPs) serve as ideal laboratories for numerous astrophysical studies, many of which require precise knowledge of the distance and/or velocity of the MSP. Here, we present the astrometric results for 18 MSPs of the "MSPSRπ" project focusing exclusively on astrometry of MSPs, which includes the re-analysis of 3 previously published sources. On top of a standardized data reduction protocol, more complex strategies (i.e., normal and inverse-referenced 1D interpolation) were employed where possible to further improve astrometric precision. We derived astrometric parameters using sterne, a new Bayesian astrometry inference package that allows the incorporation of prior information based on pulsar timing where applicable. We measured significant parallax-based distances for 15 MSPs, including 0.81±0.02 kpc for PSR J1518+4904 — the most significant model-independent distance ever measured for a double neutron star system.',
        keywords: ['astrometry', 'millisecond pulsar', 'parallax', 'proper motion', 'double neutron star'],
        phase: 'MSPSRPI',
        highlight: true
      },
      {
        id: 'ding2021',
        title: 'A VLBI Distance and Transverse Velocity for PSR J1537+1155: A Double Neutron Star with a History',
        authors: 'Ding, H., Deller, A. T., Fonseca, E., Stairs, I. H., Stappers, B., Lyne, A.',
        journal: 'The Astrophysical Journal Letters',
        volume: '921',
        pages: 'L19',
        year: '2021',
        arxiv: 'https://arxiv.org/abs/2110.03702',
        doi: 'https://doi.org/10.3847/2041-8213/ac31cf',
        abstract: 'The double neutron star (DNS) system PSR J1537+1155 (also known as PSR B1534+12) is one of the most highly relativistic DNSs known, and has been used to test various aspects of gravity. The orbital decay of the system, characterized by the time derivative of the orbital period, can be predicted by Einstein\'s theory of general relativity. A comparison between the observed and the predicted orbital decay requires precise knowledge of the system\'s distance, which we measured using the Very Long Baseline Array with very long baseline interferometry astrometry, yielding a distance of 0.94±0.07 kpc. The new, precise distance allows us to predict the orbital decay rate with significantly improved precision, enhancing the test of Einstein\'s theory of general relativity by a factor of 10.',
        keywords: ['astrometry', 'double neutron star', 'orbital decay', 'general relativity'],
        phase: 'MSPSRPI',
        highlight: false
      },
      {
        id: 'ding2020',
        title: 'Testing Theories of Gravity and Superdense Matter with PSR J1012+5307',
        authors: 'Ding, H., Deller, A. T., Freire, P., Kaplan, D. L., Lazio, T. J. W., Shannon, R., Stappers, B.',
        journal: 'The Astrophysical Journal',
        volume: '896',
        pages: '85',
        year: '2020',
        arxiv: 'https://arxiv.org/abs/2004.12594',
        doi: 'https://doi.org/10.3847/1538-4357/ab8f28',
        abstract: 'PSR J1012+5307 is a millisecond pulsar with a helium white dwarf companion. Through measuring orbital decay, it has been used as a testbed for theories of gravity. The observed orbital decay rate comes primarily from extrinsic effects, namely the Shklovskii effect (transverse motion) and the Galactic differential potential, which must be subtracted from the observed values in order to test intrinsic orbital decay due to dipole gravitational radiation—a phenomenon forbidden in general relativity. Using recent VLBI astrometry of PSR J1012+5307, obtained as part of the MSPSRπ program, we precisely measured the system\'s distance at 0.86±0.03 kpc. The distance significantly improves constraints on the orbital decay components, which leads to tighter constraints on alternative theories of gravity.',
        keywords: ['astrometry', 'millisecond pulsar', 'white dwarf', 'theories of gravity'],
        phase: 'MSPSRPI',
        highlight: false
      },
      {
        id: 'vigeland2018',
        title: 'Precision VLBI Astrometry: Instrumentation, Algorithms, and Pulsar Applications',
        authors: 'Vigeland, S. J., Deller, A. T., Kaplan, D. L., Istrate, A. G., Stappers, B. W., Tauris, T. M.',
        journal: 'The Astrophysical Journal',
        volume: '855',
        pages: '122',
        year: '2018',
        arxiv: 'https://arxiv.org/abs/1802.03960',
        doi: 'https://doi.org/10.3847/1538-4357/aaad0c',
        abstract: 'Very Long Baseline Interferometry (VLBI) provides the highest-precision astronomical astrometry, enabling submilliarcsecond measurements of positions, parallaxes, and proper motions. We present algorithms and instrumentation designed to push the limits of precision astrometry with VLBI, and demonstrate their application to millisecond pulsar J1640+2224. Using three years of astrometric observations, we measure a significant parallax of 0.66±0.05 mas, corresponding to a distance of 1.52±0.12 kpc, which is consistent with the DM-based distance. This precision enables us to constrain the binary parameters of the system.',
        keywords: ['astrometry', 'VLBI', 'millisecond pulsar', 'binary systems'],
        phase: 'MSPSRPI',
        highlight: false
      }
    ],
    mspsrpi2: [
      {
        id: 'future1',
        title: 'Initial Results from the MSPSRπ2 Program: Precise Astrometry of Millisecond Pulsars for Gravitational Wave Detection',
        authors: 'Deller, A. T., et al.',
        journal: 'In preparation',
        year: '2025',
        abstract: 'The MSPSRπ2 program extends our previous work to a larger sample of 44 millisecond pulsars that are key targets for pulsar timing arrays seeking to detect low-frequency gravitational waves. Initial results from this ongoing project demonstrate improvements in calibration techniques and provide parallax measurements for the first set of observed pulsars.',
        keywords: ['astrometry', 'millisecond pulsar', 'gravitational waves', 'pulsar timing array'],
        phase: 'MSPSRPI2',
        highlight: true,
        status: 'in preparation'
      }
    ]
  };

  // Filter publications based on search and filters
  const filteredPublications = Object.entries(publications).flatMap(([phase, papers]) => {
    return papers.filter(paper => {
      // Apply search filter
      const matchesSearch = 
        searchQuery === '' || 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (paper.abstract && paper.abstract.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (paper.keywords && paper.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())));
      
      // Apply phase filter
      const matchesPhase = filterPhase === 'all' || paper.phase.toLowerCase() === filterPhase.toLowerCase();
      
      // Apply year filter
      const matchesYear = filterYear === 'all' || paper.year === filterYear;
      
      return matchesSearch && matchesPhase && matchesYear;
    });
  });

  // Get unique years for filtering
  const years = [...new Set(
    Object.values(publications)
      .flat()
      .map(paper => paper.year)
      .filter(year => year) // Remove undefined/null values
  )].sort((a, b) => b - a); // Sort descending

  // Toggle expanded paper
  const toggleExpanded = (id) => {
    if (expandedPaper === id) {
      setExpandedPaper(null);
    } else {
      setExpandedPaper(id);
    }
  };

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
              <Link to="/publications" className="text-indigo-400 px-3 py-2 font-medium">Publications</Link>
              <Link to="/team" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Team</Link>
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
            <h1 className="text-4xl font-bold text-white mb-4">Publications</h1>
            <p className="text-xl text-indigo-200 mb-4">
              Research papers from the MSPSRπ project and related studies
            </p>
            <p className="text-gray-300 mb-2">
              Browse our collection of publications related to millisecond pulsar astrometry, 
              including comprehensive catalogs, individual pulsar studies, and methodology papers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-indigo-500/70" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700/80 rounded-md leading-5 bg-slate-800/60 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30"
                placeholder="Search by title, author, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Phase Filter */}
              <div className="relative inline-block text-left">
                <select
                  className="appearance-none block w-full py-2 pl-3 pr-10 border border-slate-700/80 rounded-md leading-5 bg-slate-800/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30"
                  value={filterPhase}
                  onChange={(e) => setFilterPhase(e.target.value)}
                >
                  <option value="all">All Phases</option>
                  <option value="psrpi">PSRPI</option>
                  <option value="mspsrpi">MSPSRπ</option>
                  <option value="mspsrpi2">MSPSRπ2</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Filter className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
              
              {/* Year Filter */}
              <div className="relative inline-block text-left">
                <select
                  className="appearance-none block w-full py-2 pl-3 pr-10 border border-slate-700/80 rounded-md leading-5 bg-slate-800/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Publication List */}
        <div className="space-y-10">
          {/* Featured Publications */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BookOpen className="mr-2 h-6 w-6 text-indigo-400" />
              Featured Publications
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPublications
                .filter(paper => paper.highlight)
                .map((paper) => (
                  <div 
                    key={paper.id}
                    className="bg-gradient-to-br from-slate-900/90 via-indigo-950/50 to-slate-900/90 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-6 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-indigo-200 mb-2">{paper.title}</h3>
                      {paper.phase === 'PSRPI' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-500/30">
                          PSRPI
                        </span>
                      )}
                      {paper.phase === 'MSPSRPI' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/30 text-purple-300 border border-purple-500/30">
                          MSPSRπ
                        </span>
                      )}
                      {paper.phase === 'MSPSRPI2' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-500/30">
                          MSPSRπ2
                        </span>
                      )}
                    </div>
                    
                    <p className="text-indigo-100 text-sm mb-3">{paper.authors}</p>
                    <p className="text-gray-400 text-sm mb-4">
                      {paper.journal && `${paper.journal}`}
                      {paper.volume && `, ${paper.volume}`}
                      {paper.pages && `, ${paper.pages}`}
                      {paper.year && ` (${paper.year})`}
                      {paper.status && ` - ${paper.status}`}
                    </p>
                    
                    <p className="text-gray-300 text-sm line-clamp-3 mb-4">{paper.abstract}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.keywords && paper.keywords.map((keyword, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-800/60 text-indigo-300 border border-indigo-500/20"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      {paper.arxiv && (
                        <a
                          href={paper.arxiv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-indigo-500/30 rounded-md text-indigo-300 text-sm bg-slate-900/60 hover:bg-slate-800/80 transition duration-300"
                        >
                          <FileText className="mr-1.5 h-4 w-4" />
                          arXiv
                        </a>
                      )}
                      {paper.doi && (
                        <a
                          href={paper.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-indigo-500/30 rounded-md text-indigo-300 text-sm bg-slate-900/60 hover:bg-slate-800/80 transition duration-300"
                        >
                          <ExternalLink className="mr-1.5 h-4 w-4" />
                          DOI
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Publication Timeline */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Archive className="mr-2 h-6 w-6 text-indigo-400" />
              Publication Timeline
            </h2>

            <div className="space-y-6">
              {filteredPublications.length > 0 ? (
                filteredPublications
                  .sort((a, b) => parseInt(b.year) - parseInt(a.year))
                  .map((paper) => (
                    <div 
                      key={paper.id}
                      className={`bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg overflow-hidden transition-all duration-300 ${expandedPaper === paper.id ? 'shadow-lg shadow-indigo-500/10' : 'shadow'}`}
                    >
                      <div 
                        className="p-4 cursor-pointer"
                        onClick={() => toggleExpanded(paper.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h3 className="text-lg font-medium text-indigo-200 mb-1 pr-4">{paper.title}</h3>
                              <div className="flex items-center space-x-2">
                                {paper.phase === 'PSRPI' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-500/30 whitespace-nowrap">
                                    PSRPI
                                  </span>
                                )}
                                {paper.phase === 'MSPSRPI' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/30 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                                    MSPSRπ
                                  </span>
                                )}
                                {paper.phase === 'MSPSRPI2' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-500/30 whitespace-nowrap">
                                    MSPSRπ2
                                  </span>
                                )}
                                {expandedPaper === paper.id ? 
                                  <ChevronUp className="h-5 w-5 text-indigo-400" /> : 
                                  <ChevronDown className="h-5 w-5 text-indigo-400" />
                                }
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mb-1">{paper.authors}</p>
                            <p className="text-sm text-gray-500">
                              {paper.journal && `${paper.journal}`}
                              {paper.volume && `, ${paper.volume}`}
                              {paper.pages && `, ${paper.pages}`}
                              {paper.year && ` (${paper.year})`}
                              {paper.status && ` - ${paper.status}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Expanded content */}
                      {expandedPaper === paper.id && (
                        <div className="px-4 pb-4 pt-2 border-t border-slate-800/50">
                          <div className="bg-slate-800/30 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-indigo-300 mb-2">Abstract</h4>
                            <p className="text-gray-300 text-sm">{paper.abstract}</p>
                          </div>

                          {paper.keywords && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-indigo-300 mb-2">Keywords</h4>
                              <div className="flex flex-wrap gap-2">
                                {paper.keywords.map((keyword, index) => (
                                  <span 
                                    key={index} 
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-800/60 text-indigo-300 border border-indigo-500/20"
                                  >
                                    <Tag className="h-3 w-3 mr-1" />
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex space-x-3">
                            {paper.arxiv && (
                              <a
                                href={paper.arxiv}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 border border-indigo-500/30 rounded-md text-indigo-300 text-sm bg-slate-900/60 hover:bg-slate-800/80 transition duration-300"
                              >
                                <FileText className="mr-1.5 h-4 w-4" />
                                arXiv
                              </a>
                            )}
                            {paper.doi && (
                              <a
                                href={paper.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 border border-indigo-500/30 rounded-md text-indigo-300 text-sm bg-slate-900/60 hover:bg-slate-800/80 transition duration-300"
                              >
                                <ExternalLink className="mr-1.5 h-4 w-4" />
                                DOI
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-center py-10 bg-slate-900/30 backdrop-blur-sm border border-slate-800/30 rounded-lg">
                  <Book className="h-10 w-10 text-indigo-500/50 mx-auto mb-4" />
                  <p className="text-gray-400">No publications match your search criteria.</p>
                  <button 
                    className="mt-4 inline-flex items-center px-4 py-2 border border-indigo-500/30 rounded-md text-indigo-300 bg-slate-900/60 hover:bg-slate-800/80 transition duration-300"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterPhase('all');
                      setFilterYear('all');
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* How to Cite Section */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-lg p-6 mb-10">
            <h2 className="text-xl font-bold text-white mb-4">How to Cite Our Work</h2>
            <p className="text-gray-300 mb-4">
              When using data from our publications in your research, please cite the appropriate paper:
            </p>
            
            <div className="bg-slate-800/50 p-4 rounded-md mb-4">
              <p className="text-indigo-200 text-sm italic">
                "The MSPSRπ catalogue: VLBA astrometry of 18 millisecond pulsars"<br />
                Ding et al., 2023, MNRAS, 519, 4982-5007
              </p>
              <div className="mt-2">
                <a 
                  href="https://ui.adsabs.harvard.edu/abs/2022MNRAS.519.4982D/abstract" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-300 text-sm hover:text-cyan-200 transition"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on ADS
                </a>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-md">
              <p className="text-indigo-200 text-sm italic">
                "The PSRπ Pulsar Astrometry Project: Final Results"<br />
                Deller et al., 2019, ApJ, 875, 100
              </p>
              <div className="mt-2">
                <a 
                  href="https://ui.adsabs.harvard.edu/abs/2019ApJ...875..100D/abstract" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-300 text-sm hover:text-cyan-200 transition"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on ADS
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

export default PublicationsPage;