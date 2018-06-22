// noinspection BadExpressionStatementJS
({
    type: "exam",
    stage: "大四",
    conditions: gt("#不及格课程", 0),
    exams: [],
    pages: [
        {
            id: "final",
            text: [
                gt("#不及格课程", 0).then([
                    "可惜，大四毕业前你还是有不及格课程。",
                    "这意味着……"
                ]).else([
                    "你通过了所有课程的考试！可喜可贺！"
                ])
            ],
            actions: [
                gt("#不及格课程", 0).then(ending("结业"))
            ]
        }
    ]
})
