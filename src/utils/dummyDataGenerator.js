// Utility to generate realistic dummy data for admin dashboard analytics

export const generateDummyAnalyticsData = () => {
  const departments = ['administrative', 'it', 'faculty', 'student'];
  const departmentNames = {
    administrative: 'Administrative Services',
    it: 'IT / Technology Services',
    faculty: 'Faculty / Academic Divisions',
    student: 'Student Services'
  };

  // Generate Pre & Post Assessment Scores (for line chart)
  const assessmentScores = {
    teams: { pre: 2.8, post: 4.1 },
    excel: { pre: 2.5, post: 3.8 },
    oneDrive: { pre: 3.0, post: 4.2 },
    sharePoint: { pre: 2.3, post: 3.9 }
  };

  // Generate Departmental Improvement Data (for heatmap)
  const departmentalImprovement = [
    { department: 'Admin Staff', teams: 45, excel: 38, oneDrive: 50, sharePoint: 42 },
    { department: 'IT Department', teams: 35, excel: 48, oneDrive: 40, sharePoint: 52 },
    { department: 'Faculty', teams: 40, excel: 45, oneDrive: 43, sharePoint: 38 },
    { department: 'Student Services', teams: 48, excel: 35, oneDrive: 46, sharePoint: 40 }
  ];

  // Generate Training Impact Metrics
  const impactMetrics = {
    avgConfidenceGain: 31, // percentage
    productivityHoursSaved: 2.8, // hours per week
    skillApplicationRate: 88, // percentage
    satisfactionRate: 92 // percentage
  };

  // Generate Enrollment Over Time Data (past 3 months + future 3 months)
  const now = new Date();
  const enrollmentOverTime = [];

  for (let i = -3; i <= 3; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    if (i <= 0) {
      // Past data - actual enrollments
      enrollmentOverTime.push({
        month: monthName,
        enrollments: Math.floor(Math.random() * 40) + 30, // 30-70
        isPast: true
      });
    } else {
      // Future data - projected enrollments
      enrollmentOverTime.push({
        month: monthName,
        enrollments: Math.floor(Math.random() * 50) + 35, // 35-85
        isPast: false
      });
    }
  }

  // Generate Scheduled Classes Timeline (past 3 months + future 3 months)
  const scheduledClasses = [];
  const courseTypes = ['Microsoft Teams', 'Excel Basics', 'SharePoint', 'OneDrive', 'Power BI'];

  for (let i = -12; i <= 12; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + (i * 7)); // Weekly classes

    const randomCourse = courseTypes[Math.floor(Math.random() * courseTypes.length)];
    const isPast = i < 0;

    scheduledClasses.push({
      id: `class-${i}`,
      title: randomCourse,
      date: date.toISOString().split('T')[0],
      participants: Math.floor(Math.random() * 20) + 10,
      status: isPast ? 'completed' : 'scheduled',
      isPast
    });
  }

  // Generate Cohort Summary
  const cohortSummary = {
    cohort: 'Spring 2024',
    totalParticipants: 220,
    completionRate: 85,
    startDate: '2024-01-15',
    endDate: '2024-04-30'
  };

  // Generate Recommendations
  const recommendations = [
    {
      title: 'Advanced Teams & SharePoint',
      description: 'Build on foundational knowledge with workflow automation',
      priority: 'high'
    },
    {
      title: 'Excel Data Analysis Level 2',
      description: 'PivotTables, charts, and advanced formulas for reporting teams',
      priority: 'medium'
    },
    {
      title: 'Power Automate & Power BI',
      description: 'Optional track for power users in IT and Analytics',
      priority: 'medium'
    }
  ];

  return {
    assessmentScores,
    departmentalImprovement,
    impactMetrics,
    enrollmentOverTime,
    scheduledClasses,
    cohortSummary,
    recommendations
  };
};

