// noinspection BadExpressionStatementJS
({
    type: "random",
    name: "竞选班长",
    condition: not(flagged("#班长")),
    pages: [
        {
            id: "start",
            text: [
                "开学了！新的一学期，我们需要选出新一届班委……看着室友热情的眼神，你选择："
            ],
            choices: [
                {
                    text: "竞选班长！",
                    actions: [
                        jump("head")
                    ]
                },
                {
                    text: "不不不，我选择当一个普通同学……",
                    actions: [
                        jump("normal")
                    ]
                }
            ]
        },
        {
            id: "head",
            text: [
                "当选成功！看着班级同学期待的眼神，你仿佛真的背上了一副重担。"
            ],
            actionsBefore: [
                flag("#班长"),
                achieve("一班之主")
            ]
        },
        {
            id: "normal",
            text: [
                "毕竟班委只是少数，普通同学也有自己的精彩。"
            ]
        }
    ]
})
