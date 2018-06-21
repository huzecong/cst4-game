/*
Required gloabl variable:
    魅力
    体力
    成绩
    flag: 直博
Final pages of this scenario are:
    drop
    projectfinal
    pass
    fail
*/
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "操作系统",
    stage: "大三",
    pages: [
        {
            id: "start",
            image: "操统退课/logo.jpg",
            text: [
                "在大三下，你终于迎来了万众期待的重头戏——操作系统。",
                "操统如此多娇，引无数大佬把课退掉。",
                "在第一节课上，老师介绍了两种考核方式：",
                "怼操统课程设计 or 老老实实考试",
                "你选择："
            ],
            choices: [
                {
                    text: "课程设计",
                    actions: [
                        jump("project1")
                    ],
                    condition: ge("#成绩", 3).and(ge("#体力", 2))
                },
                {
                    text: "老实考试",
                    actions: [
                        jump("exam1")
                    ]
                },
                {
                    text: "退课",
                    actions: [
                        jump("drop")
                    ],
                }
            ]
        },
        {
            id: "project1",
            text: [
                "人生当然应该来点挑战。于是你义无反顾地选择了怼课程设计。",
                "向勇说：想要做操统课程设计，必须在前4周完成8个lab。",
                "没办法，只好爆肝一波了。"
            ],
            actions: [
                jump("project1_qte")
            ]
        },
        {
            id: "project1_qte",
            deadline: {
                targets: [50, 60],
                title: "操统lab",
                time: 12,
                moving: false,
                badChoices: 0
            },
            actions: [
                decrease("#体力", 1),
                ge("$__QTE__", 1).then(jump("project2")).else(jump("project1fail"))
            ]
        },
        {
            id: "project1fail",
            //image: "TODO.jpg",
            text: [
                "十分不幸，你还是没能在4周内怼完8个lab。于是你只好悻悻然去考试了。",
                "你选择："
            ],
            choices: [
                {
                    text: "还是去考试吧",
                    actions: [
                        jump("exam1")
                    ]
                },
                {
                    text: "不玩了不玩了，退课退课",
                    actions: [
                        jump("drop")
                    ]
                }
            ]
        },
        {
            id: "project2",
            text: [
                "第十三周就要交成果了。每周例会上，chyyuu & xyong催促的语气也越来越重。",
                "然而，板子还是那么玄学，汇编也还是那么晦涩……",
                "没办法，只能又爆肝了……"
            ],
            actions: [
                jump("project2_qte")
            ]
        },
        {
            id: "project2_qte",
            deadline: {
                targets: [70, 80],
                title: "刷板子",
                time: 14,
                badChoices: 2
            },
            actions: [
                decrease("#体力", 2),
                ge("$__QTE__", 1).then(jump("projectfinal")).else(jump("project2fail"))
            ]
        },
        {
            id: "project2fail",
            //image: "TODO.jpg",
            text: [
                "唉……你还是没能在DDL之前赶完。",
                "操作系统难得果然名不虚传……",
                "你选择："
            ],
            choices: [
                {
                    text: "退课平安保",
                    actions: [
                        jump("drop")
                    ]
                },
                {
                    text: "再来一次，这次我去考试总行了吧~",
                    actions: [
                        jump("exam1")
                    ]
                }
            ]
        },
        {
            id: "projectfinal",
            //image: "TODO.jpg",
            text: [
                "你成功肝完了操统课程设计！",
                "在presentation上，你收获了陈渝和向勇的一致好评！",
                "他们十分感动地决定，将直博名额送给你！"
            ],
            actionsBefore: [
                achieve("大三修完操作系统")
            ],
            choices: [
                {
                    text: "接受直博名额，躺拿保研，美哉美哉",
                    actions: [
                        flag("#直博")
                    ],
                    condition: not(flagged("#直博"))
                },
                {
                    text: "“不，老师，比起您的博士，我更喜欢诗和远方。”",
                    actions: []
                }
            ],
            actions: [
                increase("#成绩", 5),
                increase("#体力", 2),
                increase("#魅力", 2)
            ]
        },
        {
            id: "exam1",
            image: "操统退课/向勇mooc.jpg",
            text: [
                "操统的考试，总是比其他课要快一拍。",
                "你是在第六周，考试前的那一周，才发现这个事实的。",
                "也不能怪我嘛，毕竟自从第一堂课被向勇的点名吓跑后，我就再也没去上过课了。",
                "没办法了，只能刷个夜了。"
            ],
            actions: [
                jump("exam1_qte")
            ]
        },
        {
            id: "exam1_qte",
            deadline: {
                targets: [50, 60],
                title: "操统复习",
                time: 12,
                moving: false,
                badChoices: 0
            },
            actions: [
                ge("$__QTE__", 1).then(increase("$pass", 1)),
                ge("$__QTE__", 1).then(jump("exam1pass")).else(jump("exam1fail"))
            ]
        },
        {
            id: "exam1pass",
            image: "操统退课/期中卷.jpg",
            text: [
                "恭喜你，你费劲九牛二虎之力，你成功通过了操统期中！",
                "唉，这种刷夜真是太消耗体力了……"
            ],
            choices: [
                {
                    text: "继续上课，准备迎接期末！",
                    actions: [
                        jump("exam2")
                    ],
                    condition: ge("#体力", 0)
                },
                {
                    text: "人生苦短，不如退课，目测这课是熬不下去了，赶紧退了退了",
                    actions: [
                        jump("drop")
                    ]
                }
            ]
        },
        {
            id: "exam1fail",
            //image: "TODO.jpg",
            text: [
                "虽然尽了力，但这么难的考试实在是应付不了啊。",
                "期中华丽丽的挂掉了……"
            ],
            choices: [
                {
                    text: "没事没事，期末一定能考试的，再肝一把，身体应该也还撑得住",
                    actions: [
                        jump("exam2")
                    ],
                    condition: ge("#体力", 2)
                },
                {
                    text: "人生苦短，不如退课，目测这课是熬不下去了，赶紧退了退了",
                    actions: [
                        jump("drop")
                    ]
                }
            ]
        },
        {
            id: "exam2",
            image: "操统退课/陈渝mooc.jpg",
            text: [
                "操统的期末考试，也是一如既往地比其他课要快一拍。",
                "进程线程管程信号量都是什么玩意儿？",
                "目测药丸……"
            ],
            actions: [
                jump("exam2_qte")
            ]
        },
        {
            id: "exam2_qte",
            deadline: {
                targets: [60, 70],
                title: "操统复习",
                time: 15,
                moving: false,
                badChoices: 1
            },
            actions: [
                ge("$__QTE__", 1).then(increase("$pass", 1)),
                ge("$__QTE__", 1).then(jump("exam2pass")).else(jump("exam2fail"))
            ]
        },
        {
            id: "exam2pass",
            //image: "TODO.jpg",
            text: [
                "恭喜你，你费劲九牛二虎之力，你成功通过了操统的期末考试！",
            ],
            actions: [
                jump("pass")
            ]
        },
        {
            id: "exam2fail",
            //image: "TODO.jpg",
            text: [
                "虽然尽了力，但这么难的考试实在是应付不了啊。",
                "期末还是华丽丽的挂掉了……"
            ],
            choices: [
                {
                    text: "等着看看总评吧，说不定不会挂呢",
                    actions: [
                        ge("$pass", 1).then(jump("pass")).else(jump("fail"))
                    ],
                },
                {
                    text: "目测这课是过不了了，哎赶紧退了退了",
                    actions: [
                        jump("drop")
                    ]
                }
            ]
        },
        {
            id: "pass",
            //image: "TODO.jpg",
            actionsBefore: [
                achieve("大三修完操作系统")
            ],
            text: [
                "你成功修完了操作系统！",
                "恭喜恭喜！大三下学期最大的难路虎被你打败了！"
            ],
            actions: [
                increase("#成绩", 2),
                increase("#体力", 3)
            ]
        },
        {
            id: "fail",
            //image: "TODO.jpg",
            text: [
                "期中和期末都挂掉了，即便是用开根号n的调分大法，你都没有救了。",
                "果不其然，你挂掉了操统。",
                "等着大四重修吧哈哈哈。"
            ],
            actions: [
                decrease("#成绩", 3)
            ]
        },
        {
            id: "drop",
            //image: "TODO.jpg",
            text: [
                "你十分机智地退了课。",
                "终于可以笑看其他同学被lab和考试折磨到哭了啊哈哈",
                "不过明年就该换他们嘲讽我了……"
            ],
            actions: [
                flag("#操统退课")
            ]
        }
    ]
})
