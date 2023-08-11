# Richardson Maturity Model - RESTful API - GeeksforGeeks
Leonard Richardson developed the Richardson Maturity Model to grade APIs based on their adherence to the [REST constraints](https://www.geeksforgeeks.org/rest-api-architectural-constraints/). APIs with a high REST compliance score is considered to perform better.

In determining the maturity of a service, Richardson emphasized three main factors. They include:

*   URI
*   HTTP Methods
*   HATEOAS (Hypermedia)

**URI:** A Uniform Resource Identifier (URI) is a unique sequence of characters used by web technologies to identify resources on the web.

[**HTTP METHODS**](https://www.geeksforgeeks.org/html-form-method-attribute/)**:** Hypertext Transfer Protocol (HTTP) is a protocol used to transfer hypermedia documents. HTTP requests are sent to servers by HTTP clients in the form of request messages. HTTP defines a set of request methods to specify the action to be taken on a given resource.

*   **GET:** The GET method retrieves a representation of the specified resource.
*   **POST:** A POST request transmits data to the server.
*   **PUT:** The PUT method replaces all existing representations of the resource.
*   **PATCH:** A PATCH request makes partial changes to a resource.
*   **DELETE:** The DELETE method removes the specified resource.

HATEOAS (Hypermedia as the Engine of Application State ) refers to discoverability. The client can interact with a REST API solely through the server’s responses. It is a self-documentary Hypermedia. Clients need not refer to any documentation to interact with a new API.

**REST services are divided into maturity levels according to the Richardson Maturity Model.**

*   Level 0
*   Level 1
*   Level 2
*   Level 3

**LEVEL 0: POX swamp**

Level 0 is also often referred to as POX (Plain Old XML). At level 0, HTTP is used only as a transport protocol. For zero maturity level services, we use a single URL and a single HTTP method. We send a request to the same URI for obtaining and posting the data. Only the POST method can be used. for example, A particular company can have a lot of customers or users. We have only one endpoint for all the customers. All operations are performed via the POST method.  

*   To get the data: POST http://localhost:8080/users
*   To post the data: POST http://localhost:8080/users

**LEVEL 1: Multiple URI based resource and single verb**

In level 1 , each resource is mapped to a specific URI. However, only one HTTP method (POST) is used for retrieving and creating data. for example, we need to access the employees working in a company.

*   To add an employee to a particular department:  
    POST/department/<department-id>/employee
*   To access a specific employee :  
    POST/department/<department-id>/employee/<employee-id>

**LEVEL 2: Multiple URI based resource and HTTP verbs**

At Level 2 requests are sent with the correct HTTP verb. A correct HTTP response code is returned for each request.

For example: To get the users of the company, we send a request with the URI  
http://localhost:8080/users and the server sends proper response 200 OK.

**LEVEL 3: HATEOS**

Level 3 is the highest. It combines level 2 and HATEOS. It is helpful in self-documentation. HATEOS guides where new resources can be found. Imagine a Chinese restaurant as an analogy. You ordered noodles, the waiter brings you the desired dish, explains what you just ordered and where you can find the other available dishes. Thus, we can consider the desired dish to be JSON data, while the rest dishes are hypermedia.

We consider an API to be RESTful when it reaches level 4. The other levels are only stepping stones to becoming one. Let’s make a RESTFUL API following Richardson’s Maturity Model 

**Approach:** We will create a RESTFUL API called gfg-wiki. We will insert articles and send HTTP requests. In this process, we will fetch, modify and delete articles. Robo3T will be used for the database. Postman will be used to send requests.  

In order to create a RESTFUL API in **node.js**, install :

**node:** A javaScript runtime environment

*   Download link: https://nodejs.org/en/download/

**Robo3t:** A MongoDB GUI. we will create a database using robo3t.

*   Download link:  https://robomongo.org/

**Postman:** An API development and testing platform.

*   Download link: https://www.postman.com/

**Visual Studio Code or (any code editor)**

*   Download link: https://code.visualstudio.com/download

**JSON** viewer pro Chrome extension

*   Download link:  https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdg

**Step 1:**  Create a new directory, go to the terminal, and initialize NPM by running the following command .

```
npm init -y
```


![](https://media.geeksforgeeks.org/wp-content/uploads/20211228220922/npminitgfg.png)

**Initialize npm** 

**Step 2:** Install body-parser, mongoose, express 

*   **body-parser:** A middleware responsible for parsing the incoming request body before it can be handled.
*   **express:**  node.js framework
*   **mongoose**: Mongoose connects MongoDB to the Express web application

```
npm i body-parser mongoose express 
```


![](https://media.geeksforgeeks.org/wp-content/uploads/20211205155738/packgfg-660x204.png)

**Install packages** 

**Step 3:** Create an **app.js file** in the current directory and set up the server.  We will import the packages into our project and configure our server. 

app.js
------

`const express = require(``"express"``);`

`const bodyParser = require(``"body-parser"``);`

`const mongoose = require(``'mongoose'``);`

`const app = express();`

`app.use(bodyParser.urlencoded({`

    `extended:` `true`

`}));`

`app.use(express.static(``"public"``));`

`app.listen(3000,` `function``() {`

    `console.log(``"Server started on port 3000"``);`

`});`

**Step 4:** Creating a database on Robo3T. Consider a database of articles with a title and content.  

> {  
> “title” : “gfg”,  
> “content” : “GeeksforGeeks is a computer science portal for geeks. ”  
> }  
> {  
> “title” : “REST”,  
> “content” : “REST stands for REpresentational State Transfer. ”  
> {  
> “title” : “API”,  
> “content” : “Application Programming Interface”  
> }  
> {  
> “title” : “richardson-model”,  
> “content” : ” Grades APIs based on their adherence to REST constraints”  
> }  
> {  
> “title” : “Http”,  
> “content” : “Hypertext Transfer Protocol (HTTP) is a protocol used  
> to transfer hypermedia documents. ”  
> }

*   Go to Robo3t and create a new connection.
*   Create a database named **gfg-wiki** by clicking on the new connection button .
*   A database ‘gfg-wiki’ will be created. Now click on it and create a new collection called ‘**articles**‘
*   To insert documents, click on articles and select insert document.
*   Copy each document from above and insert it one by one.
*   To view all the documents, click on articles.

As you can see, the database looks like this: 

![](https://media.geeksforgeeks.org/wp-content/uploads/20220222235325/Screenshot223-300x233.png)

**database of articles** 

**The following shows how to create a database and insert documents.** 

![](https://media.geeksforgeeks.org/wp-content/uploads/20220222155943/vid1.gif)

**Creating database in Robo3T**

**Step 5:** Set up MongoDB and write the schema for our articles to create models. To set up MongoDB, we will use mongoose. We will connect our application to the MongoDB location and add the database name to the URL string. By default, MongoDB uses port 27017.

```
mongoose.connect("mongodb://localhost:27017/gfg-wiki", {useNewUrlParser: true});
```


Schema defines the structure of our collection. We will create a schema named articleSchema consisting of two fields – title and content of the article

```
const articleSchema = {
  title: String,
  content: String
};
```


Now we will create a model from the articleSchema 

```
const Article = mongoose.model("Article", articleSchema);
```


Add the following code to your existing code in the app.js file. 

app.js
------

`const express = require(``"express"``);`

`const bodyParser = require(``"body-parser"``);`

`const mongoose = require(``'mongoose'``);`

`const app = express();`

`app.use(bodyParser.urlencoded({`

    `extended:` `true`

`}));`

`app.use(express.static(``"public"``));`

    `{ useNewUrlParser:` `true` `});`

`const articleSchema = {`

    `title: String,`

    `content: String`

`};`

`const Article = mongoose.model(``"Article"``, articleSchema);`

`app.listen(3000,` `function``() {`

    `console.log(``"Server started on port 3000"``);`

`});`

**Step 6:** Accessing all the articles using the GET method. We can fetch all the articles by sending a get request by specifying the route of the resource and a callback function that handles the request. 

```
app.get(route, (req,res)=>{
})
```


To retrieve all the articles, we have to find the articles and read them from the database. 

```
<ModelName>.find({conditions},function(err,results){
//using the result 
});
```


Add the following code to your existing app.js file. 

app.js
------

`app.get(``"/articles"``, (req, res) => {`

    `Article.find((err, foundArticles) => {`

        `if` `(!err) {`

            `res.send(foundArticles)`

        `}` `else` `{`

            `res.send(err);`

        `}`

    `})`

`})`

Start your application by running the following command 

```
node app.js
```


**Output:** We can access the articles at localhost:3000/articles. 

![](https://media.geeksforgeeks.org/wp-content/uploads/20220222160915/vid2FullHD1080p.gif)

**Retrieving all the articles** 

**Step 7:** Create a new article using the POST method. We will create a new article that will be added to the database. Here, the client sends data to the server.

We don’t have a front-end yet, but we do have a server that has access to our database. We will test our API using Postman, rather than creating a form or a front end. Our goal is to send a post request to our server.

We will use the post method: 

```
app.post(route,(req,res)=>{
    ...
})
```


Once the client sends the post request we need to grab that data by req.body. 

Head over to postman and send a post request to localhost:3000/articles. Under the body tab, change the encoding to form-url coding, and add the title and content in key, along with the value that represents the data that we want to send along with the request. 


|Key    |Value                                                             |
|-------|------------------------------------------------------------------|
|title  |http verbs                                                        |
|content|The most common HTTP verbs are POST, GET, PUT, PATCH, and DELETE. |


We need to save this article in our database.

```
const <constantName>=new <ModelName>({
<fieldName>:<fielddata>,..
}); 
```


Add the following code to the previous code in the app.js file 

app.js
------

`app.post(``"/articles"``, (req, res) => {`

    `const newArticle =` `new` `Article({`

        `title: req.body.title,`

        `content: req.body.content`

    `});`

    `newArticle.save(``function``(err) {`

        `if` `(!err) {`

            `res.send(``"Successfully added a new article."``);`

        `}` `else` `{`

            `res.send(err);`

        `}`

    `});`

`})`

Restart your server and send a post request using postman. 

**Output:** Go to Robo3T and refresh your collection to view the added article. Now we have an extra entry. 

![](https://media.geeksforgeeks.org/wp-content/uploads/20220222162724/vid3FullHD1080p.gif)

**Sending a post request to add a new article** 

**Step 8:** Fetching a specific article.

We will read a specific article from our database using the findOne method.

```
 <ModelName>.findone({conditions},(req,res)=>{
 });
```


here, we will fetch the article with a title REST 

Add the following code to your app.js file. 

app.js
------

`app.get(``"/articles/:articleTitle"``,` `function``(req, res) {`

    `Article.findOne({ title: req.params.articleTitle },` 

        `function``(err, foundArticle) {`

        `if` `(foundArticle) {`

            `res.send(foundArticle);`

        `}` `else` `{`

            `res.send(``"No articles matching that title was found."``);`

        `}`

    `});`

`})`

**Output**:   We will specify the article title in the URL and the article whose title matches that will be displayed. 

![](https://media.geeksforgeeks.org/wp-content/uploads/20220222232245/getspecificarticleFullHD108.gif)

**Fetching a specific article** 

**Step 9**: Overwriting an article with the PUT method. 

We want to submit a new version of an article. To replace an existing article, we will send a put request. 

```
app.put(route ,(req,res)=>{
    ...
});
```


We will update the article using the Mongoose update method.

The overwrite specifies that we want to replace the entire article.  

```
<ModelName>.update(
    {conditions},
    {updates},
    {overwrite:true}
    (err,results)=>{
})
```


Add the following code to your app.js file 

app.js
------

`app.put(``"/articles/:articleTitle"``, (req, res) => {`

    `Article.updateOne({ title: req.params.articleTitle },` 

        `{ title: req.body.title, content: req.body.content },`

        `{ overwrite:` `true` `},`

        `function``(err) {`

            `if` `(!err) {`

                `res.send(``"Successfully updated the selected article."``);`

            `}`

        `}`

    `);`

`})`

In this case, we will change our title from API to Postman, and its content from Application Programming Interface to Postman is an API platform.

```
title: Postman
content: Postman is an API platform 
```


by sending a put request to the route localhost:3000/articles/API 

If the server finds a parameter with a title of API, it will replace the title with a new title and the content with a new one.

![](https://media.geeksforgeeks.org/wp-content/uploads/20220222232609/putFullHD1080p.gif)

**Overwriting an article** 

**Step 9:**  Updating an article using the PATCH method. 

We will update an existing article by sending a Patch request with the title of the article we wish to update. To update the article, we must give the fields we want to change in the body tab.

Now that we are changing only one field of an article rather than the entire article, the overwrite method is not needed when we call the update method to update our database. To update the article, we must give the fields we want to change in the body tab. 

Add the following code in your app.js file to modify the article. 

app.js
------

`app.patch(``"/articles/:articleTitle"``,` `function``(req, res) {`

    `Article.update({ title: req.params.articleTitle },` 

        `{ $set: req.body },`

        `function``(err) {`

            `if` `(!err) {`

                `res.send(``"Successfully updated article."``);`

            `}` `else` `{`

                `res.send(err);`

            `}`

        `}`

    `);`

`})`

**Output**: It Updates only the fields that we provide. The title of the article REST is updated to Restful. 

![](https://media.geeksforgeeks.org/wp-content/uploads/20220222232908/patchFullHD1080p.gif)

**Updating an article** 

**Step 10:** Deleting all the articles using the DELETE method. 

To delete all the articles from our database we will use deleteMany mongoose method and send a delete request from the postman. 

Add the following code to your app.js file 

app.js
------

`app.``delete``(``"/articles"``,` `function``(req, res) {`

    `Article.deleteMany(``function``(err) {`

        `if` `(!err) {`

            `res.send(``"Successfully deleted all articles."``);`

        `}` `else` `{`

            `res.send(err);`

        `}`

    `});`

`});`

**Output:**  We will send a delete request to localhost:3000/articles to remove all our articles. Visit Robo3T and refresh your collection. If we send a delete request from our postman, we will not observe any articles. 

![](https://media.geeksforgeeks.org/wp-content/uploads/20220222234321/deleteFullHD1080p.gif)

**Deleting all the articles .** 

**The final app.js file:** 

app.js
------

`const express = require(``"express"``);`

`const bodyParser = require(``"body-parser"``);`

`const mongoose = require(``'mongoose'``);`

`const app = express();`

`app.use(bodyParser.urlencoded({`

    `extended:` `true`

`}));`

`app.use(express.static(``"public"``));`

    `{ useNewUrlParser:` `true` `});`

`const articleSchema = {`

    `title: String,`

    `content: String`

`};`

`const Article = mongoose.model(``"Article"``, articleSchema);`

`app.get(``"/articles"``, (req, res) => {`

    `Article.find((err, foundArticles) => {`

        `if` `(!err) {`

            `res.send(foundArticles)`

        `}` `else` `{`

            `res.send(err);`

        `}`

    `})`

`})`

`app.post(``"/articles"``, (req, res) => {`

    `const newArticle =` `new` `Article({`

        `title: req.body.title,`

        `content: req.body.content`

    `});`

    `newArticle.save(``function``(err) {`

        `if` `(!err) {`

            `res.send(``"Successfully added a new article."``);`

        `}` `else` `{`

            `res.send(err);`

        `}`

    `});`

`})`

`app.get(``"/articles/:articleTitle"``,` `function``(req, res) {`

    `Article.findOne({ title: req.params.articleTitle },`

        `function``(err, foundArticle) {`

        `if` `(foundArticle) {`

            `res.send(foundArticle);`

        `}` `else` `{`

            `res.send(``"No articles matching that title was found."``);`

        `}`

    `});`

`})`

`app.put(``"/articles/:articleTitle"``,` `function``(req, res) {`

    `Article.update({ title: req.params.articleTitle },` 

        `{ title: req.body.title, content: req.body.content },`

        `{ overwrite:` `true` `},`

        `function``(err) {`

            `if` `(!err) {`

                `res.send(``"Successfully updated the selected article."``);`

            `}`

        `}`

    `);`

`})`

`app.patch(``"/articles/:articleTitle"``,` `function``(req, res) {`

    `Article.update({ title: req.params.articleTitle },` 

        `{ $set: req.body },`

        `function``(err) {`

            `if` `(!err) {`

                `res.send(``"Successfully updated article."``);`

            `}` `else` `{`

                `res.send(err);`

            `}`

        `}`

    `);`

`})`

`app.``delete``(``"/articles"``,` `function``(req, res) {`

    `Article.deleteMany(``function``(err) {`

        `if` `(!err) {`

            `res.send(``"Successfully deleted all articles."``);`

        `}` `else` `{`

            `res.send(err);`

        `}`

    `});`

`});`

`app.listen(3000,` `function``() {`

    `console.log(``"Server started on port 3000"``);`

`});`
