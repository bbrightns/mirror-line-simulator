# One-time: npx wrangler login ; npx wrangler d1 create mirror-sim  (paste database_id into wrangler.jsonc)
#           npx wrangler d1 execute mirror-sim --remote --file=schema.sql
#           npx wrangler secret put EDIT_KEY   (the password the page asks for before saving)
Copy-Item ..\flow-coater-simulator-10.html public\index.html -Force
npx wrangler deploy
