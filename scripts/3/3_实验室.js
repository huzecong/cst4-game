{
    type: "main",
    name: "进入实验室",
    stage: "大三",
    pages: [
        {
            id: "start",
            text: [
                "大三的你准备进一个实验室去锻炼自己，在选择实验室时，你最最最看重："
            ],
            choices: [
                {
                    text: "研究方向是否热门、好发文章、好找工作",
                    actions: [
                        ge("#成绩", 5).then(jump("AI")).else(jump("AI_fail"))
                    ]
                },
                {
                    text: "研究方向是否是感兴趣的",
                    actions: [
                        jump("end")
                    ]
                },
                {
                    text: "实验室氛围如何、导师是否push",
                    actions: [
                        jump("end")
                    ]
                }
            ]
        },
        {
            id: "AI",
            image: "进入实验室/人工智能.jpg",
            text: [
                "恭喜你成功进入人工智能研究领域，祝你科研顺利！"
            ]
        },
        {
            id: "AI_fail",
            image: "进入实验室/人工智能.jpg",
            text: [
                "人工智能实验室竞争激烈，可惜你的GPA不够高，没能顺利进入。"
            ]
        },
        {
            id: "end",
            image: "进入实验室/科研.jpg",
            text: [
                "恭喜你成功进入心仪的实验室，祝你科研顺利！"
            ],
            actions: [
                increase("#成绩", 1)
            ]
        }
    ]

}
