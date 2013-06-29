var QuickTest = function() {
};

QuickTest.prototype.VARIANTS_COUNT = 8;

QuickTest.prototype.DELAY_BEFORE_NEXT_GUESS = 500;

QuickTest.prototype.start = function() {
    this.ex = new Examinator();
    this.clearAnswerButtons();
    this.guessSymbol();
};

QuickTest.prototype.clearAnswerButtons = function() {
    $('#answers').empty();
};

QuickTest.prototype.addAnswerButtons = function(variants,
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
                        quickTestObject.guessSymbol();
                    },
                    quickTestObject.DELAY_BEFORE_NEXT_GUESS);
            } else {
                $(btn).addClass("btn-danger");
            }
        });
};

QuickTest.prototype.showQuestion = function(symbol) {
    $('#question').text(symbol);
};

// Generates list of candidates for guessing.
// Guarantees there won't be variants with given symbolNo,
// so they all will be wrong.
QuickTest.prototype.generateWrongVariants = function(symbolNo, variantsCount) {
    var allTables = _.range(this.ex.TABLES_COUNT);
    var allSymbols = _.range(this.ex.SYMBOLS_COUNT);
    var allWrongSymbols = _.without(allSymbols, symbolNo);

    var allWrongPairs = _.flatten(_.map(allTables,
                              function(tableNo) {
                                  return _.map(allWrongSymbols,
                                               function(symbolNo) {
                                                   return {
                                                       "tableNo": tableNo,
                                                       "symbolNo": symbolNo
                                                   };
                                               });
                              }));

    return _.first(_.shuffle(allWrongPairs), variantsCount);
};

QuickTest.prototype.guessSymbol = function() {
    var ex = this.ex;
    // Generating symbol that user will be trying to guess.
    var tableNo = _.random(ex.TABLES_COUNT - 1);
    var symbolNo = _.random(ex.SYMBOLS_COUNT - 1);

    this.showQuestion(ex.getSymbol(tableNo, symbolNo));

    // Generating many wrong variants.
    var variants = this.generateWrongVariants(symbolNo, this.VARIANTS_COUNT - 1);

    // Adding the only one correct variant.
    var ansTableNo = _.shuffle(_.without(_.range(ex.TABLES_COUNT), tableNo))[0];
    variants.unshift({"tableNo": ansTableNo, "symbolNo": symbolNo});

    variants = _.shuffle(_.map(variants,
                     function(variant) {
                         variant.symbol = ex.getSymbol(variant.tableNo, variant.symbolNo);
                         return variant;
                     }));

    this.addAnswerButtons(variants, symbolNo);
};

(new QuickTest()).start();
