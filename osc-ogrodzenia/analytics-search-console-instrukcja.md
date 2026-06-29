# OSC Ogrodzenia — instrukcja Google Analytics 4 i Search Console

Ten plik opisuje, co trzeba zrobić po stronie Google, żeby strona OSC Ogrodzenia miała analitykę, Search Console i pełny dostęp dla właściciela firmy.

## 1. Google Analytics 4 — najlepszy wariant dostępu

Najlepiej, żeby właściciel firmy miał własny dostęp administracyjny do usługi Google Analytics. Wykonawca strony może pomóc w konfiguracji, ale konto nie powinno zostać wyłącznie u wykonawcy.

Rekomendowany wariant:

1. Właściciel loguje się na swoje konto Google.
2. Wchodzi na stronę `https://analytics.google.com/`.
3. Tworzy konto lub usługę GA4 dla strony OSC Ogrodzenia.
4. Tworzy strumień danych typu „Sieć” dla adresu:
   `https://tatara-kj.github.io/remade-garden/osc-ogrodzenia/`
5. Kopiuje Measurement ID w formacie `G-XXXXXXXXXX`.
6. Measurement ID należy wpisać w plikach HTML w miejscu:
   `window.OSC_GA4_MEASUREMENT_ID = "";`

Po wpisaniu prawdziwego ID skrypt GA4 zacznie ładować tag Google Analytics. Obecnie ID jest puste, więc strona nie udaje działającej analityki i nie używa fikcyjnego identyfikatora.

## 2. Jak dodać klienta jako użytkownika GA4

Jeśli usługę GA4 zakłada wykonawca:

1. W Google Analytics należy wejść w „Administracja”.
2. Wybrać konto lub usługę strony OSC Ogrodzenia.
3. Wejść w „Zarządzanie dostępem”.
4. Dodać adres e-mail właściciela firmy.
5. Nadać rolę co najmniej „Edytujący”, a najlepiej pełne uprawnienia administracyjne, jeśli właściciel ma zarządzać usługą.

Po zakończeniu projektu właściciel powinien mieć stały dostęp do danych.

## 3. Google Search Console

Search Console pozwala sprawdzić indeksowanie strony w Google i zgłosić sitemapę.

Konfiguracja:

1. Właściciel lub wykonawca loguje się na konto Google.
2. Wchodzi na `https://search.google.com/search-console`.
3. Dodaje usługę typu „Prefiks adresu URL”.
4. Wpisuje adres:
   `https://tatara-kj.github.io/remade-garden/osc-ogrodzenia/`
5. Wybiera metodę weryfikacji.

Najprostsze metody:

- meta tag HTML — tag należy wkleić w sekcji `<head>` każdej głównej podstrony,
- plik HTML — plik weryfikacyjny należy dodać do katalogu `osc-ogrodzenia/` i wdrożyć stronę.

Po weryfikacji w Search Console trzeba zgłosić sitemapę:

`https://tatara-kj.github.io/remade-garden/osc-ogrodzenia/sitemap.xml`

## 4. Co jest już przygotowane na stronie

Strona ma przygotowane:

- miejsce na GA4 Measurement ID,
- canonicale na podstronach,
- `sitemap.xml`,
- `robots.txt`,
- schema.org `LocalBusiness` na stronie głównej,
- meta title i meta description dla podstron,
- linki do profilu Google Maps i Facebooka.

## 5. Opinie Google

Na stronie nie ma wpisanych fikcyjnych opinii ani sztucznych nazwisk. Sekcja opinii prowadzi użytkownika do prawdziwego profilu Google Maps OSC Ogrodzenia.

Jeśli właściciel chce w przyszłości pokazać opinie bezpośrednio na stronie, można dodać:

- widget Google Reviews z narzędzia typu Trustindex lub Elfsight,
- albo integrację z Google Places API.

Przed wdrożeniem widgetu trzeba sprawdzić wygląd na telefonie i wpływ na szybkość strony.
