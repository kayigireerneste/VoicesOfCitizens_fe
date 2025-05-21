import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Clock, CheckCircle2, AlertTriangle, HelpCircle, MessageSquare, Check } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

type ComplaintStatus = 'pending' | 'reviewing' | 'in_progress' | 'resolved' | 'rejected';

interface Complaint {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  date: string;
  status: ComplaintStatus;
  description: string;
  comments: Comment[];
}

interface Comment {
  author: string;
  role: string;
  date: string;
  text: string;
}

// Mock data function
const getMockComplaint = (id: string): Complaint => ({
  id,
  title: "Road Maintenance Issue",
  category: "Infrastructure",
  subcategory: "Roads",
  location: "Kigali, Gasabo District, Kimironko Sector",
  date: "2023-10-21",
  status: "in_progress",
  description: "There are large potholes on the main road that have been causing accidents. The situation worsens during rainy season as the potholes fill with water and become hard to see.",
  comments: [
    {
      author: "System",
      role: "Automated",
      date: "2023-10-21",
      text: "Your complaint has been received and assigned tracking ID " + id
    },
    {
      author: "Intake Officer",
      role: "Ministry of Infrastructure",
      date: "2023-10-22",
      text: "Thank you for your report. We have forwarded your complaint to the Roads Maintenance Department for assessment."
    },
    {
      author: "Technician",
      role: "Roads Maintenance Department",
      date: "2023-10-25",
      text: "We have scheduled an inspection of the location for Oct 28th. We will provide an update after assessment."
    }
  ]
});

const TrackComplaintPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState<string>('');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { t } = useApp();
  

  // Extract tracking ID from URL parameters if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (id) {
      setTrackingId(id);
      handleTrack(id);
    }
  }, [location.search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingId(e.target.value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack(trackingId);
  };

  const handleTrack = async (id: string) => {
    if (!id.trim()) {
      setError(t('track.error.id'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would fetch data from an API
      const data = getMockComplaint(id);
      setComplaint(data);
      
      // Update URL with tracking ID without reloading the page
      navigate(`/track?id=${id}`, { replace: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Failed to find complaint with that tracking ID');
      setComplaint(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // In a real app, we would send this to an API
    if (complaint) {
      const updatedComments = [
        ...complaint.comments,
        {
          author: "You",
          role: "Citizen",
          date: new Date().toISOString().split('T')[0],
          text: newComment
        }
      ];
      
      setComplaint({
        ...complaint,
        comments: updatedComments
      });
      
      setNewComment('');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" />;
      case 'reviewing':
        return <HelpCircle className="text-blue-500" />;
      case 'in_progress':
        return <HelpCircle className="text-blue-500" />;
      case 'resolved':
        return <CheckCircle2 className="text-green-500" />;
      case 'rejected':
        return <AlertTriangle className="text-red-500" />;
      default:
        return <Clock className="text-yellow-500" />;
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

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('track.title')}</h1>
            <p className="text-gray-600 mb-8 text-center">
            {t('track.subtitle')}
            </p>
          
          <div className="bg-white shadow-md rounded-lg p-8 animate-fadeIn">
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="relative">
                <input
                  type="text"
                  placeholder={t('track.input.placeholder')}
                  value={trackingId}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-20 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-4 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  disabled={isLoading}
                >
                  {isLoading ? t('track.button.loading') : t('track.button.submit')}
                </button>
                </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </form>
            
            {complaint && (
              <div className="animate-slideInUp">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Complaint #{complaint.id}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {getStatusLabel(complaint.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Category</h3>
                      <p>{complaint.category} &gt; {complaint.subcategory}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
                      <p>{new Date(complaint.date).toLocaleDateString()}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p>{complaint.location}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{complaint.description}</p>
                </div>
                
                {/* Progress Tracker */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Progress</h3>
                  <div className="relative">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div 
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500`} 
                        style={{ 
                          width: complaint.status === 'pending' ? '25%' :
                                 complaint.status === 'reviewing' ? '50%' :
                                 complaint.status === 'in_progress' ? '75%' :
                                 complaint.status === 'resolved' ? '100%' : '25%'
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-center">
                        <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                          ['pending', 'reviewing', 'in_progress', 'resolved'].includes(complaint.status) 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-gray-300'
                        }`}>
                          <Check size={14} className="text-white" />
                        </div>
                        <p className="text-xs mt-1">Received</p>
                      </div>
                      <div className="text-center">
                        <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                          ['reviewing', 'in_progress', 'resolved'].includes(complaint.status) 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-gray-300'
                        }`}>
                          <Check size={14} className="text-white" />
                        </div>
                        <p className="text-xs mt-1">Reviewed</p>
                      </div>
                      <div className="text-center">
                        <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                          ['in_progress', 'resolved'].includes(complaint.status) 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-gray-300'
                        }`}>
                          <Check size={14} className="text-white" />
                        </div>
                        <p className="text-xs mt-1">In Progress</p>
                      </div>
                      <div className="text-center">
                        <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                          complaint.status === 'resolved' 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-gray-300'
                        }`}>
                          <Check size={14} className="text-white" />
                        </div>
                        <p className="text-xs mt-1">Resolved</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Comments & Updates */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Updates & Comments</h3>
                  <div className="space-y-4 mb-6">
                    {complaint.comments.map((comment, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg ${
                          comment.author === 'You' 
                            ? 'bg-teal-50 border-l-4 border-teal-500' 
                            : 'bg-gray-50 border-l-4 border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between mb-2">
                          <div>
                            <span className="font-medium">{comment.author}</span>
                            {comment.role && (
                              <span className="text-gray-500 text-sm ml-2">({comment.role})</span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Comment */}
                  <form onSubmit={handleAddComment}>
                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Add a comment or question
                      </label>
                      <div className="relative">
                        <textarea
                          id="comment"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Type your comment here..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <MessageSquare className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        disabled={!newComment.trim()}
                      >
                        Send Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackComplaintPage;