$(document).ready(function() {

    if (!localStorage.yourTeams) {
        localStorage.yourTeams = [];
    }


    $("#filter").click(function() {
        $(".topdone").fadeOut();
    });

    $("#upcomingSchedule").click(function() {
        $("#fullShow").hide();
        $("#upcomingShow").show();
    });

    $("#fullSchedule").click(function() {
        $("#fullShow").show();
        $("#upcomingShow").hide();
    });

    $("#scrollUp").click(function() {
        $("body").scrollTop(10);
    });
    $(".left-icon-menu a").click(function() {
        $(".nav-menu").animate({ "left": "0" }, { duration: 300, queue: false });
        $(".navbar").animate({ "left": "200px" }, { duration: 300, queue: false });
        $(".close-menu").animate({ "left": "0" }, { duration: 300, queue: false });
        $(".background").animate({ "right": "0" }, { duration: 300, queue: false });
    });

    $(".close-menu").click(function() {
        $(".nav-menu").animate({ "left": "-200px" }, { duration: 300, queue: false });
        $(".navbar").animate({ "left": "0" }, { duration: 300, queue: false });
        $(".close-menu").animate({ "left": "-200px" }, { duration: 300, queue: false });
        $(".background").animate({ "right": "100%" }, { duration: 300, queue: false });
    });
    $(".background").click(function() {
        $(".nav-menu").animate({ "left": "-200px" }, { duration: 300, queue: false });
        $(".navbar").animate({ "left": "0" });
        $(".close-menu").animate({ "left": "-200px" }, { duration: 300, queue: false });
        $(".background").animate({ "right": "100%" }, { duration: 300, queue: false });
    });
    $(".nav-menu ul li a").click(function() {
        $(".nav-menu").animate({ "left": "-200px" }, { duration: 300, queue: false });
        $(".navbar").animate({ "left": "0" });
        $(".close-menu").animate({ "left": "-200px" }, { duration: 300, queue: false });
        $(".background").animate({ "right": "100%" }, { duration: 300, queue: false });
    });


    $(".topdone").click(function() {
        $(".choose-team").fadeOut();
        $(".topdone").fadeOut();
        document.getElementsByClassName("display-team").innerHTML = "";
    });

});