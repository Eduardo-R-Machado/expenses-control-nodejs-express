import express from 'express';
import admin from 'firebase-admin';


const app = express();

admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json"),
});



app.get('/transactions', (request, response) => {
    console.log('Get transactions');
    admin.firestore()
        .collection('Todos')
        .get()
        .then(snapshot => {
            const todos = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
            response.json(todos);
        })

});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


