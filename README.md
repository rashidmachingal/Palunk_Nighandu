# പളുങ്ക് നിഘണ്ടു
പളുങ്ക് നിഘണ്ടു ഒരു ഇംഗ്ലീഷ്-മലയാളം നിഘണ്ടു വെബ് ആപ്ലിക്കേഷനാണ്. പളുങ്ക് നിഘണ്ടു വാക്കുകളുടെ അർത്ഥം പുതുക്കാനും പുതിയ വാക്കുകൾ ചേർക്കാനും ഉപയോക്താക്കളെ അനുവദിക്കുന്നു.

Palunk Nighandu is a fresh English-to-Malayalam dictionary web application. It operates on the principles of crowdsourcing, allowing users to actively participate in updating word meanings, adding new entries, and enhancing the quality of translations.

As a fresh platform, the dictionary may not yet have an extensive database of word meanings.

## ഫീച്ചറുകൾ
- Search words
- Search suggetions
- User register and login
- User dashboard
- User can edit word meanings
- User can add new meanings to an existing word
- User can add new entries
- Admin dashboard for managing users entries and more

## Built with
- Node Js
- Express Js
- MongoDB - data base
- Ejs - template engine

## How to run project locally

##### Step 1: Clone the repository
```bash
  git clone https://github.com/rashidmachingal/Palunk_Nighandu.git
```
##### Step 2: Go to the project directory

```bash
  cd Palunk_Nighandu
```

##### Step 3: Install dependencies

```bash
  npm install
```

##### Step 4: Create a new file named .env in the root directory. and set these enviroment variables

```bash
  # fill your mongo db uri
  MONGO_URL = 
  JWT_SEC = jwt_secret_code

  # fill firebase config keys 
  # only need if you want image upload functionality
  apiKey = 
  authDomain = 
  projectId = 
  storageBucket = 
  messagingSenderId = 
  appId = 
  measurementId =
```

##### Step 5: Start the server

```bash
  npm run dev
```


### Live Demo
<a href="https://lonely-sweatpants-ant.cyclic.app/">Live Demo</a>

