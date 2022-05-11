import React from 'react';
import styled from 'styled-components';
import { useTodoState,useTodoDispatch } from '../TodoProvider';

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
    display:flex;
  }
`;
const TodoState=styled.div`
  position:absolute;
  left:50%;
  transform:translate(-50%,0);
  color: #20c997;
  font-size: 18px;
  font-weight: bold;
  button{
    opacity:0.5;
    border: none;
    border-radius: 4px;
    line-height:22px;
    margin-right:5px;
    margin-left:5px;
    background-color:transparent;
    color: #20c997;
    &:hover{
      opacity:1;
    }
    &:active{
      opacity:1;
    }
    &:focus{
      opacity:1;
    }
  }

`;
const DoneRemove=styled.div`
  position:absolute;
  right:30px;
  color: #20c997;
  font-size: 8px;
  font-weight: bold;
  button{
    opacity:0.5;
    border: none;
    border-radius: 4px;
    line-height:22px;
    margin-right:5px;
    margin-left:5px;
    background-color:transparent;
    color: #20c997;
    &:hover{
      opacity:1;
    }
    &:active{
      opacity:1;
    }
`;


function TodoHead() {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const undoneTasks = todos.filter(todo => !todo.done);
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
  function showListSet(show){
    switch(show){
      case "all":
        dispatch({ type: 'ALLSHOW' });
        break;
      case "done":
        dispatch({ type: 'DONESHOW' });
        break;
      case "active":
        dispatch({ type: 'ACTIVESHOW' });
        break;
      case "doneRemove":
        dispatch({ type: 'DONEREMOVE' });
        break;
      default:throw new Error(`Error`);
    }
  }
  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음<TodoState><button onClick={()=>showListSet("all")}>All</button><button onClick={()=>showListSet("done")}>Done</button><button onClick={()=>showListSet("active")}>Active</button></TodoState><DoneRemove><button onClick={()=>showListSet("doneRemove")}>Delete Done</button></DoneRemove></div>
    </TodoHeadBlock>
  );
}

export default TodoHead;