
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');

const mysql = require('mysql2');
const { response } = require('express');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not


let dbobj = {
	host: 'localhost',
	user:'kiran',
	password:'kiran123',
	database:'pleasework',
	port:3306
}

const connection = mysql.createConnection(dbobj);



app.get('/getdetails', function (req, res) {
    
	
        console.log("inside fun ");
		let bookid = req.query.bookid;
		let output = {status: false,bookdetails:{bookid:0, bookname:"",price:0}}
		connection.query('select bookid, bookname, price from book where bookid = ?',[bookid],
			(error,rows)=>{
				if(error){
					console.log(error);
				}
				else{
					if(rows.length > 0){
						console.log("Found");
						console.log(rows[0]);
						output.status = true;
						output.bookdetails = rows[0];
					}
					else{
						console.log("Not found");
					}
				}
				console.log(output);
				response.send(output);

		
    	});

	});

	app.get('/updateprice', function (req, res) {
    
	
        console.log("inside fun ");
		let bookid = req.query.bookid;
		let output = {status: false,bookdetails:{bookid:0, bookname:"",price:0}}
		connection.query('update book set price = ? where bookid = ?',[price,bookid],
			(error,res)=>{
				if(error){
					console.log(error);
				}
				else{
					if(rows.affectedRows > 0){
						console.log("updated");
						console.log(rows[0]);
						
					}
					else{
						console.log("Not update");
					}
				}
				console.log(output);
				response.send(output);
			});
		
    	});

app.listen(8081, function () {
    console.log("server listening at port 8081...");
});