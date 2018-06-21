/*
Required gloabl variable:
    体力
    成绩
    魅力
    flag: 直博
Final pages of this scenario are:
    drop
    challengeend1
    challengeend2
    challengeend3
    normalend1
    normalend2
*/
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "造计算机",
    stage: "大三",
    pages: [
        {
            id: "start",
            image: "造计算机/奋战三星期.jpg",
            text: [
                "大三上，你终于也要直面早已久闻大名的计原了！",
                "刘老师告诉同学们，今年的造计算机有两种选择："
            ],
            choices: [
                {
                    text: "当carry的大腿，造32位计算机",
                    actions: [
                        jump("challenge1")
                    ],
                    condition: ge("#成绩", 3).and(ge("#体力", 3))
                },
                {
                    text: "当个普通组员，造16位计算机",
                    actions: [
                        jump("normal1")
                    ]
                },
                {
                    text: "我选择退课",
                    actions: [
                        jump("drop")
                    ]
                }
            ]
        },
        {
            id: "drop",
            image: "造计算机/退课截图.jpg",
            text: [
                "于是你十分机智地退掉了计原……",
                "嗯，好像之前很少有人这么干过……",
                "造计算机是啥，不存在的。"
            ],
            actions: [
                flag("#计原退课")
            ]
        },
        {
            id: "challenge1",
            //image: "TODO.jpg",
            text: [
                "刚拿到板子，你就遇到了一个棘手的问题。",
                "不知道怎么回事，SDRAM就是写不进去啊！",
                "时序没问题，状态机也没问题，改成样例代码都还是写不进去啊！",
                "怎么办..."
            ],
            choices: [
                {
                    text: "找老师换板子",
                    actions: [
                        jump("challenge2")
                    ]
                },
                {
                    text: "继续强行调板子，实在不行多拍拍板子就好了",
                    actions: [
                        jump("challenge1fail")
                    ]
                },
                {
                    text: "退课",
                    actions: [
                        jump("drop")
                    ],
                    condition: eq(1, 0)
                    // this should always be false, you will never have a chance to drop 
                }
            ]
        },
        {
            id: "challenge1fail",
            image: "造计算机/不可能打工的.jpg",
            text: [
                "调是不可能调好了，这辈子都不可能调好的。",
                "其实原因很简单，板子里的SDRAM坏了。",
                "你没有造出计算机，只好来年再战。"
            ],
            actions: [
                decrease("#成绩", 2)
            ]
        },
        {
            id: "challenge2",
            image: "造计算机/刘卫东上课.jpg",
            text: [
                "这周就是32位挑战性试验的检查DDL了。",
                "然而今天有一节计原课，听说要讲些和期末考相关的很重要的东西。",
                "怎么办，是翘课造计算机还是去上课呢？"
            ],
            choices: [
                {
                    text: "翘课造计算机，再不翘计算机要造不出来了！",
                    actions: [
                        jump("challengeend1")
                    ]
                },
                {
                    text: "不行不行，还是去上课吧，期末考要是跪了也会挂啊",
                    actions: [
                        jump("challengefighting")
                    ]
                }
            ]
        },
        {
            id: "challengeend1",
            //image: "TODO.jpg",
            actionsBefore: [
                achieve("造32位计算机")
            ],
            text: [
                "你赶在DDL之前成功造出了32位MIPS计算机！",
                "而且，你的32位计算机跑到了50 Mhz，开心的刘老师邀请你读他的博士生。",
                "然而，翘了太多计原课，你的期末考试成绩低于全年级平均分的50%。",
                "于是，你还是挂了计原……",
                "刘老师说：“没关系，虽然你这样去不了其他地方了，但我可以特批你读博。”"
            ],
            actions: [
                decrease("#成绩", 1),
                decrease("#体力", 2),
                flag("#直博")
            ]
        },
        {
            id: "challengefighting",
            text: [
                "上完了课，最终的DDL已经近在咫尺了。",
                "你只好狂奔到东主楼，开始一顿刷夜爆肝。"
            ],
            actions: [
                jump("challengefighting_qte")
            ]
        },
        {
            id: "challengefighting_qte",
            deadline: {
                targets: [90, 120],
                title: "造32位计算机",
                time: 12,
                moving: false,
                badChoices: 0
            },
            actions: [
                ge("$__QTE__", 1).then(jump("challengeend2")).else(jump("challengeend3"))
            ]
        },
        {
            id: "challengeend2",
            image: "造计算机/板子.jpg",
            actionsBefore: [
                achieve("造32位计算机")
            ],
            text: [
                "连续刷了好几个夜后，你成功赶在DDL前造出了32位MIPS计算机！",
                "而且，你的计算机跑得比谁都快，得到了老师的一致好评。",
                "同时，由于没翘过计原课程，你在期末考试中也取得了理想的成绩。",
                "你的成功吸引了老师的主意，刘老师表示，欢迎你去他那里读博。"
            ],
            choices: [
                {
                    text: "在刘老师手下读博",
                    actions: [flag("#直博")]
                },
                {
                    text: "婉拒邀请"
                }
            ],
            actions: [
                increase("#成绩", 3),
                decrease("#体力", 3),
                increase("#魅力", 2)
            ]
        },
        {
            id: "challengeend3",
            image: "造计算机/板子.jpg",
            text: [
                "虽然刷了好几个夜，然而，你还是没能造出32位计算机。",
                "于是计原华丽丽的挂了……",
                "只好来年再战计原了……",
                "这次只造16位计算机吧。"
            ],
            actions: [
                decrease("#成绩", 1),
                decrease("#体力", 1),
                jump("start")
            ]
        },
        {
            id: "normal1",
            //image: "TODO.jpg",
            text: [
                "转眼到了造计算机DDL的最后一周。",
                "作为一名划水组员，你相信组里的大腿一定早已造完计算机。",
                "感觉自己稳如老狗。",
                "大腿说：“计算机快造好了，大家今晚一起来408刷夜debug吧。”"
            ],
            actions: [
                jump("normalfightingpre")
            ]
        },
        {
            id: "normalfightingpre",
            //image: "TODO.jpg",
            text: [
                "到了408，你才发现，大腿说的debug，是IDE安装程序的“bug”。",
                "IDE都还没安上去……安上去……上去……去……",
                "咋办呢…"
            ],
            choices: [
                {
                    text: "爆肝",
                    actions: [
                        jump("normalfighting")
                    ],
                    condition: ge("#体力", 2)
                },
                {
                    text: "弃疗",
                    actions: [
                        jump("normalend2")
                    ]
                }
            ]
        },
        {
            id: "normalfighting",
            deadline: {
                targets: [50, 70],
                title: "造计算机",
                time: 12,
                moving: false,
                badChoices: 0
            },
            actions: [
                decrease("#体力", 2),
                ge("$__QTE__", 1).then(jump("normalend1")).else(jump("normalend2"))
            ]
        },
        {
            id: "normalend1",
            image: "造计算机/ok.jpg",
            actionsBefore: [
                achieve("造计算机")
            ],
            text: [
                "经过几个晚上的爆肝，你们终于造出了16位计算机！",
                // "不造计算机，枉为贵系人。",
                "啊哈哈劳资也是造过计算机的贵系人了~"
            ],
            actions: [
                increase("#体力", 2),
                increase("#成绩", 2)
            ]
        },
        {
            id: "normalend2",
            image: "造计算机/ok.jpg",
            actionsBefore: [
                achieve("造计算机")
            ],
            text: [
                "你选择了弃疗。",
                "不过还好有组员们和大腿的帮助，你们在检查时成功打印出了“OK”。",
                "啥，你问我能不能复现？不存在的。嗯。"
            ],
            actions: [
                increase("#体力", 1),
            ]
        }
    ]
})
