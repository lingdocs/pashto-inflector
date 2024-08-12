import { getLength, getLong } from "../../../lib/src/p-text-helpers";
import * as T from "../../../types";
import Examples from "./Examples";

function CompiledPTextDisplay({
  compiled,
  opts,
  justify,
  onlyOne,
  length,
}: {
  compiled: {
    ps: T.SingleOrLengthOpts<T.PsString[]>;
    e?: string[] | undefined;
  };
  opts: T.TextOptions;
  justify?: "left" | "right" | "center";
  onlyOne?: boolean;
  length?: "long" | "short";
}) {
  function VariationLayer({ vs }: { vs: T.PsString[] }) {
    return (
      <div className="mb-2">
        <Examples opts={opts} lineHeight={0}>
          {vs}
        </Examples>
      </div>
    );
  }
  const ps = length ? getLength(compiled.ps, length) : compiled.ps;
  return (
    <div
      className={
        justify === "left"
          ? "text-left"
          : justify === "right"
          ? "text-right"
          : "text-center"
      }
    >
      {onlyOne ? (
        <VariationLayer vs={[getLong(ps)[0]]} />
      ) : "long" in ps ? (
        <div>
          <VariationLayer vs={ps.long} />
          <VariationLayer vs={ps.short} />
          {ps.mini && <VariationLayer vs={ps.mini} />}
        </div>
      ) : (
        <VariationLayer vs={ps} />
      )}
    </div>
  );
}

export default CompiledPTextDisplay;
