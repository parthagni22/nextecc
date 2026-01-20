import { DollarSign, TrendingUp, Clock, Calendar, Download } from 'lucide-react';
import { generateROIReport } from '../utils/roiReportGenerator';

const ROISummaryPanel = ({ roiData, assessmentStats }) => {
  const handleDownloadReport = () => {
    generateROIReport(roiData, assessmentStats);
  };

  // Determine ROI color based on percentage
  const getRoiColor = (roi) => {
    if (roi >= 100) return 'text-green-600 bg-green-50 border-green-300';
    if (roi >= 50) return 'text-lime-600 bg-lime-50 border-lime-300';
    if (roi >= 0) return 'text-yellow-600 bg-yellow-50 border-yellow-300';
    return 'text-red-600 bg-red-50 border-red-300';
  };

  const roiColorClass = getRoiColor(roiData.roiPercentage);

  // return (
  //   <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
  //     <div className="flex items-center justify-between mb-6">
  //       <div>
  //         <h3 className="text-lg font-bold text-nextec-purple flex items-center">
  //           <DollarSign className="h-5 w-5 mr-2" />
  //           Training ROI Summary
  //         </h3>
  //         <p className="text-sm text-gray-600 mt-1">
  //           Financial impact analysis for {roiData.totalParticipants} participants
  //         </p>
  //       </div>
  //       <button
  //         onClick={handleDownloadReport}
  //         className="bg-nextec-gold hover:bg-yellow-500 text-nextec-purple font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
  //       >
  //         <Download className="h-4 w-4 mr-2" />
  //         Download ROI Report
  //       </button>
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  //       {/* Total Investment */}
  //       <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-4">
  //         <div className="flex items-center justify-between mb-2">
  //           <DollarSign className="h-8 w-8 text-red-600" />
  //         </div>
  //         <div className="text-2xl font-bold text-red-900 mb-1">
  //           ${roiData.totalInvestment.toLocaleString()}
  //         </div>
  //         <div className="text-sm font-semibold text-red-700">Total Investment</div>
  //         <div className="text-xs text-red-600 mt-1">
  //           ${roiData.totalInvestment / roiData.totalParticipants} per participant
  //         </div>
  //       </div>

  //       {/* Annual Time Saved */}
  //       <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4">
  //         <div className="flex items-center justify-between mb-2">
  //           <Clock className="h-8 w-8 text-blue-600" />
  //         </div>
  //         <div className="text-2xl font-bold text-blue-900 mb-1">
  //           {roiData.annualTimeSaved.toLocaleString()} hrs
  //         </div>
  //         <div className="text-sm font-semibold text-blue-700">Annual Time Saved</div>
  //         <div className="text-xs text-blue-600 mt-1">
  //           {roiData.avgTimeSavedPerWeek} hrs/week per person
  //         </div>
  //       </div>

  //       {/* Annual Cost Savings */}
  //       <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4">
  //         <div className="flex items-center justify-between mb-2">
  //           <TrendingUp className="h-8 w-8 text-green-600" />
  //         </div>
  //         <div className="text-2xl font-bold text-green-900 mb-1">
  //           ${roiData.annualCostSavings.toLocaleString()}
  //         </div>
  //         <div className="text-sm font-semibold text-green-700">Annual Cost Savings</div>
  //         <div className="text-xs text-green-600 mt-1">
  //           Based on $35/hr rate
  //         </div>
  //       </div>

  //       {/* ROI Percentage */}
  //       <div className={`bg-gradient-to-br border-2 rounded-lg p-4 ${roiColorClass}`}>
  //         <div className="flex items-center justify-between mb-2">
  //           <TrendingUp className="h-8 w-8" />
  //         </div>
  //         <div className="text-2xl font-bold mb-1">
  //           {roiData.roiPercentage > 0 ? '+' : ''}{roiData.roiPercentage}%
  //         </div>
  //         <div className="text-sm font-semibold">ROI Percentage</div>
  //         <div className="text-xs mt-1">
  //           {roiData.roiPercentage >= 100 && 'Excellent ROI!'}
  //           {roiData.roiPercentage >= 50 && roiData.roiPercentage < 100 && 'Strong ROI'}
  //           {roiData.roiPercentage >= 0 && roiData.roiPercentage < 50 && 'Positive ROI'}
  //           {roiData.roiPercentage < 0 && 'Break-even pending'}
  //         </div>
  //       </div>

  //       {/* Payback Period */}
  //       <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-4">
  //         <div className="flex items-center justify-between mb-2">
  //           <Calendar className="h-8 w-8 text-purple-600" />
  //         </div>
  //         <div className="text-2xl font-bold text-purple-900 mb-1">
  //           {roiData.paybackPeriodMonths} mo
  //         </div>
  //         <div className="text-sm font-semibold text-purple-700">Payback Period</div>
  //         <div className="text-xs text-purple-600 mt-1">
  //           {roiData.paybackPeriodMonths <= 12 ? 'Fast payback!' : 'Within 2 years'}
  //         </div>
  //       </div>
  //     </div>

  //     {/* Additional Context */}
  //     <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
  //       <h4 className="text-sm font-bold text-gray-700 mb-2">ROI Calculation Assumptions</h4>
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
  //         <div>
  //           <span className="font-semibold">Training Cost:</span> $500 per participant
  //         </div>
  //         <div>
  //           <span className="font-semibold">Hourly Rate:</span> $35/hour
  //         </div>
  //         <div>
  //           <span className="font-semibold">Time Savings:</span> 0.5 hrs/week per confidence point gained
  //         </div>
  //       </div>
  //       <p className="text-xs text-gray-500 mt-2">
  //         ROI calculated as: ((Annual Savings - Total Investment) / Total Investment) × 100
  //       </p>
  //     </div>
  //   </div>
  // );
};

export default ROISummaryPanel;
