// import Examples from "../components/src/text-display/Examples";
import * as T from "../types";
import Examples from "../components/src/text-display/Examples";
import InlinePs from "../components/src/text-display/InlinePs";

export default function TextDisplayDemo({ opts }: { opts: T.TextOptions }) {
  return (
    <div>
      <h4>Inline Pashto Text</h4>
      <p>
        The word{" "}
        <InlinePs opts={opts} ps={{ p: "کور", f: "kor", e: "house - n. m." }} />{" "}
        is inline and the word{" "}
        <InlinePs
          opts={opts}
          error
          ps={{ p: "کورر", f: "korr", e: "house - n. m." }}
        />{" "}
        is incorrect.
      </p>
      <h4>Example Sentences</h4>
      <Examples opts={opts}>
        {[
          {
            p: "زه کور ته ځم",
            f: "zu kor ta dzum",
            e: "I am going home",
            sub: "Here is a basic sentence example",
          },
          {
            p: "زه کور ته ځي",
            f: "zu kor ta dzee",
            e: "I am going home",
            error: true,
            sub: "This example is incorrect",
          },
        ]}
      </Examples>
      <h5>With Markdown</h5>
      <Examples opts={opts} md>
        {[
          {
            p: "زه **کور** ته ځم",
            f: "zu **kor** ta dzum",
            e: "I am going home",
            sub: "Here is a basic sentence example",
          },
          {
            p: "زه **کور** ته ځي",
            f: "zu **kor** ta dzee",
            e: "I am going home",
            error: true,
            sub: "This example is incorrect",
          },
          {
            p: <div>زه **کور** ته ځم</div>,
            f: <div>zu **kor** ta dzum</div>,
            e: <div>I am going **home**</div>,
            sub: "Here is a basic sentence example _with markdown_",
          },
          {
            p: <div>زه **کور** ته ځي</div>,
            f: <div>zu **kor** ta dzee</div>,
            e: "I am going **home**",
            error: true,
            sub: (
              <>
                <div>
                  Here is sentence example _with markdown_ and{" "}
                  <span> _**nested jsx**_</span>
                </div>
              </>
            ),
          },
        ]}
      </Examples>
    </div>
  );
}
