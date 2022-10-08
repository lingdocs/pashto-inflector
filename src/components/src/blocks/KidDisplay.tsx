import { baParticle } from "../../../lib/src/grammar-units";
import * as T from "../../../types";
import Pashto from "../Pashto";
import Phonetics from "../Phonetics";

function KidDisplay({ opts, kid, script }: {
    opts: T.TextOptions,
    kid: T.Kid,
    script: "p" | "f",
}) {
    const ps = kid.kid.type === "ba"
        ? baParticle
        : kid.kid.ps;
    return <div className="mx-1" key={kid.key}>
        {script === "p"
            ? <Pashto opts={opts}>{ps}</Pashto>
            : <Phonetics opts={opts}>{ps}</Phonetics>}
    </div>
}

export default KidDisplay;