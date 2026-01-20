import { useState } from 'react';
import { Award, Download, ChevronDown, ChevronUp } from 'lucide-react';
import BadgeDisplay from './BadgeDisplay';
import { getBadgeProgress } from '../utils/badgeSystem';
import { generateCourseCertificate } from '../utils/certificateGenerator';

const AchievementsPanel = ({ user, assessment, course }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!assessment) {
    return null;
  }

  const badgeProgress = getBadgeProgress(assessment);
  const canGenerateCertificate = assessment.postAssessment !== null;

  const handleDownloadCertificate = () => {
    generateCourseCertificate(user, course, assessment);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Award className="h-6 w-6 text-nextec-gold mr-3" />
          <div>
            <h3 className="text-lg font-bold text-nextec-purple">
              My Achievements
            </h3>
            <p className="text-sm text-gray-600">
              {badgeProgress.earnedCount} of {badgeProgress.totalCount} badges earned
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {canGenerateCertificate && (
            <button
              onClick={handleDownloadCertificate}
              className="bg-nextec-gold hover:bg-yellow-500 text-nextec-purple font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-nextec-purple transition-colors"
          >
            {isCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Badge Progress</span>
              <span className="font-bold">
                {badgeProgress.earnedCount} / {badgeProgress.totalCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-nextec-purple to-nextec-gold h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(badgeProgress.earnedCount / badgeProgress.totalCount) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {badgeProgress.badges.map((badge) => (
              <BadgeDisplay key={badge.id} badge={badge} />
            ))}
          </div>

          {/* Certificate Section */}
          {canGenerateCertificate && (
            <div className="mt-6 p-4 bg-gradient-to-r from-nextec-purple to-nextec-blue text-white rounded-lg">
              <div className="flex items-start">
                <Award className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Congratulations!</h4>
                  <p className="text-sm text-gray-200 mb-3">
                    You've completed the course and earned your certificate. Download it now to
                    showcase your achievement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!canGenerateCertificate && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <Award className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-700 mb-1">Certificate Locked</h4>
                  <p className="text-sm text-gray-600">
                    Complete the post-assessment to unlock your course completion certificate.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AchievementsPanel;
