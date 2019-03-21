# gulp-filemap-generator
* auto generate filemap for development.
* It finds Web page files in the project and collects the path, file name and meta tag.

빌드된 폴더 내에 웹페이지파일(html)을 찾아 경로와 파일명 그리고 메타태그(title,author,description)를 수집합니다. 그리고 템플릿 파일을 기준으로 href 링크를 생성해줍니다.

It finds files in the built folder, collects path, file name, and meta tag(title,author,description). And it creates a link based on the template file.

(html 파일명을 한글로 작성하지 마세요!)

(Do not write the file name in Korean.)

## Installation

<pre><code>npm install gulp-filemap-generator --dev</code></pre>

## Code Example

### gulpfile.js
```javascript
const filemap = require('gulp-filemap-generator');

gulp.task('filemap', () => {
    return gulp.src([`/dest/**/*.html`])
        .pipe(filemap({
            'template':`map.html`, //*required : filemap template
            'templatePath' : `./source`, //*required : template file path
        }))
        .pipe(gulp.dest(`/dest`))
});
```

### ./source/map.html
```html
<h2><%= folderNames[0] %> directory</h1>
<table>
    <thead>
        <tr>
            <th><span>title</span></th>
            <th><span>directory</span></th>
            <th><span>filename</span></th>
            <th><span>author</span></th>
            <th><span>description</span></th>
        </tr>
    </thead>
    <tbody>
        <% _.each(maps, function(m) { %>
        <tr>
            <td><span><%= m.title %></span></td>
            <td><span><%= m.href %></span></td>
            <td><a href="<%= m.href %>" target="_blank"><%= m.name %></a></td>
            <td><span><%= m.author %></span></td>
            <td><span><%= m.description %></span></td>
        </tr>
        <% }); %>
    </tbody>
</table>
```

### webpage in your project
<pre>
.
└── app
    └── html
        ├── a.html
        ├── b.html
        └── sub1
            ├── c.html
            ├── d.html
            ├── e.html
            ├── sub1-1
            │    ├── f.html
            │    └── g.html
            ├── sub1-1
                 ├── h.html
                 └── i.html
</pre>

### map.html after build

| title         | directory                    | filename | author            | description            |
| ------------- | ---------------------------- | -------- | ----------------- | ---------------------- |
| a-title       | /app/html/a.html             | a.html   | author (meta tag) | description (mata tag) |
| b-title       | /app/html/b.html             | b.html   | author (meta tag) | description (mata tag) |
| c-title       | /app/html/sub1/c.html        | c.html   | author (meta tag) | description (mata tag) |
| d-title       | /app/html/sub1/d.html        | d.html   | author (meta tag) | description (mata tag) |
| e-title       | /app/html/sub1/e.html        | e.html   | author (meta tag) | description (mata tag) |
| f-title       | /app/html/sub1/sub1-1/f.html | f.tml    | author (meta tag) | description (mata tag) |
| g-title       | /app/html/sub1/sub1-1/g.html | g.tml    | author (meta tag) | description (mata tag) |
| h-title       | /app/html/sub1/sub1-2/h.html | h.html   | author (meta tag) | description (mata tag) |
| i-title       | /app/html/sub1/sub1-2/i.html | i.html   | author (meta tag) | description (mata tag) |


## Options
```javascript
    pipe(filemap({
        'baseDir':``, //href base directory
        'template':`map.html`, //template file name (handlebars)
        'templatePath' : `./`, //template file path
        'title':'-', //default html title
        'author':'-', //default author name
        'directory':'상위', //root directory name
        'description':'-', //default html description
        'stream' : true

        dest : 'destFolder',
        app : 'appFolder',
        name : 'map.html',
        noDir : 'etc',
        untitle : '-', //When the title can not be found in the meta information
        unknown : '-', //When the author can not be found in the meta information
        noDescription : '-', //When the description can not be found in the meta information
        division : 'html', //Subfolders for app options.
                          //Template modifications are required. I'll explain it further below.
        stream : false //Only the map.html file passes through the stream. (true: All files)
    }))
```

### Options - division
It can be multi-expressible on the basis of this

#### set options
```javascript
    division : 'html'
```

#### map.html
```html
    <div>
    <h1>gulp-filemap-generator</h1>
    <% _.each(maps, function(map,idx) { %>
    <h2><%= folderNames[idx] %></h1>
    <table class="table">
        <thead>
            <tr>
                <th><span>title</span></th>
                <th><span>directory</span></th>
                <th><span>filename</span></th>
                <th><span>author</span></th>
                <th><span>description</span></th>
            </tr>
        </thead>
        <tbody>
            <% _.each(map, function(m) { %>
            <tr>
                <td><span><%= m.title %></span></td>
                <td><span><%= m.href %></span></td>
                <td><a href="<%= m.href %>" target="_blank"><%= m.name %></a></td>
                <td><span><%= m.author %></span></td>
                <td><span><%= m.description %></span></td>
            </tr>
            <% }); %>
        </tbody>
    </table>
    <% }); %>
</div>    
```
#### webpage in your project
<pre>
.
└── app
    └── html
        └── sub1
            ├── a.html
            └── b.html
        └── sub2
            ├── c.html
            └── d.html
        └── sub3
            ├── e.html
            └── sub3-1
                 └── f.html
        └── sub4
            ├── g.html
            └── h.html
</pre>

#### map.html after build

sub1

| title         | directory                    | filename | author            | description            |
| ------------- | ---------------------------- | -------- | ----------------- | ---------------------- |
| a-title       | /app/html/sub1/a.html        | a.html   | author (meta tag) | description (mata tag) |
| b-title       | /app/html/sub1/b.html        | b.html   | author (meta tag) | description (mata tag) |

sub2

| title         | directory                    | filename | author            | description            |
| ------------- | ---------------------------- | -------- | ----------------- | ---------------------- |
| c-title       | /app/html/sub2/c.html        | c.html   | author (meta tag) | description (mata tag) |
| d-title       | /app/html/sub2/d.html        | d.html   | author (meta tag) | description (mata tag) |

sub3

| title         | directory                    | filename | author            | description            |
| ------------- | ---------------------------- | -------- | ----------------- | ---------------------- |
| e-title       | /app/html/sub3/e.html        | e.html   | author (meta tag) | description (mata tag) |
| f-title       | /app/html/sub3/sub3-1/f.html | f.html   | author (meta tag) | description (mata tag) |

sub4

| title         | directory                    | filename | author            | description            |
| ------------- | ---------------------------- | -------- | ----------------- | ---------------------- |
| g-title       | /app/html/sub4/g.html        | g.html   | author (meta tag) | description (mata tag) |
| h-title       | /app/html/sub4/h.html        | h.html   | author (meta tag) | description (mata tag) |


## License
cruel32@nate.com
