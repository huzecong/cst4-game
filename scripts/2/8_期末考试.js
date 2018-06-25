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
                },
                {
                    text: "下面哪种数据结构的查询（期望或均摊）时间复杂度最优？",
                    answer: "Trie（键树）",
                    choices: [
                        "二维情形的kd-树",
                        "伸展树",
                        "左偏树（左式堆）"
                    ]
                }
            ]
        },
        {
            name: "数字逻辑电路",
            points: 3,
            questions: [
                {
                    text: [
                        "~(A&B | ~C) | (A&~C) | B",
                        "上式是使用C语法表示的逻辑表达式，它与下面哪个表达式等价："
                    ],
                    answer: "(A^C) | B | (~B&C)",
                    choices: [
                        "(~A^C) | B | (~B&C)",
                        "(~A&~B) | B | C | (A&~C)",
                        "(~A&~B&C) | B | (A&~C)"
                    ]
                },
                {
                    text: "“点亮数字人生”实验的基础任务是：",
                    answer: "将拨码开关表示的二进制数显示在数码管上",
                    choices: [
                        "在数码管上显示自己的学号",
                        "按下按钮时令计数器加一，并将其值显示在数码管上",
                        "利用门电路芯片实现简单加法器"
                    ]
                }
            ]
        },
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
                decrease("#成绩", "#不及格课程"),
                gt("#不及格课程", 0).then(flag("#挂科")),
                ge("$不及格学分", 20).then(ending("被迫退学"))
            ]
        }
    ]
})
