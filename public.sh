#!/bin/sh

echo "Dodawanie zmian..."
git add .

echo "Tworzenie commita..."
git commit -m "CI/CD auto publish" || echo "Brak zmian do commitowania"

echo "Podbijanie wersji..."
npm version patch

echo "Wysyłanie commita i tagów..."
git push --follow-tags

echo "🎉 Release gotowy!"