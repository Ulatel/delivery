#!/bin/env nodejs


let server;

module.exports = function(dest){
	if(dest !== undefined){
		const express = require('express');
		const path = require('path');
		const app = express();

		app.use('/assets', express.static(path.join(dest ?? './assets', './assets')));
		app.use(function(req, res){
			return res.sendfile(path.join(dest ?? './index.html', './index.html'));
		});
		
		app.use(function(err, req, res, next) {
			console.error('ERROR');
			console.error(err.stack);
			console.error(err);
			res.status(500).send('Something broke!');
		});


		server = app.listen(81, () => {
			console.log('lisner executed: http://localhost:81/');
		});
	}else
		server.close();
};