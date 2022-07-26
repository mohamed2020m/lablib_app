export const RemoveWhiteSpace = (name) => {
    let newName = name.replace('/', '');
    return newName.replace(/\s+/g, '-').toLowerCase();
}

export const findIdCategory = (name, categories) => {
    const _category =  categories.filter(item => (
        RemoveWhiteSpace(item.name.toLowerCase()) === name
    ));
    if(_category.length) return _category[0].id
}

export const findIdCourse = (name, courses) => {
    const _course =  courses.filter(item => (
        RemoveWhiteSpace(item.name.toLowerCase()) === name
    ));
    if(_course.length) return _course[0].id
}

export  const findIdChapiter = (name, chapiters) => {
    const _chapiter =  chapiters.filter(item => (
        RemoveWhiteSpace(item.name.toLowerCase()) === name
    ));
    if(_chapiter.length) return _chapiter[0].id
}

export const levelStr = (level) => {
    if(level === 1){
        return ["success", "Facile"]
    }
    else if(level === 2){
        return ["warning","Moyen"]
    }
    else if(level === 3)
        return ["danger","Difficile"]
    else{
        return "Pas un niveau valide"
    }
}