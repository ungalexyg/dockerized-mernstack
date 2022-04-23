import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

// custom mongo client handler from MLab
const dbcluster = process.env.DB_CLUSTER;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbname = process.env.DB_NAME;
const uri = `mongodb+srv://${dbuser}:${dbpass}@${dbcluster}.j1cfu.mongodb.net/${dbname}?retryWrites=true&w=majority`;

console.log(process.env.DB_CLUSTER);

// connection handler provided from mlab
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

// create an array of documents to insert
const usersCollection = "users1";
const docs = [
    { f_name: 'koi', l_name: 'unger', age: 1 },
    { f_name: 'baf', l_name: 'marcus', age: 2 }
];

/**
 * DB client, mongo wrapper 
 */
class DBClient {

    /**
     * Constructor, set props 
     */
    constructor() {
        this.dbname = dbname;
        this.usersCollection = usersCollection;
    }

    /**
     * Demo insert
     */
    async insertUsers() {
        try {
            // connect to db and collection
            await this.client.connect();
            const database = this.client.db(this.dbname);
            const users = database.collection(this.usersCollection);

            // this option prevents additional documents from being inserted if one fails
            const options = { ordered: true };
            const result = await users.insertMany(docs, options);
            console.log(`${result.insertedCount} documents were inserted`);
        } finally {
            console.log(`finally, closing connection`);
            await this.client.close();
        }
    }


    /**
     * Demo find
     */
    async findUsers() {
        try {
            // connect to db and collection
            await client.connect();
            const database = client.db(dbname);
            const users = database.collection(usersCollection);

            // query for users that have a age greater than 0
            const query = { age: { $gt: 0 } };

            const options = {
                // sort returned documents in ascending order by name (A->Z)
                sort: { name: 1 },
                // include only the `f_name` and `age` fields in each returned document
                projection: { _id: 0, f_name: 1, age: 1 },
            };


            // 1) results notes: 
            // --------------------
            // in mongo, collection.find(), returns db "cursor" object
            // it is object with extra features
            // it is not the direct records, and it has several methods to interact with the direct methods
            //
            // e.g: cursor.toArray(); // handled by promise
            // e.g: cursor.forEach(doc => console.log(doc)); // handled by promise
            //
            // HOWEVER, since its from mongo, 
            // it returns promise and you must use it in async function with await 
            //
            // e.g: items = await cursor.toArray(); // return promise
            // e.g: await cursor.forEach(doc => console.log(doc));

            // 2) scope notes:
            // --------------------
            // If we use let or const to declare a variable in the try block,
            // it will not be available to catch or finally.
            // This is because these variable declarations are block-scoped.
            // But if we use var instead of let or const,
            // then it will be available inside the catch because var is function scoped, and the declaration will be hoisted.
            var cursor = users.find(query, options);
            var records = await cursor.toArray();

            // list results
            records.forEach((doc, index) => {
                console.log(`doc-${index}: `, doc)
            });

        } finally {
            await client.close();
            console.log(`finally, connection closed`);
            return records;
        }
    }


}


export default DBClient;