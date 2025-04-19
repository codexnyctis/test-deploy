import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Book, 
  BookOpen, 
  Calendar, 
  FileText, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Tag,
  Archive,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import Papa from 'papaparse';

const PublicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPhase, setFilterPhase] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [expandedPaper, setExpandedPaper] = useState(null);
  const [publications, setPublications] = useState({});
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GitHub repository information for your repository
  const GITHUB_REPO_OWNER = 'AllenHuang03';
  const GITHUB_REPO_NAME = 'mspsrpi-website';
  const CSV_FILE_PATH = 'excels/publications.csv';

  // Fetch publications data on component mount
  useEffect(() => {
    fetchPublicationsData();
  }, []);

  const fetchPublicationsData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // GitHub raw content URL
      const fileUrl = `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/main/${CSV_FILE_PATH}`;
      
      const response = await fetch(fileUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const csvText = await response.text();
      
      // Parse CSV file using PapaParse
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        delimiter: ",",     // Explicitly set the delimiter
        quoteChar: '"',     // Explicitly set quote character 
        escapeChar: '"',    // Set escape character
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
            setError('Error parsing CSV data');
            setLoading(false);
            return;
          }
          
          // Process the CSV data
          const publicationsData = processCSVData(results.data);
          
          // Check if there's any valid data
          if (Object.keys(publicationsData).length === 0) {
            setError('No publication data found');
            setLoading(false);
            return;
          }
          
          setPublications(publicationsData);
          
          // Extract unique years for filtering
          const uniqueYears = [...new Set(
            Object.values(publicationsData)
              .flat()
              .map(paper => paper.year)
              .filter(year => year)
          )].sort((a, b) => b - a); // Sort descending
          
          setYears(uniqueYears);
          setLoading(false);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setError('Error parsing CSV data');
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Failed to fetch publications data: ${error.message}`);
      setLoading(false);
    }
  };

      // Process CSV data into the required format
const processCSVData = (csvData) => {
  console.log('Processing CSV data, row count:', csvData.length);
  
  // Group by phase
  const groupedByPhase = {};
  
  csvData.forEach(row => {
    // Skip rows without a phase or title
    if (!row.phase || !row.title) {
      console.warn('Skipping row due to missing phase or title:', 
        row.id || 'unknown id', 
        'phase:', row.phase,
        'title:', row.title ? row.title.substring(0, 20) + '...' : 'missing'
      );
      return;
    }
    
    // Normalize phase to upper/lowercase
    let phase = '';
    if (row.phase) {
      phase = row.phase.toString().toUpperCase();
      // Make sure phase is one of the expected values
      if (!['PSRPI', 'MSPSRPI', 'MSPSRPI2'].includes(phase)) {
        console.warn(`Unexpected phase value: ${phase}`);
        phase = ''; // Or set a default
      }
    }
    
    // Convert keywords from comma-separated string to array if it exists
    let keywords = [];
    if (row.keywords) {
      if (typeof row.keywords === 'string') {
        // Try different separators
        if (row.keywords.includes(';')) {
          keywords = row.keywords.split(';').map(k => k.trim());
        } else if (row.keywords.includes(',')) {
          keywords = row.keywords.split(',').map(k => k.trim());
        } else {
          keywords = [row.keywords.trim()];
        }
      } else if (Array.isArray(row.keywords)) {
        keywords = row.keywords;
      }
    }
    
    // Check for and handle any extra parsed fields
    if (row.__parsed_extra && row.__parsed_extra.length > 0) {
      console.warn('Extra fields detected in row:', row.__parsed_extra);
      // You might want to handle these extra fields or merge them
    }
    
    // Convert highlight to boolean
    const highlight = row.highlight === 'TRUE' || row.highlight === true || row.highlight === 1;
    
    // Prepare the publication object
    const publication = {
      id: row.id || `pub-${Math.random().toString(36).substr(2, 9)}`,
      title: row.title,
      authors: row.authors || '',
      journal: row.journal || '',
      volume: row.volume || '',
      pages: row.pages || '',
      year: row.year ? row.year.toString() : '',
      arxiv: row.arxiv || '',
      doi: row.doi || '',
      abstract: row.abstract || '',
      keywords: keywords,
      phase: phase || '', // Use normalized phase
      highlight: highlight,
      status: row.status || ''
    };
    
    // Add to the appropriate phase group
    const phaseKey = (phase || '').toLowerCase();
    if (!groupedByPhase[phaseKey]) {
      groupedByPhase[phaseKey] = [];
    }
    
    groupedByPhase[phaseKey].push(publication);
  });
  
  return groupedByPhase;
};

  // Filter publications based on search and filters
  const getFilteredPublications = () => {
    if (!publications || Object.keys(publications).length === 0) return [];
    
    return Object.entries(publications).flatMap(([phase, papers]) => {
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
  };

  // Toggle expanded paper
  const toggleExpanded = (id) => {
    if (expandedPaper === id) {
      setExpandedPaper(null);
    } else {
      setExpandedPaper(id);
    }
  };

  const filteredPublications = getFilteredPublications();

  // Content for the "Not Found" state
  const NotFoundContent = () => (
    <div className="flex flex-col items-center justify-center py-16 bg-slate-900/30 rounded-lg border border-slate-800/50">
      <Book className="h-16 w-16 text-slate-500 mb-6" />
      <h2 className="text-2xl font-bold text-slate-300 mb-3">Publications Not Found</h2>
      <p className="text-slate-400 text-center max-w-md mb-6">
        We couldn't find the publications data. The file might be missing or there was an error loading the content.
      </p>
      <button 
        onClick={fetchPublicationsData}
        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-md transition-colors flex items-center"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </button>
    </div>
  );

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
          {loading ? (
            // Loading state
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="animate-spin h-8 w-8 text-indigo-400 mr-3" />
              <p className="text-indigo-200 text-lg">Loading publications data...</p>
            </div>
          ) : error || Object.keys(publications).length === 0 ? (
            // Error or no data found state
            <NotFoundContent />
          ) : (
            <>
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
                
                {/* Refresh data button */}
                <div className="mt-4 text-right">
                  <button 
                    onClick={fetchPublicationsData}
                    className="inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refresh data
                  </button>
                </div>
              </div>

              {/* Publication List */}
              <div className="space-y-10">
                {/* Featured Publications */}
                {filteredPublications.some(paper => paper.highlight) && (
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
                )}

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
                                    </div>
                                  </div>
                                  <p className="text-indigo-100 text-sm mb-1">{paper.authors}</p>
                                  <p className="text-gray-400 text-sm">
                                    {paper.journal && `${paper.journal}`}
                                    {paper.volume && `, ${paper.volume}`}
                                    {paper.pages && `, ${paper.pages}`}
                                    {paper.year && ` (${paper.year})`}
                                    {paper.status && ` - ${paper.status}`}
                                  </p>
                                </div>
                                <div className="ml-2 flex-shrink-0">
                                  {expandedPaper === paper.id ? (
                                    <ChevronUp className="h-5 w-5 text-indigo-400" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-indigo-400" />
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Expanded paper details */}
                            {expandedPaper === paper.id && (
                              <div className="px-4 pb-4 bg-slate-800/30 border-t border-slate-700/30">
                                {paper.abstract && (
                                  <div className="mb-4">
                                    <h4 className="text-sm font-medium text-indigo-300 mb-2">Abstract</h4>
                                    <p className="text-gray-300 text-sm">{paper.abstract}</p>
                                  </div>
                                )}
                                
                                {paper.keywords && paper.keywords.length > 0 && (
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
                      // No publications match filter criteria
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
            </>
          )}
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