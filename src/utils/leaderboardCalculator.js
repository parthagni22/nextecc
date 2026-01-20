// Calculate department rankings based on assessment data

export const calculateDepartmentRankings = () => {
  const assessmentsData = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');
  const users = JSON.parse(localStorage.getItem('nextec_users') || '[]');

  // Aggregate data by department
  const departmentData = {};

  Object.keys(assessmentsData).forEach((userId) => {
    const userAssessments = assessmentsData[userId];
    if (userAssessments['m365-workforce']) {
      const assessment = userAssessments['m365-workforce'];
      const user = users.find((u) => u.id === userId);

      if (user && assessment.preAssessment) {
        const department = assessment.preAssessment.primaryWorkArea;

        if (!departmentData[department]) {
          departmentData[department] = {
            department,
            participantCount: 0,
            totalPreScore: 0,
            totalPostScore: 0,
            totalImprovement: 0,
            completedCount: 0,
            participants: []
          };
        }

        const preScore = parseFloat(assessment.preAssessment.overallScore);
        departmentData[department].participantCount++;
        departmentData[department].totalPreScore += preScore;
        departmentData[department].participants.push({
          userId,
          userName: user.name,
          preScore
        });

        if (assessment.postAssessment) {
          const postScore = parseFloat(assessment.postAssessment.overallScore);
          const improvement = postScore - preScore;
          departmentData[department].totalPostScore += postScore;
          departmentData[department].totalImprovement += improvement;
          departmentData[department].completedCount++;
        }
      }
    }
  });

  // Calculate averages and completion rates
  const rankings = Object.values(departmentData).map((dept) => {
    const avgPreScore = dept.totalPreScore / dept.participantCount;
    const avgPostScore = dept.completedCount > 0
      ? dept.totalPostScore / dept.completedCount
      : null;
    const avgImprovement = dept.completedCount > 0
      ? dept.totalImprovement / dept.completedCount
      : null;
    const avgImprovementPercentage = avgImprovement && avgPreScore > 0
      ? (avgImprovement / avgPreScore) * 100
      : 0;
    const completionRate = (dept.completedCount / dept.participantCount) * 100;

    return {
      department: dept.department,
      participantCount: dept.participantCount,
      completedCount: dept.completedCount,
      avgPreScore: avgPreScore.toFixed(2),
      avgPostScore: avgPostScore ? avgPostScore.toFixed(2) : null,
      avgImprovement: avgImprovement ? avgImprovement.toFixed(2) : null,
      avgImprovementPercentage: avgImprovementPercentage.toFixed(1),
      completionRate: completionRate.toFixed(1),
      isLowSampleSize: dept.participantCount < 3
    };
  });

  // Sort by improvement percentage (descending)
  rankings.sort((a, b) => parseFloat(b.avgImprovementPercentage) - parseFloat(a.avgImprovementPercentage));

  return rankings;
};

// Get top individual performers across all departments
export const getTopPerformers = (limit = 5) => {
  const assessmentsData = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');
  const users = JSON.parse(localStorage.getItem('nextec_users') || '[]');

  const performers = [];

  Object.keys(assessmentsData).forEach((userId) => {
    const userAssessments = assessmentsData[userId];
    if (userAssessments['m365-workforce']) {
      const assessment = userAssessments['m365-workforce'];
      const user = users.find((u) => u.id === userId);

      if (user && assessment.preAssessment && assessment.postAssessment) {
        const preScore = parseFloat(assessment.preAssessment.overallScore);
        const postScore = parseFloat(assessment.postAssessment.overallScore);
        const improvement = postScore - preScore;
        const improvementPercentage = preScore > 0 ? (improvement / preScore) * 100 : 0;

        performers.push({
          userId,
          userName: user.name,
          department: assessment.preAssessment.primaryWorkArea,
          preScore: preScore.toFixed(2),
          postScore: postScore.toFixed(2),
          improvement: improvement.toFixed(2),
          improvementPercentage: improvementPercentage.toFixed(1)
        });
      }
    }
  });

  // Sort by improvement (descending)
  performers.sort((a, b) => parseFloat(b.improvement) - parseFloat(a.improvement));

  return performers.slice(0, limit);
};

// Format department name for display
export const formatDepartmentName = (department) => {
  const names = {
    'administrative': 'Administrative Services',
    'it': 'IT / Technology Services',
    'faculty': 'Faculty / Academic Divisions',
    'student': 'Student Services'
  };
  return names[department] || department.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
};
