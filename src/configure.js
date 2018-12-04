const fs = require('fs');
const path = require('path');

const API_URL = process.env.API_URL || 'http://localhost:8080';

const config = {
    apiUrl: API_URL
};
const configPath = path.resolve(__dirname, 'utils/config.js');

fs.writeFileSync(configPath, `export default ${JSON.stringify(config)}`);
