/*
Required gloabl variable:
    体力
    成绩
    魅力
    脱单
    性别 = '男'/'女'
    flag: 直博
Final pages of this scenario are:
    noreply
    noaboard
    paper
    letter
    zero
*/
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "暑期研修",
    stage: "大三暑假",
    pages: [
        {
            id: "start",
            //image:"TODO.jpg",
            text: [
                "世界这么大，我想去看看。",
                "暑期研修就是让你好(rou)好(shen)看(fan)看(qiang)的绝佳机会。",
                "你选择："
            ],
            choices: [
                {
                    text: "去国外有什么好，又远又村，还是世界一流的贵系好",
                    actions: [
                        jump("noaboard")
                    ]
                },
                {
                    text: "寒假发套磁信",
                    explanation: flagged("#直博").then("你已经保研了，暑假得在实验室干活").else("你的成绩不够，或是表达能力不强"),
                    condition: ge("#魅力", 1).and(ge("#成绩", 3)).and(not(flagged("#直博"))),
                    actions: [
                        jump("prepare")
                    ]
                },
                {
                    text: "二月发套瓷信",
                    explanation: flagged("#直博").then("你已经保研了，暑假得在实验室干活").else("你的表达能力不够强"),
                    condition: ge("#魅力", 4).and(not(flagged("#直博"))),
                    actions: [
                        jump("prepare")
                    ]
                },
                {
                    text: "三月发套瓷信",
                    explanation: "你已经保研了，暑假得在实验室干活",
                    condition: not(flagged("#直博")),
                    actions: [
                        jump("noreply")
                    ]
                },
                {
                    text: "参加官方暑研项目",
                    explanation: flagged("#直博").then("你已经保研了，暑假得在实验室干活").else("你的成绩不够"),
                    condition: ge("#成绩", 8).and(not(flagged("#直博"))),
                    actions: [
                        jump("prepare")
                    ]
                }
            ]
        },
        {
            id: "noreply",
            image: "暑研/无响应.jpg",
            text: [
                "也许是发得太迟，也许是运气不佳，",
                "你发出去的套磁邮件如石沉大海，",
                "于是，只好放弃暑研的打算咯。"
            ]
        },
        {
            id: "noaboard",
            //image:"TODO.jpg",
            text: [
                "在国内，",
                "抑或是在大佬组里搬砖，抑或是去某大(e)厂实习，",
                "你也度过了一个充实的暑假。"
            ]
        },
        {
            id: "prepare",
            image:"暑研/美国.jpg",
            text: [
                "你成功获得了美帝某谷/村的某知名高校的暑期研修机会！",
                "签证、报闯世界、租房子、机票……",
                "你稳如poi地完成了各项准备工作（额，虽然签证被check了两个月）",
                "美帝三月游，在你面前徐徐展开……"
            ],
            actions: [
                set("$friendship", 0),
                set("$research", 0),
                set("$lovepotential", 0),
                jump("lab")
            ]
        },
        {
            id: "lab",
            image: "暑研/托福小哥.jpg",
            text: [
                "在实验室，你遇到了一个萌萌哒的印度师兄（不要拿托福小哥骗我...）",
                "老板指定你就跟着他research了。",
                "这个周末，热爱music的师兄邀请你陪他去听orchestra。"
            ],
            choices: [
                {
                    text: "Oh sorry. I have so much laundry to do this weekend. Maybe next time?",
                    actions: [
                        increase("$friendship", 1),
                        jump("brorej")
                    ]
                },
                {
                    text: "Sure, I love orchestra too! Let's go together.",
                    actions: [
                        jump("bro")
                    ]
                }
            ]
        },
        {
            id: "bro",
            image: "暑研/orchestra.jpg",
            text: [
                "你和师兄一起看了场orchestra。",
                "虽然你觉得很无聊，但师兄津津有味。",
                "师兄为你能陪他而感到十分感动，你们结下了深厚的友谊。"
            ],
            actions: [
                jump("hanabi")
            ]
        },
        {
            id: "brorej",
            //image:"TODO.jpg",
            text: [
                "你拒绝了师兄的邀请。",
                "不过，师兄对你还是一如既往的nice。"
            ],
            actions: [
                jump("hanabi")
            ]
        },
        {
            id: "hanabi",
            //image:"TODO.jpg",
            text: [
                "转眼到了7月4日——美国的独立日。",
                "这一天有盛大的焰火表演。",
                "同行的小伙伴邀请你一起去看焰火。"
            ],
            choices: [
                {
                    text: "去去去，走起",
                    actions: [
                        jump("joinhanabi")
                    ]
                },
                {
                    text: "不不不，research更重要",
                    actions: [
                        increase("$research", 1),
                        jump("mid")
                    ]
                }
            ]
        },
        {
            id: "joinhanabi",
            image: "暑研/花火.jpg",
            text: [
                "焰火在城市上空美丽地绽放着。",
                "映照着一行人快乐的面庞。",
                "你们围坐在草地上，像周围正在picnic的美国人一样，",
                "打起了狼人杀（???）。",
                "“噢天呐，快看那群奇怪的中国人，他们在进行什么神秘的东方武术？”"
            ],
            actions: [
                increase("#魅力", 1),
                increase("$lovepotential", 1),
                jump("mid")
            ]
        },
        {
            id: "mid",
            image: "暑研/书堆.jpg",
            text: [
                "其实暑研生活中，占大头的，还是漫长又辛苦的research。",
                "和小学期的同学相比，只是换了个搬砖的地方..."
            ],
            actions: [
                jump("nyc")
            ]
        },
        {
            id: "nyc",
            //image:"TODO.jpg",
            text: [
                "暑研终于也要接近尾声了。",
                "在这小破地方憋久了，大家筹划着，要不一起去大纽约转转？"
            ],
            choices: [
                {
                    text: "去去去，走起",
                    actions: [
                        jump("joinnyc")
                    ]
                },
                {
                    text: "不不不，research更重要",
                    actions: [
                        increase("$research", 1),
                        jump("work")
                    ]
                }
            ]
        },
        {
            id: "joinnyc",
            image: "暑研/洛克菲勒.jpg",
            text: [
                "于是，一行人就这么浩浩荡荡来到了大纽约。",
                "百老汇、自由女神、华尔街、大都会博物馆……",
                "浪得真过瘾~"
            ],
            actions: [
                increase("#魅力", 1),
                increase("$lovepotential", 1),
                ge("$lovepotential", 2).and(not(flagged("#脱单"))).then(jump("love")).else(jump("work"))
                // ge("#魅力", 2).and(ge("$lovepotential", 2)).and(not(flagged("#脱单"))).then(jump("love")).else(jump("work"))
            ]
        },
        {
            id: "love",
            image: "暑研/酒杯.jpg",
            text: [
                "在灯红酒绿地曼哈顿，",
                "几轮下来，大家在bar里都有点微醺，",
                eq("#性别", "男").then([
                    "两次旅行下来，其实你早就注意到了那娟秀美丽的她。",
                    "当你再次看着她时，发现，有些许醉意的她早已盯住你好久了。",
                    "不顾旁人的目光，她拉着你到了酒吧里一个无人的小角落。",
                    "“今晚曼哈顿的夜色真美！”她说。",
                    "鬼使神差，不停使唤地，你说：“做我女朋友好吗？”",
                    "她不假思索：“当然好啊！”",
                    "仲夏的曼哈顿，明朗的月光下，这不夜城，见证着这段美妙爱情的产生。"
                ]).else([
                    "两次旅行下来，其实你早就注意到了那帅气俊朗的他。",
                    "当你再次偷偷瞄向她时，你一愣——有些许醉意的他早已盯住你好久了。",
                    "不顾旁人的目光，他拉着你到了酒吧里一个无人的小角落。",
                    "“其实……你知道吗？”平时胆大豪放的他竟变得害羞而腼腆。“我……”",
                    "“其实……我……喜欢你！做我女朋友好吗？”",
                    "震惊的你还没想好怎么回答，但醉酒后的身体仿佛并不听自己使唤“当然好啊！”",
                    "仲夏的曼哈顿，明朗的月光下，这不夜城，见证着这段美妙爱情的产生。"
                ])
            ],
            actions: [
                flag("#脱单"),
                achieve("恋爱"),
                increase("#魅力", 1),
                jump("work")
            ]
        },
        {
            id: "work",
            image: "暑研/ddl.jpg",
            text: [
                "转眼间，暑研就要结束了。",
                "你的老板希望能发一篇paper，而你的进度仍然遥遥无期……",
                "没办法，只好肝一肝了。"
            ],
            actions: [
                jump("work_qte")
            ]
        },
        {
            id: "work_qte",
            deadline: {
                targets: [50, 60],
                title: "赶paper",
                time: 12,
                moving: true,
                badChoices: 3
            },
            actions: [
                eq("$__QTE__", 2).then(
                    eq("$research", 2).then(
                        jump("paper")
                    ).else(
                        jump("letter")
                    )
                )
                    .else(
                        eq("$__QTE__", 1).then(
                            eq("$research", 2).then(
                                jump("paper")
                            ).else(
                                eq("$research", 1).then(
                                    jump("letter")
                                ).else(
                                    eq("$friendship", 1).then(
                                        jump("friendletter")
                                    ).else(
                                        jump("zero")
                                    )
                                )
                            )
                        ).else(
                            eq("$research", 2).then(
                                jump("letter")
                            ).else(
                                eq("$friendship", 1).then(
                                    jump("friendletter")
                                ).else(
                                    jump("zero")
                                )
                            )
                        )
                    )
            ]
        },
        {
            id: "friendletter",
            //image:"TODO.jpg",
            text: [
                "虽然你并没有做出让老板特别满意的结果。",
                "不过那场orchestra让你和师兄培养了极好的革命友谊。",
                "在师兄的帮助下，老板对你仍给予了高度评价。"
            ],
            actions: [
                jump("letter")
            ]
        },
        {
            id: "paper",
            //image:"TODO.jpg",
            actionsBefore: [
                achieve("顶会paper"),
                achieve("大牛老板的推荐信")
            ],
            text: [
                "爆肝了一个暑假。",
                "老板非常满意你的成果，决定在你的暑研总结基础上稍加修改，撰写成一篇paper去投稿顶会！",
                "暑研结束后，老板私下请你去米其林餐厅大吃一顿，怂恿你申请他的博士。",
                "至于推荐信嘛，那更不是问题啦。"
            ],
            actions: [
                increase("#成绩", 4),
                increase("#魅力", 2)
            ]
        },
        {
            id: "letter",
            //image:"TODO.jpg",
            actionsBefore: [
                achieve("大牛老板的推荐信")
            ],
            text: [
                "暑研结束了。",
                "在告别meeting上，你忐忑地问了老板一个请求：",
                "能否给我写一封强推荐信？",
                "老板欣然答应！"
            ],
            actions: [
                increase("#成绩", 2),
                increase("#魅力", 1)
            ]
        },
        {
            id: "zero",
            //image:"TODO.jpg",
            text: [
                "暑研结束了。",
                "由于浪得太多，你并没有做出让老板满意的成果。",
                "你委婉地问老板能否写封强推荐信，",
                "老板谢绝了……",
                "不过，至少玩得很开心，也足够啦！"
            ],
            actions: [
                decrease("#成绩", 2)
            ]
        }
    ]
})
