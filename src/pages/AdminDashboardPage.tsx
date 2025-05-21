import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  BarChart2, 
  Users, 
  MessageSquare, 
  PieChart, 
  ArrowDownCircle, 
  ArrowUpCircle,
  Settings,
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ComplaintStatus = 'pending' | 'reviewing' | 'in_progress' | 'resolved' | 'rejected';

interface Complaint {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  date: string;
  status: ComplaintStatus;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
}

// Mock data
const mockComplaints: Complaint[] = [
  {
    id: 'CMP-283941',
    title: 'Pothole on Main Street',
    category: 'Infrastructure',
    subcategory: 'Roads',
    location: 'Kigali, Nyarugenge District',
    date: '2023-10-25',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'CMP-283942',
    title: 'Broken Streetlight',
    category: 'Infrastructure',
    subcategory: 'Street Lighting',
    location: 'Kigali, Gasabo District',
    date: '2023-10-24',
    status: 'in_progress',
    priority: 'low',
    assignee: 'Jean Mugisha'
  },
  {
    id: 'CMP-283943',
    title: 'Water Supply Issue',
    category: 'Utilities',
    subcategory: 'Water Supply',
    location: 'Kigali, Kicukiro District',
    date: '2023-10-24',
    status: 'reviewing',
    priority: 'high',
  },
  {
    id: 'CMP-283944',
    title: 'Garbage Collection Delay',
    category: 'Utilities',
    subcategory: 'Waste Management',
    location: 'Kigali, Gasabo District',
    date: '2023-10-23',
    status: 'resolved',
    priority: 'medium',
    assignee: 'Marie Uwase'
  },
  {
    id: 'CMP-283945',
    title: 'School Building Maintenance',
    category: 'Education',
    subcategory: 'School Facilities',
    location: 'Kigali, Nyarugenge District',
    date: '2023-10-22',
    status: 'rejected',
    priority: 'low',
  },
  {
    id: 'CMP-283946',
    title: 'Hospital Wait Times',
    category: 'Healthcare',
    subcategory: 'Hospitals',
    location: 'Kigali, Kicukiro District',
    date: '2023-10-21',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Claude Niyonzima'
  },
  {
    id: 'CMP-283947',
    title: 'Public Bus Schedule Issues',
    category: 'Transportation',
    subcategory: 'Public Transit',
    location: 'Kigali, Nyarugenge District',
    date: '2023-10-20',
    status: 'reviewing',
    priority: 'medium',
  },
  {
    id: 'CMP-283948',
    title: 'ID Card Application Delay',
    category: 'Administrative Services',
    subcategory: 'Document Processing',
    location: 'Kigali, Gasabo District',
    date: '2023-10-19',
    status: 'pending',
    priority: 'high',
  },
];

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    category: '',
    priority: '',
    date: ''
  });

  // Stats calculation
  const pendingCount = mockComplaints.filter(c => c.status === 'pending').length;
  const inProgressCount = mockComplaints.filter(c => c.status === 'in_progress' || c.status === 'reviewing').length;
  const resolvedCount = mockComplaints.filter(c => c.status === 'resolved').length;
  const totalCount = mockComplaints.length;
  
  // Filter complaints by active tab
  const filteredByTab = mockComplaints.filter(complaint => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return complaint.status === 'pending';
    if (activeTab === 'in_progress') return complaint.status === 'in_progress' || complaint.status === 'reviewing';
    if (activeTab === 'resolved') return complaint.status === 'resolved';
    if (activeTab === 'rejected') return complaint.status === 'rejected';
    return true;
  });
  
  // Filter complaints by search term and other filters
  const filteredComplaints = filteredByTab.filter(complaint => {
    const matchesSearch = searchTerm === '' || 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = filters.category === '' || complaint.category === filters.category;
    const matchesPriority = filters.priority === '' || complaint.priority === filters.priority;
    const matchesDate = filters.date === '' || complaint.date >= filters.date;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesDate;
  });

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'reviewing':
        return <AlertCircle size={16} className="text-blue-500" />;
      case 'in_progress':
        return <BarChart2 size={16} className="text-blue-500" />;
      case 'resolved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'rejected':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-yellow-500" />;
    }
  };

  const getStatusLabel = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'reviewing':
        return 'Under Review';
      case 'in_progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      priority: '',
      date: ''
    });
    setSearchTerm('');
  };

  const handleComplaintClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleLogout = () => {
    // In a real app, implement proper logout logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-full mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <MessageSquare className="h-8 w-8 text-teal-700" />
                <div className="ml-2">
                  <h1 className="text-xl font-bold text-teal-700">Admin Dashboard</h1>
                  <p className="text-xs text-teal-600">Ijwi ry'Abaturage</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-500 hover:text-teal-600 cursor-pointer" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <button 
                className="text-gray-500 hover:text-teal-600"
                onClick={() => navigate('/admin/settings')}
              >
                <Settings className="h-6 w-6" />
              </button>
              <div className="border-l border-gray-200 h-6 mx-2"></div>
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                  alt="Admin profile"
                />
                <span className="text-gray-700 font-medium">Admin User</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-500 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-teal-600 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                  alt="Admin profile"
                />
                <span className="text-gray-700 font-medium">Admin User</span>
              </div>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-teal-600">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-teal-600">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16 px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
              <p className="text-gray-600">Manage and respond to citizen complaints</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-white rounded-full py-1 px-3 shadow-sm border border-gray-200 flex items-center mr-2">
                <Users size={16} className="text-teal-600 mr-1" />
                <span className="text-sm font-medium">Administrator</span>
              </div>
              <button className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-200">
                Export Data
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Complaints" 
              value={totalCount.toString()} 
              icon={<MessageSquare size={20} className="text-blue-600" />} 
              change={"+12%"} 
              changeType="increase" 
            />
            <StatCard 
              title="Pending" 
              value={pendingCount.toString()} 
              icon={<Clock size={20} className="text-yellow-600" />} 
              change={"-5%"} 
              changeType="decrease" 
            />
            <StatCard 
              title="In Progress" 
              value={inProgressCount.toString()} 
              icon={<BarChart2 size={20} className="text-blue-600" />} 
              change={"+8%"} 
              changeType="increase" 
            />
            <StatCard 
              title="Resolved" 
              value={resolvedCount.toString()} 
              icon={<CheckCircle size={20} className="text-green-600" />} 
              change={"+15%"} 
              changeType="increase" 
            />
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 xl:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Complaints Over Time</h2>
                <select className="border border-gray-300 rounded-md text-sm p-1">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                </select>
              </div>
              {/* Placeholder for a chart */}
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <BarChart2 size={48} className="text-gray-400" />
                <span className="ml-2 text-gray-500">Complaints Trend Chart</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Complaints by Category</h2>
              </div>
              {/* Placeholder for a chart */}
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <PieChart size={48} className="text-gray-400" />
                <span className="ml-2 text-gray-500">Category Distribution</span>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Complaint List */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">Complaints</h2>
                  
                  <div className="flex space-x-2">
                    <div className="relative w-full md:w-64">
                      <input
                        type="text"
                        placeholder="Search complaints..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <button
                      className="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                      <Filter size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Filters */}
                {isFilterOpen && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md animate-fadeIn">
                    <div className="flex flex-wrap gap-4">
                      <div className="w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          name="category"
                          value={filters.category}
                          onChange={handleFilterChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="">All Categories</option>
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Education">Education</option>
                          <option value="Utilities">Utilities</option>
                          <option value="Transportation">Transportation</option>
                          <option value="Administrative Services">Administrative Services</option>
                        </select>
                      </div>
                      
                      <div className="w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                          name="priority"
                          value={filters.priority}
                          onChange={handleFilterChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="">All Priorities</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      
                      <div className="w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                        <input
                          type="date"
                          name="date"
                          value={filters.date}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value
                          }))}
                          className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <div className="w-full flex justify-end">
                        <button
                          onClick={resetFilters}
                          className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tabs */}
                <div className="flex space-x-1 mt-4 border-b border-gray-200">
                  <TabButton
                    label="All"
                    count={totalCount}
                    active={activeTab === 'all'}
                    onClick={() => setActiveTab('all')}
                  />
                  <TabButton
                    label="Pending"
                    count={pendingCount}
                    active={activeTab === 'pending'}
                    onClick={() => setActiveTab('pending')}
                  />
                  <TabButton
                    label="In Progress"
                    count={inProgressCount}
                    active={activeTab === 'in_progress'}
                    onClick={() => setActiveTab('in_progress')}
                  />
                  <TabButton
                    label="Resolved"
                    count={resolvedCount}
                    active={activeTab === 'resolved'}
                    onClick={() => setActiveTab('resolved')}
                  />
                </div>
              </div>
              
              {/* Complaints List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComplaints.length > 0 ? (
                      filteredComplaints.map((complaint) => (
                        <tr 
                          key={complaint.id} 
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                          onClick={() => handleComplaintClick(complaint)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {complaint.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.title}
                          </td>
                          <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.category}
                          </td>
                          <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(complaint.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                              {getStatusIcon(complaint.status)}
                              <span className="ml-1">{getStatusLabel(complaint.status)}</span>
                            </span>
                          </td>
                          <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                              {complaint.priority}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No complaints found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredComplaints.length}</span> of{' '}
                      <span className="font-medium">{filteredComplaints.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <span>&laquo;</span>
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-teal-50 text-sm font-medium text-teal-600 hover:bg-teal-100">
                        1
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </a>
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <span>&raquo;</span>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Complaint Detail Panel */}
            <div className="bg-white rounded-lg shadow-sm">
              {selectedComplaint ? (
                <div className="p-6 animate-fadeIn">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{selectedComplaint.title}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                      {getStatusLabel(selectedComplaint.status)}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">ID: {selectedComplaint.id}</p>
                    <p className="text-sm text-gray-500">Submitted: {new Date(selectedComplaint.date).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Category</h3>
                      <p>{selectedComplaint.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Subcategory</h3>
                      <p>{selectedComplaint.subcategory}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p>{selectedComplaint.location}</p>
                    </div>
                  </div>
                  
                  
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Change Status</h3>
                    <select className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500">
                      <option value="pending" selected={selectedComplaint.status === 'pending'}>Pending</option>
                      <option value="reviewing" selected={selectedComplaint.status === 'reviewing'}>Under Review</option>
                      <option value="in_progress" selected={selectedComplaint.status === 'in_progress'}>In Progress</option>
                      <option value="resolved" selected={selectedComplaint.status === 'resolved'}>Resolved</option>
                      <option value="rejected" selected={selectedComplaint.status === 'rejected'}>Rejected</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Assign To</h3>
                    <select className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500">
                      <option value="">Select Staff Member</option>
                      <option value="jean" selected={selectedComplaint.assignee === 'Jean Mugisha'}>Jean Mugisha</option>
                      <option value="marie" selected={selectedComplaint.assignee === 'Marie Uwase'}>Marie Uwase</option>
                      <option value="claude" selected={selectedComplaint.assignee === 'Claude Niyonzima'}>Claude Niyonzima</option>
                      <option value="alice">Alice Mukamana</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Add Response</h3>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Type your response here..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-teal-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 animate-fadeIn">
                  <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                  <p>Select a complaint to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ReactNode;
  change: string;
  changeType: 'increase' | 'decrease';
}> = ({ title, value, icon, change, changeType }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="p-2 bg-teal-50 rounded-md">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {changeType === 'increase' ? (
        <ArrowUpCircle size={16} className="text-green-500 mr-1" />
      ) : (
        <ArrowDownCircle size={16} className="text-red-500 mr-1" />
      )}
      <span className={`text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last month
      </span>
    </div>
  </div>
);

const TabButton: React.FC<{ 
  label: string; 
  count: number; 
  active: boolean;
  onClick: () => void;
}> = ({ label, count, active, onClick }) => (
  <button
    className={`py-3 px-4 text-sm font-medium ${
      active
        ? 'text-teal-600 border-b-2 border-teal-600'
        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    {label}
    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
      active ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-600'
    }`}>
      {count}
    </span>
  </button>
);

export default AdminDashboardPage;