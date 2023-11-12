import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const dayCalc = (doneDay) => {
  let relativeDays = moment(doneDay).calendar();

  let x = moment(doneDay).calendar().split(" at")[0];
  let y = moment("10-31-2023").calendar().split("Last ")[0];
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

const SingleDayOnSidebar = ({ doneDay }) => {
  return (
    <Link to={`/eachdaytask/${doneDay}`}>
      <div className="day_card border border-4 nav">
        <div className="day_card__head">
          <div className="day_card__title">{dayCalc(doneDay)}</div>
          <div className="note-card__desc"></div>
        </div>
        <div className="note-card__date"></div>
      </div>
    </Link>
  );
};

export { dayCalc };
export default SingleDayOnSidebar;
