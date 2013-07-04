TableRomaji = function() {
};

TableRomaji.prototype.getTitle = function() {
    return "Romaji";
};

TableRomaji.prototype.data = ["a", "i", "u", "e", "o",
                                "ka", "ki", "ku", "ke", "ko",
                                "sa", "shi", "su", "se", "so",
                                "ta", "chi", "tsu", "te", "to",
                                "na", "ni", "nu", "ne", "no",
                                "ha", "hi", "fu", "he", "ho",
                                "ma", "mi", "mu", "me", "mo",
                                "ya",       "yu",       "yo",
                                "ra", "ri", "ru", "re", "ro",
                                "wa",                   "wo"];;

TableRomaji.prototype.getSymbol = function(symbolNo) {
    return this.data[symbolNo];
};

TableRomaji.prototype.getSymbolsCount = function() {
    return this.data.length;
};

// Don't know how to do it "the right way".
Examinator.prototype.tables.push(new TableRomaji());
