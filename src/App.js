import "./app.css";
import React, {useEffect, useState} from "react";

const todoList0 = [
    {title: "开发任务-1", status: "2023-03-26 11:00"},
    {title: "开发任务-3", status: "2023-03-26 11:00"},
    {title: "开发任务-5", status: "2023-03-26 11:00"},
    {title: "测试任务-3", status: "2023-03-26 11:00"}
]

const ongoingList = [
    {title: "开发任务-4", status: "2023-03-25 11:00"},
    {title: "开发任务-6", status: "2023-03-25 11:00"},
    {title: "测试任务-2", status: "2023-03-25 11:00"}
];
const doneList = [
    {title: "开发任务-2", status: "2023-03-25 11:00"},
    {title: "测试任务-1", status: "2023-03-25 11:00"}
];

//
const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const UPDATE_INTERVAL = MINUTE
const KanbanCard = ({title, status}) => {
    const [displayTime, setDisplayTime] = useState(status)
    useEffect(() => {
        const updateDisplayTime = () => {
            const passedTime = new Date() - new Date(status)
            console.log(passedTime);
            let relativeTime = 'Just now'
            if (passedTime > MINUTE && passedTime < HOUR) {
                relativeTime = `${Math.ceil(passedTime / MINUTE)} 分鐘前`
            } else if (passedTime >= HOUR && passedTime < DAY) {
                relativeTime = `${Math.ceil(passedTime / HOUR)} 小時前`
            } else {
                relativeTime = `${Math.ceil(passedTime / DAY)} 天前`

            }
            setDisplayTime(relativeTime)
        }

        const intervalID = setInterval(updateDisplayTime, UPDATE_INTERVAL)
        updateDisplayTime()
        return function clean() {
            clearInterval(intervalID)
        }
    }, [status])

    return (
        <li className="kanban-card">
            <div className="card-title">{title}</div>
            <div className="card-status">{displayTime}</div>
        </li>
    );
};

const KanbanNewCard = ({onSubmit}) => {
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
    const [todoList, setTodoList] = useState(todoList0);
    const handleSubmit = (title) => {
        // 用函式的方式來寫 set
        setTodoList((currentTodoList) => [
            {title, status: new Date().toDateString()},
            ...currentTodoList
        ]);
        setShowAd(false);
    };

    const KanbanBoard = ({children}) => (
        <main className="kanban-board">{children}</main>
    );

    const KanbanColumn = ({children, className, title}) => {
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
                            待处理
                            <button onClick={handleAdd}>&#8853; 添加新卡片</button>
                        </>
                    }
                >
                    {showAd && <KanbanNewCard onSubmit={handleSubmit}/>}
                    {todoList.map((props) => (
                        <KanbanCard {...props} />
                    ))}
                </KanbanColumn>

                <KanbanColumn
                    className="kanban-column column-ongoing"
                    title={
                        <>
                            进行中
                            <button onClick={handleAdd}>&#8853; 添加新卡片</button>
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
                            已完成
                            <button onClick={handleAdd}>&#8853; 添加新卡片</button>
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
