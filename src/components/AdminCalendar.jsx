import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { courses } from '../data/coursesData';

const AdminCalendar = () => {
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const [hoveredDay, setHoveredDay] = useState(null);

  // Get date range: 2 months before current, current month, 3 months after
  const getMonthDates = () => {
    const today = new Date();
    const months = [];

    for (let i = -2; i <= 3; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      months.push(date);
    }

    return months;
  };

  const allMonths = getMonthDates();
  const currentMonth = allMonths[currentMonthOffset + 2]; // +2 because we start at -2

  // Extract all classes and tests from courses
  const getAllEvents = useMemo(() => {
    const events = [];

    courses.forEach(course => {
      if (course.upcomingClasses) {
        course.upcomingClasses.forEach((classItem, index) => {
          // Add class event
          events.push({
            date: classItem.date,
            type: 'class',
            title: classItem.topic,
            course: course.title,
            time: classItem.time
          });

          // Add test event 1 week after class (simulated)
          const testDate = new Date(classItem.date);
          testDate.setDate(testDate.getDate() + 7);
          events.push({
            date: testDate.toISOString().split('T')[0],
            type: 'test',
            title: `Assessment: ${classItem.topic}`,
            course: course.title,
            time: classItem.time
          });
        });
      }
    });

    return events;
  }, []);

  // Get events for a specific day
  const getEventsForDay = (dateStr) => {
    return getAllEvents.filter(event => event.date === dateStr);
  };

  // Generate calendar grid for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const events = getEventsForDay(dateStr);

      days.push({
        day,
        dateStr,
        events,
        hasClass: events.some(e => e.type === 'class'),
        hasTest: events.some(e => e.type === 'test')
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    if (currentMonthOffset > -2) {
      setCurrentMonthOffset(currentMonthOffset - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthOffset < 3) {
      setCurrentMonthOffset(currentMonthOffset + 1);
    }
  };

  const formatMonthYear = () => {
    return currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-nextec-purple flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Schedule Calendar
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Classes and assessments (6-month view)
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevMonth}
            disabled={currentMonthOffset <= -2}
            className={`p-2 rounded-lg transition-colors ${
              currentMonthOffset <= -2
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-nextec-blue hover:bg-blue-700 text-white'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="text-center min-w-[180px]">
            <div className="font-bold text-nextec-purple">{formatMonthYear()}</div>
          </div>

          <button
            onClick={handleNextMonth}
            disabled={currentMonthOffset >= 3}
            className={`p-2 rounded-lg transition-colors ${
              currentMonthOffset >= 3
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-nextec-blue hover:bg-blue-700 text-white'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Week Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center text-sm font-semibold text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 bg-white">
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className="relative border-r border-b border-gray-200 p-2 min-h-[80px] hover:bg-gray-50 transition-colors"
              onMouseEnter={() => dayData && setHoveredDay(dayData)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {dayData ? (
                <>
                  <div className="text-sm font-medium text-gray-700 mb-1">{dayData.day}</div>

                  {/* Event Indicators */}
                  <div className="flex flex-col gap-1">
                    {dayData.hasClass && (
                      <div className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded text-center">
                        Class
                      </div>
                    )}
                    {dayData.hasTest && (
                      <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded text-center">
                        Test
                      </div>
                    )}
                  </div>

                  {/* Tooltip */}
                  {hoveredDay && hoveredDay.dateStr === dayData.dateStr && dayData.events.length > 0 && (
                    <div
                      className="absolute z-50 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl pointer-events-none"
                      style={{
                        left: index % 7 > 3 ? 'auto' : '100%',
                        right: index % 7 > 3 ? '100%' : 'auto',
                        top: '0',
                        marginLeft: index % 7 > 3 ? '0' : '8px',
                        marginRight: index % 7 > 3 ? '8px' : '0',
                        minWidth: '250px',
                        maxWidth: '300px'
                      }}
                    >
                      <div className="font-bold mb-2">
                        {new Date(dayData.dateStr).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>

                      <div className="space-y-2">
                        {dayData.events.map((event, idx) => (
                          <div key={idx} className="border-t border-gray-700 pt-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                event.type === 'class' ? 'bg-blue-500' : 'bg-green-500'
                              }`}>
                                {event.type === 'class' ? 'Class' : 'Test'}
                              </span>
                              <span className="text-gray-300 text-xs">{event.time}</span>
                            </div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-gray-400 text-xs mt-1">{event.course}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-300">&nbsp;</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Scheduled Class</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Scheduled Test</span>
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;
