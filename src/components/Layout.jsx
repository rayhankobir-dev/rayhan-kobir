import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { LiaBarsSolid } from 'react-icons/lia';
import { BsPlusLg } from 'react-icons/bs';
import { GoTasklist } from 'react-icons/go';
import { LuLayoutDashboard } from 'react-icons/lu';
import { GrGroup } from 'react-icons/gr';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import AddTask from '../components/AddTask'
import { useAuth } from '../hooks/useAuth';


const defaultNavLink = 'relative flex items-center font-medium gap-1.5 py-1 duration-300 hover:text-indigo-500 duration-500';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <div className="flex max-h-screen overflow-hidden">
            <aside className=" border-r absolute left-0 top-0 z-[100] flex h-screen w-[250px] flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full">
                <div className="flex h-14 items-center justify-between gap-2 px-10 py-4 border-b">
                    <a href="/" className="font-bold">LOGO</a>
                </div>

                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="py-4 px-10">
                        <ul className="flex flex-col gap-1">
                            <li>
                                
                                <NavLink to='/' className={(navInfo) => navInfo.isActive ? 'text-indigo-500 ' + defaultNavLink : 'text-gray-600 ' + defaultNavLink}>
                                    <LuLayoutDashboard/> Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/teams' className={(navInfo) => navInfo.isActive ? 'text-indigo-500 ' + defaultNavLink : 'text-gray-600 ' + defaultNavLink}>
                                    <GrGroup/> Teams
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/tasks' className={(navInfo) => navInfo.isActive ? 'text-indigo-500 ' + defaultNavLink : 'text-gray-600 ' + defaultNavLink}>
                                    <GoTasklist size={18}/> Tasks
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/profile' className={(navInfo) => navInfo.isActive ? 'text-indigo-500 ' + defaultNavLink : 'text-gray-600 ' + defaultNavLink}>
                                    <BiUser/> Profile
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            <div className='relative flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                <header className='sticky py-4 top-0 z-[100] flex h-14 w-full items-center border-b bg-white drop-shadow-1  dark:drop-shadow-none'>
                    <nav className="w-full px-4 lg:px-6">
                        <div className="relative flex items-center justify-between">
                            <div>
                                <button className="block ">
                                    <LiaBarsSolid size={22}/>
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className='flex gap-x-2'>
                                    <button onClick={() => setModalOpen(curr => !curr)} className='flex items-center gap-1 py-1.5 px-1 border rounded-md text-xs text-indigo-500 border-indigo-500 border-dashed'>
                                        <BsPlusLg/> New Task
                                    </button>
                                </div>
                                <div className="relative ml-3">
                                    <button onClick={()=> setIsMenuOpen(currentState => !currentState)} type="button" className="relative flex rounded-full bg-gray-300 text-sm p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        { auth?.profileImage ? <AiOutlineUser className='h-4 w-4 text-red-700'/> : <AiOutlineUser className='h-4 w-4 text-gray-700'/> }
                                    </button>
                                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} absolute border right-0 z-10 mt-4 w-48 flex-col dvide-y origin-top-right rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm`}>
                                        <div className='px-4 py-2 bg-gray-100'>
                                            <p className="text-md font-semibold text-gray-700 ">{ auth.name }</p>
                                            <p className=''>{ auth.userName }</p>
                                        </div>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700">Your Profile</Link>
                                        <button onClick={handleLogout} type="button" className="block px-4 py-2 text-sm text-left text-gray-700">Sign out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <main className='py-5 relative'>
                    { modalOpen ? <AddTask/> : children }
                </main>
            </div>
        </div>
    )
}
