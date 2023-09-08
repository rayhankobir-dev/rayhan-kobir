import { useState } from "react"
import { registerUser } from "../utils/userController";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
    const [ name, setName ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const response = registerUser(name, userName, password);
        if(response.success) {
            navigate('/login');
        }else {
            alert(response.message);
        }
    };

    return (
        <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 justify-between">
            <section className="flex h-full flex-1 flex-col">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text mt-5 md:mt-12 lg:mt-24">
                    <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register a new account
                    </h2>
                    <p className="py-2 font-light text-sm">Enter you username and password. After login please update your information such as bio, name and others information</p>
                </div>
  
                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-3" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                            <input
                                type="text"
                                required
                                placeholder="Full name"
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <input
                                type="text"
                                required
                                placeholder="Username"
                                onChange={(e) => setUserName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Register
                        </button>
                    </form>
    
                    <p className="mt-6 text-sm text-gray-500">
                        Do you have account already?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </section>
            <section className="flex items-center px-2">
                <img className="w-full max-h-screen" src={'/public/timer-bg.png'}/>
            </section>
        </main>
    )
}
  