const pkg = require("./package.json");
const glob = require("glob");
const fs = require("fs-extra");
const path = require("path");

fs.mkdir("dist/node_modules", {}, (err) => {
    if (err) throw err;
    const required = Object.keys(pkg.dependencies);
    required.forEach((m) => {
        fs.copySync(`node_modules/${m}`, `dist/node_modules/${m}`);
    });
    glob("src/components/verb-info/*.svg", (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            fs.copySync(file, `dist/components/verb-info/${path.basename(file)}`);
        });
    });
    glob("src/components/vp-explorer/*.svg", (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            fs.copySync(file, `dist/components/vp-explorer/${path.basename(file)}`);
        });
    });
    glob("src/components/vp-explorer/*.jpg", (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            fs.copySync(file, `dist/components/vp-explorer/${path.basename(file)}`);
        });
    });
});
