// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "天下大计",
    stage: "计四年级毕业联欢",
    pages: [
        {
            id: "start",
            image: "logo.jpeg",
            choices: [
                {
                    text: "开始游戏",
                    actions: [
                        achieve("开始游戏")
                    ],
                    condition: exec(function () {
                        return storage.getItem("__readHelp") === "true";
                    }),
                    explanation: "请先阅读游戏帮助"
                },
                {
                    text: "载入游戏",
                    actions: [
                        exec($scope.loadMemory)
                    ],
                    condition: exec(function () {
                        return storage.getItem("_pageId") !== null;
                    }),
                    explanation: "不存在游戏存档"
                },
                {
                    text: "成就列表",
                    actions: [
                        exec(loadAchievements)
                    ]
                },
                {
                    text: "游戏帮助",
                    actions: [
                        jump("help")
                    ]
                }
            ]
        },
        {
            id: "help",
            text: [
                (function () {
                    let days = Math.floor((new Date() - new Date("2018/07/08")) / (24 * 60 * 60 * 1000));
                    if (days < 0) return "距离大学毕业还有" + (-days) + "天。";
                    else if (days === 0) return "今天就是大学毕业的日子。";
                    else if (days > 0) return "大学毕业已经" + days + "天了。";
                })(),
                "大学期间，你曾否做出过让你后悔的决定？又或者，是否想体验另外的一条道路？",
                "",
                "如果重来大学四年，你会做出怎样的选择呢？"
            ],
            actions: [
                jump("help2")
            ]
        },
        {
            id: "help2",
            text: [
                "《天下大计》，这是你没玩过的全新版本。",
                "你将重新回到入学前，再次走过大学四年。这一次，你可以做出不同的选择。"
            ],
            actions: [
                jump("help3")
            ]
        },
        {
            id: "help3",
            text: [
                "在游戏中，你需要根据文本描述，做出你自己的选择。不存在最优的选择，也不存在唯一的正确答案。",
                "请尽情探索所有的可能，解锁一个个成就吧！",
            ],
            actions: [
                jump("help4")
            ]
        },
        {
            id: "help4",
            image: "帮助/爆肝界面.png",
            text: [
                "有一种特殊的游戏模式如上图所示：<b>爆肝模式</b>。",
                "没错，和熬夜爆肝赶DDL一样，你需要付出一些努力才可以通关。你需要做的就是在时间限制内快速点击“<i>肝！</i>”按钮，达到指定次数方可通关。",
                "不过，事情并不会一直一帆风顺。在爆肝期间，你还需要排除干扰，集中注意力。加油吧！"
            ],
            actions: [
                jump("help5")
            ]
        },
        {
            id: "help5",
            text: [
                "游戏过程中，你可以随时存档（考试时除外）与读档。点击右上角，在弹出的菜单中选择即可。",
                "存档在本地保存。即使刷新或者关闭页面，存档也不会丢失。"
            ],
            actions: [
                jump("help6")
            ]
        },
        {
            id: "help6",
            text: [
                "本游戏的完成需要感谢以下各位的辛苦付出：",
                "<li><b>策划：</b>胡泽聪</li>",
                "<li><b>剧本设计：</b>李林翼、李晓涵、潘星宇、高童</li>",
                "<li><b>代码实现：</b>胡泽聪</li>",
                "<li><b>美术设计：</b>黄家晖</li>",
                "<li><b>测试：</b>李林翼、李晓涵、黄家晖、唐玉涵</li>",
                "<li>计四年级毕联筹备组全员</li>",
                "<li>以及，正在玩游戏的<b>你</b>。</li>"
            ],
            actions: [
                exec(function () {
                    storage.setItem("__readHelp", "true")
                }),
                achieve("阅读帮助"),
                jump("start")
            ]
        }
    ]
})
