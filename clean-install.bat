@echo off
echo Cleaning and reinstalling dependencies...
echo.
echo Step 1: Stopping any running processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Step 2: Removing node_modules and .next...
if exist node_modules rmdir /s /q node_modules
if exist .next rmdir /s /q .next

echo Step 3: Reinstalling dependencies...
call npm install

echo.
echo Done! You can now run: npm run dev
pause
