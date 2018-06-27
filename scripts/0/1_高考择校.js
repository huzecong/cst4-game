// noinspection BadExpressionStatementJS
({
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
                eq("#姓名", "").then(jump("blank")).else(jump("name")),
                set("$没写名字次数", 0)
            ]
        },
        {
            id: "blank",
            actionsBefore: [
                increase("$没写名字次数", 1)
            ],
            text: [
                "你太紧张了，甚至忘了写名字。可想而知，成绩惨不忍睹。于是你选择了复读。",
                "又是一年高考。你抬起笔，在答题纸上写下了自己的名字："
            ],
            input: "#姓名",
            actions: [
                eq("#姓名", "").then(
                    ge("$没写名字次数", 2).then([
                        set("#姓名", "码伟志"),
                        jump("name")
                    ]).else(jump("blank"))
                ).else(jump("name"))
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
                        ending("考入北大")
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
})
