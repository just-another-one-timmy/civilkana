var Examinator = function() {
};

// Romaji table.
Examinator.prototype.table0 = ["a", "i", "u", "e", "o"];

// Hiragana table.
Examinator.prototype.table1 = ["あ", "い", "う", "え", "お"];

// Katakana table.
Examinator.prototype.table2 = ["ア", "イ", "ウ", "エ", "オ"];

Examinator.prototype.TABLES_COUNT = 3;

Examinator.prototype.SYMBOLS_COUNT = Examinator.prototype.table0.length;

Examinator.prototype.getTable = function(tableNo) {
    return this['table' + tableNo];
};

Examinator.prototype.getSymbol = function(tableNo, symbolNo) {
    return this.getTable(tableNo)[symbolNo];
};
