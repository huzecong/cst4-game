// noinspection BadExpressionStatementJS
({
    type: "normal",
    name: "邀请跑步",
    stage: "大二",
    condition: not(flagged("#脱单")),
    pages: [
        {
            id: "start",
            text: [
                "有一位{$异性}生邀请你晚上一起跑步，你选择："
            ],
            image: "邀请跑步/阿甘.jpg",
            actionsBefore: [
                eq("#性别", "男").then(
                    set("$异性", "女")
                ).else(
                    set("$异性", "男")
                )
            ],
            choices: [
                {
                    text: "当然是接受啦",
                    actions: [
                        ge("#体力", 2).then(jump("jogging")).else(jump("fail"))
                    ]
                },
                {
                    text: "算了吧，自己跑比较自由",
                    actions: [
                        decrease("#魅力", 1)
                    ]
                }
            ]
        },
        {
            id: "jogging",
            image: "邀请跑步/紫操.jpg",
            text: [
                "你们一起跑在紫操上，远处传来吉他和长笛的声音，你体会到了青春的感觉。"
            ],
            actionsBefore: [
                achieve("紫操漫步")
            ]
        },
        {
            id: "fail",
            image: "体育/紫操.jpg",
            text: [
                "由于你日常缺乏体育锻炼，跑步时非常吃力，你感到有点难堪。"
            ],
            actions: [
                increase("#魅力", -1)
            ]
        }
    ]
})
