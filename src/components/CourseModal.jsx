import { X, Download, BookOpen, Clock, TrendingUp, DollarSign, CheckCircle, FileText, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { generateCoursePDF } from '../utils/pdfGenerator';

const CourseModal = ({ course, onClose, onEnroll, onTakePreAssessment, onTakePostAssessment }) => {
  const { user, hasCompletedPreAssessment, hasCompletedPostAssessment } = useAuth();
  const isEnrolled = user?.enrolledCourses?.includes(course.id);
  const hasPreAssessment = hasCompletedPreAssessment(course.id);
  const hasPostAssessment = hasCompletedPostAssessment(course.id);

  const handleDownloadPDF = () => {
    generateCoursePDF(course);
  };

  const handleEnroll = () => {
    if (course.requiresAssessment && !hasPreAssessment) {
      onTakePreAssessment(course);
    } else {
      onEnroll(course.id);
    }
  };

  const handlePreAssessment = () => {
    onTakePreAssessment(course);
  };

  const handlePostAssessment = () => {
    onTakePostAssessment(course);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-nextec-purple via-nextec-blue to-nextec-purple text-white p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-4">
            <span className="inline-block bg-nextec-gold text-nextec-purple px-4 py-1 rounded-full text-sm font-bold">
              {course.category}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h2>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="font-bold">${course.price}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-nextec-purple mb-4">
              About This Course
            </h3>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Curriculum */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-nextec-purple mb-4 flex items-center">
              <BookOpen className="h-6 w-6 mr-2" />
              Course Curriculum
            </h3>

            <div className="space-y-4">
              {course.curriculum.map((module, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200"
                >
                  <h4 className="text-lg font-bold text-nextec-blue mb-3">
                    {module.module}
                  </h4>
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-nextec-gold mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Requirement Notice */}
          {course.requiresAssessment && !hasPreAssessment && !isEnrolled && (
            <div className="mb-6 bg-blue-50 border-l-4 border-nextec-blue rounded-lg p-6">
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-nextec-blue mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-nextec-purple mb-2">Pre-Assessment Required</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    This course requires you to complete a pre-assessment before enrolling. The assessment helps us:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Understand your current skill level</li>
                    <li>• Identify your training needs</li>
                    <li>• Personalize your learning experience</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    Takes approximately 5-7 minutes to complete
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {/* Top Row - Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 flex items-center justify-center bg-nextec-blue hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Curriculum
              </button>

              {course.requiresAssessment ? (
                <>
                  {!hasPreAssessment ? (
                    <button
                      onClick={handlePreAssessment}
                      className="flex-1 flex items-center justify-center bg-nextec-gold hover:bg-yellow-500 text-nextec-purple font-bold py-4 px-6 rounded-lg transition-colors"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Take Pre-Assessment
                    </button>
                  ) : isEnrolled && !hasPostAssessment ? (
                    <button
                      onClick={handlePostAssessment}
                      className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                    >
                      <Award className="h-5 w-5 mr-2" />
                      Take Post-Assessment
                    </button>
                  ) : hasPostAssessment ? (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center bg-gray-400 text-white font-bold py-4 px-6 rounded-lg cursor-not-allowed"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      All Assessments Completed
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center bg-green-500 text-white font-bold py-4 px-6 rounded-lg cursor-not-allowed"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Enrolled - Pre-Assessment Done
                    </button>
                  )}
                </>
              ) : (
                <>
                  {isEnrolled ? (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center bg-green-500 text-white font-bold py-4 px-6 rounded-lg cursor-not-allowed"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Already Enrolled
                    </button>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      className="flex-1 flex items-center justify-center bg-nextec-gold hover:bg-yellow-500 text-nextec-purple font-bold py-4 px-6 rounded-lg transition-colors"
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      Enroll Now
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Bottom Row - Demo Post-Assessment Preview Button (Always Visible) */}
            {course.requiresAssessment && (
              <div className="border-t border-gray-200 pt-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Demo Feature:</strong> Preview the post-assessment form (fields will be disabled until course completion)
                  </p>
                </div>
                <button
                  onClick={handlePostAssessment}
                  className="w-full flex items-center justify-center bg-purple-100 hover:bg-purple-200 text-nextec-purple font-bold py-3 px-6 rounded-lg transition-colors border-2 border-purple-300"
                >
                  <Award className="h-5 w-5 mr-2" />
                  Preview Post-Assessment Form (Demo)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
