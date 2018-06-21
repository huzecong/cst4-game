/*
Required global variables: 
    性别 = "男", "女"
    魅力
    体力
Final pages of this scenario are:
    memberfinal
    solofinal
*/
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "一二·九",
    stage: "大二",
    pages: [
        {
            id: "start",
            //image: "TODO.jpg",
            text: [
                "冬天就要来了，一二九合唱大赛也要开始了。",
                "第一次来到排练厅，指挥说需要一个{#性别}生领唱，你选择……"
            ],
            choices: [
                {
                    text: "毛遂自荐，舞台上我最闪亮~",
                    actions: [
                        jump("solofinal")
                    ]
                },
                {
                    text: "我还是喜欢在人群中划水…",
                    actions: [
                        ge("#魅力", 2).then([
                            flag("$被抓"),
                            jump("caught")
                        ]).else(
                            jump("memberfinal")
                        )
                    ]
                }
            ]
        },
        {
            id: "solofinal",
            text: [
                "作为{#性别}高音首席，你领唱的《共青团员之歌》在舞台上取得了巨大成功~"
            ],
            action: [
                flagged("$被抓").then(
                    increase("#魅力", 2)
                ).else(
                    increase("#魅力", 1)
                )
            ]
        },
        {
            id: "caught",
            text: [
                "“{#姓名}！{#姓名}！”",
                "在同学们热情的推荐下，你没能逃过指挥的法眼，成为了{#性别}高音首席！"
            ],
            actions: [
                jump("solofinal")
            ]
        },
        {
            id: "memberfinal",
            //image: "TODO.jpg",
            text: [
                "作为人群中的一员，你默默在人群中贡献着自己的音量。",
                "但是，多次往返排练厅和寝室，也给你提供了充足的锻炼~"
            ],
            action: [
                increase("#体力", 1)
            ]
        }
    ]
})
