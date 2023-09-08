import cryptoRandomString from "crypto-random-string";
import bcryptjs from 'bcryptjs';
export function registerUser(name, userName, password) {
    // check if the user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExist = existingUsers.some(user => user.userName === userName);
  
    if (isUserExist) {
        return { success: false, message: 'User already exists' };
    }
  
    // create a new user object
    const id = cryptoRandomString({length: 10, type: 'alphanumeric'}).toLowerCase()
    const newUser = {id, name, userName, password: bcryptjs.hashSync(password, 10)};
    existingUsers.push(newUser);
  
    // store the updated user list in localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    return { success: true, message: 'Registration successful' };
}

export function loginUser(userName, password) {
    try {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(user => user.userName === userName && bcryptjs.compareSync(password, user.password));
        return { success: true, message: 'Login successfully!', data: user };
    } catch(err) {
        return { success: false, message: 'Invalid credentials!', data: null };
    }
}
  
// function to check if a user is authenticated
export function checkAuth() {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        return auth;
    } catch(err) {
        return false;
    }
}

export function logoutUser() {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if(auth.state) {
            localStorage.setItem('auth', JSON.stringify({ state: false }))
            return { success: true, message: 'You are logged out!', data: { state: false } };
        }
    } catch(err) {
        return { success: false, message: 'Something went wrong', data: null };

    }
}

export function userNameExist(userName) {
    try {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find((user) => user.userName === userName);
        return user;
    } catch(err) {
        return null;
    }
}

export function updateUserData(id, info) {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex((user) => user.id === id);

        if (index === -1) return { success: false, message: 'User not found!', data: {} };

        users[index] = { ...users[index], ...info };
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true, message: 'Information updated.', data: users[index] };
    } catch (err) {
        return { success: false, message: 'Failed to update information!', data: {} };
    }
}

