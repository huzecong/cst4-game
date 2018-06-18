/*
Required global variables: 
    成绩
    体力
Final pages of this scenario are:
    thinfinal
    thickfinal
*/
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "军训",
    stage: "大一开学前",
    pages: [
        {
            id: "start",
            text: [
                "军训开始了……教官看上去凶凶的。",
                "教官让全班练习踢腿，你怎么办？："
            ],
            choices: [
                {
                    text: "乖乖踢腿"
                }
            ],
            actions: [
                jump("kick")
            ]
        },
        {
            id: "kick",
            text: [
                "也对……万一偷懒被教官抓到怎么办Σ（ﾟдﾟlll）"
            ],
            actions: [
                jump("march")
            ]
        },
        {
            id: "march",
            text: [
                "到了深夜拉练的那一天，教官让大家背上被子。",
                "你看了看从家里带来的两床被子……"
            ],
            choices: [
                {
                    text: "背上薄被",
                    actions: [
                        jump("thinfinal")
                    ]
                },
                {
                    text: "背上棉被",
                    actions: [
                        jump("thickfinal")
                    ]
                }
            ]
        },
        {
            id: "thinfinal",
            text: [
                "背上薄被感觉很轻松，",
                "你不禁为自己的智商感到高兴~"
            ],
            actions: [
                increase("#成绩", 1)
            ]
        },
        {
            id: "thickfinal",
            text: [
                "棉被重重的……",
                "但这是你很长一段时间以来，走得最远的路了。"
            ],
            actions: [
                increase("#体力", 1)
            ]
        }
    ]
})
