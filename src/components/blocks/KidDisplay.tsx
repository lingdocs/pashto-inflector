import { baParticle } from "../../lib/grammar-units";
import * as T from "../../types";
import Phonetics from "../Phonetics";

function KidDisplay({ opts, kid }: {
    opts: T.TextOptions,
    kid: T.Kid,
}) {
    return <div className="mx-1">
        {kid.type === "ba"
            ? <Phonetics opts={opts}>{baParticle}</Phonetics>
            : <Phonetics opts={opts}>{kid.ps}</Phonetics>}
    </div>
}

export default KidDisplay;