import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

const dayCalc = (day_key) => {
  let relativeDays = dayjs(day_key);
  // console.log(day_key, relativeDays);
  // console.log(moment("10-30-2022").calendar());
  let temp_day = relativeDays.toString();
  if (temp_day.startsWith("Last")) {
    temp_day = temp_day.split("Last ")[1];
    temp_day = temp_day.split(" at")[0];
    return temp_day;
  } else {
    temp_day = temp_day.split(" at")[0];
    return temp_day;
  }
};

const SingleDayOnSidebar = ({ day_key, day_key_value }) => {
  console.log(day_key, day_key_value);
  return (
    <Link to={`/eachdaytask/${day_key}`}>
      <div className="day_card border border-4 nav">
        <div className="day_card__head">
          <div className="day_card__title">{dayCalc()}</div>
          <div className="note-card__desc">{day_key_value} tasks done</div>
        </div>
        <div className="note-card__date"></div>
      </div>
    </Link>
  );
};

export { dayCalc };
export default SingleDayOnSidebar;
