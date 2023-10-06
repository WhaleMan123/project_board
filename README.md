# Directory Structure

```js
/project/
  /lib/
    jwt.js
  /public/
    /imgs/
    /css/
    /js/
  /src/
    /auth/
      auth.middleware.js
    /board/
      board.route.js
      board.controller.js
      board.service.js
      board.repository.js
    /user/
      user.route.js
      user.controller.js
      user.service.js
      user.repository.js
    index.js
  /views/
    /board/
      list.html
      view.html
      write.html
      modify.html
      search.html
    /user/
      user.info.html
      user.modify.html
      user.regist.html
    index.html
    login.html
  pool.js
  server.js
  README.md
  (/node_modules/)
  (package-lock.json)
  (package.json)
  (.gitignore)
```

INSERT INTO freeboards(title, content, writer) values("제목1", "내용1", "작가1");
