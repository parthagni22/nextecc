import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  FileText,
  BarChart3,
  Clock,
  Target,
  ThumbsUp,
  Zap,
  Calendar,
  Download,
  RefreshCw,
  Trash2
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { courses } from '../data/coursesData';
import { generateDummyAnalyticsData, populateDummyData, calculateROIMetrics } from '../utils/dummyDataGenerator';
import { calculateDepartmentRankings, getTopPerformers } from '../utils/leaderboardCalculator';
import { generateActivityHeatmap } from '../utils/heatmapCalculator';
import ROISummaryPanel from '../components/ROISummaryPanel';
import DepartmentLeaderboard from '../components/DepartmentLeaderboard';
import TopPerformersCard from '../components/TopPerformersCard';
import EngagementHeatmap from '../components/EngagementHeatmap';
import AdminCalendar from '../components/AdminCalendar';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [showDataGenerator, setShowDataGenerator] = useState(false);
  const [roiData, setRoiData] = useState(null);
  const [departmentRankings, setDepartmentRankings] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [heatmapData, setHeatmapData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'participants'

  useEffect(() => {
    // Generate analytics data
    const data = generateDummyAnalyticsData();
    setAnalyticsData(data);

    // Calculate ROI metrics
    const roi = calculateROIMetrics();
    setRoiData(roi);

    // Calculate department rankings
    const rankings = calculateDepartmentRankings();
    setDepartmentRankings(rankings);

    // Get top performers
    const performers = getTopPerformers(5);
    setTopPerformers(performers);

    // Generate activity heatmap
    const heatmap = generateActivityHeatmap(6);
    setHeatmapData(heatmap);

    // Check if we need to show the data generator button
    const users = JSON.parse(localStorage.getItem('nextec_users') || '[]');
    setShowDataGenerator(users.length < 10);
  }, []);

  const handlePopulateDummyData = () => {
    populateDummyData();
    window.location.reload();
  };

  const handleClearDummyData = () => {
    // Only clear dummy/sample data, keep real registered users
    const allUsers = JSON.parse(localStorage.getItem('nextec_users') || '[]');
    const allAssessments = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');

    // Filter to keep only real users (not dummy data)
    const realUsers = allUsers.filter(u => {
      const isDummyUser = u.id.startsWith('student-') || u.email.endsWith('@cod.edu');
      return !isDummyUser;
    });

    // Filter assessments to keep only real users' assessments
    const realAssessments = {};
    Object.keys(allAssessments).forEach(userId => {
      const isDummyUser = userId.startsWith('student-');
      if (!isDummyUser) {
        realAssessments[userId] = allAssessments[userId];
      }
    });

    // Update localStorage with only real users
    localStorage.setItem('nextec_users', JSON.stringify(realUsers));
    localStorage.setItem('nextec_assessments', JSON.stringify(realAssessments));

    window.location.reload();
  };

  // Calculate stats
  const totalUsers = JSON.parse(localStorage.getItem('nextec_users') || '[]').length;
  const totalCourses = courses.length;

  // Calculate total enrollments
  const users = JSON.parse(localStorage.getItem('nextec_users') || '[]');
  const totalEnrollments = users.reduce((sum, user) => sum + (user.enrolledCourses?.length || 0), 0);

  // Get assessment data
  const assessmentsData = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');

  // Calculate assessment statistics
  const getAssessmentStats = () => {
    const stats = [];
    Object.keys(assessmentsData).forEach((userId) => {
      const userAssessments = assessmentsData[userId];
      if (userAssessments['m365-workforce']) {
        const assessment = userAssessments['m365-workforce'];
        const user = users.find((u) => u.id === userId);

        if (user && assessment.preAssessment) {
          // Determine if this is a dummy user (generated sample data)
          const isDummyUser = userId.startsWith('student-') || user.email.endsWith('@cod.edu');

          stats.push({
            userId,
            userName: user.name,
            email: user.email,
            workArea: assessment.preAssessment.primaryWorkArea,
            jobProfile: assessment.preAssessment.jobProfile,
            preScore: parseFloat(assessment.preAssessment.overallScore),
            postScore: assessment.postAssessment
              ? parseFloat(assessment.postAssessment.overallScore)
              : null,
            improvement: assessment.postAssessment
              ? (
                  parseFloat(assessment.postAssessment.overallScore) -
                  parseFloat(assessment.preAssessment.overallScore)
                ).toFixed(2)
              : null,
            hasPreAssessment: true,
            hasPostAssessment: !!assessment.postAssessment,
            preAssessmentData: assessment.preAssessment,
            postAssessmentData: assessment.postAssessment,
            isDummyUser
          });
        }
      }
    });

    // Sort: Real users first, then dummy users
    // Within each group, sort by completion status (completed first), then by name
    stats.sort((a, b) => {
      // First priority: Real users before dummy users
      if (a.isDummyUser !== b.isDummyUser) {
        return a.isDummyUser ? 1 : -1;
      }

      // Second priority: Completed assessments first
      if (a.hasPostAssessment !== b.hasPostAssessment) {
        return b.hasPostAssessment ? 1 : -1;
      }

      // Third priority: Sort by name alphabetically
      return a.userName.localeCompare(b.userName);
    });

    return stats;
  };

  const assessmentStats = getAssessmentStats();

  // Prepare Pre & Post Assessment Chart Data
  const prepareAssessmentChartData = () => {
    if (!analyticsData) return [];

    const { assessmentScores } = analyticsData;
    return [
      {
        tool: 'Teams',
        'Pre-Training': assessmentScores.teams.pre,
        'Post-Training': assessmentScores.teams.post
      },
      {
        tool: 'Excel',
        'Pre-Training': assessmentScores.excel.pre,
        'Post-Training': assessmentScores.excel.post
      },
      {
        tool: 'OneDrive',
        'Pre-Training': assessmentScores.oneDrive.pre,
        'Post-Training': assessmentScores.oneDrive.post
      },
      {
        tool: 'SharePoint',
        'Pre-Training': assessmentScores.sharePoint.pre,
        'Post-Training': assessmentScores.sharePoint.post
      }
    ];
  };

  // Color scale for heatmap
  const getHeatmapColor = (value) => {
    if (value >= 50) return '#10b981'; // green-500
    if (value >= 45) return '#84cc16'; // lime-500
    if (value >= 40) return '#eab308'; // yellow-500
    if (value >= 35) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  if (!analyticsData || !roiData || !heatmapData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-nextec-purple mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const { impactMetrics, enrollmentOverTime, scheduledClasses, cohortSummary, recommendations } =
    analyticsData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-nextec-purple via-nextec-blue to-nextec-purple text-white py-8">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                {/* <div className="flex items-center gap-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white border-opacity-20">
                  <div className="flex items-center bg-white rounded px-2 py-1">
                    <img
                      src="/nextec-logo.png"
                      alt="Nextec Inc"
                      className="h-6 w-auto"
                    />
                  </div>
                  <span className="text-white text-sm font-semibold">×</span>
                  <div className="flex items-center bg-white rounded px-2 py-1">
                    <img
                      src="/dupage-logo.png"
                      alt="College of DuPage"
                      className="h-6 w-auto"
                    />
                  </div>
                </div> */}
              </div>
              <h1 className="text-3xl font-bold mb-2">Training Results Dashboard</h1>
              <p className="text-gray-200">Nextec Inc × College of DuPage - Microsoft 365 Workforce Enablement Program</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Cohort: {cohortSummary.cohort}</div>
              <div className="text-2xl font-bold mb-3">{cohortSummary.totalParticipants} Participants</div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleClearDummyData}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                  title="Clear only sample/demo data (keeps real users)"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Data
                </button>
                <button
                  onClick={handlePopulateDummyData}
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                  title="Generate sample data (preserves existing real users)"
                >
                  <RefreshCw className="h-4 w-4" />
                  Generate Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Dummy Data Generator Banner */}
        {showDataGenerator && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <Zap className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">Demo Mode - Populate Sample Data</h3>
                <p className="text-yellow-800 mb-4">
                  Click the button below to generate 30 realistic student assessment records for demo purposes.
                  This will populate the dashboard with sample analytics data. Your real registered users will be preserved.
                </p>
                <button
                  onClick={handlePopulateDummyData}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  title="Generates sample data without affecting real users"
                >
                  Generate Sample Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-nextec-purple text-nextec-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center`}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Overview & Analytics
              </button>
              <button
                onClick={() => setActiveTab('participants')}
                className={`${
                  activeTab === 'participants'
                    ? 'border-nextec-purple text-nextec-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center`}
              >
                <Users className="h-5 w-5 mr-2" />
                Engagement & Participants
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' ? (
          /* Overview & Analytics Tab */
          <div>
        {/* Top Row: Pre/Post Chart & Departmental Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pre & Post Assessment Scores */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-nextec-purple mb-4">Pre & Post Assessment Scores</h3>
            <p className="text-sm text-gray-600 mb-4">
              Average confidence increase: <span className="font-bold text-green-600">+32%</span>
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prepareAssessmentChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tool" />
                <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Pre-Training"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Post-Training"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Departmental Improvement Heatmap */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-nextec-purple mb-4">Departmental Improvement</h3>
            <p className="text-sm text-gray-600 mb-4">Percentage increase by department and tool</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Department</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">Teams</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">Excel</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">OneDrive</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">SharePoint</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.departmentalImprovement.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-3 font-medium text-gray-800">{dept.department}</td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded font-bold text-white"
                          style={{ backgroundColor: getHeatmapColor(dept.teams) }}
                        >
                          +{dept.teams}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded font-bold text-white"
                          style={{ backgroundColor: getHeatmapColor(dept.excel) }}
                        >
                          +{dept.excel}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded font-bold text-white"
                          style={{ backgroundColor: getHeatmapColor(dept.oneDrive) }}
                        >
                          +{dept.oneDrive}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded font-bold text-white"
                          style={{ backgroundColor: getHeatmapColor(dept.sharePoint) }}
                        >
                          +{dept.sharePoint}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Training Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-12 w-12 opacity-80" />
            </div>
            <div className="text-4xl font-bold mb-2">+{impactMetrics.avgConfidenceGain}%</div>
            <div className="text-blue-100 font-semibold mb-1">Avg. Confidence Gain</div>
            <div className="text-xs text-blue-200">Demonstrates tangible learning outcomes</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-12 w-12 opacity-80" />
            </div>
            <div className="text-4xl font-bold mb-2">{impactMetrics.productivityHoursSaved} hrs/week</div>
            <div className="text-green-100 font-semibold mb-1">Productivity Hours Saved</div>
            <div className="text-xs text-green-200">Quantifies ROI through time savings</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-12 w-12 opacity-80" />
            </div>
            <div className="text-4xl font-bold mb-2">{impactMetrics.skillApplicationRate}%</div>
            <div className="text-purple-100 font-semibold mb-1">Skill Application Rate</div>
            <div className="text-xs text-purple-200">Applied new skills within 2 weeks</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <ThumbsUp className="h-12 w-12 opacity-80" />
            </div>
            <div className="text-4xl font-bold mb-2">{impactMetrics.satisfactionRate}%</div>
            <div className="text-yellow-100 font-semibold mb-1">Satisfaction Rate</div>
            <div className="text-xs text-yellow-200">Training quality and engagement</div>
          </div>
        </div>

        {/* ROI Summary Panel */}
        <ROISummaryPanel roiData={roiData} assessmentStats={assessmentStats} />

        {/* Middle Row: Enrollment Chart & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Course Enrollment Over Time */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-nextec-purple mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Course Enrollment Over Time
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Past 3 months (actual) & Future 3 months (projected)
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="enrollments" name="Enrollments">
                  {enrollmentOverTime.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isPast ? '#3b82f6' : '#a78bfa'}
                      opacity={entry.isPast ? 1 : 0.6}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-nextec-purple to-nextec-blue text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 ${
                        rec.priority === 'high'
                          ? 'bg-red-400'
                          : rec.priority === 'medium'
                          ? 'bg-yellow-400'
                          : 'bg-green-400'
                      }`}
                    ></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{rec.title}</h4>
                      <p className="text-xs text-gray-200">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-nextec-gold hover:bg-yellow-500 text-nextec-purple font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              COD Impact Overview Report
            </button>
          </div>
        </div>

        {/* Department Leaderboard & Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DepartmentLeaderboard rankings={departmentRankings} />
          <TopPerformersCard topPerformers={topPerformers} />
        </div>
          </div>
        ) : (
          /* Engagement & Participants Tab */
          <div>
        {/* Scheduled Classes Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-nextec-purple mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Scheduled Classes Timeline (Past 3 Months & Next 3 Months)
          </h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {scheduledClasses.slice(0, 15).map((classItem) => (
                <div
                  key={classItem.id}
                  className={`flex-shrink-0 w-48 rounded-lg p-4 border-l-4 ${
                    classItem.isPast
                      ? 'bg-gray-50 border-gray-400'
                      : 'bg-blue-50 border-nextec-blue'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        classItem.isPast
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-blue-200 text-blue-800'
                      }`}
                    >
                      {classItem.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-800 mb-1">{classItem.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {new Date(classItem.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    {classItem.participants} participants
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Activity Heatmap & Schedule Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EngagementHeatmap heatmapData={heatmapData} />
          <AdminCalendar />
        </div>

        {/* Assessment Details Table */}
        {assessmentStats.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-nextec-purple flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Participant Assessment Details
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Real Users: {assessmentStats.filter(s => !s.isDummyUser).length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">
                    Sample Data: {assessmentStats.filter(s => s.isDummyUser).length}
                  </span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Participant</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Pre-Score</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Post-Score</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Improvement</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentStats.slice(0, 10).map((stat, index) => (
                    <tr key={stat.userId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {!stat.isDummyUser && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" title="Real User"></div>
                          )}
                          <div>
                            <div className="font-medium text-gray-800">{stat.userName}</div>
                            <div className="text-xs text-gray-500">{stat.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700 capitalize">
                        {stat.workArea.replace('-', ' ')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                          {stat.preScore.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {stat.postScore ? (
                          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                            {stat.postScore.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-gray-400">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {stat.improvement ? (
                          <span
                            className={`inline-block px-3 py-1 rounded-full font-bold ${
                              parseFloat(stat.improvement) > 0
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {parseFloat(stat.improvement) > 0 ? '+' : ''}
                            {stat.improvement}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {stat.hasPostAssessment ? (
                          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Complete
                          </span>
                        ) : (
                          <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            In Progress
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {assessmentStats.length > 10 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  Showing 10 of {assessmentStats.length} participants
                  ({assessmentStats.filter(s => !s.isDummyUser).length} real, {assessmentStats.filter(s => s.isDummyUser).length} sample)
                </div>
              )}
            </div>
          </div>
        )}
          </div>
        )}
        {/* End Tab Content */}
      </div>
    </div>
  );
};

export default AdminDashboard;
