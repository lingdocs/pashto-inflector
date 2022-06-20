import { baParticle } from "../../lib/grammar-units";
import * as T from "../../types";
import Pashto from "../Pashto";
import Phonetics from "../Phonetics";

function KidDisplay({ opts, kid, script }: {
    opts: T.TextOptions,
    kid: T.Kid,
    script: "p" | "f",
}) {
    const ps = kid.type === "ba"
        ? baParticle
        : kid.ps;
    return <div className="mx-1">
        {script === "p"
            ? <Pashto opts={opts}>{ps}</Pashto>
            : <Phonetics opts={opts}>{ps}</Phonetics>}
    </div>
}

export default KidDisplay;