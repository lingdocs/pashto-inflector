import { psJSXMap } from "./jsx-map";

test("psJSXMap should work with p as a target", () => {
    const input = { p: <>زه کور ته <strong>ځم</strong></>, f: <>zu kor ta <strong>dzum</strong></> };
    const output = psJSXMap(input, "p", (ps) => ps.p.replace(/ځ/g, "ز"));
    expect(output).toEqual(<>زه کور ته <strong>زم</strong></>);
});

test("psJSXMap should work with f as a target", () => {
    const input = { p: <>زه کور ته <strong>ځم</strong></>, f: <>zu kor ta <strong>dzum</strong></> };
    const output = psJSXMap(input, "f", (ps) => ps.f.replace(/dz/g, "z"));
    expect(output).toEqual(<>zu kor ta <strong>zum</strong></>);
});

test("psJSXMap should work with single child", () => {
    const input = { p: <div><span>کور</span></div>, f: <div><span>kor</span></div> };
    const output = psJSXMap(input, "f", (ps) => ps.f.replace(/k/g, "q"));
    expect(output).toEqual(<div><span>qor</span></div>);
});

test("psJSXMap will error if given an uneven/unbalanced pair of JSX Elements", () => {
    expect(() => {
        const input = { p: <>زه کور ته <strong>ځم</strong></>, f: <>zu kor ta dzum</> };
        psJSXMap(input, "p", (ps) => ps.p.replace(/ځ/g, "ز"));
    }).toThrow("error mapping out PsJSX - unbalanced trees");
});
