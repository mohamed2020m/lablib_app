export async function refresh(token){
    return await fetch(`https://lablib-api.herokuapp.com/api/v1/user/refresh`, {
        headers: {
            'Authorization': `Refresh ${token}`,
        },
    });
}