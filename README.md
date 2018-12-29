## Flamingle

Flamingle is a dating app for those of us with severe social anxiety! Don't worry about running out of things to say, or questions to ask, because it comes preloaded with a set of fun, interesting and inspiring conversation starters! All you have to do is login and look to see if anyone is waiting for a date. If they are, hit the 'Join room!' and meet your date! If not, start a room and wait for someone to join! Once you're rolling, scroll through preloaded questions or just type something into the chat!

### **`Contents`**
- [Tech stack](#tech-stack)
- [Links](#links)
- [Navigating repos](#navigating-repos)
- [Screenshots](#screenshots)

### **`Tech stack`**
#### Front End with *React.js* and *Redux*
**Flamingle combines an array of front-end javascript libraries.**

For rendering and displaying content we use React.js.  
State management is handled with Redux, and login/registration forms with Redux-form.  
Client-side updating uses server/data-base frequent polling.  
Routing is handled with *react-router-dom*.  
jQuery is used for forcing synchronous requests to the server - specifically, for logging user activity. 

#### Back End with *Node.js*, *Express.js*, *MongoDB* and *Mongoose*
Flamingle employs Node.js as the server-side runtime environment.  <br/>
Routing and middleware are handled by express.js <br/>
Authentication is done with passport.js middleware, using JWT tokens in the local storage. Password encryption handled with bcrypt salted and hashed.  <br/>
All persistent data is stored and accessed on Mongodb on mlab.com. Mongoose is used for various CRUD operations on the db, and for organizing data with the use of schemas and models. 

### **`LINKS`**
[Flamingle is hosted on heroku](https://flamingle-app.herokuapp.com/)

**Github repos here:** 

front-end: https://github.com/thinkful-ei25/chat-dating-app-mischa

back-end: 
https://github.com/thinkful-ei25/chat-date-server-mischa

### **`Navigating repos`**
**Front-end** 

Root-component: src/chat-components/chat-date.js <br/>
Chat room: src/chat-components/chatArea.js <br/>
Chat room actions in: src/actions/chat-room.js <br/>
Messaging actions in : src/actions/chat.js/ <br/>
Auth components are all in src/auth-components

**Back-end** 

*Routes are defined in in files ending with xxxRouter.js <br/>*

Routing in /server.js express's app.use() 

Registration routes: /auth/authRouter.js <br/>
Login routes: /users/userRouter.js  <br/>
Chatroom routes: /chatroom/chatRoomRouter.js <br/>
Messages routes: /messages/messagesRouter.js  <br/>
 
Data is accessed with models created with Mongoose schemas  <br/>

User model: /users/userModel.js <br/>
Chatroom model: /chatroom/chatRoomModel.js
Messages model: /messages/messagesModel.js

### **`Screenshots`**
<a href="https://ibb.co/4YYMtrs"><img src="https://i.ibb.co/WPPF5JD/1-flamingaling.png" alt="1-flamingale"></a>
<a href="https://ibb.co/zXC0qHb"><img src="https://i.ibb.co/fkZPjGt/flamingle-overlay.png" alt="flamingle-overlay"></a>
<a href="https://ibb.co/k80mLPH"><img src="https://i.ibb.co/3NWRxPr/2-flamingaling.png" alt="2-flamingale"></a>

<a href="https://ibb.co/BBBqLW6"><img src="https://i.ibb.co/ZxxWd4g/3-flamingaling.png" alt="3-flamingale"></a>

<a href="https://ibb.co/kq5CjjC"><img src="https://i.ibb.co/zPQvppv/4-flamingling.png" alt="4-flamingle"></a>

<a href="https://ibb.co/tzcRRGQ"><img src="https://i.ibb.co/W0FCChG/5-flamingling.png" alt="5-flamingle"></a>

