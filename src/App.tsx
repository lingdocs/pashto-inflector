/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useState } from "react";
import { dictionary } from "./lib/src/dictionary/dictionary";
import ButtonSelect from "./components/src/selects/ButtonSelect";
import { Modal } from "react-bootstrap";
import * as T from "./types";
import defualtTextOptions from "./lib/src/default-text-options";
import useStickyState from "./components/src/useStickyState";
import EPExplorer from "./components/src/ep-explorer/EPExplorer";
import VPBuilderDemo from "./demo-components/VPBuilderDemo";
import { entryFeeder } from "./demo-components/entryFeeder";
import Hider from "./components/src/Hider";
import InflectionDemo from "./demo-components/InflectionDemo";
import SpellingDemo from "./demo-components/SpellingDemo";
import ParserDemo from "./demo-components/ParserDemo";
import TextDisplayDemo from "./demo-components/TextDisplayDemo";
import ParserTester from "./demo-components/ParserTester";
// import InflectionTable from "./components/src/InflectionsTable";
const SHOW_PARSER_TESTER = true;

function App() {
  const [showingTextOptions, setShowingTextOptions] = useStickyState<boolean>(
    false,
    "showTextOpts1"
  );
  const [textOptions, setTextOptions] = useStickyState<T.TextOptions>(
    defualtTextOptions,
    "textOpts1"
  );
  const [theme, setTheme] = useStickyState<"light" | "dark">("light", "theme1");
  const [showing, setShowing] = useState<string>("");
  function handleHiderClick(label: string) {
    setShowing((os) => (os === label ? "" : label));
  }

  useEffect(() => {
    dictionary
      .initialize()
      .catch(console.error)
      .then((res) => {
        if (res && res.response === "loaded from saved") {
          dictionary.update();
        }
      });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <main className="flex-shrink-0 mb-4">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              className="clickable mr-3"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <i
                className={`fa-lg fas fa-${theme === "light" ? "sun" : "moon"}`}
              />
            </div>
            <div
              className="clickable"
              onClick={() => setShowingTextOptions(true)}
            >
              <i className="fa-lg fas fa-cog" />
            </div>
          </div>
          <div
            className="text-center mb-4"
            style={{ marginTop: "3rem", marginBottom: "1rem" }}
          >
            <h1 className="display-4 mt-2">
              <code>Pashto Inflector</code>
            </h1>
            <p
              className="lead my-3"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              An open source TypeScript/React library for Pashto inflection,
              verb conjugation, phrase generation, text conversion, and more
            </p>
            <p>
              Used in the{" "}
              <a href="https://dictionary.lingdocs.com">
                LingDocs Pashto Dictionary
              </a>{" "}
              and{" "}
              <a href="https://grammar.lingdocs.com">LingDocs Pashto Grammar</a>
            </p>
            <p>
              GPLv3 licensed{" "}
              <a href="https://github.com/lingdocs/pashto-inflector">
                source code
              </a>{" "}
              on GitHub
            </p>
          </div>
          {/* for testing inflection table */}
          {/* {typeof infout === "object" && infout.inflections && (
            <InflectionTable
              inf={infout.inflections}
              textOptions={textOptions}
            />
          )} */}
          <h2 className="mb-3">Demos:</h2>
          <Hider
            label="Verb Conjugation / Verb Phrase Engine"
            hLevel={3}
            showing={showing === "verbs"}
            handleChange={() => handleHiderClick("verbs")}
          >
            <VPBuilderDemo opts={textOptions} />
          </Hider>
          <Hider
            label="Equative Phrase Engine"
            hLevel={3}
            showing={showing === "equatives"}
            handleChange={() => handleHiderClick("equatives")}
          >
            <div className="mt-4" style={{ paddingBottom: "20px" }}>
              <EPExplorer opts={textOptions} entryFeeder={entryFeeder} />
            </div>
          </Hider>
          <Hider
            label="Inflection Engine"
            hLevel={3}
            showing={showing === "inflection"}
            handleChange={() => handleHiderClick("inflection")}
          >
            <InflectionDemo opts={textOptions} />
          </Hider>
          <Hider
            label="Spelling Conversion / Diacritics Engine"
            hLevel={3}
            showing={showing === "spelling"}
            handleChange={() => handleHiderClick("spelling")}
          >
            <SpellingDemo opts={textOptions} onChange={setTextOptions} />
          </Hider>
          <Hider
            label="Parser (🚧 IN PROGRESS 🚧)"
            hLevel={3}
            showing={showing === "parser"}
            handleChange={() => handleHiderClick("parser")}
          >
            <ParserDemo
              opts={textOptions}
              entryFeeder={entryFeeder}
              dictionary={dictionary}
            />
          </Hider>
          {SHOW_PARSER_TESTER && <Hider
            label="Parser Tester"
            hLevel={3}
            showing={showing === "parser-tester"}
            handleChange={() => handleHiderClick("parser-tester")}
          >
            <ParserTester opts={textOptions} entryFeeder={entryFeeder} />
          </Hider>}
          <Hider
            label="Pashto Text Display"
            hLevel={3}
            showing={showing === "text-display"}
            handleChange={() => handleHiderClick("text-display")}
          >
            <TextDisplayDemo opts={textOptions} />
          </Hider>
        </div>
      </main>
      <Modal
        show={showingTextOptions}
        onHide={() => setShowingTextOptions(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Pashto Spelling</h6>
          <ButtonSelect
            options={[
              { label: "Afghan", value: "Afghan" },
              { label: "Pakistani ي", value: "Pakistani ي" },
              { label: "Pakistani ی", value: "Pakistani ی" },
            ]}
            value={textOptions.spelling}
            handleChange={(p) => {
              setTextOptions({
                ...textOptions,
                spelling: p,
              });
            }}
          />
          <h6 className="mt-3">Diacritics</h6>
          <ButtonSelect
            options={[
              { label: "On", value: "true" },
              { label: "Off", value: "false" },
            ]}
            value={textOptions.diacritics.toString()}
            handleChange={(p) =>
              setTextOptions({ ...textOptions, diacritics: p === "true" })
            }
          />
          <h6 className="mt-3">Pashto Text Size</h6>
          <ButtonSelect
            options={[
              { label: "Normal", value: "normal" },
              { label: "Large", value: "larger" },
              { label: "X-Large", value: "largest" },
            ]}
            value={textOptions.pTextSize}
            handleChange={(p) =>
              setTextOptions({ ...textOptions, pTextSize: p })
            }
          />
          <h6 className="mt-3">Phonetics</h6>
          <ButtonSelect
            options={[
              { label: "LingDocs", value: "lingdocs" },
              { label: "IPA", value: "ipa" },
              { label: "ALAC", value: "alalc" },
              // { label: "None", value: "none" },
            ]}
            value={textOptions.phonetics}
            handleChange={(p) =>
              setTextOptions({ ...textOptions, phonetics: p })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary clb"
            onClick={() => setShowingTextOptions(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      {/* <footer className="footer mt-auto py-3" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="container">
                <span className="text-muted">Copyright © 2022 <a href="https://www.lingdocs.com">lingdocs.com</a> - <a href="https://github.com/lingdocs/pashto-inflector/blob/master/LICENSE">MIT License</a></span>
            </div>
        </footer> */}
    </>
  );
}

export default App;
