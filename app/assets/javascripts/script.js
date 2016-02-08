var app = app || {};

app.$cssElement = $("<div/>");
app.$userCssElement = $("<div/>");
app.$codeElement = $("<div/>");
app.$codeBox = $("<div/>");

app.generateLineNumbers = function(lines) {
    var html = '<div class="line-numbers">';

    for (var i = 1; i <= lines; i++) {
        html += i + "<br>";
    }

    html += "</div>";
    app.$codeElement.css("height", (lines * 25) + "px");
    app.$codeElement.append(html);
}

app.generateCodebox = function(htmlBefore, htmlAfter, rows, id) {
    var html = "<pre>" + htmlBefore + "</pre>";
    html += '<textarea class="code" rows="' + rows + '" + id="' + id + '"></textarea>';
    html += "<pre>" + htmlAfter + "</pre>";
    app.$codeElement.append(html);
}

app.generateCssView = function(htmlCode, id) {
    var html = '<div class="cssview" id="' + id + '">';
    html += htmlCode;
    html += "</div>";
    app.$cssElement.append(html);
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
app.checkAnswer = function(userAnswer, answer, lines) {
    match = _.every(userAnswer, function (user_answer) {
        return _.some(answer, function (_answer) {

            if ( user_answer.attr && user_answer.attr === _answer.attr ) {
                var userAttr = app.$userCssElement.css(user_answer.attr);

                var userCss = app.checkline( /[-+]?[0-9]*\.?[0-9]*(.*)/, userAttr );
                var answerCss = app.checkline( /[-+]?\d*\.?\d*(.*);/, _answer.val );

                return ( userCss[1] === answerCss[1] &&
                        parseFloat(userAttr) >= parseFloat(_answer.val) ) ||
                        _.isEqual(user_answer, _answer)
            }
            // return _.isEqual(user_answer, _answer); // Use this line instead of above if block to check only for elements that match rather than matching keys/values.
        });
    });

    // if (match && userAnswer.length === app.numLines) {
    //     console.log("true");
    //     alert("Congrats, you made a red circle!");
    // }

    return match && userAnswer.length === lines;
}

/*
    function captureCode

    Parameters:
    $element (DOM Element)

    Captures any valid css code that the user inputs into specified $element/textarea.
*/
app.captureCode = function($element) {
    var code = $element.val().split("\n");
    var userAnswer = [];

        for (var i = 0; i < code.length; i++) {
            var css = app.checkline(/(\w+.*):\s?(.*;)/, code[i]);
            var obj = {};

            if (css[1]) {
                obj["attr"] = css[1];
                obj["val"] = app.$userCssElement.css(css[1]) + ";";
            }
            userAnswer.push(obj);
        }

    return userAnswer;
}

app.generateLevel = function(numTextareas, category, level) {
    var userElement = app.levels[category]["level"+level].userElement;
    var user = app.levels[category]["level"+level].user;
    var css = app.levels[category]["level"+level].css;

    app.generateCssView(user, "user-css");
    app.generateCssView(css, "example-css");

    app.$userCssElement = $("#" + userElement);

    app.generateLineNumbers(20);

    var code = app.levels[category]["level"+level].code;
    for (var i = 0; i < code.length; i++) {
        app.generateCodebox(code[i].before, code[i].after, code[i].rows, i);
    };

    correct = 0;

    $(".code").each(function() {

        $(this).on("keydown", function(event) {
            var linesOfCode = $(this).val().split("\n").length;
            if ( event.which === 13 && linesOfCode === parseInt( $(this).attr("rows") )  ) { return false; }
        });

        $(this).on("keyup", function() {
            app.$userCssElement.attr("style", $(this).val() );

            var userAnswer = app.captureCode( $(this) );
            var answer = app.levels[category]["level" + level].answers;
            var lines = app.levels[category]["level" + level].code
            var num = $(this).attr("id");

            if ( app.checkAnswer(userAnswer, answer[num], lines[num].rows ) ) {
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

    app.generateLevel(2, "Basic Shapes", "1");

});