import { spawn } from 'node:child_process';
const args=process.argv.slice(2).flatMap(arg=>arg==='--host'?['--hostname']:arg==='--strictPort'?[]:[arg]);
const p=spawn(process.execPath,['node_modules/next/dist/bin/next','dev',...args],{stdio:'inherit'});
p.on('exit',code=>process.exit(code||0));
