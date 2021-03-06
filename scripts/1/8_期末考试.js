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
                    text: "下列哪位数学家<b>没有</b>以自己名字命名的<b>判断级数是否收敛</b>的判别法或定理：",
                    answer: "Euler",
                    choices: [
                        "Leibniz",
                        "D'Alembert",
                        "Raabe",
                        "Cauchy",
                        "Dirichlet",
                        "Abel",
                        "Weierstrass",
                        "Dini"
                    ]
                }
            ]
        },
        {
            name: "线性代数",
            points: 4,
            questions: [
                {
                    image: "期末考试/线代老师.jpg",
                    text: "上图中哪一位是我们大一时的线性代数老师：",
                    answer: "右下",
                    choices: [
                        "左上",
                        "左下",
                        "右上"
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
                gt("#不及格课程", 0).then(flag("#挂科")),
                ge("$不及格学分", 20).then(ending("被迫退学"))
            ]
        }
    ]
})
