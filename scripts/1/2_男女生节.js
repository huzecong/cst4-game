/*
Required global variables:
    性别 = "男", "女"
    魅力
    体力
Final pages of this scenario are:
    rose_end
    portrait_end
    breakfast_end
    keyboard_end
    snacks_end
    pillow_end
 */
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "男女生节",
    stage: "大一",
    pages: [
        {
            id: "start",
            actionsBefore: [
                eq("#性别", "男").then([
                    set("$TA", "她"),
                    set("$festival", "女生节"),
                    set("$who", "女生")
                ]).else([
                    set("$TA", "他"),
                    set("$festival", "男生节"),
                    set("$who", "男生")
                ])
            ],
            actions: [
                eq("#性别", "男").then(
                    jump("girl_festival")
                ).else(
                    jump("boy_festival")
                )
            ],
            text: [
                flagged("#班长").then(
                    "{$festival}就要到了，作为班长，你毅然决然扛起了这个锅。"
                ).else(
                    "{$festival}就要到了，班长觉得你非常懂{$who}，所以准备接锅吧！"
                )
            ],
        },
        {
            id: "girl_festival",
            text: [
                flagged("#班长").then(
                    "最重要的任务自然是挑礼物。经过一番挑选，你正纠结如下的选项："
                ).else(
                    "班长想把最重要的任务交给了你——挑礼物。经过一番挑选，你正纠结如下的选项："
                )
            ],
            choices: [
                {
                    text: "每人19朵玫瑰花",
                    actions: [
                        jump("rose_end")
                    ]
                },
                {
                    text: "女生头像做的相框",
                    actions: [
                        jump("portrait_end")
                    ]
                },
                {
                    text: "准备爱心早餐",
                    actions: [
                        jump("breakfast_end")
                    ]
                }
            ]
        },
        {
            id: "rose_end",
            text: [
                "你的浪漫打动了班中每一位女生，她们噙着泪水，感慨你是第一个给她们送花的男士。",
            ],
            actions: [
                increase("#魅力", 3)
            ]
        },
        {
            id: "portrait_end",
            text: [
                "你的体贴和用心改变了他们对于贵系男生的看法，有人甚至给你留下了充满爱意的小纸条。",
            ],
            actions: [
                increase("#魅力", 2)
            ]
        },
        {
            id: "breakfast_end",
            text: [
                "虽然当着你的面，她们努力微笑，并表达惊喜之情。但……老实说，她们觉得礼物毫无新意……而且有点懒。",
            ],
            actions: [
                decrease("#魅力", 3)
            ]
        },
        {
            id: "boy_festival",
            text: [
                flagged("#班长").then(
                    "最重要的任务自然是挑礼物。经过一番挑选，你正纠结如下的选项："
                ).else(
                    "班长想把最重要的任务交给了你——挑礼物。经过一番挑选，你正纠结如下的选项："
                )
            ],
            choices: [
                {
                    text: "Cherry机械键盘",
                    actions: [
                        jump("keyboard_end")
                    ]
                },
                {
                    text: "自己最爱吃的零食",
                    actions: [
                        jump("snacks_end")
                    ]
                },
                {
                    text: "二次元抱枕",
                    actions: [
                        jump("pillow_end")
                    ]
                }
            ]
        },
        {
            id: "keyboard_end",
            text: [
                "您知道您班中有多少男生吗？您知道Cherry机械键盘多贵吗？醒醒吧，你买不起的。",
            ],
            actions: [
                decrease("#魅力", 1)
            ]
        },
        {
            id: "snacks_end",
            text: [
                "男生们欣然接受了，并表示在他们心里，你是最棒（pang）的。",
            ],
            actions: [
                increase("#魅力", 2)
            ]
        },
        {
            id: "pillow_end",
            text: [
                "你果然很了解宅男们的偏好，并把他们安排的服服帖帖。",
            ],
            actions: [
                increase("#魅力", 3)
            ]
        },
    ]
})
