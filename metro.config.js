const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
    ...getDefaultConfig(__dirname),
    watchFolders: [],  // You can specify folders that need to be watched
    maxWorkers: 2,     // Limit the number of workers
};
