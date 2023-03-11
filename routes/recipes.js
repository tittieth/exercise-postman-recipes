var express = require('express');
var router = express.Router();

const fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {

  fs.readFile("recipes.json", function(err, data){
    if (err) {
      console.log(err);
    }

    const recipes = JSON.parse(data)

    res.send(recipes)
    return;
  });
});

router.post('/add', function(req, res, next) {
  console.log(req.body);

  fs.readFile("recipes.json", function(err, data) {
    if (err) {
      console.log(err);

      if (err.code == "ENOENT") {
        console.log("Filen finns inte");

        let recipes = [{
          "recipeName": "Kladdkaka",
          "description": "En seg och god chokladkaka",
          "ingredients": ["socker", "ägg", "smör", "kakao", "mjöl"],
          "prepTime": 45
        }];

        fs.writeFile("recipes.json", JSON.stringify(recipes, null, 2), function(err) {
          if (err) {
            console.log(err);
          }
        }) 

        res.send("Fil skapad och nytt recept sparat");
        return;
      }

      res.send("404 - något gick fel!")
    }

    const recipes = JSON.parse(data);

    let newUser = {
      "recipeName": req.body.recipeName,
      "description": req.body.description,
      "ingredients": req.body.ingredients,
      "prepTime": req.body.prepTime
    };

    recipes.push(newUser);

    fs.writeFile("recipes.json", JSON.stringify(recipes, null, 2), function(err) {
      if (err) {
        console.log(err);
      }
    })
    res.send("ok");

  });
});

module.exports = router;
