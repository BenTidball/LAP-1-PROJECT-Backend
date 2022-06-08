## Lap1 Project - Backend
Create a community platform to display journal entries from other users - utilising front/backend to store json data - deployed to netlify and herouku

## Project initialisation
To work with project clone the repo and install dependencies with: ``` npm install ``` <br/>
alternatively for development you can also install jest and supertest for testing: ``` npm install jest supertest -D ```

## Usage
To start the server, type either of the following commands into the command line:
```
npm run dev
node start
node index.js
```

API Document
```
GET localhost:port/gif
GET localhost:port/gif/:id

POST localhost:port/post/comment
  // JSON 
  {
    postId: (number), <- Post ID
    topic: (String), <- Topic ID
    comment: (String) <- Comment go under the post
  }
  
POST localhost:port/post/reaction
  // JSON 
  {
    postId: (number), <- Post ID
    replyId: (number), <- Reply ID
    topic: (String), <- Topic ID
    reactionType: (String) <- Reaction ID (reaction1, reaction2, reaction3)
  }

POST localhost:port/post/post
  // JSON 
  {
    postTitle: (String), <- 
    postBody: (String) <- 
  }

GET localhost:port/post/topic/all

GET localhost:port/post/topic/:topic

POST localhost:port/post/vote
  // JSON 
  {
    postId: (number), <- Post ID
    replyId: (number), <- Reply ID
    topic: (String), <- Topic ID
    voteType: (String) <- Vote Type (upvote, downvote)
  }

```

## Technologies
- JavaScript
  - Express
  
## Process

## Licence
MIT licence
