V tomhle adresáři jsou end-to-end a monitorovací testy.

End-to-end testy běží nad lokální instancí webu a zkouší celý web poskládaný dohromady, tedy můžou například zkoušet nasazené API endpointy, přesměrování, reakce na neexistující stránky, etc. Spouští se při pull requestech nebo pushích do hlavní větve.

Monitorovací testy běží oproti produkčnímu webu a pravidelně testují věci, u kterých potřebujeme, aby neupadly :) Aktuálně monitorujeme pouze funkčnost onboardovacího URL do Slacku. Tyhle testy se spouští pravidelně přes GitHub Action a případně ručně.

Běžné unit testy jsou roztroušené po kódu, aby byly blízko tomu, co testují; poznáte je podle přípony `.test.ts`.