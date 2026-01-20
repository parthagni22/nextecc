import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

const PreAssessmentForm = ({ course, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Participant Profile
    primaryWorkArea: '',
    jobProfile: '',
    collaborationFrequency: '',

    // Tool Confidence (1-5 scale)
    teamsConfidence: 3,
    oneDriveConfidence: 3,
    sharePointConfidence: 3,
    excelConfidence: 3,
    outlookConfidence: 3,
    powerPointConfidence: 3,
    powerAutomateConfidence: 1,

    // Skill Gap Hotspots (checkboxes)
    fileVersionControl: false,
    sourceOfTruth: false,
    teamCollaboration: false,
    permissionManagement: false,
    excelReporting: false,
    accessibility: false,

    // Expectations
    topExpectation: '',
    deliveryPreference: '',
    sessionTime: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRangeChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const calculateScore = () => {
    // Calculate average confidence
    const confidenceScores = [
      formData.teamsConfidence,
      formData.oneDriveConfidence,
      formData.sharePointConfidence,
      formData.excelConfidence,
      formData.outlookConfidence,
      formData.powerPointConfidence,
      formData.powerAutomateConfidence
    ];
    const avgConfidence = confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length;

    // Count skill gaps (more gaps = lower readiness)
    const skillGaps = [
      formData.fileVersionControl,
      formData.sourceOfTruth,
      formData.teamCollaboration,
      formData.permissionManagement,
      formData.excelReporting,
      formData.accessibility
    ].filter(Boolean).length;

    // Calculate overall score (1-5 scale)
    // High confidence + fewer gaps = higher score
    const gapPenalty = skillGaps * 0.15;
    const overallScore = Math.max(1, Math.min(5, avgConfidence - gapPenalty));

    return {
      avgConfidence: avgConfidence.toFixed(2),
      skillGapsCount: skillGaps,
      overallScore: overallScore.toFixed(2)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const scores = calculateScore();
    const assessmentData = {
      ...formData,
      ...scores,
      submittedAt: new Date().toISOString(),
      courseId: course.id
    };
    onSubmit(assessmentData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-nextec-purple via-nextec-blue to-nextec-purple text-white p-8 relative sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-3xl font-bold mb-2">Pre-Assessment Form</h2>
          <p className="text-gray-200">{course.title}</p>
          <p className="text-sm text-gray-300 mt-2">
            This assessment helps us understand your current skill level and training needs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Section 1: Participant Profile */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-nextec-purple mb-6">
              1. Participant & Department Profile
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Work Area *
                </label>
                <select
                  name="primaryWorkArea"
                  value={formData.primaryWorkArea}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextec-gold focus:border-transparent outline-none"
                >
                  <option value="">Select your work area</option>
                  <option value="administrative">Administrative Services</option>
                  <option value="student">Student Services</option>
                  <option value="faculty">Faculty / Academic Divisions</option>
                  <option value="it">IT / Technology Services</option>
                  <option value="hr">HR / Finance / Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Profile *
                </label>
                <select
                  name="jobProfile"
                  value={formData.jobProfile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextec-gold focus:border-transparent outline-none"
                >
                  <option value="">Select your job profile</option>
                  <option value="coordinator">Coordinator / Specialist</option>
                  <option value="manager">Manager / Supervisor</option>
                  <option value="director">Director / Senior Admin</option>
                  <option value="faculty">Faculty</option>
                  <option value="analyst">IT / Analyst</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cross-Department Collaboration Frequency *
                </label>
                <select
                  name="collaborationFrequency"
                  value={formData.collaborationFrequency}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextec-gold focus:border-transparent outline-none"
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="rarely">Rarely</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Baseline Skill & Confidence */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-nextec-purple mb-4">
              2. Baseline Skill & Confidence
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Rate your current confidence level with each tool (1 = No experience, 5 = Expert)
            </p>

            <div className="space-y-6">
              {[
                { name: 'teamsConfidence', label: 'Microsoft Teams', key: 'teamsConfidence' },
                { name: 'oneDriveConfidence', label: 'OneDrive', key: 'oneDriveConfidence' },
                { name: 'sharePointConfidence', label: 'SharePoint', key: 'sharePointConfidence' },
                { name: 'excelConfidence', label: 'Excel', key: 'excelConfidence' },
                { name: 'outlookConfidence', label: 'Outlook', key: 'outlookConfidence' },
                { name: 'powerPointConfidence', label: 'PowerPoint', key: 'powerPointConfidence' },
                { name: 'powerAutomateConfidence', label: 'Power Automate / Power BI', key: 'powerAutomateConfidence' }
              ].map((tool) => (
                <div key={tool.key}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {tool.label}
                    </label>
                    <span className="bg-nextec-gold text-nextec-purple px-3 py-1 rounded-full text-sm font-bold">
                      {formData[tool.key]} / 5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData[tool.key]}
                    onChange={(e) => handleRangeChange(tool.key, e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nextec-gold"
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

          {/* Section 3: Skill Gap Hotspots */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-nextec-purple mb-4">
              3. Common Challenges
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Select the areas where you face difficulties (check all that apply)
            </p>

            <div className="space-y-3">
              {[
                { name: 'fileVersionControl', label: 'File version control and shared editing' },
                { name: 'sourceOfTruth', label: 'Locating the "source of truth" document' },
                { name: 'teamCollaboration', label: 'Team collaboration norms (channels, meetings, chat etiquette)' },
                { name: 'permissionManagement', label: 'Permission management (OneDrive vs SharePoint)' },
                { name: 'excelReporting', label: 'Excel reporting consistency and accuracy' },
                { name: 'accessibility', label: 'Accessibility-compliant documents/presentations' }
              ].map((challenge) => (
                <label key={challenge.name} className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name={challenge.name}
                    checked={formData[challenge.name]}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-nextec-gold focus:ring-nextec-gold border-gray-300 rounded"
                  />
                  <span className="text-gray-700 group-hover:text-nextec-purple transition-colors">
                    {challenge.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 4: Expectations & Preferences */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-nextec-purple mb-6">
              4. Training Expectations & Preferences
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What do you expect most from this training? *
                </label>
                <select
                  name="topExpectation"
                  value={formData.topExpectation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextec-gold focus:border-transparent outline-none"
                >
                  <option value="">Select your top expectation</option>
                  <option value="reduce-search-time">Reduce time spent searching for files / duplicate versions</option>
                  <option value="collaboration">Increase cross-department collaboration efficiency</option>
                  <option value="accuracy">Improve accuracy of reports (Excel)</option>
                  <option value="standardize">Standardize workflows and templates</option>
                  <option value="confidence">Build confidence and self-sufficiency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Delivery Mode *
                </label>
                <select
                  name="deliveryPreference"
                  value={formData.deliveryPreference}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextec-gold focus:border-transparent outline-none"
                >
                  <option value="">Select delivery mode</option>
                  <option value="in-person">In-person</option>
                  <option value="virtual">Virtual (VILT)</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Session Time *
                </label>
                <select
                  name="sessionTime"
                  value={formData.sessionTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nextec-gold focus:border-transparent outline-none"
                >
                  <option value="">Select preferred time</option>
                  <option value="morning">Morning (8-12)</option>
                  <option value="midday">Midday (10-2)</option>
                  <option value="afternoon">Afternoon (1-5)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-8 py-3 bg-nextec-gold hover:bg-yellow-500 text-nextec-purple font-bold rounded-lg transition-colors"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Submit Pre-Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreAssessmentForm;
