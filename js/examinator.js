// TODO:
// - refactor
// - add dependency injection on modes

var Examinator = function() {
    this.question = null;
    this.allowedQuestionTables = null;
    this.allowedQuestionSymbols = null;
    this.allowedAnswerTables = null;
};

// Tables would automagically add themselves.
Examinator.prototype.tables = [];

Examinator.prototype.getSymbolsCount = function() {
    return this.tables[0].getSymbolsCount();
};

Examinator.prototype.getAllTablesTitles = function() {
    return _.map(this.tables, function(table) {
        return table.getTitle();
    });
};

Examinator.prototype.getTableByTitle = function(tableTitle) {
    return _.find(this.tables, function(table) {
        return table.getTitle() == tableTitle;
    });
};

Examinator.prototype.getSymbol = function(tableTitle, symbolNo) {
    return this.getTableByTitle(tableTitle).getSymbol(symbolNo);
};

Examinator.prototype.generateQuestion = function(allowedTables, allowedSymbols) {
    return _.shuffle(this.descartesMultiply(allowedTables, allowedSymbols))[0];
};

Examinator.prototype.generateWrongAnswers = function(allowedTables, allowedSymbols, correctSymbol) {
    return _.shuffle(this.descartesMultiply(allowedTables, _.without(allowedSymbols, correctSymbol)));
};

Examinator.prototype.generateCorrectAnswer = function(allowedTables, correctSymbol, questionTable) {
    var answerTable = _.shuffle(_.without(allowedTables, questionTable))[0];
    var correctAnswer = this.descartesMultiply([answerTable], [correctSymbol]);
    return correctAnswer[0];
};

Examinator.prototype.quickTestMode = function() {
    this.allowedQuestionTables = _.range(0, this.tables.length);
    this.allowedQuestionSymbols = _.range(0, this.getSymbolsCount());
    this.allowedAnswerTables = _.range(0, this.tables.length);
};

Examinator.prototype.generateModeFunction = function(tablesFrom, tablesTo) {
    var obj = this;
    return function() {
        obj.allowedQuestionTables = tablesFrom.split(",");
        obj.allowedQuestionSymbols = _.range(0, obj.getSymbolsCount());
        obj.allowedAnswerTables = tablesTo.split(",");
    }
};

Examinator.prototype.descartesMultiply = function(list1, list2) {
    return _.flatten(_.map(list1,
                           function(item1) {
                               return _.map(list2,
                                            function(item2) {
                                                return {
                                                    a: item1,
                                                    b: item2
                                                };
                                            });
                           }));
};
