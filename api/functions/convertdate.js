function convertDateTime(datetime) {
  datetime = datetime.split(" ");
  date = datetime[0].split("/");
  time = datetime[1].split(":");
  mer = datetime[2];
  if (mer == "PM") {
    if (time[0] !== "12") {
      hh = parseInt(time[0]);
      hh += 12;
      time[0] = hh.toString();
    }
  } else {
    if (time[0] === "12") {
      time[0] = "00";
    }
  }
  sqlDate = "";
  sqlDate +=
    date[2] + "-" + date[0] + "-" + date[1] + " " + time[0] + ":" + time[1];
  return sqlDate;
}

module.exports = convertDateTime;
