[![Version - 4.0.4](https://img.shields.io/static/v1?label=Version&message=4.0.4&color=2ea44f)](https://github.com/BenTidball/LAP-1-PROJECT-Backend/releases/tag/Release) [![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE) [![GitHub issues](https://img.shields.io/github/issues/BenTidball/LAP-1-PROJECT-Backend)](https://github.com/BenTidball/LAP-1-PROJECT-Backend/issues)

## Lap1 Project - Backend
Create a community platform to display journal entries from other users - utilising front/backend to store json data - deployed to netlify and herouku

## Project initialisation
To work with project clone the repo and install dependencies with: ``` npm install ``` <br/>
alternatively for development you can also install jest and supertest for testing: ``` npm install jest supertest -D ```

## Technologies
- JavaScript
  - Express
  
## Usage
To start the server, type either of the following commands into the command line:
```
npm run dev
node start
node index.js
```

## API Document
### Heroku
Backend is hosted on Heroku: https://portfolio-project-1-backend.herokuapp.com \
And get/post routes are appended to the url as such: 
```
Example url: https://portfolio-project-1-backend.herokuapp.com/get/posts/programming
GET method: https://portfolio-project-1-backend.herokuapp.com/get/posts/<topic>
```
With \<topic\> being interchangeable with supported page forum topics

### local
Backend can also be locally hosted via running the server and replacing the backend url with localhost:5000 or chosen port number:
```
Example url: localhost:<port>/get/posts/programming
GET method: localhost:<port>/get/posts/<topic>
```
With \<topic\> being interchangeable with supported page forum topics \
And \<port\> being interchangeable with desired port number

### Routes 
The possible routes and the requests to be made to them
```
GET localhost:port/gif
GET localhost:port/gif/:id
// JSON 
  {
    id:  <giphy gif id>
  }

POST localhost:port/post/comment
Example: http://localhost:5000/post/comment
  // JSON 
  {
    postId: (number), <- Post ID
    topic: (String), <- Topic ID
    comment: (String) <- Comment go under the post
  }
  
POST localhost:port/post/reaction
Example: http://localhost:5000/post/reaction
  // JSON 
  {
    postId: (number), <- Post ID
    replyId: (number), <- Reply ID
    topic: (String), <- Topic ID
    reactionType: (String) <- Reaction ID (reaction1, reaction2, reaction3)
  }

POST localhost:port/post/post
Example: http://localhost:5000/post/post
  // JSON 
  {
    postTopic: (string), <- Topic ID
    postTitle: (String), <- Post Title
    postBody: (String), <- Post Body
    postGif: (String) (Optional) <- Gif url?
  }

GET localhost:port/post/topic/all
Example: http://localhost:5000/post/topic/all

GET localhost:port/post/topic/:topic
Example: http://localhost:5000/post/topic/cats

GET localhost:port/post/topic/search/:keyword
Example: http://localhost:5000/post/topic/search/cat

POST localhost:port/post/vote
Example: http://localhost:5000/post/vote
  // JSON 
  {
    postId: (number), <- Post ID
    replyId: (number), <- Reply ID
    topic: (String), <- Topic ID
    voteType: (String) <- Vote Type (upvote, downvote)
  }

```

## Licence
MIT licence
