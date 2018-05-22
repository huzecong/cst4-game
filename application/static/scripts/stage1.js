// noinspection BadExpressionStatementJS
[{
    type: "main",
    name: "高考择校",
    stage: "入学前",
    pages: [
        {
            id: "start",
            text: [
                "高考的第一门科目是语文。",
                "你胸有成竹，抬起笔在答题纸上写下了自己的名字："
            ],
            input: "#姓名",
            actions: [
                eq("#姓名", "").then(jump("blank")).else(jump("name"))
            ]
        },
        {
            id: "blank",
            text: [
                "你太紧张了，甚至忘了写名字。可想而知，成绩惨不忍睹。于是你选择了复读。",
                "又是一年高考。你抬起笔，在答题纸上写下了自己的名字："
            ],
            input: "#姓名",
            actions: [
                eq("#姓名", "").then(jump("blank")).else(jump("name"))
            ]
        },
        {
            id: "name",
            text: [
                "你写下了你的名字：“{#姓名}”，然后开始答题。"
            ],
            actions: [
                set("$高考次数", 1),
                jump("choose")
            ]
        },
        {
            id: "choose",
            image: "高考择校/清北校徽.jpg",
            text: [
                eq("$复读次数", 0).then([
                    "高考结束了。",
                    "出分时，你惊喜地发现你比清华和北大的招生分数线高出了不少。",
                    "那么现在问题来了，是去清华，还是去北大呢？"
                ]).else([
                    gt("$复读次数", 1).then("又是一年高考。这是你第{$高考次数}次高考。").else("又是一年高考。"),
                    "出分时，你不出意外地地发现你比清华和北大的招生分数线高出了不少。",
                    "那么现在问题来了，是去清华，还是去北大呢？"
                ])
            ],
            choices: [
                {
                    text: eq("$复读次数", 0).then("当然是清华").else("还是清华吧"),
                    actions: [
                        jump("thu")
                    ]
                },
                {
                    text: eq("$复读次数", 0).then("当然是北大").else("还是北大吧"),
                    actions: [
                        ending("未名湖畔")
                    ]
                },
                {
                    text: eq("$复读次数", 0).then("分有点低，复读吧").else("分还是有点低，复读吧"),
                    actions: [
                        increase("$复读次数", 1),
                        increase("$高考次数", 1),
                        ge("$复读次数", 5).then(ending("看破红尘")).else(jump("choose"))
                    ]
                }
            ]
        },
        {
            id: "thu",
            image: "高考择校/清华学堂.jpg",
            text: [
                "你成功考入了清华大学计算机科学与技术系。在这里，你将度过你人生中非常精彩的四年。"
            ]
        }
    ]
}, {
    type: "main", // main, random
    name: "新生舞会",
    stage: "大一",
    pages: [ // 一个事件由若干页面组成
        {
            id: "start", // 指定页面的 id 作为其标示，在跳转和条件判断时用到
            // id 为 start 的页面会成为第一个被显示的
            image: "新生舞会/舞会培训.jpg",
            text: [ // 每个字符串代表一个自然段
                "某辅导员似乎说过，新生舞会是在大学期间唯一可以牵到女生的手的机会。",
                "马上要到舞会了，你选择："
            ],
            choices: [
                {
                    text: "邀请班上的女同学作为舞伴",
                    actions: [ // 选择选项带来的影响
                        jump("invite") // 跳转到 invite 页面
                    ]
                },
                {
                    text: "邀请室友作为舞伴",
                    actions: [
                        jump("roommate")
                    ]
                },
                {
                    text: "算了，还是呆在寝室里吧",
                    actions: [
                        jump("otaku")
                    ]
                }
            ]
        },
        {
            id: "invite",
            text: [
                "她答应了！你觉得自己在脱单的道路上向前迈出了历史性的第一步。",
                "今晚就是舞会了，你准备如何前往舞会现场？"
            ],
            choices: [
                {
                    text: "先去C楼买一枝花，然后带着花到楼下载她一起去",
                    actions: [
                        increase("#魅力", 2), // # 开头的是全局变量；令数值加 2
                        increase("$魅力", 2), // $ 开头的是局部变量，只在当前事件中有效
                        flag("$送花"),
                        flag("$载人") // flag 将布尔变量值设为 true ，类似还有 unflag
                    ]
                },
                {
                    text: "送花感觉有点尴尬，就到楼下载她去吧",
                    actions: [
                        increase("#魅力", 1),
                        increase("$魅力", 1),
                        flag("$载人")
                    ]
                },
                {
                    text: "自己没学会骑车载人，只能和她一同骑车前往",
                    actions: [
                        decrease("#魅力", 1),  // 令数值减 1
                        decrease("$魅力", 1)
                    ]
                }
            ],
            actions: [ // 页面影响会在选项影响之后执行
                jump("dance") // 注意：如果选项中有 jump ，会忽略页面的 jump
            ]
        },
        {
            id: "roommate",
            text: [
                "于是你骑车载着室友来到了舞会现场，在一对对西装配长裙的舞伴中，你们只能尴尬对视。",
                "好在现场还有配对的活动，你成功找到了异性舞伴。"
            ],
            actions: [
                jump("dance")
            ]
        },
        {
            id: "otaku",
            text: [
                "于是你在寝室度过了一晚上。",
                "因为辅导员也去舞会了，所以你光明正大地在寝室用起了电脑。",
                "室友回来后，你还对跳舞出糗的他进行了一番嘲笑。"
            ]
            // 如果页面没有执行 jump ，那么事件结束
        },
        {
            id: "dance",
            image: "新生舞会/舞会现场.jpg",
            text: [
                "最简单的交谊舞就是在地上画三角形。",
                "一嗒嗒、二嗒嗒、三嗒嗒。你们在舞池中跳了一支舞，你非常紧张，生怕踩到她的脚，一直低头注意着自己的步伐。",
                "曲终，你成功避开了她的脚。你对自己感到非常满意，但她似乎不是很开心的样子。下一支曲子就要开始了，于是你："
            ],
            choices: [
                {
                    text: "觉得她累了，提议休息一会"
                },
                {
                    text: "继续跳舞，还是得注意不能踩着她",
                    actions: [
                        increase("#魅力", -1), // 和 decrease(x, 1) 是相同的
                        increase("$魅力", -1)
                    ]
                },
                {
                    text: "继续跳舞，动作幅度小一些，不再只关注自己脚下",
                    actions: [
                        increase("#魅力", 2),
                        increase("$魅力", 2),
                    ],
                    condition: ge("$魅力", 1) // 需要满足条件才可以选择这一选项
                    /* 条件：
                       ge: >=
                       gt: >
                       le: <=
                       lt: <
                       eq: ==
                       ne: !=
                     */
                }
            ],
            actions: [
                jump("final")
            ]
        },
        {
            id: "final",
            image: "新生舞会/月亮.jpg",
            actionsBefore: [ // 在载入页面时即执行的动作
                ge("$魅力", 3).then(achieve("裙摆飘飘")) // 满足条件则解锁成就
            ],
            text: [
                "舞会结束了，你们走出了会场。夜空中没有云，今晚的月亮正圆。",
                "你送她回到了楼下，然后相互告别。",
                ge("$魅力", 3).then([ // 在满足条件时才会出现这一段文本
                    "就在你准备离开前，她喊住了你。",
                    "“{#姓名}，我今晚过得很开心，谢谢你。”她笑着对你说，然后转身向门口走去。",
                    "她的裙摆被风微微吹动，在你的心里泛起涟漪。"
                ]),
                ge("$魅力", 1).and(lt("$魅力", 3)).then([
                    flagged("$送花").then([
                        "她笑着谢谢你为她带的花，之后转身向门口走去。"
                    ]).else(flagged("$载人").then([
                        "她笑着谢谢你载她回来，之后转身向门口走去。"
                    ]))
                ]) // 条件可以嵌套
            ],
        }
    ]
}, {
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
}]
