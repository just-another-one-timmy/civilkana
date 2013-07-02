var ExaminatorView = function() {
};

ExaminatorView.prototype.VARIANTS_COUNT = 10;

ExaminatorView.prototype.DELAY_BEFORE_NEXT_GUESS = 500;

ExaminatorView.prototype.start = function(fromTables, toTables) {
    this.ex = new Examinator();
    this.ex.generateModeFunction(fromTables, toTables)();
    this.clearAnswerButtons();
    this.askQuestion();
};

ExaminatorView.prototype.clearAnswerButtons = function() {
    $('#answers').empty();
};

ExaminatorView.prototype.addAnswerButtons = function(variants,
                                               ansSymbolNo) {
    _.each(variants,
           function(variant) {
               $("<button class='answerbtn btn btn-primary btn-large'>" +
                   variant.symbol + "</button>").appendTo('#answers')
                   .data('symbolNo', variant.symbolNo)
                   .data('tableNo', variant.tableNo)
                   .data('symbol', variant.symbol);
           });

    quickTestObject = this;

    $('.answerbtn').click(
        function(obj) {
            var btn = obj.target;
            var symbolNo = $(btn).data('symbolNo');
            if (symbolNo == ansSymbolNo) {
                $(btn).addClass("btn-success");
                window.setTimeout(
                    function() {
                        quickTestObject.clearAnswerButtons();
                        quickTestObject.askQuestion();
                    },
                    quickTestObject.DELAY_BEFORE_NEXT_GUESS);
            } else {
                $(btn).addClass("btn-danger");
            }
        });
};

ExaminatorView.prototype.showQuestion = function(symbol) {
    $('#question').text(symbol);
};

ExaminatorView.prototype.askQuestion = function() {
    var ex = this.ex;
    var question = ex.generateQuestion(ex.allowedQuestionTables,
                                       ex.allowedQuestionSymbols);
    var wrongAnswers = ex.generateWrongAnswers(
        ex.allowedAnswerTables,
        // Allowed answer symbols are the same as allowed
        // question symbols.
        ex.allowedQuestionSymbols,
        // Correct symbol no.
        question.b);

    var correctAnswer = ex.generateCorrectAnswer(
        ex.allowedAnswerTables,
        question.b,
        question.a);

    var variants = _.union([correctAnswer], wrongAnswers);
    variants = _.first(variants, this.VARIANTS_COUNT);
    variants = _.shuffle(variants);
    variants = _.map(variants,
                     function(variant) {
                         variant.symbolNo = variant.b;
                         variant.tableNo = variant.a;
                         variant.symbol = ex.getSymbol(variant.tableNo, variant.symbolNo)
                         return variant;
                     });

    this.showQuestion(ex.getSymbol(question.a, question.b));
    this.addAnswerButtons(variants, question.b);
};
