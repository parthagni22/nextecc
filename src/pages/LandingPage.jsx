import { Link } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-nextec-purple via-nextec-blue to-nextec-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          {/* Partnership Logos */}
          {/* <div className="flex items-center justify-center gap-8 mb-12">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <img
                src="/nextec-logo.png"
                alt="Nextec Inc"
                className="h-16 w-auto"
              />
            </div>
            <div className="text-2xl font-bold text-white">×</div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <img
                src="/dupage-logo.png"
                alt="College of DuPage"
                className="h-16 w-auto"
              />
            </div>
          </div> */}

          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Learn. Grow. Thrive.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Nextec Inc × College of DuPage Partnership
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-300">
              Empowering DuPage faculty and staff with world-class Microsoft 365 training.
              Master cutting-edge productivity tools through our comprehensive workforce enablement program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-nextec-gold hover:bg-yellow-500 text-nextec-purple px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 backdrop-blur-sm border-2 border-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16 text-nextec-blue" />
              </div>
              <h3 className="text-4xl font-bold text-nextec-purple mb-2">500+</h3>
              <p className="text-gray-600 text-lg">Expert Faculty</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-16 w-16 text-nextec-gold" />
              </div>
              <h3 className="text-4xl font-bold text-nextec-purple mb-2">5,000+</h3>
              <p className="text-gray-600 text-lg">Course Titles</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <Award className="h-16 w-16 text-nextec-purple" />
              </div>
              <h3 className="text-4xl font-bold text-nextec-purple mb-2">500,000+</h3>
              <p className="text-gray-600 text-lg">Students Trained</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-nextec-purple mb-4">
              Why Choose Our Partnership?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nextec Inc partners with College of DuPage to deliver excellence in workforce enablement
              through innovative teaching methods and industry-recognized Microsoft certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-nextec-purple to-nextec-blue text-white rounded-xl p-8 shadow-lg">
              <GraduationCap className="h-12 w-12 mb-4 text-nextec-gold" />
              <h3 className="text-2xl font-bold mb-3">Industry-Leading Courses</h3>
              <p className="text-gray-200">
                Access comprehensive Microsoft certification programs designed by
                industry experts to advance your career.
              </p>
            </div>

            <div className="bg-gradient-to-br from-nextec-blue to-nextec-purple text-white rounded-xl p-8 shadow-lg">
              <Users className="h-12 w-12 mb-4 text-nextec-gold" />
              <h3 className="text-2xl font-bold mb-3">Expert Instructors</h3>
              <p className="text-gray-200">
                Learn from certified professionals with real-world experience in
                implementing enterprise solutions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-nextec-gold to-yellow-500 text-nextec-purple rounded-xl p-8 shadow-lg">
              <Award className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Recognized Certifications</h3>
              <p className="text-gray-800">
                Earn credentials that are valued by employers worldwide and boost
                your professional credibility.
              </p>
            </div>

            <div className="bg-gradient-to-br from-nextec-purple to-nextec-gold text-white rounded-xl p-8 shadow-lg">
              <BookOpen className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Flexible Learning</h3>
              <p className="text-gray-200">
                Study at your own pace with on-demand content and scheduled live
                sessions to fit your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-nextec-purple via-nextec-blue to-nextec-purple text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Join our community of learners and take the first step towards
            achieving your professional goals.
          </p>
          <Link
            to="/register"
            className="inline-block bg-nextec-gold hover:bg-yellow-500 text-nextec-purple px-10 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
