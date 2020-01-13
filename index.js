// install express
const express = require("express");

const Hubs = require("./data/hubs-model.js"); // hubs database library

const server = express();
// middleware that teaches to parse json
server.use(express.json());
// routes or endpoints

// GET to "/"
server.get("/", (req, res) => {
  res.send({
    hello: "web25"
  });
});

// see list of HUBs

server.get("/api/hubs", (req, res) => {
  // read data from the database (Hubs)
  Hubs.find() // returns a promise
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "Sorry, ran into an error getting the list of Hubs..."
      });
    });
});

//  create a HUB
server.post("/api/hubs", (req, res) => {
  const hubData = req.body;
  // never trust the client, validate the data. for now we trust the data for the demo
  Hubs.add(hubData)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      console.log(error);
      // handle the error
      res.status(500).json({
        errorMessage: "sorry, we ran into an error creating the hub"
      });
    });
});
// delete HUB
server.delete("/api/hubs/:id", (req, res) => {
  const id = req.params.id;

  Hubs.remove(id)
    .then(deleted => {
      // res.status(204).end;
      res.status(200).json(deleted);
    })
    .catch(error => {
      console.log(error);
      // handle the error
      res.status(500).json({
        errorMessage: "sorry, hub was not deleted"
      });
    });
});
// update a HUB

const port = 8000;
server.listen(port, () => {
  console.log(`\n ** api listening on port ${port}`);
});
