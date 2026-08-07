$ErrorActionPreference = "Stop"
$FrontendPath = "c:\Users\ABHAY\OneDrive\Desktop\TEXI\yatree-frontend-"
$BackendPath = "c:\Users\ABHAY\OneDrive\Desktop\TEXI\yatree-backend"

Write-Host "--- 1. Building Frontend ---"
Set-Location $FrontendPath
npm run build

Write-Host "--- 2. Pushing Frontend to Git ---"
git add .
git commit -m "feat: implement Smooth Scroll to Top on Navigation & Event Management Fixes"
git push origin main -f

Write-Host "--- 3. Updating Backend dist ---"
if (Test-Path "$BackendPath\dist") {
    Remove-Item -Recurse -Force "$BackendPath\dist"
}
Copy-Item -Path "$FrontendPath\dist" -Destination "$BackendPath\dist" -Recurse

Write-Host "--- 4. Pushing Backend to Git (with dist) ---"
Set-Location $BackendPath
git add .
git add dist -f
git commit -m "feat: apply backend fixes for Event Management and include latest dist"
git push origin main -f

Write-Host "--- ALL DONE ---"
