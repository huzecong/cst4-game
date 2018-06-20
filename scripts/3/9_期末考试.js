// noinspection BadExpressionStatementJS
({
    type: "exam",
    actionsBefore: [
    ],
    exams: [
        {
            name: "计算机组成原理",
            points: 4,
            questions: [
                {
                    text: "不可用于解决控制冲突的是：",
                    answer: "旁路",
                    choices: [
                        "插入气泡",
                        "延迟槽",
                        "分支预测"
                    ]
                },
                {
                    text: "下面是中断处理过程中的若干步骤，哪一个步骤在执行是不需要关中断的？",
                    answer: "执行中断服务程序",
                    choices: [
                        "保存断点",
                        "判中断源，转中断服务",
                        "恢复断点"

                    ]
                }
            ]
        },
        // {
        //     name: "信号处理原理"
        //     points: 3,
        // },
        {
            name: "操作系统",
            points: 3,
            questions: [
                {
                    text: "判断正误：考虑写操作情况的改进时钟页面替换算法不会存在Belady现象。",
                    answer: "错",
                    choices: [
                        "对"
                    ]
                },
            ]
        },
    ],
    pages: [
        {
            id: "final",
            text: [
                "你熬过了魔鬼一般的大三考试周。",
                gt("#不及格课程", 0).then("注意，你有{#不及格课程}门考试不及格。你需要在大四毕业前通过这些课程，不然没法正常毕业。")
            ]
        }
    ]
})
