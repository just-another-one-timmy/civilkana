TableAudio = function() {
};

TableAudio.prototype.getTitle = function() {
    return "Audio";
};

TableAudio.prototype.data = ["ア", "イ", "ウ", "エ", "オ",
                                "カ", "キ", "ク", "ケ", "コ",
                                "サ", "シ", "ス", "セ", "ソ",
                                "タ", "チ", "ツ", "テ", "ト",
                                "ナ", "ニ", "ヌ", "ネ", "ノ",
                                "ハ", "ヒ", "フ", "ヘ", "ホ",
                                "マ", "ミ", "ム", "メ", "モ",
                                "ヤ",       "ユ",       "ヨ",
                                "ラ", "リ", "ル", "レ", "ロ",
                                "ワ",                   "ヲ"];

TableAudio.prototype.getAudioFileName = function(symbolNo) {
    // Obviously won't work offline....
    // I should find some free japanese audio to fix this.
    return "http://translate.google.com/translate_tts?ie=UTF-8&tl=ja&q=" +
        this.data[symbolNo] + "ー";
};

TableAudio.prototype.getSymbolsCount = function() {
    return this.data.length;
};

TableAudio.prototype.getHTMLCodeForDisplaying = function(symbolNo) {
    return "<audio controls><source src='" + this.getAudioFileName(symbolNo) + "'/></audio>";
};

// Don't know how to do it "the right way".
Examinator.prototype.tables.push(new TableAudio());
