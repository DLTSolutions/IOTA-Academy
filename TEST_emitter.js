var events = require('events');  // Import events module
var eventEmitter = new events.EventEmitter(); // Create an eventEmitter object

// Create an event handler as follows
var connectHandler = function connected() {
   console.log('connection succesful.');
  
   // Fire the data_received event 
   eventEmitter.emit('data_received');
};
eventEmitter.on('connection', connectHandler); // Bind the connection event with the handler
 
// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function() {
   console.log('data received succesfully.');
});

eventEmitter.emit('connection'); // Fire the connection event 
console.log("Program Ended.");