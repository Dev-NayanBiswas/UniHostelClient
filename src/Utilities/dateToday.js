function dateToday(date) {
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  }
  
  const currentDate = new Date();
export default dateToday(currentDate)