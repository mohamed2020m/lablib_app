export async function GetCategory() {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/category');
}

export async function GetCategoryItem(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/category/${id}/list`);

}

export async function PostCategory(newCategory) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/category', newCategory);
}

export async function PutCategory(id, modifieCategory) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/category/${id}`, modifieCategory);
}

export async function DelCategory(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/category/${id}`,  { method: 'DELETE'});
}



