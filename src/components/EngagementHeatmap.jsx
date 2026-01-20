import { useState } from 'react';
import { Activity, Calendar } from 'lucide-react';
import { getHeatmapColorClass, formatDateForTooltip, getMonthLabels } from '../utils/heatmapCalculator';

const EngagementHeatmap = ({ heatmapData }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const { calendarData, summary } = heatmapData;
  const monthLabels = getMonthLabels(calendarData);

  // Day labels (Sun-Sat)
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-nextec-purple flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Engagement Activity Heatmap
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Assessment submissions over the last 6 months
          </p>
        </div>

        {/* Summary Stats */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-nextec-purple">{summary.totalActivity}</div>
            <div className="text-xs text-gray-500">Total Submissions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{summary.activeDays}</div>
            <div className="text-xs text-gray-500">Active Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{summary.avgActivityPerDay}</div>
            <div className="text-xs text-gray-500">Avg per Day</div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="relative overflow-x-auto">
        {/* Month Labels */}
        <div className="flex mb-2 pl-12">
          {monthLabels.map((label, index) => (
            <div
              key={index}
              className="text-xs font-semibold text-gray-600"
              style={{ marginLeft: index === 0 ? 0 : `${(label.weekIndex - (monthLabels[index - 1]?.weekIndex || 0)) * 16}px` }}
            >
              {label.label}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Day Labels */}
          <div className="flex flex-col justify-around pr-2 text-xs text-gray-500">
            {dayLabels.map((day, index) => (
              <div key={index} className="h-4 flex items-center">
                {day}
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="flex gap-1">
            {calendarData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="relative"
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    <div
                      className={`w-4 h-4 rounded border cursor-pointer transition-all hover:ring-2 hover:ring-nextec-blue ${
                        day.isInRange
                          ? getHeatmapColorClass(day.level)
                          : 'bg-gray-50 border-gray-100'
                      }`}
                    />

                    {/* Tooltip */}
                    {hoveredDay && hoveredDay.dateStr === day.dateStr && (
                      <div className="absolute z-10 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl pointer-events-none"
                        style={{
                          left: '50%',
                          top: '-80px',
                          transform: 'translateX(-50%)',
                          minWidth: '200px'
                        }}
                      >
                        <div className="font-bold mb-2">{formatDateForTooltip(day.date)}</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Pre-Assessments:</span>
                            <span className="font-bold text-blue-300">{day.preAssessments}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Post-Assessments:</span>
                            <span className="font-bold text-green-300">{day.postAssessments}</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-700 pt-1 mt-1">
                            <span>Total Activity:</span>
                            <span className="font-bold">{day.activity}</span>
                          </div>
                        </div>
                        {/* Arrow */}
                        <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-4 h-4 rounded border ${getHeatmapColorClass(level)}`}
            />
          ))}
          <span>More</span>
        </div>

        <div className="text-xs text-gray-500">
          <Calendar className="h-3 w-3 inline mr-1" />
          Hover over cells for details
        </div>
      </div>
    </div>
  );
};

export default EngagementHeatmap;
