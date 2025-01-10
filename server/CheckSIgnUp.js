const CheckSignUp = async (usersCollection, email, password) => {
  console.log(email);
  console.log(password);
  const user = await usersCollection.findOne(
    { email: email },
    { projection: { email: 1, password: 1, _id: 0 } }
  );

  if (user === null) {
    console.log("Account not found");
    return 1;
  } else {
    console.log(user);
    if (user.password === password) {
      console.log("Account exists");
      return 0;
    } else {
      console.log("Incorrect Password");
      return 2;
    }
  }
};

export default CheckSignUp;
