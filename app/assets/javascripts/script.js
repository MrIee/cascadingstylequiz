var app = app || {};

app.$cssElement = $("<div/>");
app.$codeElement = $("<div/>");
app.$codeBox = $("<div/>");

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
    var codeBoxViewTemplate = _.template( $("#codebox").html() );
    var displayView = codeBoxViewTemplate({
        before: htmlBefore,
        rows: rows,
        id: id,
        after: htmlAfter
    });

    app.$codeElement.append(displayView);
}

app.generateCssView = function(htmlCode, id) {
    var cssViewTemplate =  _.template( $("#cssview").html() );
    var displayView = cssViewTemplate({
        id: id,
        html: htmlCode
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
    var thisLevel = app.levels[category]["level" + level];

    var userElement = thisLevel.userElement;
    var user = thisLevel.user;
    var css = thisLevel.css;

    app.generateCssView(user, "user-css");
    app.generateCssView(css, "example-css");

    numLines = 0;

    var code = thisLevel.code;
    for (var i = 0; i < code.length; i++) {
        var beforeLines = code[i].before.split("<br/>");
        var afterLines = code[i].after.split("<br/>");
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
            $userCssElement.attr( "style", $(this).val() );

            var userAnswer = app.captureCode( $(this), $userCssElement );
            var answer = thisLevel.answers;
            var lines = thisLevel.code

            if ( app.checkAnswer(userAnswer, answer[num], lines[num].rows, $userCssElement ) ) {
                correct++;
            }

            if (correct === code.length ) {
                console.log("Yay you win!");
                correct = 0;
            }
        });
    });

}


$(document).ready(function() {

    app.$cssElement = $("#css");
    app.$codeElement = $("#cssbox");
    app.$codeBox = $(".code");

    app.generateLevel("Basic Shapes", "1");

});