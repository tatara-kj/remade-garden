# OSC Ogrodzenia — konfiguracja Google Analytics, Search Console i opinii

## Google Analytics 4

1. Klient powinien zalogować się na własne konto Google.
2. W Google Analytics należy utworzyć usługę GA4 dla strony OSC Ogrodzenia.
3. Po utworzeniu strumienia danych www trzeba skopiować Measurement ID w formacie `G-XXXXXXXXXX`.
4. Measurement ID należy wkleić w plikach HTML w miejscu:
   `window.OSC_GA4_MEASUREMENT_ID = "";`
5. Skrypt jest już przygotowany tak, żeby bez prawdziwego ID nie generował błędów.
6. Wykonawca może założyć usługę GA4 na swoim koncie i dodać klienta jako administratora, ale docelowo właściciel firmy powinien mieć pełny dostęp właścicielski.

## Google Search Console

1. Klient loguje się na swoje konto Google.
2. W Search Console dodaje usługę typu `URL prefix` dla:
   `https://tatara-kj.github.io/remade-garden/osc-ogrodzenia/`
3. Najprostsza weryfikacja: meta tag HTML lub plik HTML.
4. Jeśli klient wybierze meta tag, należy dodać go w sekcji `<head>` każdej podstrony.
5. Jeśli klient wybierze plik HTML, należy dodać go do katalogu `osc-ogrodzenia/` i wdrożyć na serwer.
6. Po wdrożeniu klient klika `Zweryfikuj`.
7. Po weryfikacji należy wysłać sitemapę:
   `https://tatara-kj.github.io/remade-garden/osc-ogrodzenia/sitemap.xml`

## Opinie Google

Na stronie nie ma fikcyjnych opinii ani sztucznych nazwisk. Sekcje opinii są przygotowane pod prawdziwy widget Google Reviews.

Opcje wdrożenia:

1. Najprościej: widget Google Reviews z narzędzia typu Trustindex, Elfsight lub podobnego.
2. Alternatywnie: integracja przez Google Places API. Należy pamiętać, że Places API oficjalnie zwraca ograniczoną liczbę opinii.
3. Kod widgetu należy osadzić w sekcjach opinii na stronie głównej i podstronie opinii.

Profil Google Maps firmy:
`https://www.google.pl/maps/place/OSC+Ogrodzenia+Sebastian+Charuk/@50.2096999,18.7740765,15z/data=!4m2!3m1!1s0x0:0xc600845d9234825e`

## Dostęp klienta

Po zakończeniu konfiguracji klient powinien mieć dostęp administracyjny do:

- Google Analytics 4,
- Google Search Console,
- ewentualnego narzędzia do widgetu opinii Google.

Nie zaleca się zostawiania analityki wyłącznie na prywatnym koncie wykonawcy bez dostępu właściciela firmy.
