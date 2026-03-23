// // const http = require('http');
// // const fs = require('fs');

// // const myServer = http.createServer((req, res) => {

// //     const log = `path is: ${req.url}\n`;

// //     fs.appendFile('log.txt', log, (err) => {
// //         if (err) {
// //             res.statusCode = 500;       
// //             res.end('Internal Server Error');
// //             return;
// //         }
// //         else {
// //             switch(req.url) {
// //                 case '/':
// //                     res.end('This is my home page');
// //                     break;
// //                 case '/about':
// //                     res.end('This is my about page');
// //                     break;
// //                 case '/contact':
// //                     res.end('This is my contact page');
// //                     break;
// //                 default:
// //                     res.endCode = 404;
// //                     res.end('404 page not found');
// //                     break;
// //             }
// //         }
// //     });

// //     res.write("Welcome to my server ");
// //     res.end("Hello to my server end");
// // });

// // myServer.listen(3000, () => {
// //     console.log("Server running on port 3000");
// // });
// // const http = require('http');
// // const fs = require('fs');
// // const url = require('url');

// // const myServer = http.createServer((req, res) => {
// //     if (req.url === '/favicon.ico') return res.end(); // Ignore favicon requests
// //     const myUrl = url.parse(req.url, true)
// //     // console.log(req.url, 'req.url');
// //     console.log(myUrl, 'myUrl');
// //     const log = `path is: ${req.url}, method is: ${req.method}\n`;
// //     fs.appendFile('log.txt', log, (err) => {
// //         if (err) {
// //             res.statusCode = 500;       
// //             res.end('Server Error');
// //             return;
// //         }
// //         else {
// //             switch(myUrl.pathname) {
// //                 case '/':
// //                     if (req.method === 'GET')res.end('This is my home page');
// //                         break;
// //                 case '/about':
// //                     const myName = myUrl.query.myname;
// //                     const lastName = myUrl.query.lname;
// //                     res.end('Hi my name is $(myName ${lastName})');
// //                     break;
// //                 case '/contact':
// //                     res.end('This is my contact page');
// //                     break;
// //                 default:
// //                     res.endCode = 404;
// //                     res.end('404 page not found');
// //                     break;
// //             }
// //         }
// //     });

// //     res.write("Welcome to my server ");
// //     res.end("Hello to my server end");
// // });

// // myServer.listen(3000, () => {
// //     console.log("Server running on port 3000");
// // });
// const Math = require("../Backend/maths");
// const http = require("http");
// const url = require("url");

// const mathServer = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   if (parsedUrl.pathname == "/") {
//     res.end("welcome to math server");
//   } else if (parsedUrl.pathname == "/average") {
//     const num1 = parseInt(parsedUrl.query.num1);
//     const num2 = parseInt(parsedUrl.query.num2);
//     const num3 = parseInt(parsedUrl.query.num3);
//     res.end("" + Math.average(num1, num2, num3));
//   } else if (parsedUrl.pathname == "/minimum") {
//     const num1 = parseInt(parsedUrl.query.num1);
//     const num2 = parseInt(parsedUrl.query.num2);
//     const num3 = parseInt(parsedUrl.query.num3);
//     res.end(Math.minimum(num1, num2, num3).toString());
//   } else if (parsedUrl.pathname == "/factorial") {
//     const num = parseInt(parsedUrl.query.num);
//     res.end(Math.factorial(num).toString());
//   } else if (parsedUrl.pathname == "/isPrime") {
//     const num = parseInt(parsedUrl.query.num);
//     res.end(Math.isPrime(num).toString());
//   } else if (parsedUrl.pathname == "/squareDifference") {
//     const num1 = parseInt(parsedUrl.query.num1);
//     const num2 = parseInt(parsedUrl.query.num2);
//     res.end(Math.squareDifference(num1, num2).toString());
//   } else if (parsedUrl.pathname == "/evenOrOdd") {
//     const num = parseInt(parsedUrl.query.num);
//     res.end(Math.evenOrOdd(num).toString());
//   } else {
//     res.statusCode = 404;
//     res.end("404 page not found");
//   }
// });
// mathServer.listen(3000, () => {
//   console.log("math server running on port 3000");
// });


// const http = require('http');

// const server = http.createServer((req, res) => {

//     if (req.url === "/") {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write("<h1>My First Server</h1>");
//         res.end();
//     }

//     else if (req.url === "/home") {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write("<h1>Home Page</h1>");
//         res.end();
//     }

//     else if (req.url === "/about") {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write("<h1>About Us</h1>");
//         res.end();
//     }

//     else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.write("<h1>404 Page Not Found</h1>");
//         res.end();
//     }

// });


// server.listen(3000, () => {
//     console.log("Server running on port 3000");
// });




///// Create an api end point to display students data in JSON Format 
// const http = require('http');


// const students = [
//     { id: 1, name: "Arsh", branch: "CSE", year: 2 },
//     { id: 2, name: "Riya", branch: "ECE", year: 1 },
//     { id: 3, name: "Kabir", branch: "ME", year: 3 }
// ];

// const server = http.createServer((req, res) => {

//     if (req.url === "/") {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write("<h1>Welcome to Student Server</h1>");
//         res.end();
//     }


//     else if (req.url === "/api/students") {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify(students));
//         res.end();
//     }

//     else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.write("<h1>404 Page Not Found</h1>");
//         res.end();
//     }

// });

// server.listen(3000, () => {
//     console.log("Server running on port 3000");
// });


// create an API using GET method which sends square of a member 
const http = require('http');

sweeet milk talla hua fried aur burger maida sab khane se mna kra hai 
