// noinspection BadExpressionStatementJS
({
    type: "exam",
    stage: "大三",
    actionsBefore: [],
    exams: [
        {
            name: "计算机组成原理",
            points: 4,
            condition: not(flagged("#计原退课")),
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
                    text: "下面是中断处理过程中的若干步骤，哪一个步骤在执行时不是必须关闭中断的？",
                    answer: "执行中断服务程序",
                    choices: [
                        "保存断点",
                        "判中断源，转中断服务",
                        "恢复断点"

                    ]
                },
                {
                    text: "我们在做大作业时，使用下面哪一款软件进行电路的综合：",
                    answer: "Xilinx ISE",
                    choices: [
                        "Quartus II",
                        "Vivado Design Suite",
                        "ModelSim"
                    ]
                }
            ]
        },
        {
            name: "计算机系统结构",
            points: 3,
            questions: [
                {
                    text: "下列哪本不是汪东升老师的推荐读物：",
                    answer: "《深入理解计算机系统》",
                    choices: [
                        "《秘密》",
                        "《人生十论》",
                        "《哈佛家书》",
                        "《Computer Architecture: A Quantitative Approach》"
                    ]
                },
                {
                    text: "Tomasulo算法的寄存器重命名技术<b>无法</b>避免下列哪种数据冲突：",
                    answer: "写后读（RAW）",
                    choices: [
                        "读后写（WAR）",
                        "写后写（WAW）"
                    ]
                }
            ]
        },
        {
            name: "操作系统",
            points: 3,
            condition: not(flagged("#操统退课")),
            questions: [
                {
                    text: "判断正误：考虑写操作情况的改进时钟页面替换算法不会存在Belady现象。",
                    answer: "错",
                    choices: [
                        "对"
                    ]
                },
                {
                    text: "在uCore中，以下哪个过程不可能在时钟中断处理例程中被执行：",
                    answer: "读取外设",
                    choices: [
                        "进程调度算法",
                        "唤醒调用wait而睡眠的进程",
                        "切换页表"
                    ]
                }
            ]
        },
    ],
    pages: [
        {
            id: "final",
            actionsBefore: [
                flagged("#操统退课").then(increase("#不及格课程", 1)),
                flagged("#计原退课").then(increase("#不及格课程", 1)),
                flagged("#操统退课").and(flagged("#计原退课")).then(
                    set("$msg", "，其中包括已退课的计算机组成原理与操作系统")
                ).else(flagged("#操统退课").then(
                    set("$msg", "，其中包括已退课的操作系统")
                ).else(flagged("#计原退课").then(
                    set("$msg", "，其中包括已退课的计算机组成原理")
                ).else(
                    set("$msg", "")
                )))
            ],
            text: [
                ge("$不及格学分", 20).then("非常遗憾，你的不及格学分达到了20分，因此……").else([
                    "你熬过了魔鬼一般的大三考试周。",
                    gt("#不及格课程", 0).then("注意，你仍有{#不及格课程}门课程未通过{$msg}。你需要在大四毕业前通过这些课程，否则无法正常毕业。")
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
