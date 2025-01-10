const MongoCheck = async (client) => {
  try {
    const db = client.db("gettingStarted");

    const col = db.collection("people");

    const peopleDocuments = [
      {
        name: { first: "Alan", last: "Turing" },
        birth: new Date(1912, 5, 23), // May 23, 1912
        death: new Date(1954, 5, 7), // May 7, 1954
        contribs: ["Turing machine", "Turing test", "Turingery"],
        views: 1250000,
      },
      {
        name: { first: "Grace", last: "Hopper" },
        birth: new Date(1906, 12, 9), // Dec 9, 1906
        death: new Date(1992, 1, 1), // Jan 1, 1992
        contribs: ["Mark I", "UNIVAC", "COBOL"],
        views: 3860000,
      },
    ];

    const p = await col.insertMany(peopleDocuments);

    const filter = { "name.last": "Turing" };

    const document = await col.findOne(filter);

    console.log("Document found:\n" + JSON.stringify(document));
    return true;
  } catch (error) {
    console.log(error.stack);
    return false;
  }
};

export default MongoCheck;
