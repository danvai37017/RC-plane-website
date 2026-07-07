@echo off
call npm run build
for /f "tokens=1,2 delims==" %%I in (.env) do set %%I=%%J
scp -r -i "%KEY_PATH%" ./dist/. ubuntu@%SERVER_IP%:/var/www/html/
pause