import React, { createContext, useState, useContext, useEffect } from 'react';
import { getBadgeProgress as calculateBadgeProgress } from '../utils/badgeSystem';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('nextec_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('nextec_users') || '[]');

    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user with unique ID
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      role: userData.role || 'participant',
      enrolledCourses: [],
      createdAt: new Date().toISOString()
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('nextec_users', JSON.stringify(users));

    return newUser;
  };

  const login = (email, password, role) => {
    // Admin check
    if (role === 'admin') {
      if (email === 'admin@nextec.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin',
          name: 'Admin',
          email: 'admin@nextec.com',
          role: 'admin',
          enrolledCourses: []
        };
        setUser(adminUser);
        localStorage.setItem('nextec_user', JSON.stringify(adminUser));
        return adminUser;
      } else {
        throw new Error('Invalid admin credentials');
      }
    }

    // Participant check
    const users = JSON.parse(localStorage.getItem('nextec_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Don't expose password
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('nextec_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nextec_user');
  };

  const enrollCourse = (courseId) => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem('nextec_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
      if (!users[userIndex].enrolledCourses.includes(courseId)) {
        users[userIndex].enrolledCourses.push(courseId);
        localStorage.setItem('nextec_users', JSON.stringify(users));

        const updatedUser = { ...user, enrolledCourses: users[userIndex].enrolledCourses };
        setUser(updatedUser);
        localStorage.setItem('nextec_user', JSON.stringify(updatedUser));
      }
    }
  };

  const submitPreAssessment = (courseId, assessmentData) => {
    if (!user) return;

    // Store assessment data
    const assessments = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');
    const userAssessments = assessments[user.id] || {};

    userAssessments[courseId] = {
      preAssessment: assessmentData,
      postAssessment: null
    };

    assessments[user.id] = userAssessments;
    localStorage.setItem('nextec_assessments', JSON.stringify(assessments));

    // Auto-enroll user in the course after pre-assessment
    enrollCourse(courseId);

    return assessmentData;
  };

  const submitPostAssessment = (courseId, assessmentData) => {
    if (!user) return;

    // Store post-assessment data
    const assessments = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');
    const userAssessments = assessments[user.id] || {};

    if (userAssessments[courseId]) {
      userAssessments[courseId].postAssessment = assessmentData;
    } else {
      userAssessments[courseId] = {
        preAssessment: null,
        postAssessment: assessmentData
      };
    }

    assessments[user.id] = userAssessments;
    localStorage.setItem('nextec_assessments', JSON.stringify(assessments));

    return assessmentData;
  };

  const getAssessment = (courseId) => {
    if (!user) return null;

    const assessments = JSON.parse(localStorage.getItem('nextec_assessments') || '{}');
    const userAssessments = assessments[user.id] || {};

    return userAssessments[courseId] || null;
  };

  const hasCompletedPreAssessment = (courseId) => {
    const assessment = getAssessment(courseId);
    return assessment && assessment.preAssessment !== null;
  };

  const hasCompletedPostAssessment = (courseId) => {
    const assessment = getAssessment(courseId);
    return assessment && assessment.postAssessment !== null;
  };

  const getBadgeProgress = (courseId) => {
    const assessment = getAssessment(courseId);
    return calculateBadgeProgress(assessment);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    enrollCourse,
    submitPreAssessment,
    submitPostAssessment,
    getAssessment,
    hasCompletedPreAssessment,
    hasCompletedPostAssessment,
    getBadgeProgress
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
