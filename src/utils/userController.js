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
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    bcryptjs.compareSync
    const user = existingUsers.find(u => (u.userName === userName) && bcryptjs.compareSync(password, u.password));
  
    if (user) {
        localStorage.setItem('auth', JSON.stringify({ state: true, user: user.id}));
        return { success: true, message: 'Login successful', data: user };
    }
  
    return { success: false, message: 'Invalid credentials', data: null };
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

export function updateUserInfo(id, info) {
    try {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find((user) => user.id === id);
        const updatedUser = {
            id: user.id,
            ...info
        };

        const updatedUsers = users.map(item => item.id === id ? updateUser : user);

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        return { success: true, message: 'Information updated.', data: updatedUser };
    } catch(err) {
        return { success: false, message: 'Failed to updated information!', data: {} };
    }
}

export function updateUser(updates) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    if (!currentUser) {
        return { success: false, message: 'User not logged in' };
    }
  
    // update user data with the provided updates
    Object.assign(currentUser, updates);
  
    // store the updated user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return { success: true, message: 'User information updated successfully' };
}

export function updateUserImage(id, image = '/public/vite.svg') {
    try {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find((user) => user.id === id);
        const updatedUser = {
            ...user,
            avatar: image
        };

        const updatedUsers = users.map(item => item.id === id ? updateUser : user);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        return { success: true, message: 'Successfully avatar updated!', data: updatedUser };
    } catch(err) {
        return { success: false, message: 'Failed to updated avatar!', data: {} };
    }
}
