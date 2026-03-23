const fs= require('fs');
// fs.writeFileSync('text.txt', 'Hello World!');
// fs.writeFileSync('text.txt', 'Hello Universe!');
// fs.writeFile('text.async.txt', "Hello, Async World!", (err) => {
//     if (err) console.log('Error occured (File written asynchronously): ', err);
// });
// const readFile = fs.readFileSync('text.txt', 'utf8') 
// console.log('File Data (Synchronous read): ', readFile);
// fs.readFile('text.async.txt', 'utf8', (err, result) => {
//     if (err) {
//         console.log('Error occured (File read asynchronously): ', err);
//     } else {
//         console.log('File Data (Asynchronous read): ', result);
//     }
// })
// fs.appendFileSync('text.txt', "\nAppend some data!");
// fs.appendFile('text.async.txt', "\nAppend some async data!", (err) => { // Asynchronous append
//     if (err) console.log('Error occured (File append asynchronously): ', err);
// });
// fs.cpSync('text.txt', 'text-copy.txt'); // Synchronous copy
// fs.copyFile('text.async.txt', 'text-async-copy.txt', (err) => { // Asynchronous copy
//     if(err) {
//         console.log("Error occured: ", err)
//     }
// })
// fs.unlinkSync('text-copy.txt'); // Synchronous delete
// fs.unlink('async-copy.txt', (err) => { // Async
//     console.log('Error: ', err)
// })
// fs.mkdirSync('My-Folder') // Sync
// fs.mkdirSync('My-Folder/First/Second', {recursive: true}) // Sync
// fs.mkdir('Folder-Async',() => { // Async
//     console.log ('Folder created succesfully')
// })
// fs.rmdirSync('my-folder/First/Second')
// fs.rmdir('Folder-Async', ()=>{
//     console.log('Folder deleted succesfully')
// })
// var value=fs.statSync('text.txt')
// console.log(value)

// fs.mkdirSync("Student information")
fs.writeFileSync("Student information/Student1.txt", "Name: Annie  Doe\nAge: 19\nCourse: Computer Science")



