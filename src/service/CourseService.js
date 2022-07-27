const header = new Headers({
    'Accept': 'application/json'
});

export async function GetCourse(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/course/${id}`);
}

export async function GetCourses() {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/course');
}

export async function GetCourseItem(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/course/${id}/list`);
}

export async function PostCourse(newCourse) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/course', newCourse);
}

export async function PutCourse(id, modifieCourse) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/course/${id}`, modifieCourse);
}

export async function DelCourse(id) {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/course/${id}`,  { method: 'DELETE'});
}
