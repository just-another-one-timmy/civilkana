// TODO:
// - refactor
// - add dependency injection on modes

var Examinator = function() {
    this.question = null;
    this.allowedQuestionTables = null;
    this.allowedQuestionSymbols = null;
    this.allowedAnswerTables = null;
};

// Romaji table.
Examinator.prototype.tableRomaji = ["a", "i", "u", "e", "o",
                               "ka", "ki", "ku", "ke", "ko",
                               "sa", "shi", "su", "se", "so",
                               "ta", "chi", "tsu", "te", "to",
                               "na", "ni", "nu", "ne", "no",
                               "ha", "hi", "fu", "he", "ho",
                               "ma", "mi", "mu", "me", "mo",
                               "ya",       "yu",       "yo",
                               "ra", "ri", "ru", "re", "ro",
                               "wa",                   "wo"];

// Hiragana table.
Examinator.prototype.tableHiragana = ["あ", "い", "う", "え", "お",
                               "か", "き", "く", "け", "こ",
                               "さ", "し", "す", "せ", "そ",
                               "た", "ち", "つ", "て", "と",
                               "な", "に", "ぬ", "ね", "の",
                               "は", "ひ", "ふ", "へ", "ほ",
                               "ま", "み", "む", "め", "も",
                               "や",       "ゆ",       "よ",
                               "ら", "り", "る", "れ", "ろ",
                               "わ",                   "を"];

// Katakana table.
Examinator.prototype.tableKatakana = ["ア", "イ", "ウ", "エ", "オ",
                               "カ", "キ", "ク", "ケ", "コ",
                               "サ", "シ", "ス", "セ", "ソ",
                               "タ", "チ", "ツ", "テ", "ト",
                               "ナ", "ニ", "ヌ", "ネ", "ノ",
                               "ハ", "ヒ", "フ", "ヘ", "ホ",
                               "マ", "ミ", "ム", "メ", "モ",
                               "ヤ",       "ユ",       "ヨ",
                               "ラ", "リ", "ル", "レ", "ロ",
                               "ワ",                   "ヲ"];

Examinator.prototype.tables = [Examinator.prototype.tableRomaji,
                               Examinator.prototype.tableHiragana,
                               Examinator.prototype.tableKatakana];

Examinator.prototype.getSymbolsCount = function() {
    return this.tables[0].length;
};

// Retrieves symbol from given table by number.
Examinator.prototype.getSymbol = function(tableNo, symbolNo) {
    return this.tables[tableNo][symbolNo];
};

Examinator.prototype.generateQuestion = function(allowedTables, allowedSymbols) {
    this.question = _.shuffle(this.descartesMultiply(allowedTables, allowedSymbols))[0];
    return this.question;
};

Examinator.prototype.generateWrongAnswers = function(allowedTables, allowedSymbols, correctSymbol) {
    this.wrongAnswers = _.shuffle(this.descartesMultiply(allowedTables, _.without(allowedSymbols, correctSymbol)));
    return this.wrongAnswers;
};

Examinator.prototype.generateCorrectAnswer = function(allowedTables, correctSymbol, questionTable) {
    var answerTable = _.shuffle(_.without(allowedTables, questionTable))[0];
    var correctAnswer = this.descartesMultiply([answerTable], [correctSymbol]);
    this.correctAnswer = correctAnswer;
    return correctAnswer[0];
};

Examinator.prototype.quickTestMode = function() {
    this.allowedQuestionTables = _.range(0, this.tables.length);
    this.allowedQuestionSymbols = _.range(0, this.getSymbolsCount());
    this.allowedAnswerTables = _.range(0, this.tables.length);
};

Examinator.prototype.create2TablesMode = function(tableFrom, tableTo) {
    return function() {
        this.allowedQuestionTables = [tableFrom];
        this.allowedQuestionSymbols = _.range(0, this.getSymbolsCount());
        this.allowedAnswerTables = [tableTo];
    }
};

Examinator.prototype.hiragana2romajiMode = Examinator.prototype.create2TablesMode(1, 0);
Examinator.prototype.romaji2hiraganaMode = Examinator.prototype.create2TablesMode(0, 1);
Examinator.prototype.katakana2romajiMode = Examinator.prototype.create2TablesMode(2, 0);
Examinator.prototype.romaji2katakanaMode = Examinator.prototype.create2TablesMode(0, 2);
Examinator.prototype.hiragana2katakanaMode = Examinator.prototype.create2TablesMode(1, 2);
Examinator.prototype.katakana2hiraganaMode = Examinator.prototype.create2TablesMode(2, 1);

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
