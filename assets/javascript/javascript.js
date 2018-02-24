/*
1) User inputs request
2) Request is placed into table and database
3)  

*/
var config = {
    apiKey: "AIzaSyBstSaz1eUJ3OztFV7dx62TzLGIOuqnOOs",
    authDomain: "quantum-boulder-196206.firebaseapp.com",
    databaseURL: "https://quantum-boulder-196206.firebaseio.com",
    projectId: "quantum-boulder-196206",
    storageBucket: "",
    messagingSenderId: "877582248323"
};
firebase.initializeApp(config);

var url = "https://quantum-boulder-196206.firebaseio.com";
var dataRef = new Firebase(url);


$(document).ready(function() {

    $('#add-word').on('click', function(event) {
        event.preventDefault();
        var projectNumber = $('#project-input').val().trim();
        var requestedServices = $('#service-input').val().trim();
        var requestedDate = $('#date-input').val().trim();
        var userComment = $('#comment-input').val().trim();
        console.log(projectNumber, requestedServices, requestedDate, userComment);

        dataRef.on("child_added", function input(childSnapshot) {

        $('.emgSchedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
            "<td class='col-xs-3 text-center'>" + childSnapshot.val().projectNumber +
            "</td>" +
            "<td class='col-xs-2'>" + childSnapshot.val().requestedServices +
            "</td>" +
            "<td class='col-xs-2'>" + childSnapshot.val().requestedDate +
            "</td>" +
            "<td class='col-xs-2'>" + childSnapshot.val().userComment +
            "</td>" +
            "<td class='col-xs-1'>" + "<input type='submit' value='remove request' class='remove-request btn btn-primary btn-sm'>" + "</td>" +
            "</tr>");
        input();
        keyHolder = dataRef.push({
            projectNumber: projectNumber,
            requestedServices: requestedServices,
            requestedDate: requestedDate, // 2:22 in my example
            userComment: userComment,
        });
    });
});
    $("body").on("click", ".remove-request", function() {
        $(this).closest('tr').remove();
        getKey = $(this).parent().parent().attr('id');
        dataRef.child(getKey).remove();
    });
});