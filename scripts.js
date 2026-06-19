const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = today.getDate(); // Set ONCE to today

function renderCalendar(month, year) {
  const calendarGrid = document.getElementById('calendar-grid');
  const monthTitle = document.getElementById('month-title');
  const currentMonthYear = document.getElementById('current-month-year');
  calendarGrid.innerHTML = "";

  // Show month and year
  monthTitle.textContent = `${monthNames[month]} ${year}`;
  currentMonthYear.textContent = `${monthNames[month]} ${year}`;

  // Days of the week
  for (let d = 0; d < 7; d++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day-name';
    dayDiv.textContent = dayNames[d];
    calendarGrid.appendChild(dayDiv);
  }

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();
  // Last date of the previous month
  const prevLastDate = new Date(year, month, 0).getDate();
  // Last date of the current month
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Previous month's dates
  for (let i = firstDay - 1; i >= 0; i--) {
    const prevDiv = document.createElement('div');
    prevDiv.className = 'date-cell prev-date';
    const prevDate = prevLastDate - i;
    const dayOfWeek = (7 + (i - firstDay + 1)) % 7;
    if (dayOfWeek === 0) prevDiv.classList.add('sunday');
    prevDiv.innerHTML = `<span>${prevDate}</span>`;
    calendarGrid.appendChild(prevDiv);
  }

  // Current month's dates
  for (let date = 1; date <= lastDate; date++) {
    const dateDiv = document.createElement('div');
    dateDiv.className = 'date-cell';
    const dayOfWeek = (firstDay + date - 1) % 7;
    if (dayOfWeek === 0) dateDiv.classList.add('sunday');
    if (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dateDiv.classList.add('today');
    }
    // Highlight selected date
    if (date === selectedDate && month === currentMonth && year === currentYear) {
      dateDiv.classList.add('selected');
    }
    dateDiv.innerHTML = `<span>${date}</span>`;
    dateDiv.onclick = () => {
      selectedDate = date;
      currentMonth = month;
      currentYear = year;
      renderCalendar(currentMonth, currentYear);
    };
    calendarGrid.appendChild(dateDiv);
  }

  // Next month's dates to fill the grid
  const totalCells = firstDay + lastDate;
  const nextDays = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= nextDays; i++) {
    const nextDiv = document.createElement('div');
    nextDiv.className = 'date-cell next-date';
    const dayOfWeek = (firstDay + lastDate + i - 1) % 7;
    if (dayOfWeek === 0) nextDiv.classList.add('sunday');
    nextDiv.innerHTML = `<span>${i}</span>`;
    calendarGrid.appendChild(nextDiv);
  }
}

// Navigation
document.getElementById('prev-month').onclick = () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
};
document.getElementById('next-month').onclick = () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
};
document.getElementById('prev-year').onclick = () => {
  currentYear--;
  renderCalendar(currentMonth, currentYear);
};
document.getElementById('next-year').onclick = () => {
  currentYear++;
  renderCalendar(currentMonth, currentYear);
};

// Initial render
renderCalendar(currentMonth, currentYear);

window.onload = function() {
  // your code here
};