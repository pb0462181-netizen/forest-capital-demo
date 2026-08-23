import fs from 'node:fs';
import path from 'node:path';

const required=[
  ['public/models/forest-170.glb',8],
  ['public/models/forest-170-mobile.glb',4],
];

let found=0;
for(const [file,targetMb] of required){
  const abs=path.resolve(file);
  if(!fs.existsSync(abs)){
    console.warn(`WAITING: ${file}`);
    continue;
  }
  found++;
  const mb=fs.statSync(abs).size/1024/1024;
  console.log(`${file}: ${mb.toFixed(2)} MB`);
  if(mb>targetMb) console.warn(`  Above preferred target (${targetMb} MB).`);
}
if(found===0) console.log('Placeholder mode is expected until approved client GLB assets arrive.');
