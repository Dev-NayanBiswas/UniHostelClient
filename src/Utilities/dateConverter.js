function dateConverter(timeStamp){
    const date = new Date(timeStamp);
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', options)
    return formattedDate;
  }
export default dateConverter;