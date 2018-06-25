// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "大二小学期",
    stage: "大二暑假",
    pages: [
        {
            id: "start",
            text: [
                "经过期末的洗礼，你终于盼来了暑假。",
                "这个暑假学校安排了Java小学期，你可以选择在学校或者去台湾："
            ],
            choices: [
                {
                    text: "在学校上挺好的",
                    actions: [
                        jump("on_school")
                    ]
                },
                {
                    text: "申请去台湾，可以顺便旅游",
                    actions: [
                        ge("#成绩", 1).then(jump("taiwan")).else(jump("taiwan_fail"))
                    ]
                }
            ]
        },
        {
            id: "taiwan_fail",
            text: [
                "可惜，你没有被选上。你没能得到去台湾小学期的机会，只能在学校度过Java的学习时光。"
            ],
            actions: [
                jump("on_school")
            ]
        },
        {
            id: "on_school",
            image: "大二小学期/Java试题.png",
            text: [
                "你度过了非常充实的五周小学期时光，下面来答一道题检验一下自己的学习成果吧！",
                "有如图一段代码，请问它的运行结果是："
            ],
            input: "$你的回答",
            actions: [
                eq("$你的回答", "nullnull").then(jump("java_pass")).else(jump("java_fail"))
            ]
        },
        {
            id: "java_pass",
            text: "你凭借过硬的Java知识积累通过了考试，恭喜！",
            actions: [
                increase("#成绩", 1)
            ]
        },
        {
            id: "java_fail",
            text: "看来，你对Java的理解还需要进一步提高呀。",
            actions: [
                increase("#成绩", -1)
            ]
        },
        {
            id: "taiwan",
            image: "大二小学期/台湾.jpg",
            text: [
                "你如愿以偿地来到了台湾，这里的风土人情给你留下了深刻的印象。"
            ]
        }
    ]
})
