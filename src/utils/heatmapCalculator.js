// Generate activity heatmap data for the last 6 months

export const generateActivityHeatmap = (monthsBack = 6) => {
  const assessmentsData = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');

  // Calculate date range (last 6 months)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - monthsBack);

  // Initialize activity map (date -> count)
  const activityMap = {};

  // Process all assessments
  Object.keys(assessmentsData).forEach((userId) => {
    const userAssessments = assessmentsData[userId];
    if (userAssessments['m365-workforce']) {
      const assessment = userAssessments['m365-workforce'];

      // Track pre-assessment submission
      if (assessment.preAssessment?.submittedAt) {
        const date = new Date(assessment.preAssessment.submittedAt).toISOString().split('T')[0];
        if (!activityMap[date]) {
          activityMap[date] = { preAssessments: 0, postAssessments: 0, total: 0 };
        }
        activityMap[date].preAssessments++;
        activityMap[date].total++;
      }

      // Track post-assessment submission
      if (assessment.postAssessment?.submittedAt) {
        const date = new Date(assessment.postAssessment.submittedAt).toISOString().split('T')[0];
        if (!activityMap[date]) {
          activityMap[date] = { preAssessments: 0, postAssessments: 0, total: 0 };
        }
        activityMap[date].postAssessments++;
        activityMap[date].total++;
      }
    }
  });

  // Generate calendar grid (weeks × days)
  const calendarData = [];
  let currentDate = new Date(startDate);

  // Start from the first Sunday before or on startDate
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  while (currentDate <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const isInRange = currentDate >= startDate && currentDate <= endDate;
      const activity = activityMap[dateStr] || { preAssessments: 0, postAssessments: 0, total: 0 };

      week.push({
        date: new Date(currentDate),
        dateStr,
        dayOfWeek: i,
        isInRange,
        activity: activity.total,
        preAssessments: activity.preAssessments,
        postAssessments: activity.postAssessments,
        level: getActivityLevel(activity.total)
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    calendarData.push(week);
  }

  // Calculate summary statistics
  const totalActivity = Object.values(activityMap).reduce((sum, day) => sum + day.total, 0);
  const activeDays = Object.keys(activityMap).length;
  const avgActivityPerDay = activeDays > 0 ? (totalActivity / activeDays).toFixed(1) : 0;
  const maxActivity = Math.max(...Object.values(activityMap).map(d => d.total), 0);

  return {
    calendarData,
    summary: {
      totalActivity,
      activeDays,
      avgActivityPerDay,
      maxActivity,
      dateRange: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0]
      }
    }
  };
};

// Determine activity level (0-4) for color intensity
const getActivityLevel = (count) => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
};

// Get color class based on activity level
export const getHeatmapColorClass = (level) => {
  const colors = [
    'bg-gray-100 border-gray-200', // 0 - no activity
    'bg-blue-200 border-blue-300', // 1 - light
    'bg-blue-400 border-blue-500', // 2 - moderate
    'bg-blue-600 border-blue-700', // 3 - high
    'bg-blue-800 border-blue-900'  // 4 - very high
  ];
  return colors[level] || colors[0];
};

// Format date for tooltip
export const formatDateForTooltip = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get month labels for display
export const getMonthLabels = (calendarData) => {
  const labels = [];
  let currentMonth = null;

  calendarData.forEach((week, weekIndex) => {
    const firstDay = week[0].date;
    const month = firstDay.getMonth();

    if (month !== currentMonth) {
      currentMonth = month;
      labels.push({
        weekIndex,
        label: firstDay.toLocaleDateString('en-US', { month: 'short' })
      });
    }
  });

  return labels;
};
