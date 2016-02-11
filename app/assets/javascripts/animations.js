app.levels["animations"].title = "Animations";

app.levels["animations"].level1 = {
    answers : [
        [
            { attr: "border-radius", val: "50%;" },
            { attr: "border-radius", val: "75px;" },
            { attr: "background-color", val: "rgb(255, 0, 0);" },
            { attr: "background", val: "rgb(255, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box;" }
        ]
    ],
    question: "Make a red circle",
    user: '<div class="user-circle center-shape" id="user-circle"></div>',
    css: '<div class="pacman-top"></div><div class="pacman-bottom"></div>',
    code: [
        {
            cssSelector: "#user-circle",
            before: "#circle {<br/>  height: 150px;<br/>  width: 150px;<br/>  border: 5px solid black;",
            after: "}",
            rows: 2
        }
    ]
};