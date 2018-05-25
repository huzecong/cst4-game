{
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
                "可能可以再在这里放点别的剧情。",
                "主要是觉得直接问性别有点出戏，放在剧情里比较好。"
            ]
        }
    ]
}
