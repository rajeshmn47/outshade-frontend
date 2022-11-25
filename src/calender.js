import { useEffect, useState, useMemo } from "react";
import React from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  DateLocalizer,
} from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import { getleaves } from "./actions/leaveActions";
import "./calender.css";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import "@fullcalendar/daygrid/main.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
      color: "#ffffff",
      padding: "2px 2px",
    },
  });

const MyCalendar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventsArray, setEventsArray] = useState([]);
  const { loading, leavelist } = useSelector((state) => state.leave);
  const calendarComponentRef = React.createRef();
  console.log(eventsArray);
  useEffect(() => {
    console.log("rsj");
    dispatch(getleaves());
  }, []);
  useEffect(() => {
    if (leavelist?.length > 0) {
      createevents(leavelist);
    }
  }, [leavelist]);

  const { components, defaultDate, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2015, 3, 1),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );
  const createevents = (arr) => {
    var newArray = [];
    arr.forEach((element, index) => {
      newArray.push({
        id: index + 1,
        title: element.reason,
        start: new Date(element.start_date),
        end: new Date(element.end_date),
      });
    });
    setEventsArray(newArray);
  };
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const handleSelectedDates = (info) => {
    alert("selected " + info.startStr + " to " + info.endStr);
    const title = prompt("What's the name of the title");
    console.log(info);
    if (title != null) {
      const newEvent = {
        title,
        start: info.startStr,
        end: info.endStr,
      };
      const data = [...this.state.events, newEvent];
      this.setState({ events: data });
      console.log("here", data);
    } else {
      console.log("nothing");
    }
  };

  return (
    <>
      <div className="calendar">
        <button className="backbutton" onClick={() => navigate("/imagelist")}>
          <KeyboardBackspaceIcon /> Back
        </button>
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          ref={calendarComponentRef}
          defaultView="dayGridMonth"
          dateClick={handleDateClick}
          displayEventTime={true}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          selectable={true}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            resourceTimeGridPlugin,
          ]}
          eventClick={(event) => {
            console.log(event.event._def.publicId);
          }}
          events={eventsArray}
          select={handleSelectedDates}
          eventLimit={3}
        />
      </div>
    </>
  );
};

export default MyCalendar;
