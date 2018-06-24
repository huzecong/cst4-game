/*
Required gloabl variable:
    体力
    成绩
    魅力
    性别 = '男'/'女'
Final pages of this scenario are:
    nocompany
    success
    fail
*/
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "实习支线",
    stage: "大三",
    pages: [
        {
            id: "start",
            //image:"TODO.jpg",
            text: [
                "渐渐地，年级群里带“内推”字样的消息多了起来。",
                "在工业界实践课堂所学似乎看上去很有吸引力。",
                "你选择："
            ],
            choices: [
                {
                    text: "还是在学校上课/科研好，赶路多累啊……",
                    actions: [
                        jump("nocompany")
                    ]
                },
                {
                    text: "向认识的学长请求内推",
                    actions: [
                        ge("#成绩",4).then(jump("prepare")).else(jump("noreply"))
                    ]
                },
                {
                    text: "直接向公司网站投递简历",
                    actions: [
                        ge("#成绩",7).then(jump("prepare")).else(jump("noreply"))
                    ]
                }
            ]
        },
        {
            id: "noreply",
            //image:"TODO.jpg",
            text: [
                "也许是发得太迟，也许是运气不佳，",
                "你发出去的简历如石沉大海，",
                "于是，只好放弃实习的打算咯。"
            ]
        },
        {
            id: "nocompany",
            //image:"TODO.jpg",
            text: [
                "虽然没有去实习，",
                "但你也在实验室/课堂上做出了项目，证明了自己。"
            ]
        },
        {
            id: "prepare",
            //image:"TODO.jpg",
            text: [
                "突然有一天，你接到了某AI独角兽公司Sense++的电话！",
                "兴致勃勃的你，在约定的时间来到了高大上的公司办公室，",
                "走进会议室，一位{$面试官}正坐在桌子后面带微笑地看着你……"
            ],
            actionsBefore: [
                eq("#性别", "女").then(
                    set("$面试官", "帅气的程序员小哥哥")
                ).else(
                    set("$面试官", "美丽的程序员小姐姐")
                )
            ],
            actions: [
                set("$score", 0),
                jump("q1")
            ]
        },
        {
            id: "q1",
            //image:"TODO.jpg",
            text: [
                "“请你简单地介绍一下自己吧？”"
            ],
            choices: [
                {
                    text: "一句三顿、稍带结巴地背诵事先准备的内容",
                    actions: [
                        increase("$score", 1),
                        jump("q2")
                    ]
                },
                {
                    text: "即兴发挥，将自己的学习成绩、项目经历娓娓道来",
                    actions: [
                        ge("#魅力", 4).then([
                            increase("$score", 2),
                            jump("q2")
                        ]).else(jump("q1fail"))
                    ],
                    explanation: "平时与人沟通太少，没有练习表达能力",
                    condition: ge("#魅力", 2)
                }
            ]
        },
        {
            id: "q1fail",
            //image:"TODO.jpg",
            text: [
                "然而，由于之前和异性说话太少，你的介绍没有像你想得那么流利……"
            ],
            actions: [
                jump("q2")
            ]
        },
        {
            id: "q2",
            //image:"TODO.jpg",
            text: [
                "“嗯……好的。请你在这张纸上写一下二叉树的后序遍历算法吧。”"
            ],
            choices: [
                {
                    text: "写出简单的、基于递归的算法",
                    actions: [
                        increase("$score", 1),
                        jump("q3")
                    ]
                },
                {
                    text: "写出稍微复杂的、基于迭代的算法",
                    actions: [
                        ge("#成绩", 4).then([
                            increase("$score", 2),
                            jump("q3")
                        ]).else(jump("q2fail"))
                    ],
                }
            ]
        },
        {
            id: "q2fail",
            //image:"TODO.jpg",
            text: [
                "然而，由于数据结构课程知识不扎实，你写的代码中有三四个bug……"
            ],
            actions: [
                jump("q3")
            ]
        },
        {
            id: "q3",
            //image:"TODO.jpg",
            text: [
                "“如果你被录用，你每周可以来公司多久？”"
            ],
            choices: [
                {
                    text: "说明课程压力，只能每周抽空来",
                    actions: [
                        increase("$score", 1),
                        jump("final")
                    ]
                },
                {
                    text: "强调自己有精力，即使在晚上也愿意来",
                    actions: [
                        ge("#体力", 4).then([
                            increase("$score", 2),
                            jump("final")
                        ]).else(jump("q3fail"))
                    ],
                }
            ]
        },
        {
            id: "q3fail",
            //image:"TODO.jpg",
            text: [
                "面试官看了看你稍有些重的黑眼圈，叹了口气……"
            ],
            actions: [
                jump("final")
            ]
        },
        {
            id: "final",
            //image:"TODO.jpg",
            text: [
                "“我们会尽快把结果告诉你的~”",
                "看着{$面试官}，你不舍地踏出了公司大门。"
            ],
            actions: [
                gt("$score", 3).then(
                    jump("success")
                ).else(
                    jump("fail")
                )
            ]
        },
        {
            id: "fail",
            text: [
                "你在学校等啊等，但始终没收到小姐姐的电话。",
                "“也许现在的我还没准备好呢。”你暗自想道。"
            ]
        },
        {
            id: "success",
            //image:"TODO.jpg",
            text: [
                "四个工作日后，你等来了HR小姐姐的电话，",
                "七个工作日后，你领到了工牌，成为了Sense++的一员~",
                "在此之后，你努力参与了~~~此处商业机密~~~项目",
                "终于拿到了你亲手挣到的第一笔工资 :)"
            ]
        }
    ]
})
