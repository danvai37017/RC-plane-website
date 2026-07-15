@echo off
if "%~1"=="" (
    echo Usage: push.bat "your commit message"
    pause
    exit /b 1
)

echo Staging all changes...
git add -A
if errorlevel 1 goto :error

echo Committing...
git commit -m "%~1"

echo Force-pushing to GitHub (overwrites remote history)...
git push origin main --force
if errorlevel 1 goto :error

echo Push complete. GitHub now matches local exactly.
pause
exit /b 0

:error
echo Push failed. See error above.
pause
exit /b 1