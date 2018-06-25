// noinspection BadExpressionStatementJS
({
    type: "exam",
    stage: "大四",
    exams: [],
    actionsBefore: [
        flagged("#毕设未通过").then(increase("$不及格学分", 15)),
        not(flagged("#毕设未通过")).and(not(flagged("#挂科"))).and(not(flagged("#操统退课"))).and(not(flagged("#计原退课"))).then(achieve("满绩"))
    ],
    pages: [
        {
            id: "final",
            actionsBefore: [
                not(flagged("#毕设未通过")).and(not(flagged("#挂科"))).and(eq("#不及格课程", 0)).then(achieve("满绩"))
            ],
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
                decrease("#成绩", "#不及格课程"),
                ge("$不及格学分", 20).then(ending("被迫退学"))
            ]
        }
    ]
})
