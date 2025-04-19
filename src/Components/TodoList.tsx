import {useState} from 'react'
// import { Task } from './TodoItem';

export interface Task{
    id:number;
    text:string;
    completed:boolean;
}

function TodoList(){
    const [tasks,setTasks]=useState<Task[]>([])

    const [newTask,setNewTask]=useState<string>("")

    const [filter,setFilter]=useState<'all'|'completed'| 'pending'>('all')

    function handleInputChange(event: { target: { value: React.SetStateAction<string>; }; }){
        setNewTask(event.target.value);
    }

    function addTask(){

        if (newTask.trim()=== "") return;

        const newT: Task = {
            id: Date.now(),
            text: newTask.trim(),
            completed:false
        };

        setTasks([...tasks, newT]);

        setNewTask("");
        // setTasks()
        // setTasks([...tasks,newTask])
    }

    function deleteTask(index:number){
        // const updatedTasks=tasks.filter((_,i)=>i!==index)
        setTasks(tasks.filter((task)=>task.id!==index))
    }

    function toggleTask(index:number){
        const updatedTasks=tasks.map((el)=>el.id===index?{...el,completed:!el.completed}:el)
        setTasks(updatedTasks)
    }

    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setFilter(event.target.value as 'all' | 'completed' | 'pending');
      }

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
      });

    return(
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div
            style={{display: 'flex',justifyContent: 'space-between', alignItems:'center',gap:'15px',margin:'0'}}
            // className='flex items-center justify-between w-screen'
            >
                <input
                // className='border border-gray-300 p-2 rounded w-200'
                style={{
                    border: '1px solid #D1D5DB',
                    padding: '8px',
                    borderRadius: '8px',
                    width: '70%',
                    maxWidth: '400px',
                  }}
                type='text'
                placeholder='Add a task'
                value={newTask}
                onChange={handleInputChange}
                />
                <button
                // className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                onClick={addTask}>
                    Add
                </button>
                <select
                    style={{
                        border: '1px solid #D1D5DB',
                        padding: '8px',
                        borderRadius: '8px',
                        marginLeft: '10px',
                      }}
                    // className='border p-2 rounded'
                    value={filter}
                    onChange={handleFilterChange}
                    >
                    <option value='all'>All Tasks</option>
                    <option value='completed'>Completed Tasks</option>
                    <option value='pending'>Pending Tasks</option>
                </select>
            </div>

            <ol
            style={{ display: 'flex',justifyContent:'space-between' ,flexDirection: 'column', gap: '16px' ,width:'100%'}}
            // className="flex flex-col space-y-2"
            >
                {filteredTasks.map((task:Task,index)=>(
                    <li key={index}
                    // className="flex items-center justify-between p-20 border rounded bg-white"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s',
                      }}
                    >
                        <span
                        style={{
                            color: task.completed ? '#6B7280' : '#000000',
                          }}
                          >
                            {task.text}
                        </span>
                        <button
                        onClick={()=>deleteTask(task.id)}
                        style={{
                            color: '#EF4444',
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                          }}
                            >
                            Delete
                        </button>
                        <input
                        type='checkbox'
                        checked={task.completed}
                        onChange={()=>toggleTask(task.id)}
                        style={{ cursor: 'pointer' }}
                        />
                        <span
                        style={{
                            color: task.completed ? '#10B981' : '#F59E0B',
                            fontWeight: 'bold',
                          }}>
                            {task.completed?'Completed':'Pending...'}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default TodoList