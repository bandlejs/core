@echo off
echo Dodawanie zmian...
git add .

echo Tworzenie commita...
git commit -m "CI/CD auto publish"

echo Podbijanie wersji...
npm version patch

echo Wysylanie commita i tagow...
git push --follow-tags

echo Gotowe!