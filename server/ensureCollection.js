const EnsureCollection = async (db, collectionName) => {
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();

  if (collections.length !== 0) {
    console.log("Collection does not exist");
    await db.collection(collectionName).insertOne({
      email: "dummy@example.com",
      name: "Dummy User",
    });

    console.log("Collection created");
  } else {
    console.log("Collection already exists");
  }
};

export default EnsureCollection;
