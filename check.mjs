import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const data=JSON.parse(await fs.readFile('data.json','utf8'));
for(const c of data){
 const file=path.resolve('dist',c.slug+'.html'),html=await fs.readFile(file,'utf8');
 assert.equal((html.match(/<h1>/g)||[]).length,1,`${c.slug}: one main heading`);
 assert(html.includes('name="viewport"'),`${c.slug}: viewport`);
 assert(html.includes('map-widget/v1/'),`${c.slug}: interactive Yandex map`);
 assert(html.includes(`ll=${c.lon}%2C${c.lat}`),`${c.slug}: map coordinates`);
 assert(html.includes(`tel:${c.tel}`),`${c.slug}: primary phone`);
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=m[1];if(/^(https?:|tel:|mailto:|viber:)/.test(url))continue;
  const [filePart,hash]=url.split('#');
  if(!filePart){if(hash)assert(html.includes(`id="${hash}"`),`${c.slug}: missing anchor ${hash}`);continue;}
  const target=path.resolve(path.dirname(file),filePart);await fs.access(target);
 }
 assert(c.services.every(s=>s.price>0&&s.name&&s.category),`${c.slug}: complete prices`);
 assert(c.services.filter(s=>!s.verified).every(s=>s.price===3000),`${c.slug}: requested draft tariff`);
 console.log(`${c.slug}: headings, map, phone, anchors, assets and ${c.services.length} service prices OK`);
}
console.log('All 3 landing pages passed.');
