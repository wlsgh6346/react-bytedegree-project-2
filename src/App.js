import React from 'react';
import TodoTemplate from "./components/TodoTemplate";
import {createGlobalStyle} from "styled-components";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import TodoCategory from "./components/TodoCategory";
import {TodoProvider} from "./TodoContext";

const GlobalStyle = createGlobalStyle`
    body {
      background: #e9ecef;
    }
`;

function App() {
  return (
      <TodoProvider>
          <GlobalStyle />
          <TodoTemplate>
            <TodoHead />
            <TodoCategory />
            <TodoList />
            <TodoCreate />
          </TodoTemplate>
      </TodoProvider>
  );
}

export default App;
