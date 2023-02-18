const getMonthStr = (monthNumber: number) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonthStr = monthNames[monthNumber];
  return currentMonthStr ? currentMonthStr : '';
};
export default getMonthStr;
