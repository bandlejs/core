@echo off
echo Dodawanie zmian...
git add .

echo Tworzenie commita...
git commit -m "CI/CD auto publish"

echo Podbijanie wersji...
call npm version patch

echo Wysylanie commita i tagow...
 call git push --follow-tags

echo Gotowe!