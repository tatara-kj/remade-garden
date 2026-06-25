# CarLux Kwidzyn — strona internetowa

Statyczna, wielostronicowa witryna HTML/CSS/JS. Do uruchomienia nie wymaga procesu budowania.

## Najważniejsze pliki

- `index.html` — strona główna
- `uslugi.html` — oferta
- `realizacje.html` — galeria i filtry
- `opinie.html` — miejsca na zweryfikowane opinie
- `kontakt.html` — kontakt, formularze, estymator, kalendarz i mapa
- `styles.css` — cały system wizualny i responsywność
- `script.js` — menu, FAQ, filtry, formularze, slider i kalendarz

## Gdzie zmienić dane firmy

Wspólne dane kontaktowe nagłówka i stopki znajdują się na początku `script.js` w obiekcie `company`.
Treści występujące w treści podstron można wyszukać po numerze telefonu, adresie lub e-mailu.

## Gdzie zmienić zdjęcia

Pliki znajdują się w `assets/images/`:

- `hero-car.webp`
- `paint-correction.webp`
- `clean-interior.webp`
- `upholstery-cleaning.webp`

Można zastąpić je plikami o tych samych nazwach. Zalecany format to WebP, szerokość 1400–2000 px i rozmiar do około 250 KB.
Wizualizacje są jawnie oznaczone na stronie jako materiały do podmiany.

## Opinie, ceny i godziny

Wyszukaj frazę `DO UZUPEŁNIENIA`. Strona nie zawiera fałszywych opinii, cen ani godzin otwarcia.
Po dodaniu prawdziwej opinii usuń klasę `placeholder-card` z właściwej karty.

## Formularze

Formularze działają jako demonstracja interfejsu i nie wysyłają danych. Przed publikacją trzeba podłączyć backend, np. własny endpoint, WordPress, Formspree albo Netlify Forms, oraz dodać właściwą politykę prywatności.

## Lokalne uruchomienie

W katalogu projektu:

```powershell
python -m http.server 4173
```

Następnie otwórz `http://127.0.0.1:4173/`.
