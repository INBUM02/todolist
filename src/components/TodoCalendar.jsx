import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { useTodoState } from '../TodoProvider';
import moment from 'moment';
import 'moment/locale/ko';

const TodoCalendarBlock=styled.div`
  display:flex;
  justify-content:center;
  margin-top:20px;
  margin-bottom:10px;
  border-radius:10px;
  .react-calendar{
    border:0;
    border-radius:10px; 
    padding:10px;
    padding-top:0px;
  }
  abbr{
    text-decoration:none;
  }
  .react-calendar__navigation{
    margin-top:10px;
    margin-top:10px;
  }
  .react-calendar__tile--now{
    background-color:pink;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: pink;
    opacity:0.5;
  }
  .react-calendar__tile {
    border-radius:10px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: orange;
  }
  .react-calendar__tile--active {
    background: orange;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: oragne;
  }
`;

const Dot=styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;


function TodoCalendar() {
  const [value, onChange] = useState(new Date());
  const todos=useTodoState();
  return (
    <TodoCalendarBlock>
      <Calendar onChange={onChange} value={value}
      formatDay={(locale, date) => moment(date).format("DD")}
      className="mx-auto w-full text-sm border-b"
      tileContent={({ date, view }) => {
        if (todos.find((todo) => todo.date === moment(date).format("YYYY-MM-DD"))) {
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                <Dot/>
              </div>
            </>
          );
        }
      }}
      />
    </TodoCalendarBlock>
  );
}
export default TodoCalendar

