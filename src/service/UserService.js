export async function GetUsers() {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/user');
}

export async function GetDetailsMe(token) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/user/me/details', {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
}

export async function PostUser(newUser) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/user', newUser);
}

export async function LoginUser(userData){
    return await fetch('https://lablib-api.herokuapp.com/api/v1/user/login', userData)
}

export async function DelUser(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/user/${id}`,  { method: 'DELETE'});
}
    