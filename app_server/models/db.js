require('./food');
var mongoose = require('mongoose');
//Defined a database connection string
var dbURI = 'mongodb://localhost/MyFridge';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);  
});


mongoose.connection.on('error',function (err) {   
console.log('Mongoose connection error: ' + err);       
});                                                       

mongoose.connection.on('disconnected', function () {     
console.log('Mongoose disconnected');                
});   

var gracefulShutdown = function (msg, callback) { 
mongoose.connection.close(function () { 
      console.log('Mongoose disconnected through ' + msg);       
	  callback();                                              
	  });
};

//Monitored some Node process events so that we can close the Mongoose connection when the application ends

//Listen for SIGUSR2, which is what nodemon uses
process.once('SIGUSR2', function () {        
	gracefulShutdown('nodemon restart', function () {       
		process.kill(process.pid, 'SIGUSR2');               
		});
});
//Listen for SIGINT emitted onapplication termination
process.on('SIGINT', function () {      
	gracefulShutdown('app termination', function () {        
		process.exit(0);                                     
	});
});
//Listen for SIGTERM emitted when Heroku shuts downprocess
process.on('SIGTERM', function() {       
	gracefulShutdown('Heroku app shutdown', function () {
		process.exit(0);                                       
	});
});
	