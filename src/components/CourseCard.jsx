import { Star, Clock, TrendingUp } from 'lucide-react';

const CourseCard = ({ course, onClick, onRegister }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-nextec-gold text-nextec-gold" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-nextec-gold text-nextec-gold opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden group"
    >
      {/* Course Header */}
      <div className="bg-gradient-to-br from-nextec-purple to-nextec-blue p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-nextec-gold opacity-20 rounded-full -ml-12 -mb-12"></div>

        <div className="relative">
          <span className="inline-block bg-nextec-gold text-nextec-purple px-3 py-1 rounded-full text-xs font-bold mb-3">
            {course.category}
          </span>
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-nextec-gold transition-colors">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Course Body */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(course.rating)}
            <span className="ml-2 text-sm font-semibold text-gray-700">
              {course.rating}
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center text-gray-600 text-sm">
            <TrendingUp className="h-4 w-4 mr-1 text-nextec-blue" />
            <span>{course.level}</span>
          </div>
          <div className="text-sm text-gray-500">
            by {course.instructor}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex-1 bg-nextec-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRegister(course);
            }}
            className="flex-1 bg-nextec-gold hover:bg-yellow-500 text-nextec-purple font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
