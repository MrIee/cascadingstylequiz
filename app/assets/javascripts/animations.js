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
    question: "Make pacman eat",
    user: '<div class="center-shape"><div class="user-pacman-top" id="pacman-top"></div><div class="user-pacman-bottom" id="pacman-bottom"></div></div>',
    css: '<div class="center-shape"><div class="pacman-top"></div><div class="pacman-bottom"></div></div>',
    code: [
        {
            cssSelector: "#pacman-top",
            before: "#pacman-top {\n  height: 50px;\n  width: 100px;\n  border-radius: 50px 50px 0 0;\n  -webkit-transform: rotate(-35deg);\n  -moz-transform: rotate(-35deg);\n  transform: rotate(-35deg);\n  background-color: yellow;",
            after: "}\n",
            rows: 1
        },

        {
            cssSelector: "#pacman-bottom",
            before: "#pacman-bottom {\n  height: 50px;\n  width: 100px;\n  border-radius: 50px 50px 0 0;\n  -webkit-transform: rotate(35deg);\n  -moz-transform: rotate(35deg);\n  transform: rotate(35deg);\n  background-color: yellow;",
            after: "}\n\n@keyframes chomp1 {\n  0%   { transform: rotate(-35deg); }\n  50%   { transform: rotate(0deg); }\n  100% { transform: rotate(-35deg); }\n}\n\n@keyframes chomp2 {\n  0%   { transform: rotate(35deg); }\n  50%   { transform: rotate(0deg); }\n  100% { transform: rotate(35deg); }\n}",
            rows: 1
        }
    ]
};