import Examples from "../components/src/Examples";
import * as T from "../types";

const spellingOptions: {
  value: T.TextOptions["spelling"];
  label: string;
}[] = [
  {
    value: "Afghan",
    label: "Afghan",
  },
  {
    value: "Pakistani ي",
    label: "Pakistani ي",
  },
  {
    value: "Pakistani ی",
    label: "Pakistani ی",
  },
];

const phoneticsOptions: {
  value: T.TextOptions["phonetics"];
  label: string;
}[] = [
  {
    value: "lingdocs",
    label: "LingDocs",
  },
  {
    value: "ipa",
    label: "IPA",
  },
  {
    value: "alalc",
    label: "ALALC",
  },
];

function SpellingDemo({
  opts,
  onChange,
}: {
  opts: T.TextOptions;
  onChange: (opts: T.TextOptions) => void;
}) {
  return (
    <div className="mt-3" style={{ marginBottom: "100px" }}>
      <ul>
        <li>Converts text between Afghan and Pakistani spelling conventions</li>
        <li>
          Generates diacritics for Pashto script when given phonetic script
          along with Pashto script
        </li>
      </ul>
      <div
        className="d-block mx-auto card mb-3"
        style={{ maxWidth: "500px", background: "var(--closer)" }}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mb-2">
              <h6>Pashto Spelling Convention:</h6>
              <div>
                {spellingOptions.map(({ value, label }) => (
                  <div key={value} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="spelling-type"
                      checked={opts.spelling === value}
                      value={value}
                      onChange={() => {
                        onChange({
                          ...opts,
                          spelling: value,
                        });
                      }}
                    />
                    <label className="form-check-label">{label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-sm-6 mb-2">
              <h6>Latin Phonetic System:</h6>
              <div>
                {phoneticsOptions.map(({ value, label }) => (
                  <div key={value} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="phonetics-type"
                      checked={opts.phonetics === value}
                      value={value}
                      onChange={() => {
                        onChange({
                          ...opts,
                          phonetics: value,
                        });
                      }}
                    />
                    <label className="form-check-label">{label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-sm-6 mb-2">
              <h6>Diacritics Engine:</h6>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="diacritics-engine"
                    checked={opts.diacritics}
                    onChange={() => {
                      onChange({
                        ...opts,
                        diacritics: true,
                      });
                    }}
                  />
                  <label className="form-check-label">On</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="diacritics-engine"
                    checked={!opts.diacritics}
                    onChange={() => {
                      onChange({
                        ...opts,
                        diacritics: false,
                      });
                    }}
                  />
                  <label className="form-check-label">Off</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Examples opts={opts}>
          {[
            {
              p: "زما زوی مکتب ته ځي",
              f: "zmaa zooy maktab ta dzee",
            },
            {
              p: "دا ښه سړی دی",
              f: "daa xu saRey day",
            },
            {
              p: "په دکان کې مې ډېر خلک لیدلي دي",
              f: "pu dUkaan ke me Der khalk leedulee dee",
            },
          ]}
        </Examples>
      </div>
    </div>
  );
}

export default SpellingDemo;
