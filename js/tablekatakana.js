TableKatakana = function() {
};

TableKatakana.prototype.getTitle = function() {
    return "Katakana";
};

TableKatakana.prototype.data = ["ア", "イ", "ウ", "エ", "オ",
                                "カ", "キ", "ク", "ケ", "コ",
                                "サ", "シ", "ス", "セ", "ソ",
                                "タ", "チ", "ツ", "テ", "ト",
                                "ナ", "ニ", "ヌ", "ネ", "ノ",
                                "ハ", "ヒ", "フ", "ヘ", "ホ",
                                "マ", "ミ", "ム", "メ", "モ",
                                "ヤ",       "ユ",       "ヨ",
                                "ラ", "リ", "ル", "レ", "ロ",
                                "ワ",                   "ヲ"];

TableKatakana.prototype.getSymbol = function(symbolNo) {
    return this.data[symbolNo];
};

TableKatakana.prototype.getSymbolsCount = function() {
    return this.data.length;
};

// Don't know how to do it "the right way".
Examinator.prototype.tables.push(new TableKatakana());
