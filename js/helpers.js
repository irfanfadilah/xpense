function listOfYears() {
  step = (new Date).getFullYear() - 2020;
  return Array.from({ length: step }, (v, i) => 2021 + i);
}

function listOfMonths() {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}

function current(name) {
  now = new Date;

  switch(name) {
    case "year":
      return now.getFullYear()
    case "month":
      return now.getMonth()
    case "date":
      return now.getDate()
    case "time":
      return now.getTime()
    default:
      return now
  }
}
