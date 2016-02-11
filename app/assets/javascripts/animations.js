app.levels["animations"].title = "Animations";

app.levels["animations"].level1 = {
    answers : [
        [
            { attr: "animation", val: "chomp1 0.5s ease 0s infinite normal none running;" }
        ],
        [
            { attr: "animation", val: "chomp2 0.5s ease 0s infinite normal none running;" }
        ]
    ],
    question: "Make pacman eat",
    user: '<div class="center-shape"><div class="user-pacman-top" id="pacman-top"></div><div class="user-pacman-bottom" id="pacman-bottom"></div></div>',
    css: '<div class="center-shape"><div class="pacman-top"></div><div class="pacman-bottom"></div></div>',
    code: [
        {
            cssSelector: "#pacman-top",
            before: "#pacman-top {<br/>  height: 50px;<br/>  width: 100px;<br/>  border-radius: 50px 50px 0 0;<br/>  background-color: yellow;",
            after: "}<br/>",
            rows: 1
        },

        {
            cssSelector: "#pacman-bottom",
            before: "#pacman-bottom {<br/>  height: 50px;<br/>  width: 100px;<br/>  border-radius: 50px 50px 0 0;<br/>  background-color: yellow;",
            after: "}<br/><br/>@keyframes chomp1 {<br/>  0%   { transform: rotate(-35deg); }<br/>  50%   { transform: rotate(0deg); }<br/>  100% { transform: rotate(-35deg); }<br/>}<br/><br/>@keyframes chomp2 {<br/>  0%   { transform: rotate(35deg); }<br/>  50%   { transform: rotate(0deg); }<br/>  100% { transform: rotate(35deg); }<br/>}",
            rows: 1
        }
    ]
};