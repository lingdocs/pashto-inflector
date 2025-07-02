import { uncompleteVPSelection } from "../../lib/src/phrase-building/vp-tools";
import * as T from "../../types";
import { VPDisplay } from "../library";
import EPDisplay from "./ep-explorer/EPDisplay"

export function PhraseDisplay({
  phrase,
  opts,
}: {
  phrase: T.EPSelectionComplete | T.VPSelectionComplete,
  opts: T.TextOptions,
  entryFeeder: T.EntryFeeder,
}) {
  return <div>
    {"equative" in phrase ?
      <EPDisplay
        justify="left"
        opts={opts}
        eps={phrase}
        setOmitSubject={() => null}
      /> :

      <VPDisplay
        justify="left"
        opts={opts}
        VPS={uncompleteVPSelection(phrase)}
        setForm={"disable"}
      />}
  </div>

}
