import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoProvider';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 15px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const todos = useTodoState();
  return (
    <TodoListBlock>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          date={todo.date}
          done={todo.done}
          show={todo.show}
          tags={todo.tags}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;