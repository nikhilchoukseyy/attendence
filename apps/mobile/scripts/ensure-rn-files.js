const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const files = {
  'metro.config.js': `const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');\n\nmodule.exports = mergeConfig(getDefaultConfig(__dirname), {});\n`,
  'babel.config.js': `module.exports = {\n  presets: ['module:@react-native/babel-preset'],\n};\n`,
  'app.json': `{"name":"AttendanceMobile","displayName":"AttendanceMobile"}\n`,
  'index.js': `import {AppRegistry} from 'react-native';\nimport App from './src/App';\nimport {name as appName} from './app.json';\n\nAppRegistry.registerComponent(appName, () => App);\n`
};

for (const [rel, content] of Object.entries(files)) {
  const target = path.join(root, rel);
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, content, 'utf8');
    console.log(`[created] ${rel}`);
  }
}
