const fs = require('fs');

// readFileSync is synchronous way to read the file
console.log("readFileSync ",fs.readFileSync('text.txt','utf-8'));

const t1 = `This is text from readFile.js`;
// writeFileSync is synchronous way to write the file
// which overwrites the file and creates a new file if not exists
console.log("writeFileSync ",fs.writeFileSync('test.txt',t1));

// readSync is asynchronous way to read the file
fs.readFile('text.txt','utf-8', (err, data) => {
  if(data){
    console.log(' data ', data);
  }
  if(err){
    console.log(' err ', err);
  }
});

// writeSync is asynchronous way to write the file
const t2 = `Hello from asynchronous way to write the file`;
fs.writeFile('asyncWrite.txt',t2, (err, data) => {
  if(data){
    console.log(' data ', data);
  }
  if(err){
    console.log(' err ', err);
  }
});