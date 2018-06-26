// noinspection BadExpressionStatementJS
({
    type: "main",
    name: "毕业设计",
    stage: "大四",
    pages: [
        {
            id: "start",
            text: [
                "终于迎来了本科阶段最后、最重的一门课：综合论文训练。",
                "综合论文训练，也被称为毕业设计，简称毕设，是大四下学期的必修课。该课程要求学生综合运用大学四年所学知识，完成具有创新点的科研项目，并撰写一篇毕业论文。",
                "实际中，多数学生会运用四年所学的写报告能力，将平凡的实验结果用废话层层包装，佐以精美的排版，产出一篇华丽的学术垃圾。"
            ],
            actions: [
                jump("proposal"),
                set("$文献调研", 0),
                set("$数据处理", 0),
                set("$代码实现", 0),
                set("$实验", 0),
                set("$论文撰写", 0),
                set("$划水", 0)
            ]
        },
        {
            id: "proposal",
            text: [
                "现在，到了毕设开题的时候了。你需要选择你做毕设的实验室："
            ],
            choices: [
                {
                    text: "人智所",
                    actions: [
                        set("$实验室", "人智所")
                    ]
                },
                {
                    text: "高性能所",
                    actions: [
                        set("$实验室", "高性能所")
                    ]
                },
                {
                    text: "网络所",
                    actions: [
                        set("$实验室", "网络所")
                    ]
                },
                {
                    text: "软件所",
                    actions: [
                        set("$实验室", "软件所")
                    ]
                },
                {
                    text: "媒体所",
                    actions: [
                        set("$实验室", "媒体所")
                    ]
                }
            ],
            actions: [
                jump("winter_break")
            ]
        },
        {
            id: "winter_break",
            actionsBefore: [
                set("$action", "")
            ],
            text: [
                "大四上结束，寒假到了。寒假期间，你准备："
            ],
            choices: [
                {
                    text: "进行文献调研",
                    actions: [
                        increase("$文献调研", 1),
                        set("$action", "文献调研")
                    ]
                },
                {
                    text: "进行数据处理",
                    actions: [
                        increase("$数据处理", 1),
                        set("$action", "数据处理")
                    ]
                },
                {
                    text: "先放松放松再说吧",
                }
            ],
            actions: [
                jump("week1-4")
            ]
        },
        {
            id: "week1-4",
            text: [
                ne("$action", "").then("你在寒假期间完成了{$action}。"),
                "开学的前四周，你准备："
            ],
            choices: [
                {
                    text: "进行文献调研",
                    actions: [
                        increase("$文献调研", 1),
                        set("$action", "文献调研")
                    ]
                },
                {
                    text: "进行数据处理",
                    actions: [
                        increase("$数据处理", 1),
                        set("$action", "数据处理")
                    ]
                },
                {
                    text: "进行代码实现",
                    actions: [
                        increase("$代码实现", "$文献调研"),
                        set("$action", "代码实现")
                    ],
                    condition: gt("$文献调研", 0),
                    explanation: "文献调研之后才能开始代码实现"
                },
                {
                    text: "先放松放松再说吧",
                    actions: [
                        set("$action", "")
                    ]
                }
            ],
            actions: [
                jump("week5-8")
            ]
        },
        {
            id: "week5-8",
            text: [
                ne("$action", "").then("你在前四周完成了{$action}。"),
                "第五到八周，你准备："
            ],
            choices: [
                {
                    text: "进行文献调研",
                    actions: [
                        increase("$文献调研", 1),
                        set("$action", "文献调研")
                    ]
                },
                {
                    text: "进行数据处理",
                    actions: [
                        increase("$数据处理", 1),
                        set("$action", "数据处理")
                    ]
                },
                {
                    text: "进行代码实现",
                    actions: [
                        increase("$代码实现", "$文献调研"),
                        set("$action", "代码实现")
                    ],
                    condition: gt("$文献调研", 0),
                    explanation: "文献调研之后才能开始代码实现"
                },
                {
                    text: "先放松放松再说吧",
                    actions: [
                        set("$action", "")
                    ]
                }
            ],
            actions: [
                jump("before_midterm")
            ]
        },
        {
            id: "before_midterm",
            text: [
                ne("$action", "").then("你在第五到八周完成了{$action}。"),
                eq("$action", "代码实现").and(ge("$文献调研", 2)).then(
                    "由于你做了充分的文献调研，对问题背景有更深入的了解，因此在代码实现上非常顺利。你还提出了新的idea。"
                ),
                "",
                "马上就到中期答辩了。"
            ],
            actions: [
                jump("midterm")
            ]
        },
        {
            id: "midterm",
            actionsBefore: [
                // 各阶段进度
                ge("$文献调研", 2).then(
                    set("$文献调研进度", "进行了大量文献调研")
                ).else(ge("$文献调研", 1).then(
                    set("$文献调研进度", "完成了文献调研")
                ).else(
                    set("$文献调研进度", "没有做文献调研")
                )),
                ge("$数据处理", 2).then(
                    set("$数据处理进度", "进行了大量数据处理工作")
                ).else(ge("$数据处理", 1).then(
                    set("$数据处理进度", "完成了数据处理")
                ).else(
                    set("$数据处理进度", "没有做数据处理")
                )),
                ge("$代码实现", 2).then(
                    set("$代码实现进度", "完成了代码实现，并提出了新的想法")
                ).else(ge("$代码实现", 1).then(
                    set("$代码实现进度", "实现了部分实验代码")
                ).else(
                    set("$代码实现进度", "没有开始写代码")
                )),
                // 一些连词
                eq("$文献调研", 0).and(eq("$数据处理", 0)).or(gt("$文献调研", 0).and(gt("$数据处理", 0))).then(
                    set("$连接词1", "")
                ).else(
                    set("$连接词1", "但")
                ),
                eq("$数据处理", 0).and(eq("$代码实现", 0)).or(gt("$数据处理", 0).and(gt("$代码实现", 0))).then(
                    eq("$数据处理", 0).and(eq("$代码实现", 0)).then(
                        set("$连接词2", "也")
                    ).else(
                        set("$连接词2", "还")
                    )
                ).else(
                    set("$连接词2", "不过")
                ),
                // 老师评价
                ge("$代码实现", 2).then(
                    set("$中期评价", "非常满意")
                ).else(ge("$文献调研", 1).and(ge("$数据处理", 1)).and(ge("$代码实现", 1))
                    .or(ge("$数据处理", 2).and(ge("$文献调研", 1)))
                    .or(ge("$数据处理", 1).and(ge("$文献调研", 2))).then(
                        set("$中期评价", "比较满意")
                    ).else(ge("$文献调研", 1).and(ge("$数据处理", 1).or(ge("$代码实现", 1))).then(
                        set("$中期评价", "不太满意")
                    ).else([
                        set("$中期评价", "很不满意"),
                        flag("$黄牌")
                    ])))
            ],
            text: [
                "中期答辩的日子到了。",
                "你{$文献调研进度}，{$连接词1}{$数据处理进度}，{$连接词2}{$代码实现进度}。",
                "答辩组老师对你的进度{$中期评价}。",
                flagged("$黄牌").then("你的进度有点危险，之后不努力的话很可能需要参加全系答辩。")
            ],
            actions: [
                jump("week9-12")
            ]
        },
        {
            id: "week9-12",
            actionsBefore: [
                set("$action", "")
            ],
            text: [
                eq("$中期评价", "非常满意").or(eq("$中期评价", "比较满意")).then("你顺利通过了中期答辩。").else("不管怎么说，你还是熬过了中期答辩。"),
                "第九到十二周，你准备："
            ],
            choices: [
                {
                    text: "进行文献调研",
                    actions: [
                        increase("$文献调研", 1),
                        set("$action", "文献调研")
                    ]
                },
                {
                    text: "进行数据处理",
                    actions: [
                        increase("$数据处理", 1),
                        set("$action", "数据处理")
                    ]
                },
                {
                    text: "进行代码实现",
                    actions: [
                        increase("$代码实现", "$文献调研"),
                        set("$action", "代码实现")
                    ],
                    condition: gt("$文献调研", 0),
                    explanation: "文献调研之后才能开始代码实现"
                },
                {
                    text: "进行实验",
                    actions: [
                        increase("$实验", "$数据处理"),
                        increase("$实验", "$代码实现"),
                        set("$action", "实验")
                    ],
                    condition: gt("$代码实现", 0),
                    explanation: "进行代码实现后才可开始实验"
                },
                {
                    text: "先放松放松再说吧",
                    actions: [
                        set("$action", "")
                    ]
                }
            ],
            actions: [
                jump("week13-14")
            ]
        },
        {
            id: "week13-14",
            text: [
                ne("$action", "").then("你在第九到十二周完成了{$action}。"),
                eq("$action", "实验").then([
                    eq("$数据处理", 0).and(lt("$实验", 2)).then(
                        "由于没有进行数据处理，你的实验结果非常不理想，大概还需要再调一调。"
                    ).else(lt("$实验", 2).then(
                        "由于没有进行数据处理，你的实验结果非常不理想，大概还需要再调一调。"
                    ))
                ]),
                "最后需要留出两周的时间撰写论文，因此只有两周的时间了。你准备："
            ],
            choices: [
                {
                    text: "进行文献调研",
                    actions: [
                        increase("$文献调研", 1),
                        set("$action", "文献调研")
                    ]
                },
                {
                    text: "进行数据处理",
                    actions: [
                        increase("$数据处理", 1),
                        set("$action", "数据处理")
                    ]
                },
                {
                    text: "进行代码实现",
                    actions: [
                        increase("$代码实现", "$文献调研"),
                        set("$action", "代码实现")
                    ],
                    condition: gt("$文献调研", 0),
                    explanation: "文献调研之后才能开始代码实现"
                },
                {
                    text: "进行实验",
                    actions: [
                        increase("$实验", "$数据处理"),
                        increase("$实验", "$代码实现"),
                        set("$action", "实验")
                    ],
                    condition: gt("$代码实现", 0),
                    explanation: "进行代码实现后才可开始实验"
                },
                {
                    text: "论文撰写",
                    actions: [
                        increase("$论文撰写", 1),
                        set("$action", "论文撰写")
                    ],
                    condition: gt("$实验", 0),
                    explanation: "进行实验后才可开始论文撰写"
                },
                {
                    text: "先放松放松再说吧",
                    actions: [
                        set("$action", "")
                    ]
                }
            ],
            actions: [
                jump("before_thesis")
            ]
        },
        {
            id: "before_thesis",
            text: [
                ne("$action", "").then("你在第十三到十四周完成了{$action}。"),
                gt("$实验", 0).and(lt("$实验", 2)).then(
                    "你的实验结果不太理想，不过也没有时间调了。"
                ).else(gt("$实验", 2).then(
                    "你的实验结果较好，符合预期。"
                )),
                eq("$action", "论文撰写").then(
                    "你比大家更早开始了论文撰写，后面两周会轻松一些。不过，也得要加油才行。"
                ).else(
                    "最后的两周，得开始写论文了。"
                )
            ],
            actions: [
                ge("$论文撰写", 1).then(jump("thesis_easy")).else(jump("thesis_hard"))
            ]
        },
        {
            id: "thesis_easy",
            deadline: {
                targets: [80, 90, 105],
                title: "写论文",
                time: 15,
                moving: true,
                badChoices: 1
            },
            actions: [
                set("$论文撰写", "$__QTE__"),
                jump("before_defense")
            ]
        },
        {
            id: "thesis_hard",
            deadline: {
                targets: [55, 65, 80],
                title: "写论文",
                time: 15,
                moving: true,
                badChoices: 3
            },
            actions: [
                set("$论文撰写", "$__QTE__"),
                jump("before_defense")
            ]
        },
        {
            id: "before_defense",
            image: "毕业设计/论文.jpg",
            actionsBefore: [
                eq("$论文撰写", 3).then([
                    set("$论文评价", "优秀"),
                    set("$论文评语", "你的论文内容详实，排版精美，语言简练且易懂。")
                ]).else(eq("$论文撰写", 2).then([
                    set("$论文评价", "良好"),
                    set("$论文评语", "你的论文排版尚可，有一些凑篇幅的内容，但是大体上还不错。")
                ]).else(eq("$论文撰写", 1).then([
                    set("$论文评价", "合格"),
                    set("$论文评语", "你的论文存在一些格式错误，有不少没有营养的内容，但总的来说达到了要求。")
                ]).else([
                    set("$论文评价", "不合格"),
                    set("$论文评语", "你的论文不符合格式要求，充斥着错别字，而且没有写完。")
                ]))),
            ],
            text: [
                "{$论文评语}",
                "",
                "马上就到最终答辩了。"
            ],
            actions: [
                jump("defense")
            ]
        },
        {
            id: "defense",
            actionsBefore: [
                // 各阶段进度
                ge("$文献调研", 2).then(
                    set("$文献调研进度", "进行了大量文献调研")
                ).else(ge("$文献调研", 1).then(
                    set("$文献调研进度", "完成了文献调研")
                ).else(
                    set("$文献调研进度", "没有做文献调研")
                )),
                ge("$数据处理", 2).then(
                    set("$数据处理进度", "进行了大量数据处理工作")
                ).else(ge("$数据处理", 1).then(
                    set("$数据处理进度", "完成了数据处理")
                ).else(
                    set("$数据处理进度", "没有做数据处理")
                )),
                ge("$代码实现", 2).then(
                    set("$代码实现进度", "实现了新的方法")
                ).else(ge("$代码实现", 1).then(
                    set("$代码实现进度", "实现了已有方法")
                ).else(
                    set("$代码实现进度", "没有写代码")
                )),
                ge("$实验", 3).then(
                    set("$实验结果", "实验结果较好")
                ).else(ge("$实验", 2).then(
                    set("$实验结果", "实验结果尚可")
                ).else(
                    set("$实验结果", "实验结果较差")
                )),
                // 老师评价
                ge("$实验", 4).and(ge("$论文撰写", 2)).then([
                    set("$最终评价", "非常满意，并推荐你参加优秀论文评选"),
                    flag("$优秀")
                ]).else(ge("$论文撰写", 2).and(ge("$实验", 2)).then(
                    set("$最终评价", "比较满意")
                ).else(ge("$论文撰写", 1).and(ge("$实验", 1)).then(
                    set("$最终评价", "不太满意，但还是允许你通过了")
                ).else([
                    set("$最终评价", "很不满意"),
                    flag("$抽查")
                ])))
            ],
            text: [
                "最终答辩的日子到了。",
                "你{$文献调研进度}，{$数据处理进度}，{$代码实现进度}，{$实验结果}，论文{$论文评价}。",
                "答辩组老师对你的毕业设计{$最终评价}。",
                flagged("$抽查").then([
                    "不出意外，你成为了全组最后一名，需要参加几天后的全系答辩。",
                    "别慌，还有时间可以用来补救！"
                ])
            ],
            actions: [
                flagged("$优秀").then(
                    jump("outstanding")
                ).else(flagged("$抽查").then(
                    jump("second_defense_prepare")
                ).else(
                    jump("final")
                ))
            ]
        },
        {
            id: "second_defense_prepare",
            deadline: {
                targets: [30],
                title: "准备全系答辩",
                time: 8,
                moving: true,
                badChoices: 3
            },
            actions: [
                set("$全系答辩", 0),
                set("$全系答辩", "$__QTE__"),
                jump("second_defense")
            ]
        },
        {
            id: "second_defense",
            actionsBefore: [
                eq("$全系答辩", 0).then(flag("#毕设未通过"))
            ],
            text: [
                ge("$全系答辩", 1).then(
                    "你最终顺利通过了全系答辩，毕业设计合格。"
                ).else([
                    "你还是没有通过全系答辩……这意味着，毕业设计不合格，综合论文训练这门课也没有通过。",
                    "在最好情况下，你可以结业；如果本学期不合格课程的学分超过20，你将会被退学。"
                ])
            ]
        },
        {
            id: "outstanding",
            actionsBefore: [
                achieve("优秀毕业设计")
            ],
            text: [
                "你顺利通过了评优答辩，论文被评为了优秀毕业论文！",
                "一学期辛苦工作有了回报，这大概是最幸福的事情了。"
            ]
        },
        {
            id: "final",
            text: [
                gt("#不及格课程", 0).then(
                    "你的毕设通过了答辩。只要再考完之前没通过的课程可以毕业了！"
                ).else(
                    "你的毕设通过了答辩，可以毕业了！"
                )
            ]
        }
    ]
})
