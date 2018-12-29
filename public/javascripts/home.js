function getUserCourses() {
    var usercourses = $.ajax({
        url: '/user_courses',
        type: 'POST',
        data:{
            userid: 1
        }
    })
    usercourses.done(function (results) {
        console.log(results);
    })
}

function getDetailCourses() {
    var detailcourses = $.ajax({
        url: '/detail_courses',
        type: 'POST',
        data:{
            courseid: 1
        }
    })
    detailcourses.done(function (results){
        console.log(results);
        $('body').append(results.main_course + ' ' + results.course_name + '<br>' + results.description);
    })
}

function AssignCourses(){
    var assigncourse = $.ajax({
        url: '/assign_courses',
        type: 'POST',
        data:{
            courseid: 4,
            userid: 1
        }
    }) 
    assigncourse.done(function (results){
        console.log(results);
    })
}
$(function () {
    getUserCourses();
    //getDetailCourses();
    // AssignCourses();
})

