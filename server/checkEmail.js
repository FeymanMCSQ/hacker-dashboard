const CheckEmail = async (usersCollection, email) => {
  try {
    const user = await usersCollection.findOne({ email });
    console.log(user);
    if (user === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error checking email existance: ", error);
    throw error;
  }
};

export default CheckEmail;
