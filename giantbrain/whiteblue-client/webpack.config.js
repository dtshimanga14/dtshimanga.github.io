

const path = require("path");

let config = {
		  entry: {
				  app : ["./static/src/App.js"],
				  vendor: ['react', 'react-dom', 'whatwg-fetch']
			},
		  output: {
			path: path.resolve(__dirname, "./static"),
			filename: "[name].bundle.js"
		  },
	  module: {
			rules: [
			  {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
				  loader: "babel-loader"
				}
			  },{
					test:  /\.(s*)css$/,
					exclude: /node_modules/,
					use: ["style-loader","css-loader","sass-loader"]
			}
			]
		  },
		  devServer : {
		  	port : 8000,
		  	contentBase : 'static',
		  	proxy : {
		  		'/api/*':{
		  			target : 'http://localhost:3000'
		  		}
		  	}
		  }
	}

module.exports = config;