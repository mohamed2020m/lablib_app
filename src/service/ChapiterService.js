export async function GetChapiter(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/chapter/${id}`);
}

export async function GetChapiters() {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/chapter');
}

export async function GetChapiterItem(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/chapter/${id}/list`);
}

export async function PostChapiter(newChapiter) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/chapter', newChapiter);
}

export async function PutChapiter(id, modifieChapiter) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/chapter/${id}`, modifieChapiter);
}

export async function DelChapiter(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/chapter/${id}`,  { method: 'DELETE'});
}
