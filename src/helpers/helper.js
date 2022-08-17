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

export  const findIdLab = (name, labs) => {
    const _lab =  labs.filter(item => (
        RemoveWhiteSpace(item.name.toLowerCase()) === name
    ));
    if(_lab.length) return _lab[0].id
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

export const formatDate = (value) => {
    const para = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if(value){
        return value.toLocaleString('fr-FR', para);
    }
    return 
}

export function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    let time = "";
    if(hours != "00"){
        time += `${hours} hours`
        if(minutes != "00"){
            time += `${minutes} minutes`
        }
    }
    else if(minutes != "00"){
        time += `${minutes} minutes`
    }
    return time;
}


function getPageList(totalPages, page, maxLength){
    function range(start, end){
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }
    
    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    
    if(totalPages <= maxLength){
        return range(1, totalPages);
    }
    
    if(page <= maxLength - sideWidth - 1 - rightWidth){
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
    
    if(page >= totalPages - sideWidth - 1 - rightWidth){
        return range(1, sideWidth).concat(0, range(totalPages- sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
    
    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

export function fun(){
    var numberOfItems = $(".ch_card-content .ch_card").length;
    var limitPerPage = 6; //How many card items visible per a page
    var totalPages = Math.ceil(numberOfItems / limitPerPage);
    var paginationSize = 7; //How many page elements visible in the pagination
    var currentPage;
    
    function showPage(whichPage){
        if(whichPage < 1 || whichPage > totalPages) return false;
    
        currentPage = whichPage;
    
        $(".ch_card-content .ch_card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
    
        $(".ch_pagination li").slice(1, -1).remove();
    
        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
        $("<li>").addClass("ch_page-item").addClass(item ? "ch_current-page" : "ch_dots")
        .toggleClass("ch_active", item === currentPage).append($("<a>").addClass("ch_page-link")
        .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".ch_next-page");
        });
    
        $(".ch_previous-page").toggleClass("ch_disable", currentPage === 1);
        $(".ch_next-page").toggleClass("ch_disable", currentPage === totalPages);
        return true;
    }
    
    $(".ch_pagination").append(
        $("<li>").addClass("ch_page-item").addClass("ch_previous-page").append($("<a>").addClass("ch_page-link").attr({href: "javascript:void(0)"}).text("Prev")),
        $("<li>").addClass("ch_page-item").addClass("ch_next-page").append($("<a>").addClass("ch_page-link").attr({href: "javascript:void(0)"}).text("Next"))
    );
    
    $(".ch_card-content").show();
    showPage(1);
    
    $(document).on("click", ".ch_pagination li.ch_current-page:not(.ch_active)", function(){
        return showPage(+$(this).text());
    });
    
    $(".ch_next-page").on("click", function(){
        return showPage(currentPage + 1);
    });
    
    $(".ch_previous-page").on("click", function(){
        return showPage(currentPage - 1);
    });
};
