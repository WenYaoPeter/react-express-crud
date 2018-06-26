const express = require('express');
const jsonfile = require('jsonfile');
const reactEngine = require('express-react-views').createEngine();
const FILE = 'pokedex.json';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

let pokemons;

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {
  response.send("yay");
});

app.get('/pokemon/new', (request, response) => {
  response.render('home');
});

app.post('/pokemon', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {
    pokemons = obj;
    // console.log(pokemons.pokemon);
    let newPokemonData = request.body;
    pokemons.pokemon.push(newPokemonData);

    jsonfile.writeFile(FILE, pokemons, (err) => {
      console.log(err);
    });
  });

  response.send('New Pokemon Update');
  // response.render('home', );

  // response.send("New Pokemon's Data Saved! =D");
  // response.render('home', )
  // console.log("user's new pokemon data" + request.body);
 
  
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
