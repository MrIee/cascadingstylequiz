var app = app || {};

app.numLines = 2;
app.$cssElement = $("#css");
app.$codeElement = $("#cssbox");
app.$codeBox = $(".code");

app.generateLineNumbers = function(lines, $element) {
    var html = '<div class="line-numbers">';

    for (var i = 1; i <= lines; i++) {
        html += i + "<br>";
    }

    html += "</div>";
    $element.css("height", (lines * 26) + "px");
    return html;
}

app.generateCodebox = function(htmlBefore, htmlAfter, rows) {
    var html = "<pre>" + htmlBefore + "</pre>";
    html += '<textarea class="code" rows="' + rows + '" autofocus></textarea>';
    html += "<pre>" + htmlAfter + "</pre>";
    app$cssElement.append(html);
}

app.generateCssView = function($element, htmlCode, id) {
    var html = '<div class="cssview" id="' + id + '">';
    html += htmlCode;
    html += "</div>";
    app$codeElement.append(html);
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
app.checkAnswer = function(userAnswer, answer) {

    match = _.every(userAnswer, function (user_answer) {
        return _.some(answer, function (_answer) {

            if ( user_answer.attr && user_answer.attr === _answer.attr ) {
                var userAttr = app$cssElement.css(user_answer.attr);

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

    return match && userAnswer.length === app.numLines;
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
                obj["val"] = $("#user-circle").css(css[1]) + ";";
            }
            userAnswer.push(obj);
        }

    return userAnswer;
}

app.generateLevel = function(numTextareas, category, level) {
    app.generateCssView(app.html[level].user, "user-css");
    app.generateCssView(app.html[level].css, "example-css");

    app.generateLineNumbers(20, $codeElement);

    var code = app.levels[category]["level"+level].code;
    _.each(code, function(c) {
        app.generateCodebox(c.before, c.after, c.rows);
    });

    answers = [];

    $codeBox.each(function() {
        $(this).on("keydown", function(event) {
            var linesOfCode = $(this).val().split("\n").length;
            if (event.which === 13 && linesOfCode === app.numLines) { return false; }
        });

        $(this).on("keyup", function() {
            $cssElement.attr("style", $userCode.val() );
            var userAnswer = app.captureCode($userCode);
            answers += app.checkAnswer(userAnswer, app.answer, $cssElement);
        });

        if ( _.every(answers) ) {
            alert("Yay, you got it correct!");
        }

    });
}


$(document).ready(function() {
    $cssElement = $("#user-circle");
    $userCode = $("#code");

    $userCode.attr("rows", app.numLines);

    $userCode.on("keydown", function(event) {
        var linesOfCode = $(this).val().split("\n").length;
        if (event.which === 13 && linesOfCode === app.numLines) { return false; }
    });

    $userCode.on("keyup", function() {
        $cssElement.attr("style", $userCode.val() );
        var userAnswer = app.captureCode($userCode);
        app.checkAnswer(userAnswer, app.answer, $cssElement);
    });

});