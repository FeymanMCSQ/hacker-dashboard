const GiveInfo = async (db, collectionName) => {
  const collections = await db.collection(collectionName);
  const users = await collections.find({}).toArray();

  console.log(users);
};

export default GiveInfo;
