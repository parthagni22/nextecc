import { Star, TrendingUp, Award } from 'lucide-react';
import { formatDepartmentName } from '../utils/leaderboardCalculator';

const TopPerformersCard = ({ topPerformers }) => {
  return (
    <div className="bg-gradient-to-br from-nextec-purple to-nextec-blue text-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <Star className="h-5 w-5 mr-2" />
        Top Performers
      </h3>
      <p className="text-sm text-gray-200 mb-6">
        Participants with highest improvement
      </p>

      {topPerformers.length === 0 ? (
        <div className="text-center py-8 text-gray-300">
          <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No completed assessments yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topPerformers.map((performer, index) => (
            <div
              key={performer.userId}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all"
            >
              <div className="flex items-center justify-between">
                {/* Left: Rank and Name */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{performer.userName}</h4>
                    <p className="text-xs text-gray-300 capitalize">
                      {formatDepartmentName(performer.department)}
                    </p>
                  </div>
                </div>

                {/* Right: Scores */}
                <div className="flex items-center space-x-4">
                  {/* Pre → Post */}
                  <div className="text-right">
                    <div className="text-xs text-gray-300 mb-1">Pre → Post</div>
                    <div className="text-sm font-bold">
                      <span className="text-blue-300">{performer.preScore}</span>
                      {' → '}
                      <span className="text-green-300">{performer.postScore}</span>
                    </div>
                  </div>

                  {/* Improvement Badge */}
                  <div className="bg-white rounded-lg px-3 py-2 min-w-[80px] text-center">
                    <div className="text-xs text-gray-500 mb-1">Gain</div>
                    <div className="text-lg font-bold text-green-600 flex items-center justify-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{performer.improvement}
                    </div>
                    <div className="text-xs text-green-600 font-semibold">
                      (+{performer.improvementPercentage}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {topPerformers.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white border-opacity-20">
          <p className="text-xs text-gray-300">
            Improvement calculated as confidence gain (post-assessment minus pre-assessment score)
          </p>
        </div>
      )}
    </div>
  );
};

export default TopPerformersCard;
