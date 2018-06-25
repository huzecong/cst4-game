/*
Required global variables:
    魅力
    体力
Final pages of this scenario are:
    project0
    project1
    project2
 */
// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "软工选题",
    stage: "大三",
    pages: [
        {
            id: "start",
            text: [
                "在大三软工的第一节课上，你要做出一个足以改变整个一学期命运轨迹的重要抉择：选项目。",
                "此时在你面前有三个选择："
            ],
            choices: [
                {
                    text: "人脸识别系统",
                    actions: [
                        jump("project0")
                    ]
                },
                {
                    text: "职场面试平台",
                    actions: [
                        jump("project1")
                    ]
                },
                {
                    text: "校园信息统计平台",
                    actions: [
                        jump("project2")
                    ]
                }
            ]
        },
        {
            id: "project0",
            text: [
                "由于你做的太成功了，老师决定向全校推广。",
                "于是在很长的一段时间，你被全校人各种围追堵截。"
            ],
            actions: [
                decrease("#魅力", 3)
            ]
        },
        {
            id: "project1",
            text: [
                "你在找实习的时候，发现面试的平台刚好是你们的项目，正当你向他们炫耀时，平台崩了……",
                "于是……你最终并没有被录用。",
                "不过，这是后话了。"
            ]
        },
        {
            id: "project2",
            text: [
                "由于需(ma)求(wei)方(zhi)总是摆着一副黑脸，你无法从中揣测出他对你们进展的评价，于是你们总是在没日没夜地肝……"
            ],
            actions: [
                decrease("#体力", 3)
            ]
        }
    ]
})
