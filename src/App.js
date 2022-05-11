import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import TodoCalendar from './components/TodoCalendar';
import { TodoProvider } from './TodoProvider';
import { useBeforeunload } from "react-beforeunload";



const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  useBeforeunload((event) => event.preventDefault());
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoCalendar/>
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;