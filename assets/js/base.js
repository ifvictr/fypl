var points = {
    c: {value: 0, human: "C"},
    cpp: {value: 0, human: "C++"}, //C++
    cs: {value: 0, human: "C#"}, //C#
    html: {value: 0, human: "HTML"},
    java: {value: 0, human: "Java"},
    javascript: {value: 0, human: "JavaScript"},
    lua: {value: 0, human: "Lua"},
    php: {value: 0, human: "PHP"},
    python: {value: 0, human: "Python"},
    ruby: {value: 0, human: "Ruby"},
    scratch: {value: 0, human: "Scratch"}, //You appear to be new to programming, it'd be best if you start by using Scratch
    swift: {value: 0, human: "Swift"}
};
//Page stuff
$(document).ready(function(){
    $(".choice").click(function(){
        //console.log(points);
        var $twoUp = $(this).parent().parent();
        var $actions = $(this).attr("action").trim().toLowerCase().split(",");
        //Process user choice
        for(var $key in $actions){
            points[$actions[$key]]["value"] += 1;
        }
        if($twoUp.attr("id") === "q1"){
            $("#header").delay(300).addClass("animated slideOutUp").fadeOut();
        }
        $(this).css("background", "#8ee5ee");
        $twoUp.delay(500).addClass("animated fadeOutUp").fadeOut();
        $twoUp.next().delay(1600).addClass("animated fadeInUp").fadeIn();
        if($twoUp.is(":last-child")){
            var best = findMax(points);
            $("#result-image").attr("src", "images/logo/"+best+".png");
            $("#result-human").html(points[best]["human"]);
            $("#result-why").attr("href", "why.html#"+best);
            $("#result")
                .append("<a href='https://twitter.com/intent/tweet?text="+escape(points[best]["human"]+" is my programming language. What's yours?")+"&url=https%3A%2F%2Fifvictr.github.io%2Ffypl&hashtags=code,"+best+"' target='_blank'><i class='fa fa-twitter fa-4x'></i></a>")
                .delay(1500).addClass("animated slideInUp").fadeIn();
        }
    });
    $(".language").hover(
        function(){
            $(this).find("img").css("transform", "scale(1.15)");
        },
        function(){
            $(this).find("img").css("transform", "scale(1)");
        }
    );
});
//Methods
function findMax(object){
    if(typeof object != "object"){
        return null;
    }
    var best = {key: null, value: 0};
    for(var key in object){
        if(object[key]["value"] > best["value"]){
            best["key"] = key;
            best["value"] = object[key]["value"];
        }
    }
    return best["key"];
}