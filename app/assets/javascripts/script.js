var app = app || {};

app.$cssElement = $("<div/>");
app.$codeElement = $("<div/>");
app.$codeBox = $("<div/>");
app.category = "";
app.level = "";

app.generateLineNumbers = function(lines) {
    var html = '<div class="line-numbers">';

    for (var i = 1; i <= lines; i++) {
        html += i + "<br>";
    }

    html += "</div>";
    app.$codeElement.css("height", (lines * 24 + 20) + "px");
    app.$codeElement.append(html);
}

app.generateCodebox = function(htmlBefore, htmlAfter, rows, id) {
    var beforerows = htmlBefore.split("\n").length;
    var afterrows = htmlAfter.split("\n").length;

    var codeBoxViewTemplate = _.template( $("#codebox").html() );
    var displayView = codeBoxViewTemplate({
        beforerows: beforerows,
        before: htmlBefore,
        rows: rows,
        id: id,
        after: htmlAfter,
        afterrows: afterrows
    });

    app.$codeElement.append(displayView);
}

app.generateCssView = function(htmlCode, id) {
    var cssViewTemplate =  _.template( $("#cssview").html() );
    var displayView = cssViewTemplate({
        id: id,
        html: htmlCode,
    });

    app.$cssElement.append(displayView);
}

app.checkline = function(regex, line) {
    var result = line.match(regex);
    if (result) {
        return result;
    }
    return [];
}

/*
    function app.checkAnswer

    Parameters:
    userAnswer (string)
    answer (String)

    Makes a deep comparison between the users answer and the actual answer to check if the user is correct.
*/
app.checkAnswer = function(userAnswer, answer, lines, $userCssElement) {
    match = _.every(userAnswer, function (user_answer) {
        return _.some(answer, function (_answer) {
            return _.isEqual(user_answer, _answer);
        });
    });

    return match && userAnswer.length === lines;
}

/*
    function captureCode

    Parameters:
    $element (DOM Element)

    Captures any valid css code that the user inputs into specified $element/textarea.
*/
app.captureCode = function($element, $userCssElement) {
    var code = $element.val().split("\n");
    var userAnswer = [];

        for (var i = 0; i < code.length; i++) {
            var css = app.checkline(/(\w+.*):\s?(.*;)/, code[i]);
            var obj = {};

            if (css[1]) {
                obj["attr"] = css[1];
                obj["val"] = $userCssElement.css(css[1]) + ";";
            }
            userAnswer.push(obj);
        }

    return userAnswer;
}

app.generateLevel = function(category, level) {
    $("#quizTitle").text(app.levels[category].title);

    var thisLevel = app.levels[category]["level" + level];

    var user = thisLevel.user;
    var css = thisLevel.css;

    app.generateCssView(user, "user-css");
    app.generateCssView(css, "example-css");

    numLines = 0;

    var code = thisLevel.code;
    for (var i = 0; i < code.length; i++) {
        var beforeLines = code[i].before.split("\n");
        var afterLines = code[i].after.split("\n");
        numLines += beforeLines.length + afterLines.length + code[i].rows;

        app.generateCodebox(code[i].before, code[i].after, code[i].rows, i);
    };

    app.generateLineNumbers(numLines);

    correct = 0;

    $(".code").each(function() {

        $(this).on("keydown", function(event) {
            var linesOfCode = $(this).val().split("\n").length;
            if ( event.which === 13 && linesOfCode === parseInt( $(this).attr("rows") )  ) { return false; }
        });

        $(this).on("keyup", function() {
            var num = $(this).attr("id");
            var $userCssElement = $(thisLevel.code[num].cssSelector);
            // $userCssElement.attr( "style", $(this).val() );

            var cssCode = ""
            $(".stylesheetcode").each(function() {
                cssCode += $(this).val();
            });

            $("#stylesheet").text(cssCode);

            var userAnswer = app.captureCode( $(this), $userCssElement );
            var answer = thisLevel.answers;
            var lines = thisLevel.code

            if ( app.checkAnswer(userAnswer, answer[num], lines[num].rows, $userCssElement ) ) {
                correct++;
            }

            if (correct === code.length ) {
                console.log("Yay you win!");
                correct = 0;

                $("#nextLevelBtn").addClass("btn-success");
                $("#nextLevelBtn").on("click", function() {
                    var nextLevel = level + 1
                    if ( (nextLevel) <= ( _.size(app.levels[category]) - 1) ) {
                        window.location.href = '/quizzes/' + category + "/" + nextLevel;
                    }
                });
            }
        });
    });

}

app.generatePagination = function(category, currLevel) {

    for (var i = 0; i < _.size(app.levels[category]) - 1; i++) {
        var $page = $("<li/>");
        var $link = $("<a/>");
        $page.html( $link.text(i + 1) );

        $(".pagination").append($page);
    }
}

var PagesController = Paloma.controller('Pages');

PagesController.prototype.index = function(){};

PagesController.prototype.quiz = function(){
    app.$cssElement = $("#css");
    app.$codeElement = $("#cssbox");
    app.$codeBox = $(".code");

    app.category = this.params["quizTitle"];
    app.level = parseInt(this.params["quizLevel"]);

    app.generateLevel(app.category, app.level);

    app.generatePagination(app.category, app.level);
};