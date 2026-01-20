import { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Award, ChevronDown, ChevronUp } from 'lucide-react';

const SkillsRadarChart = ({ assessment }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!assessment || !assessment.preAssessment) {
    return null;
  }

  const { preAssessment, postAssessment } = assessment;

  // Transform assessment data into radar chart format
  const radarData = [
    {
      tool: 'Teams',
      'Pre-Training': preAssessment.teamsConfidence,
      'Post-Training': postAssessment?.teamsConfidence || null
    },
    {
      tool: 'OneDrive',
      'Pre-Training': preAssessment.oneDriveConfidence,
      'Post-Training': postAssessment?.oneDriveConfidence || null
    },
    {
      tool: 'SharePoint',
      'Pre-Training': preAssessment.sharePointConfidence,
      'Post-Training': postAssessment?.sharePointConfidence || null
    },
    {
      tool: 'Excel',
      'Pre-Training': preAssessment.excelConfidence,
      'Post-Training': postAssessment?.excelConfidence || null
    },
    {
      tool: 'Outlook',
      'Pre-Training': preAssessment.outlookConfidence,
      'Post-Training': postAssessment?.outlookConfidence || null
    },
    {
      tool: 'PowerPoint',
      'Pre-Training': preAssessment.powerPointConfidence,
      'Post-Training': postAssessment?.powerPointConfidence || null
    },
    {
      tool: 'Power Automate',
      'Pre-Training': preAssessment.powerAutomateConfidence,
      'Post-Training': postAssessment?.powerAutomateConfidence || null
    }
  ];

  // Calculate improvement metrics
  const avgPreConfidence = parseFloat(preAssessment.avgConfidence);
  const avgPostConfidence = postAssessment ? parseFloat(postAssessment.avgConfidence) : null;
  const avgGainPercentage = avgPostConfidence
    ? (((avgPostConfidence - avgPreConfidence) / avgPreConfidence) * 100).toFixed(1)
    : null;

  // Find biggest improvement
  const improvements = radarData
    .filter(item => item['Post-Training'] !== null)
    .map(item => ({
      tool: item.tool,
      gain: item['Post-Training'] - item['Pre-Training']
    }))
    .sort((a, b) => b.gain - a.gain);

  const biggestImprovement = improvements.length > 0 ? improvements[0] : null;

  // Determine readiness level
  const getReadinessLevel = (avgScore) => {
    if (avgScore >= 4.5) return { label: 'Expert', color: 'text-green-600', bg: 'bg-green-50' };
    if (avgScore >= 4.0) return { label: 'Advanced', color: 'text-lime-600', bg: 'bg-lime-50' };
    if (avgScore >= 3.0) return { label: 'Intermediate', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (avgScore >= 2.0) return { label: 'Beginner', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Novice', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const currentReadiness = avgPostConfidence
    ? getReadinessLevel(avgPostConfidence)
    : getReadinessLevel(avgPreConfidence);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-nextec-purple flex items-center">
            <Target className="h-5 w-5 mr-2" />
            My Skills Profile
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {postAssessment
              ? 'Pre and post-training confidence levels'
              : 'Baseline confidence levels'}
          </p>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-nextec-purple transition-colors"
        >
          {isCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Radar Chart */}
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis
                    dataKey="tool"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 5]}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                  />
                  <Radar
                    name="Pre-Training"
                    dataKey="Pre-Training"
                    stroke="#066aab"
                    fill="#066aab"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  {postAssessment && (
                    <Radar
                      name="Post-Training"
                      dataKey="Post-Training"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  )}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Improvement Metrics */}
            <div className="space-y-4">
              {/* Average Confidence */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">Avg Confidence</h4>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-blue-700">
                    {avgPostConfidence || avgPreConfidence}
                  </span>
                  <span className="text-sm text-blue-600">/ 5.0</span>
                </div>
                {avgGainPercentage && (
                  <div className="mt-2 flex items-center text-sm text-green-600 font-semibold">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{avgGainPercentage}% improvement
                  </div>
                )}
              </div>

              {/* Biggest Improvement */}
              {biggestImprovement && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-900">Top Improvement</h4>
                  </div>
                  <div className="text-lg font-bold text-green-700 mb-1">
                    {biggestImprovement.tool}
                  </div>
                  <div className="text-sm text-green-600">
                    +{biggestImprovement.gain.toFixed(1)} points gained
                  </div>
                </div>
              )}

              {/* Readiness Level */}
              <div className={`bg-gradient-to-br ${currentReadiness.bg} border-2 ${currentReadiness.color.replace('text', 'border')} rounded-lg p-4`}>
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 mr-2" />
                  <h4 className="font-semibold">Readiness Level</h4>
                </div>
                <div className={`text-2xl font-bold ${currentReadiness.color}`}>
                  {currentReadiness.label}
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  {postAssessment ? 'Post-training level' : 'Current baseline'}
                </div>
              </div>
            </div>
          </div>

          {/* Legend Explanation */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Confidence Scale</h4>
            <div className="grid grid-cols-5 gap-2 text-xs text-gray-600">
              <div><span className="font-semibold">1:</span> Novice</div>
              <div><span className="font-semibold">2:</span> Beginner</div>
              <div><span className="font-semibold">3:</span> Intermediate</div>
              <div><span className="font-semibold">4:</span> Advanced</div>
              <div><span className="font-semibold">5:</span> Expert</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsRadarChart;
