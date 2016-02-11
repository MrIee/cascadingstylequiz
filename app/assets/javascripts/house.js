app.levels["house"].title = "House";

app.levels["house"].level1 = {
    answers : [
        [
            { attr: "height", val: "100px;" },
            { attr: "border", val: "5px solid rgb(0, 0, 0);" },
            { attr: "background-color", val: "rgb(255, 255, 255);" },
            { attr: "background", val: "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box;" }
        ]
    ],
    question: "Build the walls",
    user: '<div class="user-housebase" id="user-housebase"></div>',
    css: '<div class="housebase"></div>',
    code: [
        {
            cssSelector: "#user-housebase",
            before: "#housebase {<br/>  width: 200px;",
            after: "}",
            rows: 3
        }
    ]
};

app.levels["house"].level2 = {
    answers : [
        [
            { attr: "width", val: "200px;" },
            { attr: "border-left", val: "100px solid rgba(0, 0, 0, 0);" },
            { attr: "border-right", val: "100px solid rgba(0, 0, 0, 0);" },
            { attr: "border-bottom", val: "100px solid rgb(165, 42, 42);" },
            { attr: "bottom", val: "100px;" },
            { attr: "top", val: "60px;" }
        ]
    ],
    question: "Build the roof",
    user: '<div class="user-houseroof" id="user-houseroof"></div><div class="housebase"></div>',
    css: '<div class="houseroof"></div><div class="housebase"></div>',
    code: [
        {
            cssSelector: "#user-houseroof",
            before: "#roof {<br/>  position: absolute;",
            after: "}",
            rows: 5
        }
    ]
};

app.levels["house"].level3 = {
    answers : [
        [
            { attr: "height", val: "50px;" },
            { attr: "width", val: "50px;" },
            { attr: "border-radius", val: "25px;" },
            { attr: "border-radius", val: "50%;" },
            { attr: "border-radius", val: "100%;" },
            { attr: "box-shadow", val: "rgb(255, 165, 0) 0px 0px 10px 5px;" },
            { attr: "background-color", val: "rgb(255, 255, 0);" },
            { attr: "background", val: "rgb(255, 255, 0) none repeat scroll 0% 0% / auto padding-box border-box;" }
        ]
    ],
    question: "Duck needs some light, turn on the sun.",
    user: '<div id="user-sun"></div><div class="houseroof"></div><div class="housebase"></div>',
    css: '<div class="sun"></div><div class="houseroof"></div><div class="housebase"></div>',
    code: [
        {
            cssSelector: "#user-sun",
            before: "#sun {<br/>",
            after: "}",
            rows: 5
        }
    ]
};