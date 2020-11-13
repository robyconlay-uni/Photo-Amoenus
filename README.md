# SEII_project_26
Repository per il progetto di Ingegneria del Software 2

## Utilizzo 

Per far partire il server in locale usare il comando `node .\index.js`. 
Index.js crea il server basato sul file \lib\app.js alla porta settata nell'ambiente di sviluppo oppure 8000

index.html è la pagina di default con indirizzo `http://localhost:8000` 


## Utilizzo del DB

Il db è cloud, non locale, quindi non serve scaricare niente. Sono accettate richieste da tutti gli IP. E' hostato da Amazon Web Service. Attualmente credo di essere solo io a poter vedere la dashboard el db 

La connessione col server avviene all'inizio del file \lib\app.js con l'espressione `mongoose.connect('mongodb+srv://commonUser:7M1LXWdGfoTYVcTm@locations.xogwk.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });`

**è sufficiente una sola connessione, quindi non aggiungetene altre**

Il db non fa uso di SQL, ma piuttosto di funcioni javascript chiamate su schemi del db.

Nei file `\lib\model\locationScheme.js` e `\lib\model\userScheme.js` sono definiti gli schemi per le location e gli user.

Per usare questi schemi in un file è necessario importare la libreria mongoose (`const mongoose = require("mongoose");`) e importare lo schema da utilizzare (e.g. `const Location = require("./models/locationScheme");`). Tutte le operazione sul db sono da effettuare sulla costante Location (e.g. `Location.find();`, `Location.findBy(var);`, `Location.insert();`.

C'è un esempio dell'utiizzo in locations.js

Usate fetch come ha fatto il prof
