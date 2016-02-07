var app = app || {};

app.answer = [
    { attr: "border-radius", val: "50%;" },
    { attr: "border-radius", val: "75px;" },
    { attr: "background-color", val: "rgb(255, 0, 0);" },
    { attr: "background", val: "rgb(255, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box;" }
];

app.numLines = 2;

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
app.checkAnswer = function(userAnswer, answer, $cssElement) {

    match = _.every(userAnswer, function (user_answer) {
        return _.some(answer, function (_answer) {

            if ( user_answer.attr && user_answer.attr === _answer.attr ) {
                var userAttr = $cssElement.css(user_answer.attr);

                var userCss = app.checkline( /[-+]?[0-9]*\.?[0-9]*(.*)/, userAttr );
                var answerCss = app.checkline( /[-+]?\d*\.?\d*(.*);/, _answer.val );

                return ( userCss[1] === answerCss[1] &&
                        parseFloat(userAttr) >= parseFloat(_answer.val) ) ||
                        _.isEqual(user_answer, _answer)
            }
            // return _.isEqual(user_answer, _answer); // Use this line instead of above if block to check only for elements that match rather than keys/values.
        });
    });

    if (match && userAnswer.length === app.numLines) {
        console.log("true");
        alert("Congrats, you made a red circle!");
    }
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