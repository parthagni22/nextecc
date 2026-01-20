import { Trophy, Medal, Award, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { formatDepartmentName } from '../utils/leaderboardCalculator';

const DepartmentLeaderboard = ({ rankings }) => {
  // Get medal component based on rank
  const getMedalIcon = (rank) => {
    if (rank === 0) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 1) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 2) return <Award className="h-6 w-6 text-orange-600" />;
    return <div className="h-6 w-6 flex items-center justify-center text-gray-400 font-bold">{rank + 1}</div>;
  };

  // Get gradient class based on rank
  const getRankGradient = (rank) => {
    if (rank === 0) return 'from-yellow-50 to-yellow-100 border-yellow-300';
    if (rank === 1) return 'from-gray-50 to-gray-100 border-gray-300';
    if (rank === 2) return 'from-orange-50 to-orange-100 border-orange-300';
    return 'from-white to-gray-50 border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-nextec-purple mb-4 flex items-center">
        <Trophy className="h-5 w-5 mr-2" />
        Department Leaderboard
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Rankings based on average improvement percentage
      </p>

      {rankings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p>No department data available yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rankings.map((dept, index) => (
            <div
              key={dept.department}
              className={`bg-gradient-to-r border-2 rounded-lg p-4 transition-all hover:shadow-md ${getRankGradient(index)}`}
            >
              <div className="flex items-center justify-between">
                {/* Left: Rank and Department */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-shrink-0">
                    {getMedalIcon(index)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 flex items-center">
                      {formatDepartmentName(dept.department)}
                      {dept.isLowSampleSize && (
                        <span className="ml-2 text-yellow-600 text-xs">*</span>
                      )}
                    </h4>
                    <div className="flex items-center text-xs text-gray-600 space-x-3 mt-1">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {dept.participantCount} participants
                      </span>
                      <span>
                        {dept.completionRate}% completion
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Metrics */}
                <div className="flex items-center space-x-6">
                  {/* Pre Score */}
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Pre</div>
                    <div className="text-sm font-bold text-blue-700">
                      {dept.avgPreScore}
                    </div>
                  </div>

                  {/* Post Score */}
                  {dept.avgPostScore ? (
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Post</div>
                      <div className="text-sm font-bold text-green-700">
                        {dept.avgPostScore}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Post</div>
                      <div className="text-sm text-gray-400">-</div>
                    </div>
                  )}

                  {/* Improvement */}
                  {dept.avgImprovement ? (
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Gain</div>
                      <div className="text-sm font-bold text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{dept.avgImprovement}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Gain</div>
                      <div className="text-sm text-gray-400">-</div>
                    </div>
                  )}

                  {/* Improvement Percentage - Main Ranking Metric */}
                  <div className="text-center bg-white rounded-lg px-3 py-2 border-2 border-nextec-gold">
                    <div className="text-xs text-gray-500 mb-1">Improvement</div>
                    <div className={`text-lg font-bold ${
                      parseFloat(dept.avgImprovementPercentage) >= 40
                        ? 'text-green-600'
                        : parseFloat(dept.avgImprovementPercentage) >= 30
                        ? 'text-lime-600'
                        : parseFloat(dept.avgImprovementPercentage) >= 20
                        ? 'text-yellow-600'
                        : 'text-orange-600'
                    }`}>
                      +{dept.avgImprovementPercentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {rankings.some(d => d.isLowSampleSize) && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <span className="font-bold">* Note:</span> Departments with fewer than 3 participants may not represent
            statistically significant trends.
          </p>
        </div>
      )}
    </div>
  );
};

export default DepartmentLeaderboard;
