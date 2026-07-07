@echo off
call npm run build
for /f "tokens=1,2 delims==" %%I in (.env) do set %%I=%%J
scp -r -i "C:\Users\Daniel\Downloads\ssh-key-2026-07-07.key" ./dist/. ubuntu@64.181.238.57:/var/www/html/
pause