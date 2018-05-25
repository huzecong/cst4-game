// noinspection BadExpressionStatementJS
{
    type: "main",
    name: "软工组会",
    stage: "大三",
    pages: [
        {
            id: "start",
            // image: "软工组会/JIRA_issues.jpg",
            text: [
                "现在是星期三的晚上10点，这意味着明天是星期四。",
                "这也就意味着，明天有软工组会，而你们组这周甚至没有过一次commit。",
                "望着两位数的issue列表，你决定："
            ],
            choices: [
                {
                    text: "在微信群里向各位组员委婉地表达自己的担忧",
                    actions: [
                        ge("#社工", 2).then(jump("team")).else(jump("solo"))
                    ]
                },
                {
                    text: "抱起电脑冲向308爆肝",
                    actions: [
                        jump("qte-solo")
                    ]
                },
                {
                    text: "内心怀着恐惧安然睡去",
                    actions: [
                        jump("deadend")
                    ]
                }
            ]
        },
        {
            id: "team",
            // image: "软工组会/308.jpg",
            text: [
                "由于你平时就很有号召力，组员们纷纷表示愿意一同奋战，于是大家一同抱着电脑来到308爆肝。"
            ],
            actions: [
                flag("$合作"),
                increase("#社工", 1),
                jump("qte-team")
            ]
        },
        {
            id: "solo",
            text: [
                "可惜，组员们个个装死，没有办法，你只能："
            ],
            choices: [
                {
                    text: "抱起电脑冲向308爆肝",
                    actions: [
                        jump("qte-solo")
                    ]
                },
                {
                    text: "内心怀着恐惧安然睡去",
                    actions: [
                        jump("deadend")
                    ]
                }
            ]
        },
        {
            id: "qte-team",
            deadline: {
                targets: [40, 50],
                title: "肝软工组会",
                time: 12,
                moving: false,
                badChoices: 0
            },
            actions: [
                ge("$__QTE__", 2).then(jump("goodend")).else(
                    ge("$__QTE__", 1).then(jump("normalend")).else(jump("badend")))
            ]
        },
        {
            id: "qte-solo",
            deadline: {
                targets: [60, 70],
                title: "肝软工组会",
                time: 12,
                moving: true,
                badChoices: 2
            },
            actions: [
                ge("$__QTE__", 2).then(jump("goodend")).else(
                    ge("$__QTE__", 1).then(jump("normalend")).else(jump("badend")))
            ]
        },
        {
            id: "deadend",
            // image: "软工组会/微笑表情.jpg",
            text: [
                "第二天的组会上，你没有任何可以展示的东西。",
                "助教摆出了上面这幅表情，你知道自己这门课不妙了。"
            ],
            actions: [
                decrease("#成绩", 2)
            ]
        },
        {
            id: "badend",
            text: [
                "第二天的组会上，助教对你的进度非常不满意。",
                flagged("$合作")
                    .then("估计是看到了你们组所有人的黑眼圈，助教也没说什么，只是要求下周一定得有进展。")
                    .else("助教看到了你的黑眼圈，然后看了看你精神抖擞的组员们，似乎明白了什么。"),
                "也算是，度过了这次危机吧。"
            ],
            actions: [
                decrease("#成绩", 1)
            ]
        },
        {
            id: "normalend",
            text: [
                "第二天的组会上，助教对你的进度比较满意，你顺利地化解了这次危机。"
            ],
            actions: [
                increase("#成绩", 1)
            ]
        },
        {
            id: "goodend",
            text: [
                "第二天的组会上，你的展示非常成功。助教对你大加赞赏，其它组的同学纷纷向你投来佩服的目光。",
                flagged("$合作")
                    .then("你和你的组员脸上满是掩饰不住的自豪。")
                    .else("你摸了摸自己的头发，心里闪过一丝焦虑。")
            ],
            actions: [
                increase("#成绩", 2)
            ]
        }
    ]
}
