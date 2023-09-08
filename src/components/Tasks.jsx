import { useEffect, useState } from "react";
import Layout from "./Layout";
import PageTitle from "./PageTitle";
import SingleTask from "./Task";
import { BsSearch } from 'react-icons/bs'
import { getAllTasks } from "../utils/taskController";



export default function Tasks() {
    const [ tasks, setTasks ] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllTasks();
            setTasks(response.data);
            setFilteredTasks(response.data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = tasks.filter(task => (
            (priorityFilter === '' || task.priority === priorityFilter) &&
            (statusFilter === '' || task.status === statusFilter) &&
            (searchText === '' || task.title.toLowerCase().includes(searchText.toLowerCase()))
        ));
        setFilteredTasks(filtered);

    }, [tasks, priorityFilter, statusFilter, searchText]);
    
    return (
        <Layout>
            <PageTitle 
                title={'Tasks'}
                subTitle={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
            />
            <section>
                <div className="my-3 grid grid-cols-1 md:flex justify-between gap-3 border-t border-b py-2 px-6 mb-5">
                    <div className="flex items-center gap-2 h-10 px-2 border rounded-md">
                        <BsSearch/>
                        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-full h-full outline-none focus:outline-none focus:border-blue-400 text-sm" type="text" placeholder="Search by title" />
                    </div>
                    <div className="flex gap-2">
                        <div className="border rounded-md px-2">
                            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="h-full w-fit outline-none focus:outline-none focus:border-blue-400 text-sm">
                                <option disabled={true}>Priority</option>
                                <option value="high">High</option>
                                <option value="moderate">Moderate</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="border rounded-md px-2">
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-full w-fit outline-none focus:outline-none focus:border-blue-400 text-sm">
                                <option disabled={true}>Status</option>
                                <option value="created">Created</option>
                                <option value="progress">Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <input className="border h-10 px-2 rounded-md outline-none focus:outline-none focus:border-blue-400" type="date" name="timeline"/>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 overflow-auto'>
                    { filteredTasks?.map((task) => <SingleTask key={task.id} task={task}/> ) }
                </div>
            </section>
        </Layout>
    )
}
