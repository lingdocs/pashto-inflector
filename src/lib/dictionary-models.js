// eslint-disable-next-line
// then converted manually to module form

// DictionaryInfo ========================================

const DictionaryInfo = {}

DictionaryInfo.read = function (pbf, end) {
    return pbf.readFields(DictionaryInfo._readField, {title: "", license: "", release: 0, numberOfEntries: 0, url: "", infoUrl: ""}, end);
};
DictionaryInfo._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.title = pbf.readString();
    else if (tag === 2) obj.license = pbf.readString();
    else if (tag === 3) obj.release = pbf.readVarint(true);
    else if (tag === 4) obj.numberOfEntries = pbf.readVarint(true);
    else if (tag === 5) obj.url = pbf.readString();
    else if (tag === 6) obj.infoUrl = pbf.readString();
};
DictionaryInfo.write = function (obj, pbf) {
    if (obj.title) pbf.writeStringField(1, obj.title);
    if (obj.license) pbf.writeStringField(2, obj.license);
    if (obj.release) pbf.writeVarintField(3, obj.release);
    if (obj.numberOfEntries) pbf.writeVarintField(4, obj.numberOfEntries);
    if (obj.url) pbf.writeStringField(5, obj.url);
    if (obj.infoUrl) pbf.writeStringField(6, obj.infoUrl);
};

// Entry ========================================

const Entry = {};

Entry.read = function (pbf, end) {
    return pbf.readFields(Entry._readField, {ts: 0, i: 0, p: "", f: "", g: "", e: ""}, end);
};
Entry._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.ts = pbf.readVarint(true);
    else if (tag === 2) obj.i = pbf.readVarint(true);
    else if (tag === 3) obj.p = pbf.readString();
    else if (tag === 4) obj.f = pbf.readString();
    else if (tag === 5) obj.g = pbf.readString();
    else if (tag === 6) obj.e = pbf.readString();
    else if (tag === 7) obj.c = pbf.readString();
    else if (tag === 8) obj.l = pbf.readVarint(true);
    else if (tag === 9) obj.infap = pbf.readString();
    else if (tag === 10) obj.infaf = pbf.readString();
    else if (tag === 11) obj.infbp = pbf.readString();
    else if (tag === 12) obj.infbf = pbf.readString();
    else if (tag === 13) obj.noInf = pbf.readBoolean();
    else if (tag === 14) obj.app = pbf.readString();
    else if (tag === 15) obj.apf = pbf.readString();
    else if (tag === 16) obj.ppp = pbf.readString();
    else if (tag === 17) obj.ppf = pbf.readString();
    else if (tag === 18) obj.psp = pbf.readString();
    else if (tag === 19) obj.psf = pbf.readString();
    else if (tag === 20) obj.ssp = pbf.readString();
    else if (tag === 21) obj.ssf = pbf.readString();
    else if (tag === 22) obj.prp = pbf.readString();
    else if (tag === 23) obj.prf = pbf.readString();
    else if (tag === 24) obj.pprtp = pbf.readString();
    else if (tag === 25) obj.pprtf = pbf.readString();
    else if (tag === 26) obj.tppp = pbf.readString();
    else if (tag === 27) obj.tppf = pbf.readString();
    else if (tag === 28) obj.shortIntrans = pbf.readBoolean();
    else if (tag === 29) obj.noOo = pbf.readBoolean();
    else if (tag === 30) obj.sepOo = pbf.readBoolean();
    else if (tag === 31) obj.separationAtP = pbf.readVarint(true);
    else if (tag === 32) obj.separationAtF = pbf.readVarint(true);
    else if (tag === 33) obj.diacExcept = pbf.readBoolean();
    else if (tag === 34) obj.ec = pbf.readString();
    else if (tag === 35) obj.ep = pbf.readString();
};
Entry.write = function (obj, pbf) {
    if (obj.ts) pbf.writeVarintField(1, obj.ts);
    if (obj.i) pbf.writeVarintField(2, obj.i);
    if (obj.p) pbf.writeStringField(3, obj.p);
    if (obj.f) pbf.writeStringField(4, obj.f);
    if (obj.g) pbf.writeStringField(5, obj.g);
    if (obj.e) pbf.writeStringField(6, obj.e);
    if (obj.c) pbf.writeStringField(7, obj.c);
    if (obj.l) pbf.writeVarintField(8, obj.l);
    if (obj.infap) pbf.writeStringField(9, obj.infap);
    if (obj.infaf) pbf.writeStringField(10, obj.infaf);
    if (obj.infbp) pbf.writeStringField(11, obj.infbp);
    if (obj.infbf) pbf.writeStringField(12, obj.infbf);
    if (obj.noInf) pbf.writeBooleanField(13, obj.noInf);
    if (obj.app) pbf.writeStringField(14, obj.app);
    if (obj.apf) pbf.writeStringField(15, obj.apf);
    if (obj.ppp) pbf.writeStringField(16, obj.ppp);
    if (obj.ppf) pbf.writeStringField(17, obj.ppf);
    if (obj.psp) pbf.writeStringField(18, obj.psp);
    if (obj.psf) pbf.writeStringField(19, obj.psf);
    if (obj.ssp) pbf.writeStringField(20, obj.ssp);
    if (obj.ssf) pbf.writeStringField(21, obj.ssf);
    if (obj.prp) pbf.writeStringField(22, obj.prp);
    if (obj.prf) pbf.writeStringField(23, obj.prf);
    if (obj.pprtp) pbf.writeStringField(24, obj.pprtp);
    if (obj.pprtf) pbf.writeStringField(25, obj.pprtf);
    if (obj.tppp) pbf.writeStringField(26, obj.tppp);
    if (obj.tppf) pbf.writeStringField(27, obj.tppf);
    if (obj.shortIntrans) pbf.writeBooleanField(28, obj.shortIntrans);
    if (obj.noOo) pbf.writeBooleanField(29, obj.noOo);
    if (obj.sepOo) pbf.writeBooleanField(30, obj.sepOo);
    if (obj.separationAtP) pbf.writeVarintField(31, obj.separationAtP);
    if (obj.separationAtF) pbf.writeVarintField(32, obj.separationAtF);
    if (obj.diacExcept) pbf.writeBooleanField(33, obj.diacExcept);
    if (obj.ec) pbf.writeStringField(34, obj.ec);
    if (obj.ep) pbf.writeStringField(35, obj.ep);
};

// Dictionary ========================================

var Dictionary = {};

Dictionary.read = function (pbf, end) {
    return pbf.readFields(Dictionary._readField, {info: null, entries: []}, end);
};
Dictionary._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.info = DictionaryInfo.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 2) obj.entries.push(Entry.read(pbf, pbf.readVarint() + pbf.pos));
};
Dictionary.write = function (obj, pbf) {
    if (obj.info) pbf.writeMessage(1, DictionaryInfo.write, obj.info);
    if (obj.entries) for (var i = 0; i < obj.entries.length; i++) pbf.writeMessage(2, Entry.write, obj.entries[i]);
};

export { Dictionary, DictionaryInfo, Entry };
