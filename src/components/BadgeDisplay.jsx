import { Lock, Calendar } from 'lucide-react';
import { getBadgeColorClass, getBadgeBorderClass, getBadgeCardClass } from '../utils/badgeSystem';

const BadgeDisplay = ({ badge }) => {
  const { name, description, icon, color, earned, earnedAt, metadata } = badge;

  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all ${
        earned ? 'hover:shadow-md' : 'opacity-60'
      } ${getBadgeCardClass(color, earned)}`}
    >
      {/* Badge Icon */}
      <div className="flex justify-center mb-3">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
            earned ? getBadgeColorClass(color) : 'bg-gray-300'
          } ${earned ? '' : 'grayscale'}`}
        >
          {earned ? icon : '🔒'}
        </div>
      </div>

      {/* Badge Name */}
      <h4 className={`font-bold text-center mb-2 ${earned ? 'text-gray-800' : 'text-gray-500'}`}>
        {name}
      </h4>

      {/* Badge Description */}
      <p className={`text-xs text-center mb-3 ${earned ? 'text-gray-600' : 'text-gray-400'}`}>
        {description}
      </p>

      {/* Earned Status */}
      {earned ? (
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            Earned {new Date(earnedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          {metadata && (
            <div className="text-xs text-center text-gray-600 mt-1 font-semibold">
              {metadata.improvementPercentage && `${metadata.improvementPercentage}% improvement`}
              {metadata.finalScore && `Final Score: ${metadata.finalScore}`}
            </div>
          )}
        </div>
      ) : (
        <div className="pt-3 border-t border-gray-300">
          <div className="flex items-center justify-center text-xs text-gray-400">
            <Lock className="h-3 w-3 mr-1" />
            Locked
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
