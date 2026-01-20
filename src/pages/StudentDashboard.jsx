import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import CourseModal from '../components/CourseModal';
import PreAssessmentForm from '../components/PreAssessmentForm';
import PostAssessmentForm from '../components/PostAssessmentForm';
import Calendar from '../components/Calendar';
import SkillsRadarChart from '../components/SkillsRadarChart';
import AchievementsPanel from '../components/AchievementsPanel';
import { courses } from '../data/coursesData';
import { BookOpen, Award } from 'lucide-react';

const StudentDashboard = () => {
  const { user, enrollCourse, submitPreAssessment, submitPostAssessment, getAssessment, hasCompletedPreAssessment } = useAuth();

  // Get M365 Workforce assessment data for radar chart
  const m365Assessment = getAssessment('m365-workforce');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPreAssessment, setShowPreAssessment] = useState(false);
  const [showPostAssessment, setShowPostAssessment] = useState(false);
  const [assessmentCourse, setAssessmentCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'dashboard'

  const handleEnroll = (courseId) => {
    enrollCourse(courseId);
    setSelectedCourse(null);
  };

  const handleTakePreAssessment = (course) => {
    setAssessmentCourse(course);
    setShowPreAssessment(true);
    setSelectedCourse(null);
  };

  const handleTakePostAssessment = (course) => {
    setAssessmentCourse(course);
    setShowPostAssessment(true);
    setSelectedCourse(null);
  };

  const handlePreAssessmentSubmit = (data) => {
    submitPreAssessment(assessmentCourse.id, data);
    setShowPreAssessment(false);
    setAssessmentCourse(null);

    // Show success message
    alert('Pre-assessment submitted successfully! You are now enrolled in the course.');
  };

  const handlePostAssessmentSubmit = (data) => {
    submitPostAssessment(assessmentCourse.id, data);
    setShowPostAssessment(false);
    setAssessmentCourse(null);

    // Show success message
    alert('Post-assessment submitted successfully! Thank you for your feedback.');
  };

  const handleRegister = (course) => {
    // For Microsoft 365 Workforce Enablement course, trigger pre-assessment
    if (course.id === 'm365-workforce') {
      handleTakePreAssessment(course);
    } else {
      // For all other courses, enroll directly
      enrollCourse(course.id);
    }
  };

  // Get upcoming classes for enrolled courses (only if pre-assessment is completed for courses that require it)
  const upcomingClasses = useMemo(() => {
    if (!user?.enrolledCourses || user.enrolledCourses.length === 0) {
      return [];
    }

    const classes = [];
    user.enrolledCourses.forEach((courseId) => {
      const course = courses.find((c) => c.id === courseId);

      // Only show classes if:
      // 1. Course doesn't require assessment OR
      // 2. Course requires assessment AND pre-assessment is completed
      if (course && course.upcomingClasses) {
        const canShowClasses = !course.requiresAssessment || hasCompletedPreAssessment(courseId);

        if (canShowClasses) {
          course.upcomingClasses.forEach((classItem) => {
            classes.push({
              ...classItem,
              courseTitle: course.title
            });
          });
        }
      }
    });

    // Sort by date
    classes.sort((a, b) => new Date(a.date) - new Date(b.date));
    return classes;
  }, [user?.enrolledCourses, hasCompletedPreAssessment]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-nextec-purple via-nextec-blue to-nextec-purple text-white py-12">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl text-gray-200">
            Continue your learning journey with our Microsoft certification courses
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
              <div className="flex items-center">
                <BookOpen className="h-12 w-12 text-nextec-gold mr-4" />
                <div>
                  <div className="text-3xl font-bold">
                    {user?.enrolledCourses?.length || 0}
                  </div>
                  <div className="text-gray-200">Enrolled Courses</div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
              <div className="flex items-center">
                <Award className="h-12 w-12 text-nextec-gold mr-4" />
                <div>
                  <div className="text-3xl font-bold">
                    {upcomingClasses.length}
                  </div>
                  <div className="text-gray-200">Upcoming Classes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('courses')}
                className={`${
                  activeTab === 'courses'
                    ? 'border-nextec-purple text-nextec-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Available Courses
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`${
                  activeTab === 'dashboard'
                    ? 'border-nextec-purple text-nextec-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center`}
              >
                <Award className="h-5 w-5 mr-2" />
                My Dashboard
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'courses' ? (
          /* Available Courses Tab */
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-nextec-purple mb-2">
                Available Courses
              </h2>
              <p className="text-gray-600 mb-8">
                Browse our comprehensive catalog of Microsoft certification courses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => setSelectedCourse(course)}
                  onRegister={handleRegister}
                />
              ))}
            </div>

            {/* Empty State for No Enrollments */}
            {(!user?.enrolledCourses || user.enrolledCourses.length === 0) && (
              <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                <BookOpen className="h-16 w-16 text-nextec-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-nextec-purple mb-2">
                  Start Your Learning Journey
                </h3>
                <p className="text-gray-600 mb-4">
                  You haven't enrolled in any courses yet. Click on a course card above to view details and enroll!
                </p>
              </div>
            )}
          </div>
        ) : (
          /* My Dashboard Tab */
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-nextec-purple mb-2">
                My Dashboard
              </h2>
              <p className="text-gray-600 mb-8">
                Track your progress and achievements
              </p>
            </div>

            {/* Skills Radar Chart */}
            {m365Assessment && <SkillsRadarChart assessment={m365Assessment} />}

            {/* Achievements Panel */}
            {m365Assessment && (
              <AchievementsPanel
                user={user}
                assessment={m365Assessment}
                course={courses.find(c => c.id === 'm365-workforce')}
              />
            )}

            {/* Upcoming Classes Calendar */}
            {upcomingClasses.length > 0 && (
              <div className="mb-12">
                <Calendar upcomingClasses={upcomingClasses} />
              </div>
            )}

            {/* Empty State */}
            {!m365Assessment && upcomingClasses.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No Progress Data Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Enroll in a course and complete assessments to see your dashboard
                </p>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="bg-nextec-purple hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Course Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={handleEnroll}
          onTakePreAssessment={handleTakePreAssessment}
          onTakePostAssessment={handleTakePostAssessment}
        />
      )}

      {/* Pre-Assessment Form */}
      {showPreAssessment && assessmentCourse && (
        <PreAssessmentForm
          course={assessmentCourse}
          onClose={() => {
            setShowPreAssessment(false);
            setAssessmentCourse(null);
          }}
          onSubmit={handlePreAssessmentSubmit}
        />
      )}

      {/* Post-Assessment Form */}
      {showPostAssessment && assessmentCourse && (
        <PostAssessmentForm
          course={assessmentCourse}
          preAssessment={getAssessment(assessmentCourse.id)?.preAssessment}
          onClose={() => {
            setShowPostAssessment(false);
            setAssessmentCourse(null);
          }}
          onSubmit={handlePostAssessmentSubmit}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
