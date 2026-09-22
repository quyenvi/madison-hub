// OCR Pink weekly sessions, shared by Madison Basketball and Madison Hub.
(function (root) {
  'use strict';
  const startDate = '2026-09-22';
  const timeZone = 'America/Los_Angeles';
  const series = [
    {
      id: 'ocr-pink-tuesday-practice',
      weekdays: [2],
      type: 'Practice',
      title: 'Practice',
      time: '7:30–9:00 PM',
      startTime: '19:30',
      endTime: '21:00',
      venue: 'Zion Church · Anaheim, CA',
      note: 'Every Tuesday',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Zion%20Church%2C%20Anaheim%2C%20CA'
    },
    {
      id: 'ocr-pink-basketball-academy',
      weekdays: [1, 5],
      type: 'Academy',
      title: 'Basketball Academy',
      time: '7:45–9:15 PM',
      startTime: '19:45',
      endTime: '21:15',
      venue: 'Covenant Church · Orange, CA',
      note: 'Every Monday and Friday',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Covenant%20Church%2C%20Orange%2C%20CA'
    }
  ];
  function eventsBetween(from, through) {
    const events = [];
    // Iterate calendar dates in UTC; the session times always remain Pacific wall time.
    const day = new Date((from < startDate ? startDate : from) + 'T12:00:00Z');
    const end = new Date(through + 'T12:00:00Z');
    while (day <= end) {
      const date = day.toISOString().slice(0, 10);
      for (const item of series) {
        if (!item.weekdays.includes(day.getUTCDay())) continue;
        const { id, weekdays, ...details } = item;
        events.push({
          ...details,
          id: id + '-' + date,
          recurrenceId: id,
          date,
          endDate: date,
          team: 'ocr',
          timeZone
        });
      }
      day.setUTCDate(day.getUTCDate() + 1);
    }
    return events;
  }
  root.OCR_WEEKLY_SCHEDULE = { startDate, timeZone, series, eventsBetween };
})(window);
