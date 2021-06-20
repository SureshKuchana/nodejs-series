# Intro to NodeJS
Node.js was first released in 2009 by **Ryan Dahl** as a reaction to how slow web servers were at
the time. Most web servers would block for any I/O task, such as reading from the file system or
accessing the network, and this would dramatically lower their throughput. For example, if a server
was receiving a file upload, it would not be able to handle any other request until the upload was
finished.

At that time, Dahl mostly worked with Ruby, and the dominant model for web applications was to
have a pool of ruby processes that a web server (e.g. Ngninx) would proxy to. If one Ruby process
was blocked with an upload, Nginx served the request to another.
**Node.js changed this model by making all I/O tasks non-blocking and asynchronous**. This
allowed web servers written in Node.js to serve **thousands of requests concurrently** – subsequent
requests didn’t have to wait for previous ones to complete.

The first demo of Node.js generated so much interest because it was the first time that a developer
could create their own web server easily and have it work so well.

Over time Node.js became good at system tasks other than web serving and started to shine as a
flexible yet lower level server-side language. It could do anything typically done with Python, Ruby,
Perl, and PHP, and it was faster, used less memory, and in most cases had better APIs for the system
calls.

For example, with Node.js we can create HTTP and TCP servers with only a few lines of code. We’ll
dive in and build one together soon, but just to show what we mean, here’s a functioning Node.js
web server in only 80 characters:

```
require('http')
  .createServer((req,res) => res.end('hello-world'))
  .listen(8080)
```

## A Rich Module Ecosystem
---
Node.js began to shine with the introduction of npm , the package manager bundled with Node.js.
A core philosophy of Node.js is to have only a small collection of built-in modules that come
preinstalled with the language.

Examples of these modules are fs , http , tcp , dns , events , child_process , and crypto . There’s a full
list in the Node.js API documentation⁵.

This may seem to be a bad thing. Many people would be puzzled as why Node.js would choose not
to have a large collection of standard modules preinstalled and available to the user. The reason is a
bit counterintuitive, but has ultimately been very successful.

Node.js wanted to encourage a rich ecosystem of third-party modules. Any module that becomes a
built-in, core module will automatically prevent competition for its features. In addition, the core
module can only be updated on each release of Node.js.

This has a two-fold suppression effect on module authorship. First, for each module that becomes a
core module in the standard library, many third-party modules that perform a similar feature will
never be created. Second, any core modules will have development slowed by the Node.js release
schedule.

This strategy has been a great success. npm modules have grown at an incredible pace, overtaking
all other package managers. In fact, one of the best things about Node.js is having access to a
gigantic number of modules.

## When To Use Node.js
---

Node.js is a great choice for any task or project where one would typically use a dynamic language
like Python, PHP, Perl, or Ruby. Node.js particularly shines when used for:

+ HTTP APIs,
+ distributed systems,
+ command-line tools, and
+ cross-platform desktop applications.

web servers and HTTP APIs built with Node.js generally have much higher performance than other
dynamic languages like Python, PHP, Perl, and Ruby. This is partly because of its non-blocking
nature, and partly because the Node.js V8 JavaScript interpreter is so well optimized.

There are many popular web and API frameworks built with Node.js such as *express*, *hapi*, and
*restify*.

Distributed systems are also very easy to build with Node.js. The core tcp module makes it very easy
to communicate over the network, and useful abstractions like streams allow us to build systems
using composable modules like *dnode*.

### First Node.js API

```
const http = require('http');

const port = 3000 || process.env.PORT;

const server = http.createServer((req,res) => {
  res.end('Hi There')
})

server.listen(port);
console.log(`Server listening on http://localhost:${PORT}`)

```

run this file on terminal using node server.js and server listening on port 3000 and you can open browser and see the output *Hi There*

+ const http = require('http');

This loads the core http module and stores it in our http variable. *require()* is a globally accessible function in nodejs and is always available. 
http is core module, which means that it is 
always availabe to be loaded via require().

+ const port = 3000 || process.env.PORT

Here we choose which port our web server should listen to for requests. We store the port number
in our port variable.

we can access *process* without the require() function bz it is a global object, with information about the currently running process.

The Process object is always available when running nodejs.

```
const server = http.createServer((req,res) => {
  res.end('Hi There')
})
```
we use http.createServer() to create a HTTP server object assign it to the server variable.

http.createServer() accepts single argument: a request listener function.

Our request listener function will be called every time there's an HTTP request to our server.
This function will receive two arguments : *a request object(req)* and *a response object(res)*

The second argument to our request listener function is the response object, res . We use this object
to send data back to the browser. We can both send the string 'hi' and end the connection to the
browser with a single method call: res.end('hi') .

At this point our server object has been created. If a browser request comes in, our request listener
function will run, and we’ll send data back to the browser. The only thing left to do, is to allow our
server object to listen for requests on a particular port:

+ server.listen(port)