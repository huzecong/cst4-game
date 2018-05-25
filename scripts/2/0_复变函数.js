{
    type: "main",
    name: "复变函数",
    stage: "大二",
    pages: [
        {
            id: "start",
            actionsBefore: [
                flagged("#脱单").then(
                    eq("#性别", "女").then(
                        set("$对象", "男朋友")
                    ).else(
                        set("$对象", "女朋友")
                    )
                ).else(
                    set("$对象", "好朋友")
                ),
                flagged("#脱单").then( set("$感情", "爱情") ).else( set("$感情", "友情") )
            ],
            image: "复变函数/杨大伯.jpg",
            text: [
            // 判断是否单身
                "这一学期，你选上了杨晓京老师的复变函数课，杨大伯的肌肉给你留下了深刻的印象，你立志好好学复变。",
                "但是这一天，你的{$对象}生病了，需要人陪，你选择："
            ],
            choices: [
                {
                    text: "{$感情}价更高，当然是翘课在医院陪伴{$对象}",
                    actions: [
                        jump("cvf_fail")
                    ]
                },
                {
                    text: "不差这一会儿，还是先去上课吧",
                    actions: [
                        jump("cvf_pass")
                    ]
                }
            ]
        }, 
        {
            id: "cvf_fail",
            text: [
                "期末考试考到了上课讲过的原题，而你那节课恰好翘掉了，不幸挂科。"
            ],
            actions: [
                increase("#成绩", -1),
                increase("#魅力", 1)
            ]
        }, 
        {
            id: "cvf_pass",
            text: [
                "期末考试考到了上课讲过的原题，你暗自庆幸没有翘掉那节课。"
            ],
            actions: [
                increase("#成绩", 1),
                increase("#魅力", -1)
            ]
        }
    ]
}
