import { useEffect, useState } from "react";
import Layout from "./Layout";
import PageTitle from "./PageTitle";
import SingleTask from "./Task";
import { BsSearch } from 'react-icons/bs'
import { getAllTasks } from "../utils/taskController";
import Select from 'react-select';




export default function Tasks() {
    const [ tasks, setTasks ] = useState([]);
    const [ filteredTasks, setFilteredTasks] = useState([]);

    const [ searchText, setSearchText] = useState('');
    const [ priority, setPriority] = useState('');
    const [ status, setStatus] = useState('');
    const [ team, setTeam] = useState('');
    const [ timeline, setTimeLine] = useState((new Date().getDate()));

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
            (priority === '' || task.priority === priority) &&
            (status === '' || task.status === status) &&
            // (timeline !== '' && new Date(task.timeline ) <= new Date(timeline)) &&
            (searchText === '' || task.title.toLowerCase().includes(searchText.toLowerCase()))
        ));
        setFilteredTasks(filtered);

        console.log(filtered, priority, status, searchText)

    }, [tasks, priority, status, searchText, team, timeline]);
    
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
                    <div className="flex gap-1">
                            <Select
                                value={priority}
                                onChange={({value}) => setPriority(value)}
                                options={
                                    [
                                        { value: '', label: 'All'},
                                        { value: 'low', label: 'Low' },
                                        { value: 'moderate', label: 'Moderate' },
                                        { value: 'high', label: 'High' }
                                    ]
                                }
                            />
                            
                            <Select
                                value={status}
                                onChange={({value}) => setStatus(value)}
                                options={
                                    [
                                        { value: '', label: 'All'},
                                        { value: 'created', label: 'Created' },
                                        { value: 'progress', label: 'Progress' },
                                        { value: 'completed', label: 'Completed' }
                                    ]
                                }
                            />
                            <Select
                                value={team}
                                onChange={({value}) => setTeam(value)}
                                options={
                                    [
                                        { value: '', label: 'All'},
                                        { value: 'dx', label: 'DX' },
                                        { value: 'ui', label: 'UI' },
                                        { value: 'dev', label: 'DEV' }
                                    ]
                                }
                            />
                        <input value={timeline} onChange={(e) => setTimeLine(e.target.value)} className="border h-10 px-2 rounded-md outline-none focus:outline-none focus:border-blue-400" type="date" name="timeline"/>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 overflow-auto'>
                    { 
                        filteredTasks.length > 0 ? filteredTasks.map((task) => <SingleTask key={task.id} task={task}/> ) 
                        : <p className="bg-red-50 text-red-500 sm:col-span-full rounded-md px-4 py-3">Not found!</p> 
                    }
                </div>
            </section>
        </Layout>
    )
}
