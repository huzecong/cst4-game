var VariableStorage = class {
    constructor() {
        this.values = {};
    }

    variable(key, typeIfCreate) {
        return new Variable(this, key, typeIfCreate);
    }

    clear() {
        this.values = {};
    }
};

VariableStorage.defaultValues = {
    "string": "",
    "boolean": false,
    "number": 0
};

global = new VariableStorage();
local = new VariableStorage();

function isVariable(key) {
    return typeof key === "string" && (key.startsWith("$") || key.startsWith("#"));
}

function lookup(key, typeIfCreate) {
    if (!isVariable(key))
        throw new Error("Looked up key \"" + key + "\" is not a variable");
    if (key.startsWith("#")) {
        return global.variable(key.substr(1), typeIfCreate);
    } else if (key.startsWith("$")) {
        return local.variable(key.substr(1), typeIfCreate);
    }
}

function replaceVariables(text) {
    return text.replace(/{([^{}]+)}/g, function (str, name) {
        return lookup(name).value();
    });
}

function valueOf(expr) {
    if (typeof expr === "function") {
        return expr();
    } else if (expr instanceof Expression) {
        return expr.value();
    } else {
        if (isVariable(expr))
            return lookup(expr).value();
        if (typeof expr === "string")
            return replaceVariables(expr);
        return expr;
    }
}

var Expression = class {
    value() {
        return this;
    }
};

var Variable = class extends Expression {
    constructor(sto, key, typeIfCreate) {
        super();
        this.sto = sto;
        this.key = key;
        this.typeIfCreate = typeIfCreate;
    }

    checkExists() {
        if (!(this.key in this.sto.values)) {
            if (this.typeIfCreate === undefined)
                throw new Error("Variable `" + this.key + "` does not exist");
            if (!(this.typeIfCreate in VariableStorage.defaultValues))
                throw new Error("Unsupported variable type: " + this.typeIfCreate);
            this.sto.values[this.key] = VariableStorage.defaultValues[this.typeIfCreate];
        }
    }

    value() {
        this.checkExists();
        var varVal = this.sto.values[this.key];
        if (varVal === null)
            varVal = 0;
        return varVal;
    }

    set(value) {
        this.checkExists();
        var varVal = this.sto.values[this.key];
        if (varVal !== null && typeof value !== typeof varVal)
            throw new Error("Type mismatch during assignment of `" + this.key);
        this.sto.values[this.key] = value;
    }

    delta(value) {
        this.checkExists();
        var varVal = this.sto.values[this.key];
        if (varVal === null) varVal = 0;
        if (typeof varVal !== "number")
            throw new Error("`increase`/`decrease` on non-number types");
        this.sto.values[this.key] = varVal + value;
    }
};

var RelOp = class {
    static gt(a, b) {
        return a > b;
    }

    static lt(a, b) {
        return a < b;
    }

    static ge(a, b) {
        return a >= b;
    }

    static le(a, b) {
        return a <= b;
    }

    static eq(a, b) {
        if (typeof a === "string" && typeof b === "string")
            return a.toLowerCase() === b.toLowerCase();
        return a === b;
    }

    static ne(a, b) {
        if (typeof a === "string" && typeof b === "string")
            return a.toLowerCase() !== b.toLowerCase();
        return a !== b;
    }

    static forward(func, a, b) {
        if (isVariable(a)) a = lookup(a, "number");
        if (isVariable(b)) b = lookup(b, "number");
        return function () {
            var valA = valueOf(a);
            var valB = valueOf(b);
            var retVal = func(valA, valB);
            // console.log(func, valA, valB, retVal);
            return retVal;
        }
    }
};

var Conditional = class extends Expression {
    constructor(cond) {
        super();
        this.cond = cond;
        this.thenClause = null;
        this.elseClause = null;
        this.andExprs = [];
        this.orExprs = [];
    }

    and(expr) {
        if (this.orExprs.length > 0)
            throw new Error("`or` is called on this conditional");
        this.andExprs.push(expr);
        return this;
    }

    or(expr) {
        if (this.andExprs.length > 0)
            throw new Error("`and` is called on this conditional");
        this.orExprs.push(expr);
        return this;
    }

    value() {
        var cond = valueOf(this.cond);
        if (typeof cond !== "boolean")
            throw new Error("Conditional not evaluated to boolean");
        for (var expr of this.andExprs) {
            var val = valueOf(expr);
            if (typeof val !== "boolean")
                throw new Error("Conditional in `and` not evaluated to boolean");
            cond = cond && val;
        }
        for (var expr of this.orExprs) {
            var val = valueOf(expr);
            if (typeof val !== "boolean")
                throw new Error("Conditional in `or` not evaluated to boolean");
            cond = cond || val;
        }
        if (this.thenClause == null && this.elseClause == null) {
            // console.log("cond: " + cond);
            return cond;
        } else {
            if (cond) {
                // console.log("cond then");
                return valueOf(this.thenClause);
            } else {
                // console.log("cond else");
                return valueOf(this.elseClause);
            }
        }
    }

    then(expr) {
        if (this.thenClause != null)
            throw new Error("`then` already called");
        this.thenClause = expr;
        return this;
    }

    else(expr) {
        if (this.elseClause != null)
            throw new Error("`else` already called");
        this.elseClause = expr;
        return this;
    }
};

var Assignment = class extends Expression {
    constructor(a, b) {
        super();
        this.a = a;
        this.b = b;
    }

    value() {
        var val = valueOf(this.b);
        this.a.set(val);
        // console.log("assign " + this.a.key + " " + val);
        return val;
    }
};

var Jump = class extends Expression {
    constructor(label) {
        super();
        this.label = label;
    }
};

var Log = class extends Expression {
    constructor(msg) {
        super();
        this.msg = msg;
    }
};

var Ending = class extends Expression {
    constructor(name) {
        super();
        this.name = name;
    }
};

var Achievement = class extends Expression {
    constructor(name) {
        super();
        this.name = name;
    }
};

var Exec = class extends Expression {
    constructor(func) {
        super();
        this.func = func;
    }

    value() {
        return this.func();
    }
};

function ge(a, b) {
    return new Conditional(RelOp.forward(RelOp.ge, a, b));
}

function le(a, b) {
    return new Conditional(RelOp.forward(RelOp.le, a, b));
}

function gt(a, b) {
    return new Conditional(RelOp.forward(RelOp.gt, a, b));
}

function lt(a, b) {
    return new Conditional(RelOp.forward(RelOp.lt, a, b));
}

function eq(a, b) {
    return new Conditional(RelOp.forward(RelOp.eq, a, b));
}

function ne(a, b) {
    return new Conditional(RelOp.forward(RelOp.ne, a, b));
}

function flagged(key) {
    return new Conditional(lookup(key, "boolean"));
}

function not(a) {
    return new Conditional(function () {
        return !valueOf(a);
    });
}

function flag(key) {
    return new Assignment(lookup(key, "boolean"), true);
}

function unflag(key) {
    return new Assignment(lookup(key, "boolean"), false);
}

function set(key, value) {
    return new Assignment(lookup(key, typeof value), value);
}

function increase(key, delta) {
    var variable = lookup(key, "number");
    return new Assignment(variable, function () {
        return variable.value() + delta;
    });
}

function decrease(key, delta) {
    return increase(key, -delta);
}

function achieve(name) {
    return new Achievement(name);
}

function ending(name) {
    return new Ending(name);
}

function jump(label) {
    return new Jump(label);
}

function exec(func) {
    return new Exec(func);
}