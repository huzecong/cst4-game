// noinspection BadExpressionStatementJS
({
    type: "exam",
    stage: "大一",
    actionsBefore: [],
    exams: [
        {
            name: "微积分",
            points: 5,
            questions: [
                {
                    image: "期末考试/微积分1.jpg",
                    text: "计算上式中的极限：",
                    answer: "1/3",
                    choices: [
                        "0",
                        "1",
                        "2/3"
                    ]
                },
                {
                    image: "期末考试/微积分2.jpg",
                    text: "设函数 y(t) 满足方程 y'' + y' + y = 1 + cos t ，请计算上式中的极限：",
                    answer: "0",
                    choices: [
                        "1",
                        "-π",
                        "π"
                    ]
                }
            ]
        },
        {
            name: "线性代数",
            points: 4,
            questions: [
                {
                    text: "设 A 为 n 阶方阵， A-I 不可逆的充分条件是A满足：",
                    answer: "A²+A-2I = 0 且不存在实数 k 满足 A = kI",
                    choices: [
                        "A²+A-2I = 0",
                        "不存在实数 k 满足 A = kI",
                        "A²+A-2I = 0 且 A+2I 不可逆"
                    ]
                },
                {
                    text: "设 A 是3阶矩阵，已知 α 是 A 的属于特征值 λ 的一个特征向量， B 是与 A 相似的矩阵，且 B = P⁻¹AP，则下列哪个是 B 的属于特征值 λ 的一个特征向量：",
                    answer: "P⁻¹α",
                    choices: [
                        "Pα",
                        "α",
                        "Bα"
                    ]
                }
            ]
        },
        {
            name: "OOP",
            points: 2,
            questions: [
                {
                    text: "以下说法不正确的是：",
                    answer: "public继承中派生类的成员函数可以访问基类中的私有成员",
                    choices: [
                        "private继承中派生类对象不允许向上转换",
                        "显式调用基类构造函数只能在派生类构造函数的初始化成员列表中进行",
                        "如果基类的某个构造函数被声明为私有，则不能在派生类中调用该私有构造函数"
                    ]
                },
                {
                    text: "下面哪一种设计原则可以提高代码的可复用性和可维护性：",
                    answer: "对扩展开放，对修改关闭",
                    choices: [
                        "对继承开放，对重载关闭",
                        "对重载开放，对继承关闭",
                        "对修改开放，对扩展关闭"
                    ]
                }
            ]
        }
    ],
    pages: [
        {
            id: "final",
            text: [
                ge("$不及格学分", 20).then("非常遗憾，你的不及格学分达到了20分，因此……").else([
                    "你平安度过了大学的第一个考试周。",
                    gt("#不及格课程", 0).then("不过，你有{#不及格课程}门考试不及格。你需要在大二重修这些课程，并再次参加考试。好好学习！")
                ])
            ],
            actions: [
                decrease("#成绩", "#不及格课程"),
                ge("$不及格学分", 20).then(ending("被迫退学"))
            ]
        }
    ]
})
