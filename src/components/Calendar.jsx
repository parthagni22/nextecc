import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const Calendar = ({ upcomingClasses }) => {
  if (!upcomingClasses || upcomingClasses.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <CalendarIcon className="h-6 w-6 text-nextec-gold mr-3" />
        <h2 className="text-2xl font-bold text-nextec-purple">
          Upcoming Classes
        </h2>
      </div>

      <div className="space-y-4">
        {upcomingClasses.map((classItem, index) => (
          <div
            key={index}
            className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-nextec-gold hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 mr-4">
              <div className="bg-nextec-purple text-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">
                  {new Date(classItem.date).getDate()}
                </div>
                <div className="text-xs uppercase">
                  {new Date(classItem.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-nextec-purple mb-1">
                {classItem.topic}
              </h3>
              <div className="text-sm text-gray-600 mb-1">
                {formatDate(classItem.date)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1 text-nextec-blue" />
                <span>{classItem.time}</span>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-nextec-gold bg-opacity-20 text-nextec-purple text-xs font-semibold px-3 py-1 rounded-full">
                  {classItem.courseTitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
