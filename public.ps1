Write-Host "Dodawanie zmian..."
git add .

Write-Host "Tworzenie commita..."
git commit -m "CI/CD auto publish" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Brak zmian do commitowania"
}

Write-Host "Podbijanie wersji..."
npm version patch

Write-Host "Wysyłanie commita i tagów..."
git push --follow-tags

Write-Host "🎉 Release gotowy!"