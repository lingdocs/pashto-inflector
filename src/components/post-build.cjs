const glob = require("glob");
const fs = require("fs-extra");
const path = require("path");

glob("src/verb-info/*.svg", (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
        fs.copySync(file, `dist/components/src/verb-info/${path.basename(file)}`);
    });
});
glob("src/vp-explorer/*.svg", (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
        fs.copySync(file, `dist/components/src/vp-explorer/${path.basename(file)}`);
    });
});
glob("src/vp-explorer/*.jpg", (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
        fs.copySync(file, `dist/components/src/vp-explorer/${path.basename(file)}`);
    });
});
