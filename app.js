const mongoose = require('mongoose');

// Define the MongoDB connection URI
const MONGO_URI = 'mongodb://127.0.0.1:27017';

// Connect to the database
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Rest of your code...


// Create a person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create a person model
const Person = mongoose.model('Person', personSchema);

// Create and save a record
const createPerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Burger']
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create many records
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Find all people with a given name
const findPeopleByName = (name, done) => {
  Person.find({ name }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Find one person with a certain food in favoriteFoods
const findOnePersonByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Find a person by _id and update their favoriteFoods
const findAndUpdatePerson = (personId, foodToAdd, done) => {
    Person.findByIdAndUpdate(
      personId,
      { $push: { favoriteFoods: foodToAdd } },
      { new: true },
      (err, data) => {
        if (err) return console.error(err);
        done(null, data);
      }
    );
  };
