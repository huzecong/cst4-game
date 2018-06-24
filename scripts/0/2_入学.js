// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "入学",
    stage: "大一开学前",
    pages: [
        {
            id: "start",
            text: [
                flagged("$选择其他")
                    .then("我们尊重多元性别，但本游戏中仅区分了男性与女性。请勿担心，无论选择哪种性别，都可以享受完整的游戏。"),
                "要入学了，首先是分配宿舍。",
                "对了，你的性别是："
            ],
            choices: [
                {
                    text: "男",
                    actions: [
                        set("#性别", "男")
                    ]
                },
                {
                    text: "女",
                    actions: [
                        set("#性别", "女")
                    ]
                },
                {
                    condition: not(flagged("$选择其他")),
                    text: "其他",
                    actions: [
                        flag("$选择其他"),
                        jump("start")
                    ]
                }
            ],
            actions: [
                jump("final")
            ]
        },
        {
            id: "final",
            text: [
                eq("#性别", "男")
                    .then("你来到了紫荆2号楼的宿舍中，见到了你的室友。")
                    .else("你来到了紫荆8号楼的宿舍中，见到了你的室友。"),
                eq("#性别", "男")
                    .then("他们将和你一起度过接下来的四年。")
                    .else("她们将和你一起度过接下来的四年。"),
            ]
        }
    ]
})
