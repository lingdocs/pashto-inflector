import { baParticle } from "../../../lib/src/grammar-units";
import * as T from "../../../types";
import Pashto from "../text-display/Pashto";
import Phonetics from "../text-display/Phonetics";

function KidDisplay({
  opts,
  kid,
  script,
}: {
  opts: T.TextOptions;
  kid: T.Kid;
  script: "p" | "f";
}) {
  const ps = kid.kid.type === "ba" ? baParticle : kid.kid.ps;
  return (
    <div className="mx-1" key={kid.key}>
      {script === "p" ? (
        <Pashto opts={opts} ps={ps} />
      ) : (
        <Phonetics opts={opts} ps={ps} />
      )}
    </div>
  );
}

export default KidDisplay;
