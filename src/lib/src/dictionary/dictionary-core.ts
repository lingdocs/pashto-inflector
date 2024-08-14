import loki, { Collection } from "lokijs";
import * as T from "../../../types";

const dontUseFaultyIndexedDB = (): boolean =>
  /^Apple/.test(navigator.vendor) &&
  /AppleWebKit[/]60.*Version[/][89][.]/.test(navigator.appVersion);

export class DictionaryDb {
  // config variables
  private dictionaryInfoLocalStorageKey: string;
  private dictionaryCollectionName: string;
  private dictionaryUrl: string;
  private dictionaryInfoUrl: string;
  private lokidb: loki;

  // state
  private ready = false;

  // eslint-disable-next-line
  public collection: Collection<any>;

  constructor(options: {
    url: string;
    infoUrl: string;
    collectionName?: string;
    infoLocalStorageKey?: string;
  }) {
    this.dictionaryUrl = options.url;
    this.dictionaryInfoUrl = options.infoUrl;
    this.dictionaryInfoLocalStorageKey =
      options.infoLocalStorageKey || "dictionaryInfo";
    this.dictionaryCollectionName = options.collectionName || "pdictionary";
    if (dontUseFaultyIndexedDB()) {
      this.lokidb = new loki(this.dictionaryUrl, {
        autoload: false,
        autosave: false,
        env: "BROWSER",
      });
    } else {
      const LokiIndexedAdapter = new loki("").getIndexedAdapter();
      const idbAdapter = new LokiIndexedAdapter();
      this.lokidb = new loki(this.dictionaryUrl, {
        adapter: idbAdapter,
        autoload: false,
        autosave: false,
        env: "BROWSER",
      });
    }
  }

  private putDictionaryInfoInLocalStorage(info: T.DictionaryInfo) {
    localStorage.setItem(
      this.dictionaryInfoLocalStorageKey,
      JSON.stringify(info)
    );
  }

  private getDictionaryInfoFromLocalStorage(): T.DictionaryInfo {
    const raw = localStorage.getItem(this.dictionaryInfoLocalStorageKey);
    if (raw) {
      return JSON.parse(raw) as T.DictionaryInfo;
    }
    return {
      title: "not found",
      license: "not found",
      release: 0,
      numberOfEntries: 0,
      url: "not found",
      infoUrl: "not found",
    };
  }

  private async downloadDictionary(): Promise<T.Dictionary> {
    const res = await fetch(this.dictionaryUrl + ".json");
    return (await res.json()) as T.Dictionary;
  }

  private async downloadDictionaryInfo(): Promise<T.DictionaryInfo> {
    const res = await fetch(this.dictionaryInfoUrl + ".json");
    return (await res.json()) as T.DictionaryInfo;
  }

  private async addDictionaryToLoki(dictionary: T.Dictionary): Promise<"done"> {
    return await new Promise((resolve: (value: "done") => void, reject) => {
      // Add it to Lokijs
      this.collection = this.lokidb.addCollection(
        this.dictionaryCollectionName,
        {
          // TODO: THIS ISN'T WORKING!
          disableMeta: true,
          indices: ["i", "p"],
          unique: ["ts"],
        }
      );
      this.collection.insert(dictionary.entries);
      this.lokidb.saveDatabase((err) => {
        /* istanbul ignore next */
        if (err) {
          console.error("error saving database: " + err);
          reject(err);
        } else {
          // Once the dictionary has for sure been saved in IndexedDb, save the dictionary info
          this.putDictionaryInfoInLocalStorage(dictionary.info);
          this.ready = true;
          resolve("done");
        }
      });
    });
  }

  /**
   * Initializes the dictionary for use. This will look to make sure the dictionary has the latest version, or will revert to an offline version
   */
  public async initialize(): Promise<{
    response: "loaded first time" | "loaded from saved";
    dictionaryInfo: T.DictionaryInfo;
  }> {
    try {
      return await new Promise(
        (
          resolve: (value: {
            response: "loaded first time" | "loaded from saved";
            dictionaryInfo: T.DictionaryInfo;
          }) => void,
          reject
        ) => {
          this.lokidb.loadDatabase({}, async (err: Error) => {
            /* istanbul ignore next */
            if (err) {
              console.error(err);
              reject(err);
            }
            // Step 1: Base dictionary initialization
            // Check that the dictionary is set up and available
            this.collection = this.lokidb.getCollection(
              this.dictionaryCollectionName
            );
            // TODO: make a better check that the dictionary really is in there - like the size or something
            // let firstTimeDownload = false;
            const offlineDictionaryExists = !!this.collection;
            if (offlineDictionaryExists) {
              this.ready = true;
              resolve({
                response: "loaded from saved",
                dictionaryInfo: this.getDictionaryInfoFromLocalStorage(),
              });
              return;
            }
            // There is no previously saved offline dictionary
            // initialize a new one
            localStorage.removeItem(this.dictionaryInfoLocalStorageKey);
            // Get the dictionary
            try {
              const dictionary = await this.downloadDictionary();
              await this.addDictionaryToLoki(dictionary);
              resolve({
                response: "loaded first time",
                dictionaryInfo: dictionary.info,
              });
            } catch (e) {
              console.error("error loading dictionary for the first time");
              console.error(e);
              reject();
            }
          });
        }
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async updateDictionary(notifyUpdateComing: () => void): Promise<{
    response: "no need for update" | "updated" | "unable to check";
    dictionaryInfo: T.DictionaryInfo;
  }> {
    const clientDictionaryInfo = this.getDictionaryInfoFromLocalStorage();
    let dictionary: T.Dictionary;
    try {
      const latestDictionaryInfo = await this.downloadDictionaryInfo();
      // See if client is up to date with latest published version
      if (latestDictionaryInfo.release === clientDictionaryInfo.release) {
        return {
          response: "no need for update",
          dictionaryInfo: clientDictionaryInfo,
        };
      }
      // new version available
      // Download the latest dictionary
      // Will download new dictionary, remove previous info in case something gets stopped half way
      dictionary = await this.downloadDictionary();
    } catch (e) {
      console.error(e);
      return {
        response: "unable to check",
        dictionaryInfo: clientDictionaryInfo,
      };
    }
    try {
      notifyUpdateComing();
      this.ready = false;
      localStorage.removeItem(this.dictionaryInfoLocalStorageKey);
      this.collection.clear();
      this.lokidb.removeCollection(this.dictionaryCollectionName);
      await (async () => {
        return new Promise((resolve: (value: "done") => void) => {
          this.lokidb.saveDatabase(() => {
            resolve("done");
          });
        });
      })();
      await this.addDictionaryToLoki(dictionary);
      return {
        response: "updated",
        dictionaryInfo: dictionary.info,
      };
    } catch (e) {
      throw new Error(e as string);
    }
  }

  /**
   * Returns a single word from it's timestamp (ts)
   */
  // TODO: not working in app usage now now with new 'this' issues
  public findOneByTs(ts: number): T.DictionaryEntry | undefined {
    if (!this.ready) {
      return undefined;
    }
    const res = this.collection.by("ts", ts);
    if (!res) {
      return undefined;
    }
    // remove $loki and meta
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $loki, meta, ...word } = res;
    return word;
  }
}
