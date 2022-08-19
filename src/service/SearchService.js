export async function SearchAll(data) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/search', data);
}

export async function SearchCategory(data) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/search/category', data);
}

export async function SearchCourse(data) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/search/course', data);
}

export async function SearchChapter(data) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/search/chapter', data);
}

