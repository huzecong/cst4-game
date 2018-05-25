// noinspection BadExpressionStatementJS
({
    type: "random",
    name: "任选课",
    pages: [
        {
            id: "start",
            text: "清华开设了种类丰富的任选课，你对哪个方面的课程最感兴趣？",
            choices: [
                {
                    text: "历史人文类",
                    actions: [
                        jump("history")
                    ]
                },
                {
                    text: "政治经济类",
                    actions: [
                        jump("politics")
                    ]
                },
                {
                    text: "文化艺术类",
                    actions: [
                        jump("art")
                    ]
                }
            ]
        },
        {
            id: "history",
            text: [
                "你选上了《清史概要》这门课，经过一学期的学习，请问：",
                "历史上唯一一个起诉皇帝离婚的后妃是？"
            ],
            image: "任选课/文绣.jpg",
            choices: [
                {
                    text: "郭布罗·婉容",
                    actions: [
                        jump("wrong")
                    ]
                },
                {
                    text: "额尔德特·文绣",
                    actions: [
                        achieve("文史达人"),
                        flag("#任选课"),
                        jump("correct")
                    ]
                },
                {
                    text: "李淑贤",
                    actions: [
                        jump("wrong")
                    ]
                }
            ]
        },
        {
            id: "politics",
            text: [
                "你选上了《中国统一与台湾问题》这门课，经过一学期的学习，请问：",
                "台湾的“军公教”指的是？"
            ],
            image: "任选课/军公教.jpg",
            choices: [
                {
                    text: "以军方力量为主的政治派别",
                    actions: [
                        jump("wrong")
                    ]
                },
                {
                    text: "以军方和公务员力量为主的群体",
                    actions: [
                        jump("wrong")
                    ]
                },
                {
                    text: "由军人、公务员、教师组成的群体",
                    actions: [
                        achieve("政经达人"),
                        flag("#任选课"),
                        jump("correct")
                    ]
                }
            ]
        },
        {
            id: "art",
            text: [
                "你选上了《中国陶瓷艺术》这门课，经过一学期的学习，请问：",
                "清代著名陶瓷单品、现藏于清华大学艺术博物馆的豇豆红小盘是哪个年代的作品？"
            ],
            image: "任选课/豇豆红小盘.jpg",
            choices: [
                {
                    text: "康熙",
                    actions: [
                        jump("wrong")
                    ]
                },
                {
                    text: "雍正",
                    actions: [
                        achieve("艺术达人"),
                        flag("#任选课"),
                        jump("correct")
                    ]
                },
                {
                    text: "乾隆",
                    actions: [
                        jump("wrong")
                    ]
                }
            ]
        },
        {
            id: "correct",
            text: [
                "恭喜你通过任选课，离毕业又近了一步呢！"
            ]
        },
        {
            id: "wrong",
            text: [
                "很遗憾你没有通过，任选课也要认真学习哦~"
            ]
        }
    ]
})
