![](https://travis-ci.com/robyconlay-uni/Photo-Amoenus.svg?token=fvKtL7ZqYB3fRRxzP5pT&branch=main)
# Photo Amoenus

## About

Photo Amoenus è il nome di un sito web sviluppato da un gruppo di studenti di informatica come progetto per il corso  Ingegneria del Software 2, all'Università degli Studi di Trento. 

Il sito tratta di un sistema di showcase di luoghi panoramici o di interesse in cui l'utente può recarsi con il principale scopo di scattare foto (da cui il nome del sito) 

Questo progetto è stato realizzato durante il semestre Settembre - Febbraio 2020/2021, e ha richiesto ai membri un lavoro complessivo superiore alle 250 ore, diviso in 3 fasi, organizzate secondo la metodologia Agile:
- Product analysis
- Sprit 1 (incentrato su API development)
- Sprint 2 (API + frontend)

Una demo del sito è disponibile su [Heroku](https://photo-amoenus-api.herokuapp.com/)

Nella sezione Wiki di Github web è presente la descrizione completa dei metodi e utilizzati

## Collaboratori 

- robyconlay-uni (Roberto Mazzalai)
- bonmassarivan (Ivan Bonmassar)
- GiovanniMistura96 (Giovanni Mistura)
- MarcoCarraro-1 (Marco Carraro)
- plimp-speck (Davide Vinciguerra)

I collaboratori sono anche presenti anche nella sezione [Contributors](https://github.com/robyconlay-uni/Photo-Amoenus/graphs/contributors) sulla repo su Github web)


## Tecnologie, strumenti e altro 

- NodeJs
- Framework ExpressJs
- MongoDB
- Apiary
- Travis
- Heroku
- Github
- Sviluppo Agile

## Utilizzo 

### Requisiti: 

E' necessario aver installato NodeJs

### Installazione

Clonare la repo

Eseguire il comando `npm install` per installare le dipendenze (presenti nel file `package.json`)

Sempre nel file `package.json` trovate alcuni comandi
- `npm start`: creare server localhost
- `npm test`: eseguire i test riguardanti le API 

Creare un file `.env` simile a `.env.example` contenente le proprie variabili di ambiente  


### Travis e Heroku

Il file `travis.yml` fa si che travis pubblichi il progetto su Heroku

### Documentazione

Il file `apiary.yml` contiene la documentazione delle API. Per visualizzarlo correttamente è necessario importarlo su [apiary.io](https://apiary.io/) o visitare [questa pagina](https://app.apiary.io/assignementsapi30)

## Licence

[MIT](https://github.com/robyconlay-uni/Photo-Amoenus/blob/main/LICENSE)
