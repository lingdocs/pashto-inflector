import { psJSXMap } from "./jsx-map";

test("psJSXMap should work with p as a target", () => {
  const input = {
    p: (
      <>
        زه کور ته <strong>ځم</strong>
      </>
    ),
    f: (
      <>
        zu kor ta <strong>dzum</strong>
      </>
    ),
  };
  const output = psJSXMap(input, "p", (ps) => ps.p.replace(/ځ/g, "ز"));
  expect(output).toEqual(
    <>
      زه کور ته <strong>زم</strong>
    </>
  );
});

test("psJSXMap should work with f as a target", () => {
  const input = {
    p: (
      <>
        زه کور ته <strong>ځم</strong>
      </>
    ),
    f: (
      <>
        zu kor ta <strong>dzum</strong>
      </>
    ),
  };
  const output = psJSXMap(input, "f", (ps) => ps.f.replace(/dz/g, "z"));
  expect(output).toEqual(
    <>
      zu kor ta <strong>zum</strong>
    </>
  );
});

test("psJSXMap should work with single child", () => {
  const input = {
    p: (
      <div>
        <span>کور</span>
      </div>
    ),
    f: (
      <div>
        <span>kor</span>
      </div>
    ),
  };
  const output = psJSXMap(input, "f", (ps) => ps.f.replace(/k/g, "q"));
  expect(output).toEqual(
    <div>
      <span>qor</span>
    </div>
  );
});

/**
 * Helps prevent error logs blowing up as a result of expecting an error to be thrown,
 * when using a library (such as enzyme)
 *
 * @param func Function that you would normally pass to `expect(func).toThrow()`
 */
export const expectToThrow = (
  func: () => unknown,
  error?: JestToErrorArg
): void => {
  // Even though the error is caught, it still gets printed to the console
  // so we mock that out to avoid the wall of red text.
  const spy = jest.spyOn(console, "error");
  spy.mockImplementation(() => {});

  expect(func).toThrow(error);

  spy.mockRestore();
};

type JestToErrorArg = Parameters<
  jest.Matchers<unknown, () => unknown>["toThrow"]
>[0];

test("psJSXMap will error if given an uneven/unbalanced pair of JSX Elements", () => {
  expectToThrow(() => {
    const input = {
      p: (
        <>
          زه کور ته <strong>ځم</strong>
        </>
      ),
      f: <>zu kor ta dzum</>,
    };
    psJSXMap(input, "p", (ps) => ps.p.replace(/ځ/g, "ز"));
  });
});
