import { useState } from 'react';
import { X, Lock, Info } from 'lucide-react';

const PostAssessmentForm = ({ course, onClose, preAssessment, isDemo = true }) => {
  const [formData, setFormData] = useState({
    // Learning Outcomes - Tool Confidence (POST - 1-5 scale)
    teamsConfidencePost: preAssessment?.teamsConfidence || 3,
    oneDriveConfidencePost: preAssessment?.oneDriveConfidence || 3,
    sharePointConfidencePost: preAssessment?.sharePointConfidence || 3,
    excelConfidencePost: preAssessment?.excelConfidence || 3,
    outlookConfidencePost: preAssessment?.outlookConfidence || 3,
    powerPointConfidencePost: preAssessment?.powerPointConfidence || 3,
    powerAutomateConfidencePost: preAssessment?.powerAutomateConfidence || 1,

    // Course Quality & Satisfaction (1-5 scale)
    instructorClarity: 4,
    handsOnUseful: 4,
    relevanceToWork: 4,
    paceAppropriate: 4,
    materialsQuality: 4,
    accessibility: 4,

    // Workplace Application
    applyImmediately: '',
    trainingAligned: '',
    alreadyApplied: '',

    // Productivity & Time Savings
    timeSavedPerWeek: '',

    // Open Feedback
    topStrengths: '',
    improvementAreas: '',
    additionalComments: ''
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="bg-yellow-100 border-b-4 border-yellow-400 px-8 py-4">
            <div className="flex items-center space-x-3">
              <Lock className="h-6 w-6 text-yellow-700" />
              <div>
                <h4 className="font-bold text-yellow-900">Demo Mode - Preview Only</h4>
                <p className="text-sm text-yellow-800">
                  This post-assessment form will be available after course completion. All fields are currently disabled for demonstration purposes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-nextec-purple via-nextec-blue to-nextec-purple text-white p-8 relative sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-3xl font-bold mb-2">Post-Assessment Report</h2>
          <p className="text-gray-200">{course.title}</p>
          <p className="text-sm text-gray-300 mt-2">
            Outcomes, Adoption, and Next-Step Recommendations
          </p>
        </div>

        <form className="p-8 space-y-8">
          {/* Section 1: Participant Information Summary */}
          <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 ${isDemo ? 'opacity-60' : ''}`}>
            <h3 className="text-2xl font-bold text-nextec-purple mb-6 flex items-center">
              <Info className="h-6 w-6 mr-2" />
              1. Participant Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cohort Name
                </label>
                <input
                  type="text"
                  disabled={isDemo}
                  placeholder="e.g., Spring 2026 – Wave 1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Mode
                </label>
                <select
                  disabled={isDemo}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                >
                  <option>Select delivery mode</option>
                  <option>In-person</option>
                  <option>Virtual (VILT)</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Training Dates
                </label>
                <input
                  type="text"
                  disabled={isDemo}
                  placeholder="From Date to End Date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  disabled={isDemo}
                  value={preAssessment?.primaryWorkArea || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Learning Outcomes - Tool Confidence (Pre vs Post) */}
          <div className={`bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 ${isDemo ? 'opacity-60' : ''}`}>
            <h3 className="text-2xl font-bold text-nextec-purple mb-4">
              2. Learning Outcomes (Pre vs Post Comparison)
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Rate your confidence level NOW after completing the training (1 = No experience, 5 = Expert)
            </p>

            <div className="space-y-6">
              {[
                {
                  name: 'teamsConfidencePost',
                  label: 'Microsoft Teams',
                  preValue: preAssessment?.teamsConfidence || 3
                },
                {
                  name: 'oneDriveConfidencePost',
                  label: 'OneDrive',
                  preValue: preAssessment?.oneDriveConfidence || 3
                },
                {
                  name: 'sharePointConfidencePost',
                  label: 'SharePoint',
                  preValue: preAssessment?.sharePointConfidence || 3
                },
                {
                  name: 'excelConfidencePost',
                  label: 'Excel',
                  preValue: preAssessment?.excelConfidence || 3
                },
                {
                  name: 'outlookConfidencePost',
                  label: 'Outlook',
                  preValue: preAssessment?.outlookConfidence || 3
                },
                {
                  name: 'powerPointConfidencePost',
                  label: 'PowerPoint',
                  preValue: preAssessment?.powerPointConfidence || 3
                },
                {
                  name: 'powerAutomateConfidencePost',
                  label: 'Power Automate / Power BI',
                  preValue: preAssessment?.powerAutomateConfidence || 1
                }
              ].map((tool) => (
                <div key={tool.name}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {tool.label}
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-gray-500">
                        Pre: <span className="font-bold text-gray-700">{tool.preValue}</span>
                      </span>
                      <span className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                        Post: {formData[tool.name]} / 5
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData[tool.name]}
                    disabled={isDemo}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-not-allowed opacity-50"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Course Quality & Satisfaction */}
          <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 ${isDemo ? 'opacity-60' : ''}`}>
            <h3 className="text-2xl font-bold text-nextec-purple mb-4">
              3. Course Quality & Participant Experience
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Rate the following aspects of the training (1 = Poor, 5 = Excellent)
            </p>

            <div className="space-y-6">
              {[
                { name: 'instructorClarity', label: 'Instructor clarity and engagement' },
                { name: 'handsOnUseful', label: 'Hands-on labs/exercises usefulness' },
                { name: 'relevanceToWork', label: 'Relevance to daily work' },
                { name: 'paceAppropriate', label: 'Pace / course length appropriateness' },
                { name: 'materialsQuality', label: 'Materials quality (job aids, references)' },
                { name: 'accessibility', label: 'Accessibility (ADA/WCAG alignment, captions, readability)' }
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {item.label}
                    </label>
                    <span className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                      {formData[item.name]} / 5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData[item.name]}
                    disabled={isDemo}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-not-allowed opacity-50"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Excellent</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Top Strengths (What worked well?)
                </label>
                <textarea
                  disabled={isDemo}
                  placeholder="Describe the strongest aspects of the training..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Areas for Improvement
                </label>
                <textarea
                  disabled={isDemo}
                  placeholder="What could be improved in future sessions?"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Workplace Application & Adoption */}
          <div className={`bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 ${isDemo ? 'opacity-60' : ''}`}>
            <h3 className="text-2xl font-bold text-nextec-purple mb-6">
              4. Adoption & Workplace Application
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Will you apply these skills immediately?
                </label>
                <select
                  disabled={isDemo}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                >
                  <option>Select your response</option>
                  <option>Strongly Agree</option>
                  <option>Agree</option>
                  <option>Neutral</option>
                  <option>Disagree</option>
                  <option>Strongly Disagree</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  The training aligned with my job duties
                </label>
                <select
                  disabled={isDemo}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                >
                  <option>Select your response</option>
                  <option>Strongly Agree</option>
                  <option>Agree</option>
                  <option>Neutral</option>
                  <option>Disagree</option>
                  <option>Strongly Disagree</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Have you already applied a new workflow? (within 2 weeks)
                </label>
                <select
                  disabled={isDemo}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                >
                  <option>Select your response</option>
                  <option>Yes, multiple workflows</option>
                  <option>Yes, one workflow</option>
                  <option>Not yet, but plan to</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 5: Productivity & Time Savings */}
          <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 ${isDemo ? 'opacity-60' : ''}`}>
            <h3 className="text-2xl font-bold text-nextec-purple mb-6">
              5. Productivity & Time-Savings (Self-Reported)
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How much time do you expect to save per week using these new skills?
                </label>
                <select
                  disabled={isDemo}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                >
                  <option>Select time saved</option>
                  <option>&lt; 1 hour</option>
                  <option>1–3 hours</option>
                  <option>3–5 hours</option>
                  <option>5+ hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How will these skills improve your productivity? (Select all that apply)
                </label>
                <div className="space-y-3 bg-white p-4 rounded-lg">
                  {[
                    'Faster file retrieval and reduced duplicate versions',
                    'Clearer collaboration norms in Teams',
                    'Improved report accuracy and reduced rework (Excel)',
                    'Better permission management',
                    'Streamlined communication workflows',
                    'Enhanced document accessibility'
                  ].map((option, index) => (
                    <label key={index} className="flex items-start space-x-3 cursor-not-allowed opacity-50">
                      <input
                        type="checkbox"
                        disabled={isDemo}
                        className="mt-1 h-5 w-5 text-gray-400 border-gray-300 rounded cursor-not-allowed"
                      />
                      <span className="text-gray-500">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Additional Feedback */}
          <div className={`bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 ${isDemo ? 'opacity-60' : ''}`}>
            <h3 className="text-2xl font-bold text-nextec-purple mb-6">
              6. Additional Comments & Recommendations
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What topics would you like to explore next?
                </label>
                <textarea
                  disabled={isDemo}
                  placeholder="Suggest topics for future training modules..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Any other comments or feedback?
                </label>
                <textarea
                  disabled={isDemo}
                  placeholder="Share any additional thoughts about the training experience..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              {isDemo ? 'Close Preview' : 'Cancel'}
            </button>
            {isDemo ? (
              <button
                type="button"
                disabled
                className="flex items-center px-8 py-3 bg-gray-300 text-gray-500 font-bold rounded-lg cursor-not-allowed"
              >
                <Lock className="h-5 w-5 mr-2" />
                Submit Post-Assessment (Locked)
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-8 py-3 bg-nextec-gold hover:bg-yellow-500 text-nextec-purple font-bold rounded-lg transition-colors"
              >
                Submit Post-Assessment
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAssessmentForm;
