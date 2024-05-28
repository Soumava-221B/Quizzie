
function formatDate(inputDate) {
  const [day, month, year] = inputDate.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = months[parseInt(month, 10) - 1];
  const formattedDate = `${day} ${monthName},${year}`;

  return formattedDate;
}


export default formatDate;