// Generate realistic student assessment data for multiple participants
export const generateDummyStudentAssessments = (count = 30) => {
  const departments = ['administrative', 'it', 'faculty', 'student'];
  const jobProfiles = ['coordinator', 'manager', 'director', 'faculty', 'analyst'];
  const names = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'James Wilson',
    'Jennifer Martinez', 'David Garcia', 'Maria Rodriguez', 'Robert Anderson', 'Lisa Taylor',
    'William Thomas', 'Susan Moore', 'Joseph Jackson', 'Karen White', 'Charles Harris',
    'Nancy Martin', 'Daniel Thompson', 'Betty Garcia', 'Matthew Martinez', 'Sandra Robinson',
    'Christopher Clark', 'Dorothy Rodriguez', 'Mark Lewis', 'Ashley Lee', 'Donald Walker',
    'Melissa Hall', 'Paul Allen', 'Emily Young', 'Steven Hernandez', 'Michelle King'
  ];

  const students = [];

  for (let i = 0; i < count; i++) {
    const department = departments[Math.floor(Math.random() * departments.length)];
    const jobProfile = jobProfiles[Math.floor(Math.random() * jobProfiles.length)];
    const name = names[i] || `Student ${i + 1}`;
    const email = name.toLowerCase().replace(' ', '.') + '@cod.edu';

    // Generate random dates for assessments (last 6 months)
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Pre-assessment date (random date in last 6 months)
    const preAssessmentDate = new Date(
      sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime())
    );

    // Generate pre-assessment scores
    const preScores = {
      teamsConfidence: Math.floor(Math.random() * 2) + 2, // 2-4
      oneDriveConfidence: Math.floor(Math.random() * 2) + 2,
      sharePointConfidence: Math.floor(Math.random() * 2) + 1, // 1-3
      excelConfidence: Math.floor(Math.random() * 2) + 2,
      outlookConfidence: Math.floor(Math.random() * 2) + 3, // 3-5
      powerPointConfidence: Math.floor(Math.random() * 2) + 2,
      powerAutomateConfidence: Math.floor(Math.random() * 2) + 1
    };

    const avgPreConfidence = Object.values(preScores).reduce((a, b) => a + b, 0) / 7;

    // Generate post-assessment scores (higher than pre)
    const hasCompleted = Math.random() > 0.3; // 70% completion rate

    // Post-assessment date (1-3 months after pre-assessment)
    const postAssessmentDate = hasCompleted ? new Date(
      preAssessmentDate.getTime() + (Math.random() * 90 + 30) * 24 * 60 * 60 * 1000 // 30-120 days later
    ) : null;

    const postScores = hasCompleted ? {
      teamsConfidence: Math.min(5, preScores.teamsConfidence + Math.floor(Math.random() * 2) + 1),
      oneDriveConfidence: Math.min(5, preScores.oneDriveConfidence + Math.floor(Math.random() * 2) + 1),
      sharePointConfidence: Math.min(5, preScores.sharePointConfidence + Math.floor(Math.random() * 2) + 2),
      excelConfidence: Math.min(5, preScores.excelConfidence + Math.floor(Math.random() * 2) + 1),
      outlookConfidence: Math.min(5, preScores.outlookConfidence + Math.floor(Math.random() * 1)),
      powerPointConfidence: Math.min(5, preScores.powerPointConfidence + Math.floor(Math.random() * 2) + 1),
      powerAutomateConfidence: Math.min(5, preScores.powerAutomateConfidence + Math.floor(Math.random() * 2) + 2)
    } : null;

    const avgPostConfidence = postScores
      ? Object.values(postScores).reduce((a, b) => a + b, 0) / 7
      : null;

    students.push({
      id: `student-${i + 1}`,
      name,
      email,
      department,
      jobProfile,
      preAssessment: {
        ...preScores,
        avgConfidence: avgPreConfidence.toFixed(2),
        overallScore: avgPreConfidence.toFixed(2),
        primaryWorkArea: department,
        jobProfile,
        skillGapsCount: Math.floor(Math.random() * 4) + 1,
        submittedAt: preAssessmentDate.toISOString()
      },
      postAssessment: postScores ? {
        ...postScores,
        avgConfidence: avgPostConfidence.toFixed(2),
        overallScore: avgPostConfidence.toFixed(2),
        improvement: (avgPostConfidence - avgPreConfidence).toFixed(2),
        satisfactionScore: Math.floor(Math.random() * 10) + 91, // 91-100%
        submittedAt: postAssessmentDate.toISOString()
      } : null
    });
  }

  return students;
};

