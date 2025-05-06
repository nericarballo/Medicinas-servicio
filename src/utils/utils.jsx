export const calculatePriority = (date) => {
  const today = new Date();
  const targetDate = new Date(date);
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(today.getMonth() + 3);

  if (targetDate <= today) {
    return 1;
  } else if (targetDate <= threeMonthsFromNow) {
    return 2;
  } else {
    return 3;
  }
};
