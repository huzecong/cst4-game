/*
Required global variables: 
    性别 = "男", "女"
    魅力
    体力
Final pages of this scenario are:
    fail
    final
    alterfinal
*/
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "学生节",
    stage: "大二",
    pages: [
        {
            id: "start",
            image: "学生节/logo.jpg",
            text: [
                "时间过得很快，转眼到了学生节的季节。",
                "这一年一度的狂欢，始终是同学们对贵系最深刻最美好的记忆之一。",
                "你怎么好意思错过呢~"
            ],
            choices: [
                {
                    text: "你们慢慢玩，我回去写作业去了...",
                    "actions": [
                        jump("homework")
                    ],
                    condition: not(flagged("#班长")),
                    explanation: "作为班长，还是得在学生节中出一份力的"
                },
                {
                    text: "我就当个安静的吃瓜观众吧",
                    actions: [
                        jump("audience")
                    ],
                    condition: not(flagged("#班长")),
                    explanation: "作为班长，还是得在学生节中出一份力的"
                },
                {
                    text: eq("#性别", "男").then(
                        "这么帅气的我当然要当男主啊"
                    ).else(
                        "这么漂亮的我当然要当女主啊"
                    ),
                    actions: [
                        jump("perform")
                    ]//,
                    // condition: ge("#体力", 1)
                },
                {
                    text: "作为圈里人，我要当班剧导演",
                    actions: [
                        jump("director")
                    ]//,
                    // condition: ge("#体力", 2)
                }
            ]
        },
        {
            id: "homework",
            image: "学生节/PA.jpg",
            text: [
                "2015.12.20，这是学生节的日子。",
                "不过对你而言，更值得纪念的是，你趁着大家都去看学生节，第一个写完了数据结构作业！"
            ]
        },
        {
            id: "audience",
            //image: "TODO.jpg",
            text: [
                "看着班级的节目在大礼堂魅力绽放，身为班级的一份子，你也由衷地感到快乐。",
                "而且，你在弹幕里抛出的梗，膜着的*，吸引了大家跟着盖了几百条，美滋滋~",
                "场上的主持人看着大家对着两侧的弹幕屏狂笑，一脸懵逼= ="
            ]
        },
        {
            id: "perform",
            text: [
                "转眼间就到了学生节当天。",
                "马上就要上台表演了。你有点紧张，手心也微微渗出了汗。",
                "“加油！”你在心里默默给自己打气，走上了舞台。"
            ],
            actions: [
                jump("perform_qte")
            ]
        },
        {
            id: "perform_qte",
            deadline: {
                targets: [45],
                title: "学生节表演",
                time: 8,
                moving: false,
                badChoices: 0
            },
            actions: [
                decrease("#体力", 1),
                le("$__QTE__", 0).then(jump("fail")).else(jump("final"))
            ]
        },
        {
            id: "fail",
            //image: "TODO.jpg",
            text: [
                "呃……看起来你并没有用心在表演啊……",
                "虽然现场出了点车祸，不过在主持人机智的圆场，和大家对新年级同学的包容下，你们还是收获了不少掌声。"
            ],
            actions: [
                increase("#魅力", 1)
            ]
        },
        {
            id: "director",
            text: [
                "你成为了班级节目的导演。",
                "然而，你发现事情并不简单……",
                "都到三审了，怎么大家都在划水啊，这样下去怕是药丸啊……"
            ],
            choices: [
                {
                    text: "给剧组群发个大红包，激励大家加油干活",
                    actions: [
                        jump("redbag")
                    ]
                },
                {
                    text: "把各位划水的骂一顿",
                    actions: [
                        jump("shame")
                    ]
                }
            ],
            actions: [
                decrease("#体力", 2),
                increase("#社工", 2)
            ]
        },
        {
            id: "redbag",
            //image: "TODO.jpg",
            text: [
                "有了红包的激励，大家干活的进度明显加快了很多。",
                "果然还是拿人手软呢。",
                "再刷几个夜，集体排练几回应该就差不多啦。"
            ],
            actions: [
                increase("#魅力", 1),
                jump("final")
            ]
        },
        {
            id: "shame",
            //image: "TODO.jpg",
            text: [
                "好像上次骂的有点太凶了……",
                "节目组几个核心主创都愤而跑路了……",
                "事情怎么会变成这个样子呢……"
            ],
            actions: [
                jump("roommate")
            ]
        },
        {
            id: "roommate",
            image: "学生节/摄像头.jpg",
            text: [
                "没办法了，偷偷在床上放一个摄像头，录下寝室精彩的夜谈会作为节目凑合一下吧……",
                "嗯，看起来效果还挺不错。"
            ],
            actions: [
                jump("alterfinal")
            ]
        },
        {
            id: "alterfinal",
            image: "学生节/酒井夜话.jpg",
            actionsBefore: [
                achieve("一次成功的学生节节目")
            ],
            text: [
                "夜谈会的原版录像以DV剧的形式成为了班级的学生节节目。",
                "然后——",
                "以其密集的笑点，意想不到的脑洞，成功堪比《清华夜话》的全场最佳！",
                "果然，艺术从未高于生活。"
            ],
            actions: [
                increase("#魅力", 3)
            ]
        },
        {
            id: "final",
            image: "学生节/J43节目.jpg",
            actionsBefore: [
                achieve("一次成功的学生节节目")
            ],
            text: [
                "你成功为大家带来了一场精彩的学生节节目！",
                "鲜花，荣誉，掌声，还有被灌醉的聚餐...",
                "其实相比结果，和各位小伙伴一起准备节目的过程，才是最开心的事情啦！"
            ],
            actions: [
                increase("#魅力", 3)
            ]
        }

    ]
})
