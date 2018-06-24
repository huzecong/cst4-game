// noinspection BadExpressionStatementJS
({
    type: "exam",
    stage: "大二",
    actionsBefore: [],
    exams: [
        {
            name: "数据结构",
            points: 4,
            questions: [
                {
                    text: "将有序列表 L 均分为 Θ(h) 的 k 段，然后将每段随机打乱，则对 L 进行插入排序的复杂度至多为：",
                    answer: "Θ(h²k)",
                    choices: [
                        "Θ(hk)",
                        "Θ(hk²)",
                        "Θ(h²k²)"
                    ]
                }
            ]
        },
        // {
        //     name: "电子学基础",
        //     points: 3,
        // },
        // {
        //     name: "数字逻辑电路",
        //     points: 3,
        // },
    ],
    pages: [
        {
            id: "final",
            text: [
                ge("$不及格学分", 20).then("非常遗憾，你的不及格学分达到了20分，因此……").else([
                    "大二的考试周就这么过去了。",
                    gt("#不及格课程", 0).then("你有{#不及格课程}门考试不及格。你需要在大三重修这些课程，并再次参加考试。加油吧。")
                ])
            ],
            actions: [
                ge("$不及格学分", 20).then(ending("被迫退学"))
            ]
        }
    ]
})
