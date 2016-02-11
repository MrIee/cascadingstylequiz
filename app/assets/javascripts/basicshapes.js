app.levels["basicshapes"].title = "Basic Shapes";

app.levels["basicshapes"].level1 = {
    answers : [
        [
            { attr: "border-radius", val: "50%;" },
            { attr: "border-radius", val: "100%;" },
            { attr: "border-radius", val: "75px;" },
            { attr: "background-color", val: "rgb(255, 0, 0);" },
            { attr: "background", val: "rgb(255, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box;" }
        ]
    ],
    question: "Make a red circle",
    user: '<div class="user-circle center-shape" id="user-circle"></div>',
    css: '<div class="circle center-shape"></div>',
    code: [
        {
            cssSelector: "#user-circle",
            before: "#circle {<br/>  height: 150px;<br/>  width: 150px;<br/>  border: 5px solid black;",
            after: "}",
            rows: 2
        }
    ]
};

app.levels["basicshapes"].level2 = {
    answers : [
        [
            { attr: "border-bottom", val: "75px solid rgb(255, 0, 0);" }
        ]
    ],
    question: "Make a red triangle",
    user: '<div class="user-triangle center-shape" id="user-triangle"></div>',
    css: '<div class="triangle center-shape"></div>',
    code: [
        {
            cssSelector: "#user-triangle",
            before: "#triangle {<br/>  height: 0px;<br/>  width: 0px;<br/>  border: 75px solid transparent;",
            after: "}",
            rows: 1
        }
    ]
};

app.levels["basicshapes"].level3 = {
    answers : [
        [
            { attr: "border-top", val: "100px solid rgb(255, 0, 0);" },
            { attr: "border-left", val: "100px solid rgba(0, 0, 0, 0);" }
        ]
    ],
    question: "Make another red triangle",
    user: '<div class="user-triangle-topright center-shape" id="user-triangle-topright"></div>',
    css: '<div class="triangle-topright center-shape"></div>',
    code: [
        {
            cssSelector: "#user-triangle-topright",
            before: "#triangle-topright {<br/>  height: 0px;<br/>  width: 0px;",
            after: "}",
            rows: 2
        }
    ]
};

app.levels["basicshapes"].level4 = {
    answers : [
        [
            { attr: "border-bottom", val: "100px solid rgb(255, 0, 0);" },
            { attr: "border-left", val: "50px solid rgba(0, 0, 0, 0);" },
            { attr: "border-right", val: "50px solid rgba(0, 0, 0, 0);" }
        ]
    ],
    question: "Make a trapezoid",
    user: '<div class="user-trapezoid center-shape" id="user-trapezoid"></div>',
    css: '<div class="trapezoid center-shape"></div>',
    code: [
        {
            cssSelector: "#user-trapezoid",
            before: "#trapezoid {<br/>  height: 0px;<br/>  width: 100px;",
            after: "}",
            rows: 3
        }
    ]
};

app.levels["basicshapes"].level5 = {
    answers : [
        [
            { attr: "background-color", val: "rgb(255, 0, 0);" },
            { attr: "background", val: "rgb(255, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box;" },
            { attr: "transform", val: "matrix(1, 0, 0.36397, 1, 0, 0);" }
        ]
    ],
    question: "Make a parallelogram",
    user: '<div class="user-parallelogram center-shape" id="user-parallelogram"></div>',
    css: '<div class="parallelogram center-shape"></div>',
    code: [
        {
            cssSelector: "#user-parallelogram",
            before: "#parallelogram {<br/>  height: 150px;<br/>  width: 100px;<br/>  border: 5px solid black",
            after: "}",
            rows: 2
        }
    ]
};