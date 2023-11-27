function formatTime(timeobj) {
  const milliseconds =
    timeobj.seconds * 1000 + Math.floor(timeobj.nanoseconds / 1000000);
  const currentTime = new Date().getTime();
  const receivedTime = new Date(milliseconds).getTime();
  const timeDifference = currentTime - receivedTime;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneYear = 365 * oneDay;

  if (timeDifference < oneDay) {
    // Less than a day
    return "오늘";
  } else if (timeDifference < 2 * oneDay) {
    // Yesterday
    return "어제";
  } else if (timeDifference < oneYear) {
    // Within a year
    const formattedDate = new Date(milliseconds).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  } else {
    // More than a year
    const yearsAgo = Math.floor(timeDifference / oneYear);
    return `${yearsAgo} year${yearsAgo !== 1 ? "s" : ""} ago`;
  }
}

export default formatTime;
