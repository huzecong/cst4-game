/*
Required global variables:
    性别 = "男", "女"
    脱单
    魅力
    体力
Final pages of this scenario are:
    nosocialwork
    singbadend
    comfortbadend
    comfortgoodend
    comfortnormalend
    celebrateend
    meetingend0
    meetingend1
    meetingend2
    meetingend3
 */
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "系内社工",
    stage: "大二",
    pages: [
        {
            id: "start",
            actionsBefore: [
                flagged("#脱单").then(
                    eq("#性别", "男").then(
                        set("$对象", "女朋友")
                    ).else(
                        set("$对象", "男朋友")
                    )
                ).else(
                    eq("#性别", "男").then(
                        set("$对象", "心仪的妹子")
                    ).else(
                        set("$对象", "心仪的汉子")
                    )
                ),
                eq("#性别", "男").then(
                    set("$TA", "她")
                ).else(
                    set("$TA", "他")
                )
            ],
            // image: "招新现场",
            text: [
                "大二伊始，优秀的你成功引起了系学生会与科协主席的注意，他们三顾茅庐，久立风寒而不去，终于目睹了你的尊容。",
                "随后他们激动地为你展开两组织的灿烂蓝图，望着他们那真诚的小眼神，你决定：",
            ],
            choices: [
                {
                    text: "加入学生会",
                    actions: [
                        increase("#魅力", 2),
                        increase("#社工", 2),
                        decrease("#体力", 2),
                        set("$sast", "0"),
                        jump("studentunion")
                    ],
                    condition: ge("#体力", 2),
                    explanation: "精力不足"
                },
                {
                    text: "加入科协",
                    actions: [
                        increase("#魅力", 2),
                        increase("#社工", 2),
                        decrease("#体力", 2),
                        jump("sast")
                    ],
                    condition: ge("#体力", 2),
                    explanation: "精力不足"
                },
                {
                    text: "学生会、科协我全都要！",
                    actions: [
                        increase("#魅力", 4),
                        increase("#社工", 2),
                        decrease("#体力", 5),
                        set("$sast", "1"),
                        jump("studentunion")
                    ],
                    condition: ge("#体力", 5),
                    explanation: "精力不足"
                },
                {
                    text: "啥都不选",
                    actions: [
                        jump("nosocialwork")
                    ]
                }
            ]
        },
        {
            id: "studentunion",
            image: "学生会/学生会主席.jpg",
            text: [
                "和学生会主席一阵尬聊……"
            ],
            actions: [
                jump("host")
            ]
        },
        {
            id: "host",
            text: [
                "学生节就要到了，在一次例会上面，主席需要两个人来写学生节的主持人招募。",
                "其中你{$对象}自告奋勇，此时你选择："
            ],
            choices: [
                {
                    text: "同样自告奋勇",
                    actions: [
                        decrease("#体力", 1),
                        jump("hostend")
                    ],
                    condition: ge("#体力", 1),
                    explanation: "精力不足，无法接锅"
                },
                {
                    text: "默默不说话",
                    actions: [
                        jump("sing")
                    ]
                }
            ]
        },
        {
            id: "hostend",
            text: [
                // todo 魅力阈值 待定吧
                flagged("#脱单").or(ge("#魅力", 4)).then([
                    "主席把任务安排给了你们。",
                    "你们的关系在合作中得到了升华。"
                ]).else([
                    "{$对象}有些深情地望向你，然后突然甩锅……",
                    "于是你只好和另一个人去完成这项工作。"
                ])
            ],
            actions: [
                not(flagged("#脱单")).and(ge("#魅力", 4)).then(increase("#魅力", 1)),
                jump("sing")
            ]
        },
        {
            id: "sing",
            text: [
                "由于你的文艺副主席特别喜爱你，在系歌赛的筹备期安排了一个重要的活（guo）——联系评委。",
                "你{$对象}歌声清甜，正巧也参加了这次系歌赛。",
                "你想利用这次机会为她谋取福利！",
                "你拿到了联系名单，你准备邀请下面的哪一位作为评委："
            ],
            choices: [
                {
                    text: "以摇滚出道的老牌音乐家（虽然不太出名），照片看起来有些冷酷",
                    actions: [
                        jump("jurya")
                    ]
                },
                {
                    text: eq("#性别", "男").then(
                        "一名不具名人士，简介上写着：喜好甜美的女声；照片上看，长着一副足以令万千少男少女为之动容的盛世美颜"
                    ).else(
                        "一名不具名人士，简介上写着：喜好甜美的男声；照片上看，长着一副足以令万千少男少女为之动容的盛世美颜"
                    ),
                    actions: [
                        jump("juryb")
                    ]
                },
                {
                    text: "清华的流行乐天王，素有小周杰伦之称",
                    actions: [
                        jump("juryc")
                    ]
                }
            ]
        },
        {
            id: "jurya",
            text: [
                "评委对你{$对象}的歌声并不感冒，最后{$TA}的结果并不理想。",
                "一位同学以一首《你不要再问我》夺得了冠军。"
            ],
            actions: [
                jump("comfort")
            ]
        },
        {
            id: "juryb",
            text: [
                "评委对你{$对象}的歌声并不感冒，但是对人倒是挺感兴趣…",
                eq("#性别", "男").then([
                    "于是你和他展开了一番争夺战！"
                ]).else(
                    "于是你和她展开了一番争夺战！"
                )
            ],
            actions: [
                jump('qte-jury')
            ]
        },
        {
            id: "juryc",
            text: [
                "评委非常喜欢你{$对象}的歌声，{$TA}最终如愿夺冠，并给了你一个大大的Kiss！"
            ],
            actions: [
                increase("#魅力", 1),
                jump("celebrate")
            ]
        },
        {
            id: "qte-jury",
            deadline: {
                targets: [40],
                title: "对象所有权争夺",
                time: 10,
                moving: true,
                badChoices: 1
            },
            actions: [
                ge("$__QTE__", 1).then(
                    jump("comfort")
                ).else(
                    jump("singbadend")
                )
            ]
        },
        {
            id: "singbadend",
            text: [
                "评委搂着你的妹子去吃饭了。"
            ],
            actions: [
                eq("$sast", '1').then(
                    jump("sast")
                )
            ]
        },
        {
            id: "comfort",
            text: [
                "你带{$对象}去吃{$TA}最爱吃的烤鱼，其实你深知{$TA}失利的原因并不是因为评委，而是发挥确实欠佳，高音如杀猪一般。",
                "在饭桌上，{$TA}问你对自己歌声的看法，对待这个送命题，你打算如何作答？"
            ],
            choices: [
                {
                    text: "高音如杀猪一般",
                    actions: [
                        // todo 设置魅力阈值
                        ge("#魅力", 5).then([
                            set("$反应", "你的话语虽然有些许刺痛了{$TA}的心，但是{$TA}对你的真诚甚为感动。"),
                            jump("comfortgoodend")
                        ]).else([
                            set("$反应", "你的真诚打动了{$TA}，但是……"),
                            jump("comfortbadend")
                        ])
                    ]
                },
                {
                    text: "特别动听，结果不好纯粹是因为评委专业水准低下",
                    actions: [
                        // todo random
                        ge("#魅力", 5).then([
                            set("$反应", "{$TA}一下子抱住了你，噙着泪水动情地说你才是真正懂{$TA}的人。"),
                            jump("comfortgoodend")
                        ]).else([
                            set("$反应", "你的虚伪让{$TA}忍无可忍，于是……"),
                            jump("comfortbadend")
                        ])
                    ]
                },
                {
                    text: "默默低头，不作答",
                    actions: [
                        jump("comfortnormalend")
                    ]
                }
            ]
        },
        {
            id: "comfortgoodend",
            text: [
                "{$反应}"
            ],
            actions: [
                increase("#魅力", 2),
                flag("#脱单"),
                eq("$sast", '1').then(
                    jump("sast")
                )
            ]
        },
        {
            id: "comfortbadend",
            text: [
                "{$反应}",
                eq("#性别", "男").then("她回了你一记闪亮的耳光。").else("他给了你一个深邃的微笑。"),
                "从此你就从{$TA}的生活中彻彻底底地消失了。"
            ],
            actions: [
                decrease("#魅力", 2),
                unflag("#脱单"),
                eq("$sast", '1').then(
                    jump("sast")
                )
            ]
        },
        {
            id: "comfortnormalend",
            text: [
                "{$TA}理解你不发声的原因，为你的老实憨厚所打动。"
            ],
            actions: [
                increase("#魅力", 1),
                eq("$sast", '1').then(
                    jump("sast")
                )
            ]
        },
        {
            id: "celebrate",
            text: [
                "你们在西门烤翅把酒言欢，但{$TA}最后不胜酒力，最终醉倒于桌前。",
                "然而你意识到你的山地车还没有装后座。望着{$TA}泛红的脸庞，这时候你非常纠结："
            ],
            choices: [
                {
                    text: "考虑到{$TA}的安全，你决定附近找一个酒店房间，陪{$TA}住下。",
                    actions: [
                        set("$反应", "清晨，当{$TA}醒来，看见在一旁默默守候的你，甚是感动。给了你一个深情的kiss。")
                    ]
                },
                {
                    text: "努力用自行车把{$TA}驼回寝室。",
                    actions: [
                        set("$反应", "{$TA}的室友被你打动。你的靠谱与老实很快传遍了整个宿舍楼。")
                    ]
                },
                {
                    text: "陪{$TA}坐在西门门口看日出。",
                    actions: [
                        set("$反应", "那天的日出永远铭刻在了{$TA}的心里，同时还有你的体贴与浪漫。")
                    ]
                }
            ],
            actions: [
                jump("celebrateend")
            ]
        },
        {
            id: "celebrateend",
            text: [
                "{$反应}"
            ],
            actions: [
                increase("#魅力", 2),
                eq("$sast", '1').then(
                    jump("sast")
                )
            ]
        },
        {
            id: "sast",
            image: "科协/科协主席.jpg",
            text: [
                "和科协主席一阵尬聊……"
            ],
            actions: [
                jump("arena")
            ]
        },
        {
            id: "arena",
            image: "科协/智能体题目.jpg",
            text: [
                "你非常渴望进入科协的智能体部，梦想着能和其中的大佬们谈笑风生。",
                "然而智能体部的筛选条件十分严格，需要通过精心设计的笔试环节。",
                "但这对于优秀卓越的你而言算不上什么难事。只是有一道题让你陷入了沉思："
            ],
            input: "$请问图中所画的是什么",
            actions: [
                eq("$请问图中所画的是什么", "红黑树")
                    .or(eq("$请问图中所画的是什么", "red-black tree"))
                    .or(eq("$请问图中所画的是什么", "red black tree"))
                    .then(jump("arenapass")).else(jump("arenafail"))
            ]
        },
        {
            id: "arenapass",
            text: [
                "恭喜你通过了笔试环节，成功进入了众神云集的智能体部。",
                "智能体部致力于设计优秀的AI对战游戏，并在金主狗爸爸的赞助下举办大型比赛，丰富贵系同学的课余生活。",
                "在未来的一年中，你将会成为一名游(ku)戏(bi)设(ma)计(nong)师(=.=)。",
                "祝你好运！"
            ],
            actions: [
                jump("regularmeeting")
            ]
        },
        {
            id: "arenafail",
            text: [
                "很遗憾的告诉你，你没能通过智能体部门的入部测试，看来您还没有成为一个合格的游(ku)戏(bi)设(ma)计(nong)师(=.=)。",
                "但也祝您在未来的学习生活中一帆风顺，远离这种无聊的题目。"
            ],
            actions: [
                jump("regularmeeting")
            ]
        },
        {
            id: "regularmeeting",
            text: [
                "又到了一周一次的科协例会，组长在组会上笑眯眯地问你的进展，可你顿时语塞。",
                eq("#性别", "男").then([
                    "由于这一周你正忙于各种和妹子的邀约，而丝毫没有完成这周的工作。"
                ]).else([
                    "由于这一周你正忙于各种和汗子的邀约，而丝毫没有完成这周的工作。"
                ]),
                "气氛凝固片刻后，你想说："
            ],
            choices: [
                {
                    text: "这周的工作大概是什么呢？",
                    actions: [
                        jump("meetingend0")
                    ]
                },
                {
                    text: "已经在做了，我会骗你吗？",
                    actions: [
                        jump("meetingend1")
                    ]
                },
                {
                    text: "不好意思组长，这周和{$对象}…嗯…太忙了，忘记了工作，下周我一定做完。",
                    actions: [
                        // todo 设定某个阈值
                        ge("#魅力", 5).then(
                            jump('meetingend3')
                        ).else(
                            jump("meetingend2")
                        )
                    ]
                }
            ]
        },
        {
            id: "meetingend0",
            text: [
                "组长对你失忆的表现特别失望，但却露出了一丝狡黠的笑容：",
                "“既然你忘记了这周的工作，那我来提醒提醒你。”",
                "于是默默地把全组人的接下来的工作都交给了你。"
            ],
            actions: [
                decrease("#体力", 3)
            ]
        },
        {
            id: "meetingend1",
            text: [
                "你的自信打动了组长，组长让你3天内给出成果。",
                "于是你熬了三个通宵。"
            ],
            actions: [
                decrease("#体力", 2)
            ]
        },
        {
            id: "meetingend2",
            text: [
                "你突然发现此刻房间里有无数双嫉妒、仇恨的眼睛盯着你……",
                "你感觉气氛压抑至极……灰溜溜地走了……",
                "之后他们再也没有找过你来开会。"
            ],
            actions: [
                decrease("#魅力", 3)
            ]
        },
        {
            id: "meetingend3",
            text: [
                "组长露出了同情的目光：",
                "“理解理解，真的太不容易了。这几天一定累着了吧……好好休息休息，工作的事之后再说”。"
            ]
        },
        {
            id: "nosocialwork",
            text: [
                "“社工什么的，可能确实不太适合我。”你这么想。",
                "“好好学习！天天向上！”"
            ]
        }
    ]
})
