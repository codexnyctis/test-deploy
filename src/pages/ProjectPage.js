import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ArrowRight, 
  Calendar, 
  Award, 
  Radio, 
  Target, 
  UserCheck, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const ProjectPage = () => {
  const [activePhase, setActivePhase] = useState('mspsrpi2');
  const [expandedAchievement, setExpandedAchievement] = useState(null);
  const [filterSearch, setFilterSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'srcname', direction: 'ascending' });
  
  // Project phases data - unchanged from original code
  const projectPhases = {
    psrpi: {
      title: "PSRPI (2011-2013)",
      subtitle: "Original Pulsar Parallax Initiative",
      description: "The PSRPI program laid the groundwork for high-precision astrometry of pulsars using Very Long Baseline Interferometry. This initial phase targeted 60 pulsars and developed key observational techniques.",
      objectives: [
        "Measure precise distances to 60 pulsars",
        "Improve understanding of Galactic electron distribution",
        "Develop in-beam calibration techniques",
        "Create foundation for millisecond pulsar astrometry"
      ],
      achievements: [
        "Successfully observed 60 pulsars with VLBA",
        "Achieved parallax measurements for 33 pulsars",
        "Developed in-beam calibration methodology",
        "Published comprehensive catalogs of pulsar proper motions"
      ],
      stats: {
        pulsars: 60,
        precision: "40 μas",
        publications: 8
      }
    },
    mspsrpi: {
      title: "MSPSRPI (2015-2018)",
      subtitle: "Millisecond Pulsar Parallax Initiative",
      description: "Building on the success of PSRPI, this phase focused specifically on millisecond pulsars, which are critical for gravitational wave detection through pulsar timing arrays.",
      objectives: [
        "Target 18 millisecond pulsars with improved techniques",
        "Achieve parallax precision better than 20 μas",
        "Support gravitational wave detection efforts",
        "Test theories of gravity in pulsar binary systems"
      ],
      achievements: [
        "Measured parallaxes for all 18 targeted millisecond pulsars",
        "Achieved record precision of 10 μas for several sources",
        "Identified flaws in Galactic electron density models",
        "Enabled more stringent tests of gravitational radiation"
      ],
      stats: {
        pulsars: 18,
        precision: "10 μas",
        publications: 12
      }
    },
    mspsrpi2: {
      title: "MSPSRPI2 (2022-Present)",
      subtitle: "Extended Millisecond Pulsar Program",
      description: "The current phase expands the millisecond pulsar sample to 44 sources, focusing on pulsars used by international pulsar timing arrays for gravitational wave detection.",
      objectives: [
        "Measure parallaxes for 44 additional millisecond pulsars",
        "Support ongoing gravitational wave detection efforts",
        "Improve models of the Galactic pulsar population",
        "Enhance understanding of pulsar evolution"
      ],
      achievements: [
        "27 out of 44 target pulsars observed so far",
        "Maintaining sub-10 μas precision for most sources",
        "Revealed new insights about millisecond pulsar velocities",
        "Improved calibration techniques for crowded fields"
      ],
      stats: {
        pulsars: 44,
        precision: "<10 μas",
        publications: 7,
        progress: "62%"
      }
    }
  };

  // Observation data for MSPSRPI2 progress tracker
  const observationData = [
    { obsCode: "aq1", srcname: "J1653-2054", requestSubmitted: true, obsDate: "2023-08-15", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "as1", srcname: "J1719-1438", requestSubmitted: true, obsDate: "2023-09-02", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "ar2", srcname: "J1705-1903", requestSubmitted: true, obsDate: "2023-08-28", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "ar1", srcname: "J1705-1903", requestSubmitted: true, obsDate: "2023-08-21", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "bk1", srcname: "J2033+1734", requestSubmitted: true, obsDate: "2023-12-05", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "issue" },
    { obsCode: "ak1", srcname: "J0740+6620", requestSubmitted: true, obsDate: "2023-07-10", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "issue" },
    { obsCode: "bi1", srcname: "J1955+2908", requestSubmitted: true, obsDate: "2023-11-18", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "issue" },
    { obsCode: "bh1", srcname: "J1946+3417", requestSubmitted: true, obsDate: "2023-11-12", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "issue" },
    { obsCode: "af1", srcname: "J0613-0200", requestSubmitted: true, obsDate: "2023-06-15", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "ae1", srcname: "J0509+0856", requestSubmitted: true, obsDate: "2023-06-08", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "ap1", srcname: "J1614-2230", requestSubmitted: true, obsDate: "2023-08-05", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "aq2", srcname: "J1653-2054", requestSubmitted: true, obsDate: "2023-08-18", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "as2", srcname: "J1719-1438", requestSubmitted: true, obsDate: "2023-09-05", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "ad1", srcname: "J0340+4130", requestSubmitted: true, obsDate: "2023-05-28", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "am1", srcname: "J0824+0028", requestSubmitted: true, obsDate: "2023-07-25", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "issue", note: "reobs requested" },
    { obsCode: "am2", srcname: "J0824+0028", requestSubmitted: true, obsDate: "2023-08-02", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "aa1", srcname: "J0023+0923", requestSubmitted: true, obsDate: "2023-05-10", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "complete" },
    { obsCode: "ac1", srcname: "J0125-2327", requestSubmitted: true, obsDate: "2023-05-20", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: true, status: "issue", note: "ingestion issue in archive, need to delete and redownload" },
    { obsCode: "at1", srcname: "J1737-0811", requestSubmitted: true, obsDate: "2023-09-15", polycoRequested: true, polycoReceived: true, binConfigSent: true, correlatedDataReceived: true, gatingChecked: false, status: "in-progress" }
  ];

  // Scheduled observations
  const scheduledObservations = [
    { srcname: "J1857+0943", scheduledDate: "2024-02-16" },
    { srcname: "J2214+3000", scheduledDate: "2024-02-16" },
    { srcname: "J2033+1734", scheduledDate: "2024-02-16" },
    { srcname: "J0824+0028", scheduledDate: "2024-02-17" },
    { srcname: "J1911+1347", scheduledDate: "2024-02-19" },
    { srcname: "J1741+1351", scheduledDate: "2024-02-19" },
    { srcname: "J1614-2230", scheduledDate: "2024-02-19" },
    { srcname: "J1125+7819", scheduledDate: "2024-02-21" },
    { srcname: "J1923+2515", scheduledDate: "2024-02-23" },
    { srcname: "J1801-1417", scheduledDate: "2024-02-23" },
    { srcname: "J1653-2054", scheduledDate: "2024-02-23" },
    { srcname: "J2234+0611", scheduledDate: "2024-02-23" },
    { srcname: "J0931-1902", scheduledDate: "2024-02-26" },
    { srcname: "J1705-1903", scheduledDate: "2024-02-26" },
    { srcname: "J0751+1807", scheduledDate: "2024-02-29" },
    { srcname: "J1719-1438", scheduledDate: "2024-03-02" },
    { srcname: "J2019+2425", scheduledDate: "2024-03-03" },
    { srcname: "J1832-0836", scheduledDate: "2024-03-03" },
    { srcname: "J0709+0458", scheduledDate: "2024-03-04" },
    { srcname: "J2322+2057", scheduledDate: "2024-03-04" },
    { srcname: "J0732+2314", scheduledDate: "2024-03-08" },
    { srcname: "J0613-0200", scheduledDate: "2024-03-08" },
    { srcname: "J0509+0856", scheduledDate: "2024-03-08" },
    { srcname: "J0340+4130", scheduledDate: "2024-03-08" },
    { srcname: "J0125-2327", scheduledDate: "2024-03-08" },
    { srcname: "J2302+4442", scheduledDate: "2024-03-08" },
    { srcname: "J2229+2643", scheduledDate: "2024-03-08" },
    { srcname: "J1737-0811", scheduledDate: "2024-03-10" },
    { srcname: "J0740+6620", scheduledDate: "2024-03-15" },
    { srcname: "J0645+5158", scheduledDate: "2024-03-15" },
    { srcname: "J0636+5128", scheduledDate: "2024-03-15" },
    { srcname: "J0023+0923", scheduledDate: "2024-03-15" },
    { srcname: "J0034-0534", scheduledDate: "2024-03-22" },
    { srcname: "J1944+0907", scheduledDate: "2024-03-25" },
    { srcname: "J1903+0327", scheduledDate: "2024-03-25" },
    { srcname: "J1744-1134", scheduledDate: "2024-03-25" },
    { srcname: "J2150-0326", scheduledDate: "2024-04-01" },
    { srcname: "J1955+2908", scheduledDate: "2024-04-05" },
    { srcname: "J1946+3417", scheduledDate: "2024-04-10" },
    { srcname: "J2234+0944", scheduledDate: "2024-04-14" },
    { srcname: "J1745+1017", scheduledDate: "2024-04-16" },
    { srcname: "J1802-2124", scheduledDate: "2024-05-01" },
    { srcname: "J1756-2251", scheduledDate: "2024-05-01" },
    { srcname: "J1811-2405", scheduledDate: "2024-05-08" }
  ];

  // Combine observation status with scheduled dates for a complete dataset
  const combinedObservationData = [...observationData];
  
  // Add scheduled observations that don't have observation data yet
  scheduledObservations.forEach(scheduled => {
    const alreadyExists = combinedObservationData.some(
      obs => obs.srcname === scheduled.srcname && obs.status === "complete"
    );
    
    if (!alreadyExists) {
      // Check if it's scheduled in the future
      const scheduledDate = new Date(scheduled.scheduledDate);
      const today = new Date();
      
      if (scheduledDate > today) {
        combinedObservationData.push({
          obsCode: "-",
          srcname: scheduled.srcname,
          requestSubmitted: true,
          obsDate: null,
          scheduledDate: scheduled.scheduledDate,
          polycoRequested: false,
          polycoReceived: false,
          binConfigSent: false,
          correlatedDataReceived: false,
          gatingChecked: false,
          status: "scheduled"
        });
      }
    }
  });

  // Sort function for table headers
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to data
  const sortedData = React.useMemo(() => {
    let sortableItems = [...combinedObservationData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle date comparisons
        if (sortConfig.key === 'obsDate' || sortConfig.key === 'scheduledDate') {
          aValue = aValue ? new Date(aValue) : new Date(0);
          bValue = bValue ? new Date(bValue) : new Date(0);
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [combinedObservationData, sortConfig]);

  // Apply filters to sorted data
  const filteredData = React.useMemo(() => {
    return sortedData.filter(obs => {
      // Apply search filter
      const searchMatch = 
        obs.srcname.toLowerCase().includes(filterSearch.toLowerCase()) ||
        obs.obsCode.toLowerCase().includes(filterSearch.toLowerCase());
      
      // Apply status filter
      const statusMatch = 
        statusFilter === 'all' ||
        (statusFilter === 'complete' && obs.status === 'complete') ||
        (statusFilter === 'scheduled' && obs.status === 'scheduled') ||
        (statusFilter === 'in-progress' && obs.status === 'in-progress') ||
        (statusFilter === 'issue' && obs.status === 'issue');
      
      return searchMatch && statusMatch;
    });
  }, [sortedData, filterSearch, statusFilter]);

  // Toggle function for achievements - unchanged
  const toggleAchievement = (id) => {
    if (expandedAchievement === id) {
      setExpandedAchievement(null);
    } else {
      setExpandedAchievement(id);
    }
  };

  // Calculate progress statistics
  const progressStats = React.useMemo(() => {
    const total = 44; // Total target pulsars
    const observed = new Set(observationData.map(o => o.srcname)).size;
    const complete = new Set(observationData.filter(o => o.status === 'complete').map(o => o.srcname)).size;
    const withIssues = new Set(observationData.filter(o => o.status === 'issue').map(o => o.srcname)).size;
    const inProgress = new Set(observationData.filter(o => o.status === 'in-progress').map(o => o.srcname)).size;
    const scheduled = new Set(scheduledObservations.filter(s => 
      !observationData.some(o => o.srcname === s.srcname)
    ).map(s => s.srcname)).size;
    
    return {
      total,
      observed,
      complete,
      withIssues,
      inProgress,
      scheduled,
      percentComplete: Math.round((complete / total) * 100)
    };
  }, [observationData, scheduledObservations]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-black text-gray-100">
      {/* Navigation - Same as homepage */}
      <nav className="bg-slate-900/90 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">MSPSR<span className="text-indigo-400">π</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Home</a>
              <a href="/project" className="text-indigo-400 px-3 py-2 font-medium">Project</a>
              <a href="/data-release" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Data Release</a>
              <a href="/publications" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Publications</a>
              <a href="/team" className="text-gray-300 hover:text-indigo-400 px-3 py-2 font-medium">Team</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Combined Hero Section with Timeline */}
      <div className="relative pt-16 pb-4">
        <div className="absolute inset-0 overflow-hidden">
          {/* Dark starry background with multiple star layers for depth */}
          <div className="w-full h-full bg-slate-950">
            {/* Large stars layer */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjE3NSIgY3k9IjE1MCIgcj0iMS4yIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjEwMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNTAiIHI9IjEuMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIxNzUiIHI9IjEuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMTI1IiBjeT0iMTc1IiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48L3N2Zz4=')] opacity-50"></div>
            
            {/* Small stars layer */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iMzAiIGN5PSIxMCIgcj0iMC4zIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjIwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iMTAiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iOTAiIGN5PSIzMCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjUwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iNzAiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSI5MCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjUwIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iNzAiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iMjAiIGN5PSIzMCIgcj0iMC4zIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMzAiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iODAiIGN5PSI0MCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjgwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNjAiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iNjAiIGN5PSI4MCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjYwIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] opacity-60"></div>
            
            {/* Star Field Layer 1 for timeline - Distant small stars */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNzUiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNTAiIHI9IjAuNSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zNSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjgwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjUwIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMjUiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSI3NSIgcj0iMC41IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIzNTAiIGN5PSI1MCIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjM1Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIxMjUiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyNSIgcj0iMC4zIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjI1Ii8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSIwLjUiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjEyNSIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjM1Ii8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMTUwIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjxjaXJjbGUgY3g9IjM1MCIgY3k9IjEyNSIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjIwMCIgcj0iMC41IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIyMjUiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zNSIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjIwMCIgcj0iMC4zIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMjUiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMjAwIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMjUiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSIyMjUiIHI9IjAuNSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMzUwIiBjeT0iMjAwIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMzUiLz48L3N2Zz4=')] opacity-40"></div>
          
            {/* Star Field Layer 2 for timeline - Mid-distance medium stars */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjAuNyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iNzUiIGN5PSI1MCIgcj0iMC42IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSIxMjUiIGN5PSIyNSIgcj0iMC44IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48Y2lyY2xlIGN4PSIxNzUiIGN5PSI1MCIgcj0iMC42IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIyMjUiIGN5PSIyNSIgcj0iMC43IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSIyNzUiIGN5PSI1MCIgcj0iMC44IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48Y2lyY2xlIGN4PSIzMjUiIGN5PSIyNSIgcj0iMC42IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIzNzUiIGN5PSI1MCIgcj0iMC43IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSI0MjUiIGN5PSIyNSIgcj0iMC44IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48Y2lyY2xlIGN4PSI0NzUiIGN5PSI1MCIgcj0iMC42IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSI1MCIgY3k9Ijc1IiByPSIwLjciIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9Ijc1IiByPSIwLjgiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9Ijc1IiByPSIwLjYiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9Ijc1IiByPSIwLjciIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9Ijc1IiByPSIwLjgiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjMwMCIgY3k9Ijc1IiByPSIwLjYiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjM1MCIgY3k9Ijc1IiByPSIwLjciIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9Ijc1IiByPSIwLjgiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjQ1MCIgY3k9Ijc1IiByPSIwLjYiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] opacity-25"></div>
            
            {/* Subtle blue glow effect for nebula-like impression */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/10 to-transparent"></div>
            
            {/* Cosmic nebula glow effects for timeline */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-30"></div>
            
            {/* Darker gradient overlay at the edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-40"></div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">Millisecond Pulsar Parallax Program</h1>
            <p className="text-xl text-indigo-200 mb-6">
              Mapping the Galaxy's millisecond pulsars with unprecedented precision
            </p>
            <p className="text-gray-300 mb-4">
              MSPSRπ is currently in its second phase, focusing on 44 millisecond pulsars used for gravitational wave 
              detection. Our precision astrometry helps answer fundamental questions about gravity and Galactic structure.
            </p>
          </div>
        </div>
        
        {/* Timeline section - integrated within hero */}
        <div className="relative py-6 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Project Timeline</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-900/50 via-indigo-500/50 to-indigo-900/50"></div>
              
              {/* Timeline points */}
              <div className="relative flex justify-around items-center px-20 py-4">
                {/* PSRPI Phase - Green neon */}
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-black border-2 border-green-400 z-10 shadow-[0_0_12px_rgba(74,222,128,0.8)]"></div>
                  <p className="mt-2 text-green-300 text-sm font-medium">2011-2013</p>
                  <p className="text-gray-300 text-xs">PSRPI</p>
                </div>
                
                {/* MSPSRPI Phase - Purple neon */}
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-black border-2 border-purple-400 z-10 shadow-[0_0_12px_rgba(192,132,252,0.8)]"></div>
                  <p className="mt-2 text-purple-300 text-sm font-medium">2015-2018</p>
                  <p className="text-gray-300 text-xs">MSPSRPI</p>
                </div>
                
                {/* MSPSRPI2 Phase (current) - Blue neon */}
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-black border-2 border-blue-400 z-10 shadow-[0_0_12px_rgba(96,165,250,0.8)]"></div>
                  <div className="absolute -top-10">
                    <div className="bg-indigo-900/80 backdrop-blur-sm text-indigo-100 text-xs px-2 py-1 rounded border border-indigo-500/50 shadow-lg shadow-indigo-500/20">
                      We are here
                    </div>
                  </div>
                  <p className="mt-2 text-blue-300 text-sm font-medium">2022-Present</p>
                  <p className="text-gray-300 text-xs">MSPSRPI2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Phases Section */}
      <div id="project-phases" className="py-12 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Project Phases</h2>
            <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
              Spanning over a decade of research, our program has evolved through three distinct phases
            </p>
          </div>

          {/* Phase navigation tabs with different colored neon effects */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md shadow-sm bg-slate-900/70 backdrop-blur-sm p-1 border border-slate-700/50">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activePhase === 'psrpi'
                    ? 'text-green-300 shadow-[0_0_12px_rgba(74,222,128,0.6)] border border-green-400/50'
                    : 'text-gray-400 hover:text-green-300 hover:shadow-[0_0_8px_rgba(74,222,128,0.3)]'
                }`}
                onClick={() => setActivePhase('psrpi')}
              >
                PSRPI
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activePhase === 'mspsrpi'
                    ? 'text-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.6)] border border-purple-400/50'
                    : 'text-gray-400 hover:text-purple-300 hover:shadow-[0_0_8px_rgba(192,132,252,0.3)]'
                }`}
                onClick={() => setActivePhase('mspsrpi')}
              >
                MSPSRPI
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activePhase === 'mspsrpi2'
                    ? 'text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.6)] border border-blue-400/50'
                    : 'text-gray-400 hover:text-blue-300 hover:shadow-[0_0_8px_rgba(96,165,250,0.3)]'
                }`}
                onClick={() => setActivePhase('mspsrpi2')}
              >
                MSPSRPI2
              </button>
            </div>
          </div>

          {/* Active phase content */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-indigo-900/30 rounded-xl p-6 mb-12 shadow-xl">
            <div className="grid md:grid-cols-1 gap-6 mb-8">
              <div>
                <div className="flex md:flex-row flex-col justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{projectPhases[activePhase].title}</h3>
                    <p className="text-lg text-indigo-300 mt-1">{projectPhases[activePhase].subtitle}</p>
                  </div>
                  
                  {/* Phase Statistics inline with title */}
                  <div className="flex space-x-8 mt-4 md:mt-0">
                    <div className="text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">PULSARS</p>
                      <p className="text-3xl font-bold text-white">{projectPhases[activePhase].stats.pulsars}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">PRECISION</p>
                      <p className="text-3xl font-bold text-white">{projectPhases[activePhase].stats.precision}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">PUBLICATIONS</p>
                      <p className="text-3xl font-bold text-white">{projectPhases[activePhase].stats.publications}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">
                  {projectPhases[activePhase].description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Simplified Project Objectives */}
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-200 mb-4">Project Objectives</h4>
                    <ul className="space-y-2">
                      {projectPhases[activePhase].objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-400 mr-3">•</span>
                          <span className="text-gray-300">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Key Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-200 mb-4">Key Achievements</h4>
                    <ul className="space-y-2">
                      {projectPhases[activePhase].achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-400 mr-3">✓</span>
                          <span className="text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link 
                to={`/projects/${activePhase}-details`} 
                className="inline-flex items-center px-5 py-2 border border-indigo-500/40 rounded-md text-indigo-300 bg-indigo-900/30 hover:bg-indigo-800/50 transition duration-300 shadow-[0_0_10px_rgba(79,70,229,0.3)] hover:shadow-[0_0_15px_rgba(79,70,229,0.5)]"
              >
                View Detailed Project Information <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              
              {activePhase === 'psrpi' && (
                <a 
                  href="https://psrpi.phys.wvu.edu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 ml-4 border border-indigo-500/40 rounded-md text-indigo-300 bg-indigo-900/30 hover:bg-indigo-900/50 transition duration-300"
                >
                  Visit Original PSRPI Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: MSPSRPI2 Detailed Progress Tracker */}
      <div id="progress-tracker" className="py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">MSPSRPI2 Progress Tracker</h2>
            <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
              Detailed status of our current phase observations
            </p>
          </div>

          {/* Progress Summary Cards - Now with unified cosmic styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {/* All cards now use the same background - only borders and text colors differ */}
            <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg p-4 text-center relative overflow-hidden group transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <h3 className="text-lg font-semibold text-blue-300 mb-2 relative z-10">Target Pulsars</h3>
              <p className="text-4xl font-bold text-gray-100 relative z-10">{progressStats.total}</p>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-cyan-500/30 rounded-lg p-4 text-center relative overflow-hidden group transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(8,145,178,0.3)]">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2 relative z-10">Observed</h3>
              <p className="text-4xl font-bold text-gray-100 relative z-10">{progressStats.observed}</p>
              <p className="text-sm text-cyan-400 relative z-10">{progressStats.percentComplete}% Complete</p>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-emerald-500/30 rounded-lg p-4 text-center relative overflow-hidden group transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <h3 className="text-lg font-semibold text-emerald-300 mb-2 relative z-10">Completed</h3>
              <p className="text-4xl font-bold text-gray-100 relative z-10">{progressStats.complete}</p>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-fuchsia-500/30 rounded-lg p-4 text-center relative overflow-hidden group transition-all duration-300 hover:border-fuchsia-500/50 hover:shadow-[0_0_15px_rgba(192,38,211,0.3)]">
              <h3 className="text-lg font-semibold text-fuchsia-300 mb-2 relative z-10">With Issues</h3>
              <p className="text-4xl font-bold text-gray-100 relative z-10">{progressStats.withIssues}</p>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-indigo-500/30 rounded-lg p-4 text-center relative overflow-hidden group transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2 relative z-10">Scheduled</h3>
              <p className="text-4xl font-bold text-gray-100 relative z-10">{progressStats.scheduled}</p>
            </div>
          </div>

          {/* Overall Progress Bar - Enhanced with cosmic glow */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white">Overall Project Progress</h3>
              <span className="text-lg font-bold text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.7)]">{progressStats.percentComplete}%</span>
            </div>
            
            <div className="h-4 bg-slate-900/80 rounded-full overflow-hidden border border-indigo-500/30 shadow-inner shadow-black/50 relative">
              {/* Subtle star-like shimmer effect */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iNCIgdmlld0JveD0iMCAwIDMwMCA0Ij48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjIiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSIyIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMiIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjIiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iOTAiIGN5PSIyIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjExMCIgY3k9IjIiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iMTMwIiBjeT0iMiIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIyIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjE3MCIgY3k9IjIiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMTkwIiBjeT0iMiIgcj0iMC4zIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSIyMTAiIGN5PSIyIiByPSIwLjQiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjIzMCIgY3k9IjIiIHI9IjAuMyIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMiIgcj0iMC40IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIyNzAiIGN5PSIyIiByPSIwLjMiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjI5MCIgY3k9IjIiIHI9IjAuNCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] opacity-30"></div>
              
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.7)]"
                style={{ width: `${progressStats.percentComplete}%` }}
              >
                {/* Animated glow pulse effect */}
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Filters - Enhanced with cosmic neon styling - Fixed Issues button color */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm border border-indigo-500/20 rounded-lg p-6 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow md:max-w-xs group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-cyan-400/70" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-cyan-500/30 rounded-md leading-5 bg-slate-900/80 text-cyan-100 placeholder-cyan-600/70 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 shadow-[0_0_5px_rgba(8,145,178,0.2)] focus:shadow-[0_0_10px_rgba(8,145,178,0.4)]"
                  placeholder="Search by pulsar or obs code"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {/* All Button - Cosmic blue */}
                <button
                  className={`px-4 py-1.5 text-sm rounded-md transition-all duration-300 ${
                    statusFilter === 'all'
                      ? 'bg-gradient-to-r from-blue-800/80 to-indigo-800/80 text-blue-100 border border-blue-400/60 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      : 'bg-slate-900/80 text-blue-300/80 border border-blue-500/20 hover:border-blue-500/40 hover:text-blue-200 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                  }`}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </button>

                {/* Complete Button - Neon green */}
                <button
                  className={`px-4 py-1.5 text-sm rounded-md transition-all duration-300 ${
                    statusFilter === 'complete'
                      ? 'bg-gradient-to-r from-emerald-800/80 to-teal-800/80 text-emerald-100 border border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'bg-slate-900/80 text-emerald-300/80 border border-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-200 hover:shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                  }`}
                  onClick={() => setStatusFilter('complete')}
                >
                  Complete
                </button>

                {/* In Progress Button - Neon cyan */}
                <button
                  className={`px-4 py-1.5 text-sm rounded-md transition-all duration-300 ${
                    statusFilter === 'in-progress'
                      ? 'bg-gradient-to-r from-cyan-800/80 to-sky-800/80 text-cyan-100 border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                      : 'bg-slate-900/80 text-cyan-300/80 border border-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-200 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  }`}
                  onClick={() => setStatusFilter('in-progress')}
                >
                  In Progress
                </button>

                {/* Issues Button - Fuchsia instead of orange */}
                <button
                  className={`px-4 py-1.5 text-sm rounded-md transition-all duration-300 ${
                    statusFilter === 'issue'
                      ? 'bg-gradient-to-r from-fuchsia-800/80 to-pink-800/80 text-fuchsia-100 border border-fuchsia-400/60 shadow-[0_0_10px_rgba(192,38,211,0.5)]'
                      : 'bg-slate-900/80 text-fuchsia-300/80 border border-fuchsia-500/20 hover:border-fuchsia-500/40 hover:text-fuchsia-200 hover:shadow-[0_0_8px_rgba(192,38,211,0.3)]'
                  }`}
                  onClick={() => setStatusFilter('issue')}
                >
                  Issues
                </button>

                {/* Scheduled Button - Neon purple */}
                <button
                  className={`px-4 py-1.5 text-sm rounded-md transition-all duration-300 ${
                    statusFilter === 'scheduled'
                      ? 'bg-gradient-to-r from-violet-800/80 to-purple-800/80 text-violet-100 border border-violet-400/60 shadow-[0_0_10px_rgba(124,58,237,0.5)]'
                      : 'bg-slate-900/80 text-violet-300/80 border border-violet-500/20 hover:border-violet-500/40 hover:text-violet-200 hover:shadow-[0_0_8px_rgba(124,58,237,0.3)]'
                  }`}
                  onClick={() => setStatusFilter('scheduled')}
                >
                  Scheduled
                </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-800/60">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('obsCode')}
                  >
                    <div className="flex items-center">
                      <span>Obs Code</span>
                      {sortConfig.key === 'obsCode' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('srcname')}
                  >
                    <div className="flex items-center">
                      <span>Pulsar Name</span>
                      {sortConfig.key === 'srcname' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('obsDate')}
                  >
                    <div className="flex items-center">
                      <span>Observation Date</span>
                      {sortConfig.key === 'obsDate' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Processing Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      {sortConfig.key === 'status' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredData.length > 0 ? (
                  filteredData.map((obs, index) => (
                    <tr key={index} className={
                      obs.status === 'complete' ? 'bg-green-900/10 hover:bg-green-900/20' :
                      obs.status === 'issue' ? 'bg-fuchsia-900/10 hover:bg-fuchsia-900/20' : // Changed from amber to fuchsia
                      obs.status === 'in-progress' ? 'bg-blue-900/10 hover:bg-blue-900/20' :
                      obs.status === 'scheduled' ? 'bg-purple-900/10 hover:bg-purple-900/20' :
                      'hover:bg-slate-800/40'
                    }>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{obs.obsCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-200">{obs.srcname}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {obs.obsDate ? 
                          new Date(obs.obsDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 
                          obs.scheduledDate ? 
                            <span className="text-purple-300">Scheduled: {new Date(obs.scheduledDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span> : 
                            'Not scheduled'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {obs.status === 'scheduled' ? (
                          <div className="flex items-center space-x-1 text-purple-300">
                            <span>Awaiting observation</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-col text-xs space-y-1">
                              <span className={`flex items-center ${obs.polycoRequested ? 'text-green-400' : 'text-gray-500'}`}>
                                {obs.polycoRequested ? <CheckCircle className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">○</span>}
                                Polyco requested
                              </span>
                              <span className={`flex items-center ${obs.polycoReceived ? 'text-green-400' : 'text-gray-500'}`}>
                                {obs.polycoReceived ? <CheckCircle className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">○</span>}
                                Polyco received
                              </span>
                              <span className={`flex items-center ${obs.binConfigSent ? 'text-green-400' : 'text-gray-500'}`}>
                                {obs.binConfigSent ? <CheckCircle className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">○</span>}
                                Binconfig sent
                              </span>
                              <span className={`flex items-center ${obs.correlatedDataReceived ? 'text-green-400' : 'text-gray-500'}`}>
                                {obs.correlatedDataReceived ? <CheckCircle className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">○</span>}
                                Correlated data
                              </span>
                              <span className={`flex items-center ${obs.gatingChecked ? 'text-green-400' : 'text-gray-500'}`}>
                                {obs.gatingChecked ? <CheckCircle className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">○</span>}
                                Gating checked
                              </span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {obs.status === 'complete' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/40 text-green-200 border border-green-500/30">
                            <CheckCircle className="h-3 w-3 mr-1" /> Complete
                          </span>
                        )}
                        {obs.status === 'issue' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fuchsia-900/40 text-fuchsia-200 border border-fuchsia-500/30">
                            <AlertCircle className="h-3 w-3 mr-1" /> Issue
                            {obs.note && <span className="ml-1 text-xs">({obs.note})</span>}
                          </span>
                        )}
                        {obs.status === 'in-progress' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/40 text-blue-200 border border-blue-500/30">
                            <Clock className="h-3 w-3 mr-1" /> In Progress
                          </span>
                        )}
                        {obs.status === 'scheduled' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/40 text-purple-200 border border-purple-500/30">
                            <Calendar className="h-3 w-3 mr-1" /> Scheduled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-400">
                      No observations match your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Last updated: March 29, 2025
            </p>
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

export default ProjectPage;