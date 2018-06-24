// noinspection BadExpressionStatementJS
({
    type: "exam",
    stage: "大四",
    exams: [],
    actionsBefore: [
        flagged("#毕设未通过").then(increase("$不及格学分", 15))
    ],
    pages: [
        {
            id: "final",
            text: [
                ge("$不及格学分", 20).then([
                    flagged("#毕设未通过").then(
                        "非常遗憾，你的不及格学分达到了20分，其中包括15学分的综合论文训练，因此……"
                    ).else(
                        "非常遗憾，你的不及格学分达到了20分，因此……"
                    )
                ]).else([
                    gt("#不及格课程", 0).then([
                        "可惜，大四毕业前你还是有不及格课程。",
                        "这意味着……"
                    ]).else([
                        "你通过了所有课程的考试！可喜可贺！"
                    ])
                ])
            ],
            actions: [
                ge("$不及格学分", 20).then(ending("退学"))
                    .else(gt("#不及格课程", 0).then(ending("结业")))
            ]
        }
    ]
})
