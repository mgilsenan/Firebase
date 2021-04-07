const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.database();

exports.scheduledFunction = functions.pubsub.schedule('5 12 * * *').onRun((context) => {

    const parentRef = admin.database().ref("user");

    parentRef.once('value').then(snapshot => {
       
      snapshot.forEach(function(child) {

        console.log(child.child("daysLeft").val());

        console.log(child.key);

        const value = child.child("daysLeft").val();
        
        const str = child.key;

        if(value>0){
            console.log((value - 1));
            database.ref(`/user/${str}`).update({
            daysLeft: value - 1 });
        }
        
        
      });
  
      
    });
    //parentRef.once('value').then()

    
    console.log('This will be run every minute! ');
    return null;
  });