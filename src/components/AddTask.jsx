import { useState, useEffect } from "react"

import { createNewTask } from '../utils/taskController';
import cryptoRandomString from "crypto-random-string";
import Select from 'react-select';

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [team, setTeam] = useState('');
    const [timeline, setTimeLine] = useState('');

    const submithandler = (e) => {
        e.preventDefault();
        const data = {
            id: cryptoRandomString({length: 10, type: 'alphanumeric'}).toLowerCase(),
            title, 
            description,
            timeline,
            priority,
            team,
            status: 'created'
        }

        const response = createNewTask(data);
        if(response.success) {
            alert('Done');
        }else {
            alert(response.message);
        }
    }


    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setTimeLine(formatDate(tomorrow))
    }, []);

    return (
        <div className="min-h-[93vh] w-full flex items-center justify-center absolute z-[110] top-0 left-0 bg-black bg-opacity-25">
            <form className="max-w-md bg-white shadow-lg border rounded-md" onSubmit={submithandler}>
                <div className="px-5 py-3 border-b">
                    <h1 className="font-medium text-xl">Add New Task</h1>
                    <p className="text-sm">Create your new task ans assign after creation.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 px-5 py-3 text-sm">
                    <div className="sm:col-span-3">
                        <label htmlFor="password">Title</label>
                        <input
                            type="text"
                            required
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="password">Timeline</label>
                        <input
                            type="date"
                            placeholder="Timeline"
                            value={timeline}
                            onChange={(e) => setTimeLine(e.target.value)}
                            className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    
                    <div className="sm:col-span-3">
                        <label htmlFor="prority">Priority</label>
                        <Select
                            value={priority}
                            onChange={setPriority}
                            options={
                                [
                                    { value: 'low', label: 'Low' },
                                    { value: 'moderate', label: 'Moderate' },
                                    { value: 'high', label: 'High' }
                                ]
                            }
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="prority">Team</label>
                        <Select
                            value={team}
                            onChange={setTeam}
                            options={
                                [
                                    { value: 'chocolate', label: 'Chocolate' },
                                    { value: 'strawberry', label: 'Strawberry' },
                                    { value: 'vanilla', label: 'Vanilla' }
                                ]
                            }
                        />
                    </div>

                    <div className="sm:col-span-full">
                        <label htmlFor="password">Description</label>
                        <textarea
                            required
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full rounded-md border-0 px-3 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                    </div>

                    <div className="sm:col-span-6 space-x-2">
                        <button className="px-5 py-2 text-sm bg-gray-300 rounded-md">Cancel</button>
                        <button onClick={submithandler} className="px-5 py-2 text-sm bg-indigo-500 text-white rounded-md">Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

