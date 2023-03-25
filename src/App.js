import "./app.css";
import React, { useState } from "react";

const ongoingList = [
  { title: "开发任务-4", status: "22-05-22 18:15" },
  { title: "开发任务-6", status: "22-05-22 18:15" },
  { title: "测试任务-2", status: "22-05-22 18:15" }
];
const doneList = [
  { title: "开发任务-2", status: "22-05-22 18:15" },
  { title: "测试任务-1", status: "22-05-22 18:15" }
];

const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
};

const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const handleChange = (evt) => setTitle(evt.target.value);
  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") onSubmit(title);
  };

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </li>
  );
};

export default function App() {
  const [showAd, setShowAd] = useState(false);
  const handleAdd = (val) => setShowAd(true);
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "22-05-22 18:15" },
    { title: "开发任务-3", status: "22-05-22 18:15" },
    { title: "开发任务-5", status: "22-05-22 18:15" },
    { title: "测试任务-3", status: "22-05-22 18:15" }
  ]);
  const handleSubmit = (title) => {
    // 用函式的方式來寫 set
    setTodoList((currentTodoList) => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ]);
    setShowAd(false);
  };

  const KanbanBoard = ({ children }) => (
    <main className="kanban-board">{children}</main>
  );

  const KanbanColumn = ({ children, className, title }) => {
    const combinedClassName = `kanban-column ${className}`;
    return (
      <section className={combinedClassName}>
        <h2>{title}</h2>
        {children}
      </section>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Kanban</h1>
      </header>

      <KanbanBoard>
        <KanbanColumn
          className="kanban-column column-todo"
          title={
            <>
              待处理<button onClick={handleAdd}>&#8853; 添加新卡片</button>
            </>
          }
        >
          {showAd && <KanbanNewCard onSubmit={handleSubmit} />}
          {todoList.map((props) => (
            <KanbanCard {...props} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          className="kanban-column column-ongoing"
          title={
            <>
              进行中<button onClick={handleAdd}>&#8853; 添加新卡片</button>
            </>
          }
        >
          {ongoingList.map((item) => (
            <KanbanCard {...item} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          className="kanban-column column-done"
          title={
            <>
              已完成<button onClick={handleAdd}>&#8853; 添加新卡片</button>
            </>
          }
        >
          {doneList.map((item) => (
            <KanbanCard {...item} />
          ))}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}
