# AIProject

Del 1: Planering
Problemområde
Problemområdet fokuserar på att minska matsvinn genom att föreslå recept baserat på tillgängliga ingredienser. Matsvinn är ett stort problem som bidrar till miljöförstöring och växthusgasutsläpp. 
Ett smart receptförslagssystem kan hjälpa hushåll att använda överblivna ingredienser på ett effektivt sätt.
Det kan även tekniskt sett hjälpatt eventuellt spara pengar och tid genom att inte behöva transportera/köpa i en affär. 

Lösningen är en applikation för receptförslag driven av AI. Som användare kan man skriva in sina tillgängliga ingredienser, och applikationen rekommenderar sedan ett recept som kan tillagas. 
Jag valde att aarbeta med Brain.js, som är ett lättviktigt verktyg för neurala nätverk i JavaScript, och tränade det för att matcha ingredienser med recept.

Backenden bearbetar inmatningar från användaren och förutspår recept med hjälp av ett tränat neuralt nätverk.
Ett frontend-gränssnitt låter användare mata in ingredienser och få receptförslag enligt det nätverk jag skapat.
Samtidigt skickas samma ingredienser via API till ett öppet API som filtrerar på ingredienser och returnerar förslag på maträtter med lite mer avancerade namn och ingredienser, vilket ger en jämförelse mot mitt tränade neurala nätverk.

Använda tekniker:
Neurala nätverk för förutsägelser med hjälp av Brain.js.
Fetch-API för integration mot ett öppet API med recept

Bidrag till FN:s Agenda 2030-mål:
Lösningen stöttar Mål 12: Hållbar konsumtion och produktion genom att minska matsvinn och främja hållbara matlagningsvanor.

Etiska överväganden
Recept från olika kulturer i receptförslag och träning:
Träningsdatan måste inkludera olika typer av recept för att passa olika dieter och kulturella preferenser.
Användarvänlighet:
Gränssnittet bör vara användarvänligt och tillgängligt för personer med varierande teknisk erfarenhet.


Del 2: Implementering

Modellskapande:
Applikationen använder Brain.js för att träna ett enkelt neuralt nätverk med märkta datasets för ingredienser och recept. Exempel på träningsdata inkluderar:

   { input: { milk: 1, egg: 1, flour: 1 }, output: { pancakes: 1 } },
    { input: { bread: 1, egg: 1, butter: 1 }, output: { frenchToast: 1 } },
    { input: { oats: 1, milk: 1, banana: 1 }, output: { porridge: 1 } },

    
Modellen använder en funktion för att förutsäga vilket recept som matchar de inmatade ingredienserna.

Frontend- och backend-integration:

Backend: En Node.js-server tar emot inmatningar från användaren, använder Brain.js-modellen för förutsägelser och returnerar receptförslag.
Samtidigt skickas ingredienserna i API-call till ett öppet API för att jämföra resultaten på den siten filtrerat på just dessa ingredienser.

Frontend: Ett enkelt HTML-/JavaScript-gränssnitt låter användare mata in ingredienser och se resultat från både mitt neurala nätverk och det öppna API:ts filtrering.


Dokumentation av kod och process

Backend:

Implementerar AI-modellen, förutsägelselogik och en server för att hantera förfrågningar mot port 3000 (i detta fall) samt ett öppet-API.

Frontend:
Gör det möjligt för användare att interagera med systemet genom att mata in ingredienser.

Testning och analys

Modellen testades med olika kombinationer av ingredienser för att säkerställa korrekta förutsägelser.

Exempel:

Input: { milk: 1, egg: 1, flour: 1 }
Output: { pancakes: 1 }
Input: { chicken: 1, lettuce: 1, tomato: 1 }
Output: { caesarSalad: 1 }

Analys:

Styrkor: Modellen presterar väl med känd träningsdata.
Svagheter: Träffsäkerheten minskar mycket vid förutsägelser av recept för okända ingredienskombinationer. Det visar på behovet av mer varierad träningsdata.

Del 3: Reflektion

Genom att hjälpa användare använda överblivna ingredienser bidrar applikationen direkt till att minska matsvinn, främja hållbarhet och stödja FN:s Agenda 2030, Mål 12.

Etik:

Bias i förslagen bör man ta hänsyn till genom att träna på varierad data.
Lösningen respekterar användarnas integritet då ingen data lagras eller delas.

Vad gick bra?

Brain.js är relativt enkelt att använda ocg gjorde det lätt att träna modellen med enklar inputs/outputs.
Frontenden är relativt simpel men har allt man behöver och tycker det var kul att få till jämförelsen mellan mitt AI och API:ts filtrering. 

Utmaningar?

Att hitta lämpliga datasets för att träna modellen tog tid som väntat enligt förslaget som inspirerade detta.
Att garantera att modellen generaliserade väl till osedda data var utmanande.
Jag försökte få till att hämta mer från API:t och lagra lokalt för att använda som eventuell träningsdata, men fick inte riktigt till det och brast lite på tiden för att komma i mål.

Framtida förbättringar?

Inkludera större och mer varierad data för att förbättra noggrannheten och hantera ett bredare spektrum av recept.
Använd online-API:er för att hämta nya recept och öka systemets mångsidighet.
Ge förslag på andra ingredienser som man kan byta ut/addera för att använda så många ingredienser man hade som möjligt och därmed ytterligar eminska svinn.
