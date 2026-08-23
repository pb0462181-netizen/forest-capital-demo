const required=['NEXT_PUBLIC_SITE_URL'];
const recommended=['BITRIX24_WEBHOOK_URL','NEXT_PUBLIC_YM_ID','DATABASE_URL','PAYLOAD_SECRET'];

let failed=false;
for(const key of required){
  if(!process.env[key]){ console.error(`Missing required env: ${key}`); failed=true; }
}
for(const key of recommended){
  if(!process.env[key]) console.warn(`Recommended before production: ${key}`);
}
if(failed) process.exit(1);
console.log('Environment baseline looks valid.');
