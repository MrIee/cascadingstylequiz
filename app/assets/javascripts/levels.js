var app = app || {};

app.levels = {
    "Basic Shapes": {}
};

app.levels["Basic Shapes"].level1 = {
    answers : [
        [
            { attr: "border-radius", val: "50%;" },
            { attr: "border-radius", val: "75px;" },
            { attr: "background-color", val: "rgb(255, 0, 0);" },
            { attr: "background", val: "rgb(255, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box;" }
        ],
        [
            { attr: "border-color", val: "rgb(0, 255, 0) none repeat scroll 0% 0% / auto padding-box border-box;" }
        ]
    ],
    question: "",
    user: '<div class="user-circle" id="user-circle"></div>',
    css: '<div class="circle"></div>',
    code: [
        {
            before: "#circle {<br/>  height: 150px;<br/>  width: 150px;<br/>  border: 5px solid black;",
            after: "",
            rows: 2
        },
        {
            before: "/* More code here */",
            after: "}",
            rows: 1
        }
    ]
};