// Function to populate localStorage with dummy data
export const populateDummyData = () => {
  // Get existing users
  const existingUsers = JSON.parse(localStorage.getItem('nextec_users') || '[]');
  const existingAssessments = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');

  // Generate dummy students
  const dummyStudents = generateDummyStudentAssessments(30);

  // Add dummy users to localStorage if they don't exist
  dummyStudents.forEach((student) => {
    // Check if user already exists
    const userExists = existingUsers.find(u => u.email === student.email);

    if (!userExists) {
      // Add user
      existingUsers.push({
        id: student.id,
        name: student.name,
        email: student.email,
        password: 'password123', // Dummy password
        role: 'participant',
        enrolledCourses: ['m365-workforce'],
        createdAt: new Date().toISOString()
      });

      // Add assessment data
      existingAssessments[student.id] = {
        'm365-workforce': {
          preAssessment: student.preAssessment,
          postAssessment: student.postAssessment
        }
      };
    }
  });

  // Update localStorage
  localStorage.setItem('nextec_users', JSON.stringify(existingUsers));
  localStorage.setItem('nextec_assessments', JSON.stringify(existingAssessments));

  console.log('✅ Dummy data populated successfully!');
  console.log(`   - Added ${dummyStudents.length} students`);
  console.log(`   - All enrolled in Microsoft 365 Workforce Enablement`);
  console.log(`   - ${dummyStudents.filter(s => s.postAssessment).length} completed both assessments`);

  return {
    studentsAdded: dummyStudents.length,
    totalUsers: existingUsers.length
  };
};

// Calculate ROI metrics based on assessment data
export const calculateROIMetrics = () => {
  const users = JSON.parse(localStorage.getItem('nextec_users') || '[]');
  const assessmentsData = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');

  // Configurable constants
  const TRAINING_COST_PER_PARTICIPANT = 500; // $500 per participant
  const HOURLY_RATE = 35; // $35 per hour
  const WORK_WEEKS_PER_YEAR = 50; // 50 weeks per year

  // Count participants who completed assessments
  let totalParticipants = 0;
  let completedParticipants = 0;
  let totalTimeSavedPerWeek = 0;

  Object.keys(assessmentsData).forEach((userId) => {
    const userAssessments = assessmentsData[userId];
    if (userAssessments['m365-workforce']) {
      const assessment = userAssessments['m365-workforce'];
      if (assessment.preAssessment) {
        totalParticipants++;

        // Calculate time saved based on improvement
        // Assumption: Each point of confidence improvement = 0.5 hours saved per week
        if (assessment.postAssessment) {
          completedParticipants++;
          const preScore = parseFloat(assessment.preAssessment.overallScore);
          const postScore = parseFloat(assessment.postAssessment.overallScore);
          const improvement = postScore - preScore;
          const timeSavedPerWeek = improvement * 0.5; // 0.5 hours per confidence point
          totalTimeSavedPerWeek += timeSavedPerWeek;
        }
      }
    }
  });

  // Calculate metrics
  const totalInvestment = totalParticipants * TRAINING_COST_PER_PARTICIPANT;
  const annualTimeSaved = totalTimeSavedPerWeek * WORK_WEEKS_PER_YEAR;
  const annualCostSavings = annualTimeSaved * HOURLY_RATE;
  const roiPercentage = totalInvestment > 0
    ? ((annualCostSavings - totalInvestment) / totalInvestment) * 100
    : 0;
  const paybackPeriodMonths = annualCostSavings > 0
    ? (totalInvestment / (annualCostSavings / 12))
    : 0;

  return {
    totalParticipants,
    completedParticipants,
    totalInvestment,
    annualTimeSaved: Math.round(annualTimeSaved),
    annualCostSavings: Math.round(annualCostSavings),
    roiPercentage: Math.round(roiPercentage),
    paybackPeriodMonths: Math.round(paybackPeriodMonths * 10) / 10, // Round to 1 decimal
    avgTimeSavedPerWeek: totalParticipants > 0
      ? (totalTimeSavedPerWeek / totalParticipants).toFixed(1)
      : 0
  };
};
