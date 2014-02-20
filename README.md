### Webtemplate mitsamt Route erstellen

1. HTML-Template 'mypage.tpl' unter **'./www/templates'** erstellen

    ```html

        <div>
            {%VAR1%}

            {%PARSEPAGEHERE%}
        </div>
    ```

2. Express-Route in **'./modules/pagehandler/routes.js'** hinzufügen

    ```javascript

        "/mypage/:getvar1" : "mypage"   // "express-route" : "name-der-funktion-in-pages.js"
    ```

3. Funktion in **'./modules/pagehandler/pages.js'** hinzufügen

    ```javascript

        // tpl - Zugriff auf Templatefunktionen
        // meta - Zugriff auf Metamodul
        // req / res / next - Express und Middlewarezugriff
        "mypage" : function(tpl, meta, req, res, next) {

            meta.title("MyPage");
            meta.desctiption("Some description");
            meta.keywords("keywords1,keyword2");
            meta.robots("index, nofollow");


            tpl.set("VAR1", "Hello World")                  // Setze einfache Variable
            tpl.parse("PARSEPAGEHERE", "anotherpage.tpl");  // Parse andere Seite
            tpl.template("index.tpl");                      // Setze das zu anzeigende Template
        }
    ```

4. Aufruf im Browser unter **'http://localhost:8000/mypage/'**


### Architect-Modul erstellen

1. Ordner mit package.json Datei und folgendem Beispielcode in **'./modules'** erstellen

    ```javascript

        {
            "name": "mymodule",                     // Name
            "description": "example description",   // Kurze Beschreibung
            "version" : "0.0.1",
            "main" : "./mymodule.js",               // rel. Pfad zum Einstiegspunkt
            "plugin" : {
                "consumes" : [                      // Abhängigkeit zu anderen Modulen erstellen
                    "module1",
                    "module2"
                ],
                "provides" : [                      // Modul für Architect-System freigeben
                    "mymodule"
                ]
            }
        }
    ```

2. **'./config.js'** anpassen

    ```javascript

        {
            "packagePath" : "./modules/mymodule",   // Pfad zum Modul
            "port" : 1337,                          // Einfache Variable (später über options.prop1 aufrufbar)
            "default" : {                           // Set von Optionen
                "title" : "foo"
            }
            "clients" : [
                "client1" : "127.0.0.1"            // Arrays sind auch möglich
            ]
        }
    ```

3. Mithilfe folgendem Template Modul implementieren

    ```javascript

        var assert = require("assert");

        var mymodule = {
            "func1" : function() { },
            "func2" : function() { }
        };

        // Private Funktion
        function _privateFunc() {}


        // options - enthält die in der config.js festgelegten Variablen
        // imports - enthält alle in der package.json mit 'consumes' referenzierten Module
        // register - Mithilfe register kann das komplette Modul oder nur Teilfunktionen verfügbar gemacht werden
        module.exports = function(options, imports, register) {
            assert(imports.module1, "Package 'module1' is required");   // Module1 auf Verfügbarkeit prüfen
            assert(options.port, "Option 'port' is required");          // Option 'port' auf Verfügbarkeit prüfen


            // Modul freigeben
            register(null, {
                "mymodule" : mymodule
            });
        }
    ```

Für eine bessere/sicherere Kapselung des Moduls kann über register ein Objekt mit den verfügbaren Funktionen definiert werden

```javascript

    register(null, {
        "mymodule" : {
            "publicFunc1" : mymodule.func1()
            }
    });
```


Mehr Infos:

https://github.com/c9/architect

http://www.mariocasciaro.me/dependency-injection-in-node-js-and-other-architectural-patterns

http://de.slideshare.net/mattpardee/building-productionquality-apps-with-nodejs