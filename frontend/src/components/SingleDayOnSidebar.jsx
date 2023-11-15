import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import calendar from "dayjs/plugin/calendar";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(calendar);
dayjs.extend(isBetween);

const dayCalc = (day_key) => {
  let sixDaysBefore = dayjs().subtract(7, "day");
  if (dayjs(day_key).isBetween(sixDaysBefore, dayjs()) || dayjs()) {
    let relativeDays = dayjs(day_key).calendar();
    if (relativeDays.startsWith("Last")) {
      relativeDays = relativeDays.split("Last ")[1];
      relativeDays = relativeDays.split(" at")[0];
      return relativeDays;
    } else {
      relativeDays = relativeDays.split(" at")[0];
      return relativeDays;
    }
  } else {
    return dayjs(day_key).format("MMM DD");
  }
};

const SingleDayOnSidebar = ({ day_key, day_key_value }) => {
  return (
    <Link to={`/eachdaytask/${day_key}`}>
      <div className="day_card border border-4 nav">
        <div className="day_card__head">
          <div className="day_card__title">{dayCalc(day_key)}</div>
          <div className="note-card__desc">{day_key_value} tasks done</div>
        </div>
        <div className="note-card__date"></div>
      </div>
    </Link>
  );
};

export { dayCalc };
export default SingleDayOnSidebar;
