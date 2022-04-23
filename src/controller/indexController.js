const path = require('path');

exports.showHomePage = async(req, res) => {
    const rootDir = path.join(__dirname + "/../", "view");
    return res.status(200).sendFile(`index.html`, {
        root: rootDir,
        dotfiles: 'deny'
    });
};