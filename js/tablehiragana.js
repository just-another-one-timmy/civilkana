TableHiragana = function() {
};

TableHiragana.prototype.getTitle = function() {
    return "Hiragana";
};

TableHiragana.prototype.data = ["あ", "い", "う", "え", "お",
                                "か", "き", "く", "け", "こ",
                                "さ", "し", "す", "せ", "そ",
                                "た", "ち", "つ", "て", "と",
                                "な", "に", "ぬ", "ね", "の",
                                "は", "ひ", "ふ", "へ", "ほ",
                                "ま", "み", "む", "め", "も",
                               "や",       "ゆ",       "よ",
                                "ら", "り", "る", "れ", "ろ",
                                "わ",                   "を"];

TableHiragana.prototype.getSymbol = function(symbolNo) {
    return this.data[symbolNo];
};

TableHiragana.prototype.getSymbolsCount = function() {
    return this.data.length;
};

TableHiragana.prototype.getHTMLCodeForDisplaying = function(symbolNo) {
    return "<p>" + this.getSymbol(symbolNo) + "</p>";
};

// Don't know how to do it "the right way".
Examinator.prototype.tables.push(new TableHiragana());
