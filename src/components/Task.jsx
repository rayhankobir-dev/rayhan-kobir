import { useState } from "react";
import Badge from "./Badge";
import { RxAvatar } from 'react-icons/rx';
import { TbFlag3Filled } from 'react-icons/tb';
import { HiDotsVertical, HiOutlineTrash, HiOutlineStatusOnline } from 'react-icons/hi';
import { GoCheckCircle } from 'react-icons/go';
import { BiEdit, BiGroup } from 'react-icons/bi';
import { AiOutlineTeam } from 'react-icons/ai';
import { BsSortUp } from 'react-icons/bs';

const bageVariantsPrority = { high: 'red', moderate: 'orange', low: 'green' };
const bageVariantsStatus = { created: 'blue', progress: 'purple', completed: 'green' };

const capitalize = (string) => {
    return string.replace(/^[a-z]/g, m => m.toUpperCase())
}

const shortDescription = (string, length = 75) => {
    if(string.length > 75) {
        return string.substring(0, length) + '...';
    }
    return string;
}

// eslint-disable-next-line react/prop-types
export default function SingleTask({ task }) {
    const [isActive, setActive] = useState(false)
    // eslint-disable-next-line react/prop-types
    const {  title, description, timeline, priority, createdBy, team, status } = task;
    return (
        <div className="shadow p-3 rounded-md bg-gray-50 hover:shadow-md duration-300">
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <Badge size="sm" color={bageVariantsStatus[status]}><HiOutlineStatusOnline/>{ capitalize(status) }</Badge>
                    <Badge size="sm" color={bageVariantsPrority[priority]}><BsSortUp/>{ capitalize(priority) }</Badge>
                </div>
                <div className="relative">
                    <button 
                        className="relative inline-block text-left" 
                        onClick={() => setActive(currentState => !currentState)}>
                            <HiDotsVertical/>
                    </button>
                    <ul className={`${(isActive? 'flex': 'hidden')} min-w-[100px] flex-col absolute right-1 bg-white shadow-2xl divide-y border rounded text-sm font-light`}>
                        <li>
                            <button className="w-full  flex items-center gap-1 hover:bg-blue-100 py-1.5 px-3"><BiEdit/> Edit</button>
                        </li>
                        <li >
                            <button className="w-full  flex items-center gap-1 hover:bg-gray-50 py-1.5 px-3"><AiOutlineTeam/> Assign</button>
                        </li>
                        <li >
                            <button className="w-full  flex items-center gap-1 hover:bg-green-100 text-green-500 py-1.5 px-3"><GoCheckCircle/> Complete</button>
                        </li>
                        <li >
                            <button className="w-full flex items-center gap-1 hover:bg-rose-100 text-rose-500 py-1.5 px-3"><HiOutlineTrash/> Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
            <h2 className="mt-3 text-lg font-medium">{ title }</h2>
            <p className="py-2">{ shortDescription(description) }</p>
            <div className="flex justify-between py-3 text-sm">
                <p className="flex gap-1 items-center"><TbFlag3Filled/> { timeline }</p>
                <p className="flex items-center gap-1"><BiGroup/> { team || 'Not assigned'}</p>
            </div>
            <p className="flex items-center gap-1 text-sm text-gray-600">
                <RxAvatar/> { createdBy }
            </p>
        </div>
    )
}
