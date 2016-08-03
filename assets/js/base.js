var data = {
    c: {value: 0, human: "C"},
    cpp: {value: 0, human: "C++"},
    cs: {value: 0, human: "C#"},
    html: {value: 0, human: "HTML"},
    java: {value: 0, human: "Java"},
    javascript: {value: 0, human: "JavaScript"},
    lua: {value: 0, human: "Lua"},
    php: {value: 0, human: "PHP"},
    python: {value: 0, human: "Python"},
    ruby: {value: 0, human: "Ruby"},
    scratch: {value: 0, human: "Scratch"},
    swift: {value: 0, human: "Swift"}
};
//Page stuff
$(function(){
    $(".choice").click(function(){
        var $twoUp = $(this).parent().parent();
        var $actions = $(this).attr("action").trim().toLowerCase().split(",");
        //Process user choice
        for(var $key in $actions){
            //Tiebreaker, in case several languages have the same value points, this one will add more points to only one
            if($twoUp.attr("id") === "q15"){
                data[$actions[$key]]["value"] += 3;
                break;
            }
            data[$actions[$key]]["value"] += 1;
        }
        if($twoUp.attr("id") === "q1"){
            $("#header")
                .delay(300)
                .addClass("animated slideOutUp")
                .fadeOut();
        }
        $(this).css("background", "#8ee5ee");
        $twoUp
            .delay(500)
            .addClass("animated fadeOutUp")
            .fadeOut();
        $twoUp
            .next()
            .delay(1600)
            .addClass("animated fadeInUp")
            .fadeIn();
        if($twoUp.is(":last-child")){
            var best = findMax(data);
            $("#result-image").attr("src", "images/logo/"+best+".png");
            $("#result-human").html(data[best]["human"]);
            $("#result-why").attr("href", "which.html#"+best);
            $("#action-twitter").attr("href", "https://twitter.com/intent/tweet?text="+encodeURIComponent(data[best]["human"]+" is my programming language. What's yours?")+"&url=https%3A%2F%2Fifvictr.github.io%2Ffypl&hashtags=code,"+best);
            $("#result")
                .delay(1500)
                .addClass("animated slideInUp")
                .fadeIn();
        }
        /*
        console.log("On question #"+$twoUp.attr("id").substring(1));
        for(var key in data){
            console.log(data[key]["human"]+": "+data[key]["value"]);
        }
        */
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