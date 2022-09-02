export async function GetLatestChapiters() {
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/chapter/latest/8`);
}

export async function GetLatestLabs() {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/lab/latest/8');
}

export async function GetSuggestedCourses(token) {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/course/recommendations/8', {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
}


export async function GetPopularCourses() {
    return await fetch('https://lablib-api.herokuapp.com/api/v1/course/popular/20');
}

