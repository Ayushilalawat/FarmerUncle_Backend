
module.exports = {
  async up(db) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['firstname', 'lastname', 'email', 'password'],
          properties: {
            firstname: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            lastname: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            email: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            password: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
          },
        },
      },
    });
  },

  async down(db) {
    await db.collection('users').drop();
  },
};

