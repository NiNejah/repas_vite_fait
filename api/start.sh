#!/bin/bash


# # Wait for MongoDB to start
# sleep 5

# # Run MongoDB commands using mongosh
# mongosh <<EOF
# use M2WEB
# db.contacts.insertOne({name: 'toto', age: 24})
# db.contacts.find()
# db.contacts.insertOne({name: 'titi', age: 25})
# db.contacts.insertOne({name: 'tutu', age: 25})
# db.contacts.insertOne({name: 'tata', age: 28})
# db.contacts.find()
# exit
# EOF

# Run your Node.js application
npm run dev
