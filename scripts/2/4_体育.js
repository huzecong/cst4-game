// noinspection BadExpressionStatementJS
({
    type: "normal",
    name: "体育代表队",
    stage: "大二",
    pages: [
        {
            id: "start",
            actionsBefore: [
                eq("#性别", "男").then(
                    set("$异性", "女")
                ).else(
                    set("$异性", "男")
                )
            ],
            text: [
                "你有加入系队并参加比赛的机会，你更喜欢哪种运动？"
            ],
            image: "/体育/酒井.jpeg",
            choices: [
                {
                    text: "足球、篮球、排球类（大球）",
                    actions: [
                        jump("big_ball")
                    ]
                },
                {
                    text: "乒乓球、羽毛球、网球类（小球）",
                    actions: [
                        jump("little_ball")
                    ]
                },
                {
                    text: "跑步、游泳、跳远类（田径）",
                    actions: [
                        jump("track_and_field")
                    ]
                }
            ]
        },
        {
            id: "track_and_field",
            image: "/体育/阿甘.jpg",
            text: [
                "从此你经常去紫操跑步，锻炼了强健的体魄。"
            ],
            actions: [
                increase("#体力", 2)
            ]
        },
        {
            id: "little_ball",
            image: "/体育/羽毛球.jpeg",
            text: [
                "通过系队训练，你的核心力量和灵活性都得到了提高。"
            ],
            actions: [
                increase("#体力", 2)
            ]
        },
        {
            id: "big_ball",
            image: "/体育/足球.jpeg",
            text: [
                "你加入了足球队，这一天贵系{$异性}足邀请你们一起训练，但是这需要重新协调训练时间，你选择："
            ],
            choices: [
                {
                    text: "欣然接受",
                    actions: [
                        jump("training_together")
                    ]
                },
                {
                    text: "太麻烦了，还是自己练吧",
                    actions: [
                        jump("end")
                    ]
                }
            ]
        },
        {
            id: "end",
            text: [
                "通过系队训练，你的球技都得到了提高，大学生活也变得丰富了很多。"
            ],
            image: "/体育/足球.jpeg",
            actions: [
                increase("#体力", 2)
            ]
        },
        {
            id: "training_together",
            text: [
                "共同训练的过程中，你出色的球技得到所有人的认可，练球也更加努力了。"
            ],
            image: "/体育/训练.jpeg",
            actions: [
                increase("#魅力", 3),
                increase("#体力", 2)
            ]
        }
    ]
})
