/*
Required global variables: 
    性别 = "男", "女"
    魅力
    体力
    姓名
    脱单
Final pages of this scenario are:
    home
    memberfinal
    captainfinal
*/
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "暑期实践",
    stage: "大一",
    pages: [
        {
            id: "start",
            image: "暑期实践/实践logo.png",
            text: [
                "愉快的大一生活行将结束，愉快的暑假生活就要展开。",
                "暑期实践可以说是假期的重头戏了，听说也是诞生爱情的地方哟~"
            ],
            choices: [
                {
                    text: "管什么暑期实践，不如“空调西瓜沙发，我在家里一趴”。",
                    actions: [
                        jump("home")
                    ]
                },
                {
                    text: "当个酱油队员，和大家一起愉快实(lv)践(you)喽！",
                    actions: [
                        jump("member")
                    ],
                    condition: ge("#体力", 0)
                },
                {
                    text: "我这种有魅力有领导力的人，当然要自己carry，当队长啦。",
                    actions: [
                        jump("captain")
                    ],
                    condition: ge("#魅力", 0).and(ge("#体力", 0))
                }
            ]
        },
        {
            id: "home",
            image: "暑期实践/葛优躺.jpg",
            text: [
                "看着大家纷秀在朋友圈的暑期实践，你露出了满意的微笑。",
                "你们那有空调么？",
                "你们那有沙发么？",
                "嗯，暑假就应该宅在家里码代码。"
            ]
        },
        {
            id: "member",
            //image: "TODO.jpg",
            text: [
                "你在校实践平台上瞅着了一款看上去就很休闲、很养老，",
                "而且，男女比也很均衡，还缺人的实践队伍，",
                "迫不及待地加了进去，顺理成章地出发啦！"
            ],
            actions: [
                decrease("#体力", 1),
                jump("membernex")
            ]
        },
        {
            id: "membernex",
            image: "暑期实践/修电脑的.jpeg",
            text: [
                "呼……今天一天的采访终于结束啦。",
                "美滋滋地睡上一觉，明天又是紧张的行程啦。",
                "“{#姓名}！你是贵系的吧？今天的录音资料不小心被我误删了，有木有办法恢复一下呀？”刚进入梦乡，队长就把你摇醒了。"
            ],
            choices: [
                {
                    text: "“自我介绍的时候都说过了，我.们.贵.系.的.不.会.修.电.脑！”",
                    actions: [
                        jump("memberno")
                    ]
                },
                {
                    text: "唉，虽然不会恢复，但搜狗一下也许还能能搞定的，不管了，先答应下来吧",
                    actions: [
                        jump("captionrepair")
                    ]
                }
            ]
        },
        {
            id: "memberno",
            text: [
                "噫，这个队员看起来可不好惹……",
                "大家也没再麻烦过你，一起快快乐乐地继续着这段暑假实(lv)践(you)。"
            ],
            actions: [
                jump("memberfinal")
            ]
        },
        {
            id: "captionrepair",
            //image: "TODO.jpg",
            text: [
                "虽然修仙了好几个小时，但总算还是把录音资料恢复出来了。",
                "你乐于助人，且精通计算机知识的贵系人优点在支队里名声远扬。"
            ],
            actions: [
                increase("#魅力", 2),
                ge("#魅力", 6).and(not(flagged("#脱单"))).then(jump("chance")).else(jump("memberfinal")),
                jump("chance")
            ]
        },
        {
            id: "chance",
            //image: "TODO.jpg",
            text: [
                ge("#性别", "男").then([
                    "你的名声吸引来了支队里一名正在纠结着选电脑的女生。",
                    "她给你展示了两款正在纠结的电脑，希望你帮她参谋参谋。"
                ]).else([
                    "你的名声吸引来了支队里一名正在纠结着选电脑的男生。",
                    "他给你展示了两款正在纠结的电脑，希望你帮她参谋参谋。"
                ])
            ],
            choices: [
                {
                    text: "对着这款电脑，这位同学说：“这款电脑呢，看上去真是太符合我的审美了，可是，配置不太行啊？”，你推荐了这款",
                    actions: [
                        eq("#性别", "男").then(jump("win")).else(jump("lose1"))
                    ]
                },
                {
                    text: "对着这款电脑，这位同学说：“这款电脑呢，性能很强劲啊，不过，这外观好像也忒差了一些……”，你推荐了这款",
                    actions: [
                        eq("#性别", "男").then(jump("lose1")).else(jump("win"))
                    ]
                },
                {
                    text: "没等说完，你打断说：“不不不，你自己选，我不懂。”",
                    actions: [
                        jump("lose0")
                    ]
                }
            ]
        },
        {
            id: "lose0",
            //image: "TODO.jpg",
            text: [
                "额...好吧。",
                "“哼”，你听到了一小声嘟囔，不过不管啦。"
            ],
            actions: [
                jump("memberfinal")
            ]
        },
        {
            id: "lose1",
            //image: "TODO.jpg",
            text: [
                ge("#性别", "男").then([
                    "“太谢谢你的意见惹！”她非常感谢你。",
                    "不过过了十来分钟，她又说：",
                    "“不过，我还是觉得那一款的外观呀、气质呀，与我似乎跟搭一点呢。”",
                    "“不过还是谢谢你啦！”"
                ]).else([
                    "“谢谢你的意见！”他非常感谢你。",
                    "不过过了十来分钟，他又说：",
                    "“嗯，我刚才又想了一下，也许还是性能对我更重要一些，我还是选性能好一点的吧。”",
                    "“不过还是谢谢你啊！”"
                ])
            ],
            actions: [
                jump("memberfinal")
            ]
        },
        {
            id: "win",
            //image: "TODO.jpg",
            actionsBefore: [
                achieve("恋爱")
            ],
            text: [
                "“嗯嗯，正巧，我也觉得这款比较好，真是英雄所见略同啊！”",
                not(flagged("#脱单")).then([
                    "随后的实践中，你们发现，不仅在审美与选择上，你们一拍即合。",
                    "三观、性格等等，你们都是天生的best match。",
                    eq("#性别", "男").then([
                        "十分自然地，在实践的最后一天，你向她表了白，在全体组员的祝福中，你们在一起了。"
                    ]).else([
                        "十分自然地，在实践的最后一天，他向你表了白，在全体组员的祝福中，你们在一起了。"
                    ])
                ])
            ],
            actions: [
                flag("#脱单"),
                jump("memberfinal")
            ]
        },
        {
            id: "memberfinal",
            //image: "TODO.jpg",
            actionsBefore: [
                achieve("暑期实践")
            ],
            text: [
                "你结束了一段开心的暑期实践，这必将成为珍贵的回忆留在你心中。",
                flagged("#脱单").then("更重要的是，你现在不再单身啦！")
            ],
            actions: [
                increase("#魅力", 1)
            ]
        },
        {
            id: "captain",
            //image: "TODO.jpg",
            text: [
                "凭借超强的个人魅力，你成功组织起了一支藏龙卧虎的支队！",
                "你们雄赳赳气昂昂地出发啦。"
            ],
            actions: [
                decrease("#体力", 2),
                jump("captionmatter")
            ]
        },
        {
            id: "captionmatter",
            //image: "TODO.jpg",
            text: [
                "到了实践地，一位队员发现忘带毛巾了，需要步行到十公里外的镇上买。"
            ],
            choices: [
                {
                    text: "保障每个队员的安全是队长的责任，我要陪这个队员一起去",
                    actions: [
                        flag("$b"),
                        jump("accompany")
                    ]
                },
                {
                    text: "自己忘带自己活该，让队员自己一个人去吧",
                    actions: [
                        unflag("$b"),
                        jump("captainfinal")
                    ]
                }
            ]
        },
        {
            id: "accompany",
            image: "暑期实践/微积分.jpg",
            text: [
                "你和这位队员边走边聊，从实践聊到生活，又从生活聊到学习",
                "然后你们发现，你们竟然都上过苏宁的微积分！",
                "于是，队员随手考了你一道微积分题，如上图所示。",
                "你给出的答案是："
            ],
            choices: [
                {
                    text: "-ln |cos x| + C",
                    actions: [
                        jump("right")
                    ]
                },
                {
                    text: "-ln |sin x| + C",
                    actions: [
                        jump("wrong")
                    ]
                }
            ]
        },
        {
            id: "wrong",
            image: "暑期实践/苏宁.jpeg",
            text: [
                eq("#性别", "男").then([
                    "你答错了她出的题。",
                    "她说：“我们苏宁的学生怎么可能会答错这种题呢，一定是你没有仔细想，在敷衍我呢。”",
                    "随后她生着闷气，聊天也没意思了。"
                ]).else([
                    "你答错了他出的题。",
                    "他说：“我们苏宁的学生怎么可能会答错这种题呢，一定是你没有仔细想，在敷衍我呢。”",
                    "随后他生着闷气，聊天也没意思了。"
                ])
            ],
            actions: [
                unflag("$b"),
                jump("captainfinal")
            ]
        },
        {
            id: "right",
            image: "暑期实践/苏宁.jpeg",
            actionsBefore: [
                achieve("恋爱")
            ],
            text: [
                eq("#性别", "男").then([
                    "感谢苏宁！你答对了她出的题。",
                    "她非常开心，随后又聊了很多各种各样的话题。",
                    "发现聪明又漂亮的她，竟然和你惊人的合拍。",
                    "实践结束后，你俩十分自然地在一起了。"
                ]).else([
                    "感谢苏宁！你答对了他出的题。",
                    "他非常开心，随后又聊了很多各种各样的话题。",
                    "你发现他帅气的外表下，还有着一颗温柔又体贴的内心，你喜欢上了他。",
                    "实践结束后，你俩十分自然地在一起了。"
                ])
            ],
            actions: [
                flag("#脱单"),
                jump("captainfinal")
            ]
        },
        {
            id: "captainfinal",
            image: "暑期实践/实践颁奖.jpg",
            actionsBefore: [
                achieve("暑期实践"),
                flagged("$b").then(achieve("校优秀实践支队"))
            ],
            text: [
                "你带领着全队，圆满地完成了社会实践。",
                flagged("$b").then("由于杰出的实践成功，你的支队被评为了校优秀实践支队。"),
                flagged("#脱单").then("更重要的是，你现在不再单身啦！")
            ],
            actions: [
                increase("#魅力", 3)
            ]
        }
    ]
})
