// Badge system for tracking achievements (dashboard-only, no sharing feature)

// Define all available badges
export const BADGES = {
  KNOWLEDGE_SEEKER: {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Completed pre-assessment',
    icon: '🔍',
    color: 'blue'
  },
  ENROLLED_STUDENT: {
    id: 'enrolled_student',
    name: 'Enrolled Student',
    description: 'Successfully enrolled in a course',
    icon: '📚',
    color: 'purple'
  },
  COURSE_COMPLETER: {
    id: 'course_completer',
    name: 'Course Completer',
    description: 'Completed post-assessment',
    icon: '✅',
    color: 'green'
  },
  RAPID_LEARNER: {
    id: 'rapid_learner',
    name: 'Rapid Learner',
    description: 'Improved average confidence by more than 30%',
    icon: '⚡',
    color: 'yellow'
  },
  MASTER_ACHIEVER: {
    id: 'master_achiever',
    name: 'Master Achiever',
    description: 'Achieved post-assessment average score of 4.0 or higher',
    icon: '🏆',
    color: 'gold'
  }
};

// Calculate which badges a user has earned based on their assessment data
export const calculateEarnedBadges = (assessment) => {
  const earnedBadges = [];

  if (!assessment) {
    return earnedBadges;
  }

  const { preAssessment, postAssessment } = assessment;

  // Badge 1: Knowledge Seeker - Complete pre-assessment
  if (preAssessment) {
    earnedBadges.push({
      ...BADGES.KNOWLEDGE_SEEKER,
      earnedAt: preAssessment.submittedAt || new Date().toISOString()
    });
  }

  // Badge 2: Enrolled Student - Complete enrollment (implied by having pre-assessment)
  if (preAssessment) {
    earnedBadges.push({
      ...BADGES.ENROLLED_STUDENT,
      earnedAt: preAssessment.submittedAt || new Date().toISOString()
    });
  }

  // Badge 3: Course Completer - Complete post-assessment
  if (postAssessment) {
    earnedBadges.push({
      ...BADGES.COURSE_COMPLETER,
      earnedAt: postAssessment.submittedAt || new Date().toISOString()
    });
  }

  // Badge 4: Rapid Learner - Improve by >30%
  if (preAssessment && postAssessment) {
    const preScore = parseFloat(preAssessment.avgConfidence);
    const postScore = parseFloat(postAssessment.avgConfidence);
    const improvementPercentage = ((postScore - preScore) / preScore) * 100;

    if (improvementPercentage > 30) {
      earnedBadges.push({
        ...BADGES.RAPID_LEARNER,
        earnedAt: postAssessment.submittedAt || new Date().toISOString(),
        metadata: {
          improvementPercentage: improvementPercentage.toFixed(1)
        }
      });
    }
  }

  // Badge 5: Master Achiever - Post-assessment avg >= 4.0
  if (postAssessment) {
    const postScore = parseFloat(postAssessment.avgConfidence);
    if (postScore >= 4.0) {
      earnedBadges.push({
        ...BADGES.MASTER_ACHIEVER,
        earnedAt: postAssessment.submittedAt || new Date().toISOString(),
        metadata: {
          finalScore: postScore.toFixed(2)
        }
      });
    }
  }

  return earnedBadges;
};

// Get badge progress (which badges are earned, which are locked)
export const getBadgeProgress = (assessment) => {
  const earnedBadges = calculateEarnedBadges(assessment);
  const earnedIds = new Set(earnedBadges.map(b => b.id));

  const allBadges = Object.values(BADGES).map(badge => {
    const earned = earnedBadges.find(b => b.id === badge.id);
    return {
      ...badge,
      earned: !!earned,
      earnedAt: earned?.earnedAt || null,
      metadata: earned?.metadata || null
    };
  });

  return {
    earnedCount: earnedBadges.length,
    totalCount: allBadges.length,
    badges: allBadges
  };
};

// Get color class for badge based on color name
export const getBadgeColorClass = (color) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    gold: 'bg-yellow-600'
  };
  return colorClasses[color] || 'bg-gray-500';
};

// Get border color class for badge
export const getBadgeBorderClass = (color) => {
  const borderClasses = {
    blue: 'border-blue-300',
    purple: 'border-purple-300',
    green: 'border-green-300',
    yellow: 'border-yellow-300',
    gold: 'border-yellow-400'
  };
  return borderClasses[color] || 'border-gray-300';
};

// Get background color class for badge card
export const getBadgeCardClass = (color, earned) => {
  if (!earned) {
    return 'bg-gray-50 border-gray-200';
  }
  const cardClasses = {
    blue: 'bg-blue-50 border-blue-300',
    purple: 'bg-purple-50 border-purple-300',
    green: 'bg-green-50 border-green-300',
    yellow: 'bg-yellow-50 border-yellow-300',
    gold: 'bg-yellow-50 border-yellow-400'
  };
  return cardClasses[color] || 'bg-gray-50 border-gray-300';
};
