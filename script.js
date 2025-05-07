document.addEventListener('DOMContentLoaded', function() {
    // DOM-Elemente abrufen
    const enterButton = document.getElementById('enter-button');
    const landingPage = document.getElementById('landing-page');
    const mainMenu = document.getElementById('main-menu');
    const homeButton = document.getElementById('home-button');
    const sectionMenuLinks = mainMenu.querySelectorAll('a[data-section]');
    const allMenuLinks = mainMenu.querySelectorAll('a');
    const contentSections = document.querySelectorAll('.content-section');
    const contentWrapper = document.querySelector('.content-wrapper');
    const langButtons = document.querySelectorAll('.lang-button');

    // Übersetzungsdaten
    const translations = {
        // Landing Page
        landingQuote: {
            de: "“Something was left open... and it’s still calling.”",
            en: "“Something was left open... and it’s still calling.”"
        },
        mainTitle: { de: "PROJECT SILENT WIRE", en: "PROJECT SILENT WIRE" },
        subTitle: { de: "SUMMER’S END", en: "SUMMER’S END" },
        authorNovel: { de: "(A novel by W.D. Perske)", en: "(A novel by W.D. Perske)" },
        enterButton: { de: "[ ENTER FALCON HOLLOW ]", en: "[ ENTER FALCON HOLLOW ]" },
        // Menüpunkte
        menuHome: { de: "Home", en: "Home" },
        menuStory: { de: "Die Story", en: "The Story" },
        menuCharacters: { de: "Die Charaktere", en: "The Characters" },
        menuCreatures: { de: "Kreaturen & Entitäten", en: "Creatures & Entities" },
        menuPlaces: { de: "Orte & Schauplätze", en: "Places & Locations" },
        menuAuthor: { de: "Über den Autor", en: "About the Author" },
        // Sektionsüberschriften
        sectionTitleStory: { de: "Die Story", en: "The Story" },
        sectionTitleCharacters: { de: "Die Charaktere", en: "The Characters" },
        sectionTitleCreatures: { de: "Kreaturen & Entitäten", en: "Creatures & Entities" },
        sectionTitlePlaces: { de: "Orte & Schauplätze", en: "Places & Locations" },
        sectionTitleAuthor: { de: "Über W.D. Perske", en: "About W.D. Perske" },
        // Story-Inhalt
        storyP1: {
            de: "Der Sommer in der verschlafenen Kleinstadt Falcon Hollow beginnt wie jeder andere – doch unter der idyllischen Oberfläche brodeln längst vergessene Geheimnisse. Als Aiden Blake und seine Freunde Zeugen unerklärlicher Phänomene werden – ein tiefes, beunruhigendes Brummen aus den umliegenden Wäldern und seltsame Vorkommnisse im berüchtigten Carmichael-Haus, in das gerade die neue Mitschülerin Elaine Carter eingezogen ist – verwandelt sich die ersehnte Ferienzeit in ein packendes Mysterium.",
            en: "Summer in the sleepy small town of Falcon Hollow begins like any other – but beneath the idyllic surface, long-forgotten secrets simmer. When Aiden Blake and his friends witness inexplicable phenomena – a deep, unsettling hum from the surrounding forests and strange occurrences in the infamous Carmichael House, where new classmate Elaine Carter has just moved in – the anticipated vacation transforms into a thrilling mystery."
        },
        storyP2: {
            de: "Auf der Suche nach Antworten stoßen die Jugendlichen auf die rätselhaften Aufzeichnungen des exzentrischen Wissenschaftlers Dr. Alistair Thorne, der vor Jahrzehnten spurlos verschwand. Seine Notizen enthüllen Hinweise auf das unheilvolle 'Project Silent Wire', ein geheimes Forschungsprojekt, das eine Verbindung zu den elektromagnetischen Anomalien und einer unheimlichen Präsenz im Wald zu haben scheint. Was als kindliches Abenteuer beginnt, wird bald zu einem Wettlauf gegen eine unbekannte Bedrohung, die nicht nur ihr Leben, sondern das von ganz Falcon Hollow zu gefährden droht.",
            en: "In search of answers, the teens stumble upon the enigmatic records of the eccentric scientist Dr. Alistair Thorne, who vanished decades ago. His notes reveal clues to the ominous 'Project Silent Wire,' a secret research project seemingly connected to electromagnetic anomalies and an eerie presence in the forest. What starts as a childhood adventure soon becomes a race against an unknown threat that endangers not only their lives but all of Falcon Hollow."
        },
        // Alt-Texte für Charakterbilder (NEU)
        altAiden: { de: "Porträt von Aiden Blake", en: "Portrait of Aiden Blake" },
        altElaine: { de: "Porträt von Elaine Carter", en: "Portrait of Elaine Carter" },
        altJayden: { de: "Porträt von Jayden Marsh", en: "Portrait of Jayden Marsh" },
        altAbel: { de: "Porträt von Abel Garcia", en: "Portrait of Abel Garcia" },
        altMilana: { de: "Porträt von Milana Blake", en: "Portrait of Milana Blake" },
        altRafael: { de: "Porträt von Rafael Garcia", en: "Portrait of Rafael Garcia" },
        altDrThorne: { de: "Porträt von Dr. Alistair Thorne", en: "Portrait of Dr. Alistair Thorne" },
        altSheriffCarter: { de: "Porträt von Sheriff Carter", en: "Portrait of Sheriff Carter" },
        altMargaretCarter: { de: "Porträt von Margaret Carter", en: "Portrait of Margaret Carter" },
        altWilliamBlake: { de: "Porträt von William Blake", en: "Portrait of William Blake" },
        altWinonaBlake: { de: "Porträt von Winona Blake", en: "Portrait of Winona Blake" },
        altRosaGarcia: { de: "Porträt von Rosa Garcia", en: "Portrait of Rosa Garcia" },
        // Wichtige Charaktere
        charAidenName: { de: "Aiden Blake", en: "Aiden Blake" },
        charAidenDesc: {
            de: "Ein introvertierter Highschool-Schüler aus Falcon Hollow und der Protagonist der Geschichte. Er beobachtet seine Umgebung aufmerksam und ist eher zurückhaltend. Aiden ist Teil der Kernclique, die den mysteriösen Ereignissen nachgeht. Er lebt mit seiner Familie in Falcon Hollow; sein Vater ist Lokalhistoriker/Autor und seine ältere Schwester Milana sorgt sich um ihn. Mit seinen Freunden untersucht Aiden unheimliche Vorkommnisse im Wald und lüftet nach und nach das Geheimnis um Project Silent Wire.",
            en: "An introverted high school student from Falcon Hollow and the protagonist of the story. He observes his surroundings attentively and is rather reserved. Aiden is part of the core clique investigating the mysterious events. He lives with his family in Falcon Hollow; his father is a local historian/author, and his older sister Milana worries about him. With his friends, Aiden investigates uncanny occurrences in the forest and gradually uncovers the secret of Project Silent Wire."
        },
        charElaineName: { de: "Elaine Carter", en: "Elaine Carter" },
        charElaineDesc: {
            de: "Neu in Falcon Hollow und in Aidens Alter. Sie zieht mit ihren Eltern in das berüchtigte Carmichael-Haus neben Aiden. Elaine ist neugierig, mutig und wissbegierig; sie freundet sich schnell mit Aiden an. Als Tochter eines Sheriff und einer Geologin bringt sie besonderen Wissensdrang mit. Elaine entdeckt in ihrem neuen Haus die versteckten Notizbücher von Dr. Thorne und trägt so entscheidend zur Aufklärung des Rätsels bei. Sie wird Teil von Aidens Freundeskreis und teilt dessen Abenteuer im Wald.",
            en: "New in Falcon Hollow and Aiden's age. She moves with her parents into the infamous Carmichael House next to Aiden. Elaine is curious, brave, and inquisitive; she quickly befriends Aiden. As the daughter of a sheriff and a geologist, she has a special thirst for knowledge. Elaine discovers Dr. Thorne's hidden notebooks in her new house, contributing decisively to solving the mystery. She becomes part of Aiden's circle of friends and shares his adventures in the forest."
        },
        charJaydenName: { de: "Jayden Marsh", en: "Jayden Marsh" },
        charJaydenDesc: {
            de: "Ein enger Freund von Aiden seit Kindertagen (Sandkastenfreund). Jayden ist technisch versiert und begeisterter Tüftler. Er baut Geräte, z.B. einen verbesserten EMF-Detektor und andere Werkzeuge, um den übernatürlichen Phänomenen auf die Spur zu kommen. Im Verlauf der Handlung erweist sich Jayden als pragmatisch und vorsichtig, aber zugleich erfinderisch – seine technischen Fähigkeiten helfen der Gruppe, die seltsamen elektromagnetischen Signale im Wald zu messen und sich gegen das Unbekannte zu wappnen.",
            en: "A close friend of Aiden since childhood (sandbox friend). Jayden is tech-savvy and an avid tinkerer. He builds devices, e.g., an improved EMF detector and other tools, to track down supernatural phenomena. Throughout the story, Jayden proves to be pragmatic and cautious, yet inventive – his technical skills help the group measure strange electromagnetic signals in the forest and arm themselves against the unknown."
        },
        charAbelName: { de: "Abel Garcia", en: "Abel Garcia" },
        charAbelDesc: {
            de: "Ebenfalls Teil von Aidens Freundesgruppe. Abel ist seit frühester Kindheit mit Aiden befreundet und hat eine lebhafte, impulsive Art. Er fungiert als „die Ohren der Gruppe“ und sammelt Gerüchte und lokale Geschichten über die unheimlichen Geschehnisse. Obwohl er manchmal unbedacht ist, ist Abel loyal und mutig. Er stammt aus einer Familie mit mexikanisch-amerikanischen Wurzeln in Falcon Hollow und bringt die anderen auf die Idee, alten Legenden nachzugehen. Abels Mut wird auf die Probe gestellt, als die Freunde tatsächlich auf eine bedrohliche Entität im Wald stoßen.",
            en: "Also part of Aiden's group of friends. Abel has been friends with Aiden since early childhood and has a lively, impulsive nature. He acts as 'the ears of the group,' collecting rumors and local stories about the uncanny events. Although sometimes thoughtless, Abel is loyal and brave. He comes from a family with Mexican-American roots in Falcon Hollow and gives the others the idea to pursue old legends. Abel's courage is put to the test when the friends actually encounter a threatening entity in the forest."
        },
        charMilanaName: { de: "Milana Blake", en: "Milana Blake" },
        charMilanaDesc: {
            de: "Aidens ältere Schwester. Sie ist fürsorglich und verantwortungsbewusst. Milana wirkt in der Regel gefasst, übernimmt zu Hause eine Beschützerrolle für Aiden und bemerkt schnell, wenn etwas nicht stimmt. Als Aiden und seine Freunde eines Tages nicht vom Wald zurückkehren, gerät sie in Sorge und sucht zusammen mit Rafael nach ihnen. Milana spielt eine wichtige Rolle gegen Ende des Buches, als sie zusammen mit Rafael in die Ereignisse hineingezogen wird. Ihre Unterstützung und Entschlossenheit helfen, die jüngeren Geschwister aus brenzligen Situationen zu retten.",
            en: "Aiden's older sister. She is caring and responsible. Milana usually appears composed, takes on a protective role for Aiden at home, and quickly notices when something is wrong. When Aiden and his friends don't return from the forest one day, she becomes worried and searches for them with Rafael. Milana plays an important role towards the end of the book when she is drawn into events with Rafael. Her support and determination help save the younger siblings from perilous situations."
        },
        charRafaelName: { de: "Rafael Garcia", en: "Rafael Garcia" },
        charRafaelDesc: {
            de: "Abels großer Bruder (19 Jahre alt). Nach dem mysteriösen Verschwinden ihres Vaters vor Jahren fühlt Rafael sich für Abel und ihre Mutter verantwortlich und arbeitet in einer Werkstatt, um die Familie zu unterstützen. Anfangs hält er sich aus den „Spinnereien“ der Jüngeren heraus, doch als Abel und die anderen in Gefahr geraten, zögert Rafael nicht, zu helfen. Er und Milana machen sich gemeinsam auf die Suche nach der verschwundenen Gruppe. Rafael wird im Finale verletzt – der Angriff einer unbekannten Kreatur hinterlässt bei ihm eine Wunde (die titelgebende “Rafael’s Scar” in einem Kapitel), was andeutet, dass er von etwas Unheimlichem infiziert oder beeinflusst wurde. Seine Figur wächst vom skeptischen großen Bruder zu einem wichtigen Mitstreiter im Kampf gegen das Unbekannte.",
            en: "Abel's older brother (19 years old). After the mysterious disappearance of their father years ago, Rafael feels responsible for Abel and their mother and works in a workshop to support the family. Initially, he stays out of the younger ones' 'fantasies,' but when Abel and the others are in danger, Rafael doesn't hesitate to help. He and Milana set out together to find the missing group. Rafael is injured in the finale – an attack by an unknown creature leaves him with a wound (the titular 'Rafael’s Scar' in one chapter), suggesting he has been infected or influenced by something sinister. His character grows from a skeptical older brother to an important ally in the fight against the unknown."
        },
        charDrThorneName: { de: "Dr. Alistair Thorne", en: "Dr. Alistair Thorne" },
        charDrThorneDesc: {
            de: "Ein exzentrischer Wissenschaftler und früherer Bewohner von Falcon Hollow, dessen Schatten über dem gesamten Geschehen liegt. Dr. Thorne ist zwar nicht persönlich anwesend, spielt aber durch seine Hinterlassenschaften eine zentrale Rolle: Er forschte in den 1960er Jahren an dem geheimen Project Silent Wire und verschwand plötzlich unter ungeklärten Umständen. Elaine findet Thornes versteckte Notizbücher auf dem Dachboden des Carmichael-Hauses, in denen rätselhafte Symbole, technische Diagramme und Aufzeichnungen über seltsame Signale festgehalten sind. Diese Tagebücher liefern der Gruppe entscheidende Hinweise und offenbaren, dass Thorne etwas Gefährlichem auf der Spur war.",
            en: "An eccentric scientist and former resident of Falcon Hollow, whose shadow hangs over the entire proceedings. Although Dr. Thorne is not personally present, he plays a central role through his legacy: he researched the secret Project Silent Wire in the 1960s and suddenly disappeared under unexplained circumstances. Elaine finds Thorne's hidden notebooks in the attic of the Carmichael House, containing enigmatic symbols, technical diagrams, and records of strange signals. These diaries provide the group with crucial clues and reveal that Thorne was onto something dangerous."
        },
        charSheriffCarterName: { de: "Sheriff Carter", en: "Sheriff Carter" },
        charSheriffCarterDesc: {
            de: "Elaines Vater und seit Kurzem der neue Sheriff von Falcon Hollow. Sein Vorname wird im Buch nicht genannt. Er ist ein pflichtbewusster Gesetzeshüter. Während eines kleineren Waldbrandes nördlich der Stadt ist er im Einsatz, und im Finale greift er ein, nachdem die Jugendlichen die unheimlichen Ereignisse melden. Er nimmt die Hinweise der Jugendlichen zunächst zögerlich ernst, kommt aber schließlich zu Hilfe. Seine Präsenz repräsentiert die Erwachsenenwelt, die langsam erkennt, dass mehr hinter den „Spukgeschichten“ steckt.",
            en: "Elaine's father and recently the new sheriff of Falcon Hollow. His first name is not mentioned in the book. He is a dutiful lawman. He is on duty during a small forest fire north of the town, and in the finale, he intervenes after the youths report the uncanny events. He initially takes the youths' clues hesitantly seriously but eventually comes to their aid. His presence represents the adult world slowly realizing there's more to the 'ghost stories'."
        },
        charMargaretCarterName: { de: "Margaret Carter", en: "Margaret Carter" },
        charMargaretCarterDesc: {
            de: "Elaines Mutter. Sie ist promovierte Geologin und führt im Buch eigenständige Untersuchungen durch. Margaret zeigt auffällig großes Interesse am Boden und an geologischen Besonderheiten des Carmichael-Grundstücks. Sie scheint zu ahnen, dass es in Falcon Hollow ungewöhnliche geophysikalische Anomalien gibt. Im Finale unterstützen Margarets Erkenntnisse indirekt das Verständnis der Ereignisse.",
            en: "Elaine's mother. She is a PhD geologist and conducts independent investigations in the book. Margaret shows a noticeably strong interest in the soil and geological features of the Carmichael property. She seems to suspect that there are unusual geophysical anomalies in Falcon Hollow. In the finale, Margaret's findings indirectly support the understanding of the events."
        },
        charWilliamBlakeName: { de: "William Blake", en: "William Blake" },
        charWilliamBlakeDesc: {
            de: "Aidens Vater. William ist ein Autor und Lokalhistoriker, der sich auf die unheimliche Geschichte von Falcon Hollow spezialisiert hat. Er schreibt Mystery-Kolumnen und Bücher über lokale Legenden. Aiden durchsucht heimlich die Archive seines Vaters nach Hinweisen zu Project Silent Wire. Seine Kenntnisse helfen den Jugendlichen, Gerüchte einzuordnen.",
            en: "Aiden's father. William is an author and local historian specializing in the eerie history of Falcon Hollow. He writes mystery columns and books about local legends. Aiden secretly searches his father's archives for clues about Project Silent Wire. His knowledge helps the youths contextualize rumors."
        },
        charWinonaBlakeName: { de: "Winona Blake", en: "Winona Blake" },
        charWinonaBlakeDesc: {
            de: "Aidens Mutter. Winona ist die pragmatische Stütze der Familie Blake. Sie arbeitet im örtlichen Gemischtwarenladen (Miller’s Mercantile). Sie verkörpert Bodenständigkeit inmitten der unheimlichen Ereignisse. Obwohl Winona nichts von den paranormalen Erlebnissen ihres Sohnes ahnt, sorgt ihre Präsenz für einen sicheren Hafen.",
            en: "Aiden's mother. Winona is the pragmatic pillar of the Blake family. She works at the local general store (Miller’s Mercantile). She embodies down-to-earthness amidst the uncanny events. Although Winona is unaware of her son's paranormal experiences, her presence provides a safe haven."
        },
        charRosaGarciaName: { de: "Rosa Garcia", en: "Rosa Garcia" },
        charRosaGarciaDesc: {
            de: "Die Mutter von Rafael und Abel. Rosa wird nur kurz erwähnt, hinterlässt aber einen bleibenden Eindruck als warmherzige, tapfere Frau. Seit dem Verschwinden ihres Mannes muss Rosa allein für die Familie sorgen. Sie behandelt auch die Freunde ihrer Söhne wie eigene Kinder. Rosa steht sinnbildlich für den familiären Rückhalt.",
            en: "Rafael and Abel's mother. Rosa is only briefly mentioned but leaves a lasting impression as a warm-hearted, brave woman. Since her husband's disappearance, Rosa has had to provide for the family alone. She also treats her sons' friends like her own children. Rosa symbolizes family support."
        },
        // Kreaturen & Entitäten
        creaturePSWName: { de: "Project Silent Wire (PSW)", en: "Project Silent Wire (PSW)" },
        creaturePSWDesc: { /* ... Vollständige Beschreibung ... */ },
        creatureNamelessName: { de: "Die namenlose Kreatur im Wald", en: "The Nameless Creature in the Forest" },
        creatureNamelessDesc: { /* ... Vollständige Beschreibung ... */ },
        // Orte & Schauplätze
        placeFalconHollowName: { de: "Falcon Hollow", en: "Falcon Hollow" },
        placeFalconHollowDesc: { /* ... Vollständige Beschreibung ... */ },
        // ... (Alle anderen Orte hier mit Name und Desc einfügen)
        placeFalconHollowHSName: { de: "Falcon Hollow High School", en: "Falcon Hollow High School" },
        placeFalconHollowHSDesc: { /*...*/ },
        placeCarmichaelHouseName: { de: "Carmichael-Haus", en: "Carmichael House" },
        placeCarmichaelHouseDesc: { /*...*/ },
        placeMapleStreetName: { de: "Maple Street", en: "Maple Street" },
        placeMapleStreetDesc: { /*...*/ },
        placeMillersMercName: { de: "Miller’s Mercantile", en: "Miller’s Mercantile" },
        placeMillersMercDesc: { /*...*/ },
        placeRustyBucketName: { de: "“Rusty Bucket”", en: "“Rusty Bucket”" },
        placeRustyBucketDesc: { /*...*/ },
        placeWhisperingFallsName: { de: "Whispering Falls", en: "Whispering Falls" },
        placeWhisperingFallsDesc: { /*...*/ },
        placeSectorGammaName: { de: "Sektor Gamma", en: "Sector Gamma" },
        placeSectorGammaDesc: { /*...*/ },
        placeSurroundingForestName: { de: "Der umliegende Wald", en: "The Surrounding Forest" },
        placeSurroundingForestDesc: { /*...*/ },
        // Autoren-Sektion
        authorP1: {
            de: "Ich bin 1997 geboren, lebe in Deutschland und schreibe Geschichten, die irgendwo zwischen Realität und Fantasie spielen. Schon früh haben mich die Welten von Harry Potter, Der Herr der Ringe und anderen großen Fantasy-Erzählungen geprägt – später kamen Serien wie Stranger Things dazu, die mir gezeigt haben, wie spannend es sein kann, das Unheimliche in ganz normalen Orten zu entdecken.",
            en: "I was born in 1997, live in Germany, and write stories that play out somewhere between reality and fantasy. Early on, the worlds of Harry Potter, The Lord of the Rings, and other great fantasy narratives shaped me – later, series like Stranger Things came along, showing me how exciting it can be to discover the uncanny in very ordinary places."
        },
        authorP2: {
            de: "Mit Project Silent Wire erfülle ich mir einen lang gehegten Traum. Die Idee dazu begleitet mich schon viele Jahre – geboren aus Erinnerungen an meine Kindheit, inspiriert von dunklen Gängen, Sommernächten und dem Gefühl, dass hinter dem Bekannten noch etwas anderes wartet.",
            en: "With Project Silent Wire, I am fulfilling a long-held dream. The idea has been with me for many years – born from childhood memories, inspired by dark corridors, summer nights, and the feeling that something else awaits behind the familiar."
        },
        authorP3: {
            de: "Ich schreibe unter dem Pseudonym W.D. Perske, weil ich finde, dass Geschichten im Mittelpunkt stehen sollten – nicht der Autor dahinter. Mein Ziel ist es, Welten zu erschaffen, in die man eintauchen kann. Die bleiben. Die das Staunen wieder wachrufen.",
            en: "I write under the pseudonym W.D. Perske because I believe that stories should take center stage – not the author behind them. My goal is to create worlds you can dive into. Worlds that linger. Worlds that reawaken wonder."
        },
        // Footer
        footerMotto: {
            de: "© 2025 W.D. Perske | Don’t follow the frequency.",
            en: "© 2025 W.D. Perske | Don’t follow the frequency."
        }
    };

    // Funktion zum Setzen der Sprache
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key] && translations[key][lang]) {
                // Prüfen, ob es sich um ein Bild handelt und das alt-Attribut setzen
                if (element.tagName === 'IMG') {
                    element.alt = translations[key][lang];
                } else {
                    element.innerText = translations[key][lang];
                }
            }
            // Optional: Fallback, falls eine Übersetzung für einen Key nicht existiert
            // else if (translations[key] && translations[key]['de']) { // Fallback auf Deutsch
            //     if (element.tagName === 'IMG') { element.alt = translations[key]['de']; }
            //     else { element.innerText = translations[key]['de']; }
            // }
        });
        langButtons.forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active-lang');
            } else {
                button.classList.remove('active-lang');
            }
        });
        localStorage.setItem('language', lang);
    }

    // Event-Listener für Sprachumschalt-Buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    // Funktion, um den oberen Abstand des Inhaltsbereichs basierend auf der Menühöhe zu aktualisieren
    function updateContentWrapperPadding() {
        if (mainMenu.classList.contains('visible')) {
            if (contentWrapper) {
                 contentWrapper.style.paddingTop = mainMenu.offsetHeight + 'px';
            }
        } else {
            if (contentWrapper) {
                contentWrapper.style.paddingTop = '0px';
            }
        }
    }

    // Event-Listener für den "ENTER FALCON HOLLOW"-Button
    if (enterButton && landingPage && mainMenu) {
        enterButton.addEventListener('click', function() {
            landingPage.classList.add('fade-out');
            mainMenu.classList.add('visible');
            updateContentWrapperPadding();

            const storyLink = mainMenu.querySelector('a[data-section="story-section"]');
            if (storyLink) {
                storyLink.click();
            }
        });
    }

    // Event-Listener für die Menü-Links, die Inhaltssektionen anzeigen
    sectionMenuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            contentSections.forEach(section => section.classList.remove('visible'));
            allMenuLinks.forEach(ml => ml.classList.remove('active'));
            this.classList.add('active');

            const targetSectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
                targetSection.classList.add('visible');
                const menuHeight = mainMenu.offsetHeight;
                const targetSectionTopAbsolute = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const scrollToPosition = targetSectionTopAbsolute - menuHeight - 10;
                window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
            }
        });
    });

    // Event-Listener für den "Home"-Button
    if (homeButton && landingPage && mainMenu) {
        homeButton.addEventListener('click', function(event) {
            event.preventDefault();
            contentSections.forEach(section => section.classList.remove('visible'));
            mainMenu.classList.remove('visible');
            landingPage.classList.remove('fade-out');
            allMenuLinks.forEach(ml => ml.classList.remove('active'));
            updateContentWrapperPadding();
        });
    }

    // ResizeObserver, um den Abstand anzupassen, wenn sich die Menühöhe ändert
    if (mainMenu && contentWrapper) {
        const menuResizeObserver = new ResizeObserver(entries => {
            if (mainMenu.classList.contains('visible')) {
                updateContentWrapperPadding();
            }
        });
        menuResizeObserver.observe(mainMenu);
    }

    // Initialisierung der Sprache
    const savedLang = localStorage.getItem('language') || 'de'; // Standard auf Deutsch
    setLanguage(savedLang);
});