# gulp-sitemap-generator
auto generate sitemap for development

## Installation

<pre><code>
npm install gulp-sitemap-generator
</code></pre>

## Code Example

### gulpfile.js
```javascript
gulp.task('html', () => {
    return gulp.src([`/app/**/*.html`])
        .pipe(sitemap({
          'dest': 'dest', //*Required Options
          'app': 'app' //*Required Options
        }))
        .pipe(gulp.dest(`/dest/map`))
});
```

### your-template.html
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

### html in your project

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


### after build

folder directory 
| title | directory | filename | author | description |
| ----- |:---------:|:--------:|:------:|:-----------:|
| a-title | /app/html/a.html | a.tml | author (meta tag) | description (mata tag) |
| b-title | /app/html/b.html | b.tml | author (meta tag) | description (mata tag) |
| c-title | /app/html/sub1/c.html | c.tml | author (meta tag) | description (mata tag) |
| d-title | /app/html/sub1/d.html | d.tml | author (meta tag) | description (mata tag) |
| e-title | /app/html/sub1/e.html | e.tml | author (meta tag) | description (mata tag) |
| f-title | /app/html/sub1/sub1-1/f.html | f.tml | author (meta tag) | description (mata tag) |
| g-title | /app/html/sub1/sub1-1/g.html | g.tml | author (meta tag) | description (mata tag) |
| h-title | /app/sub1/sub1-2/h.html | h.tml | author (meta tag) | description (mata tag) |
| i-title | /app/html/sub1/sub1-2/i.html | i.tml | author (meta tag) | description (mata tag) |


## Options
```javascript
    pipe(sitemap({
        dest : 'destFolder',
        app : 'appFolder',
        name : 'map.html',
        noDir : 'etc',
        untitle : '-', //When the title can not be found in the meta information
        unknown : '-', //When the author can not be found in the meta information
        noDescription : '-' //When the description can not be found in the meta information
        division : 'html' //Subfolders for app options.
                          //Template modifications are required. I'll explain it further below.
    }))
```

### Options - division
It can be multi-expressible on the basis of this

#### set options
```javascript
    division : 'html'
```
#### your-template.html
```html
<div>
    <h1>gulp-sitemap-generator</h1>
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

#### your-template.html
```html
    <div>
    <h1>gulp-sitemap-generator</h1>
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
#### html in your project
|-- /app
    |-- html
        |-- sub1
            |-- a.html
            |-- b.html
        |-- sub2
            |-- c.html
            |-- d.html
        |-- sub3
            |-- e.html
            |-- sub3-1
                |-- f.html
        |-- sub4
            |-- g.html
            |-- h.html

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
                       

#### after build

sub1
|title | directory | filename | author | description |
|----- | --------- | -------- | ------ | ----------- |
|title | /app/html/sub1/a.html | a.tml | author (meta tag) | description (mata tag) |
|title | /app/html/sub1/b.html | b.tml | author (meta tag) | description (mata tag) |

sub2
|title | directory | filename | author | description |
|----- | --------- | -------- | ------ | ----------- |
|title | /app/html/sub2/a.html | c.tml | author (meta tag) | description (mata tag) |
|title | /app/html/sub2/b.html | d.tml | author (meta tag) | description (mata tag) |

sub3
|title | directory | filename | author | description |
|----- | --------- | -------- | ------ | ----------- |
|title | /app/html/sub3/e.html | e.tml | author (meta tag) | description (mata tag) |
|title | /app/html/sub3/sub3-1/f.html | f.tml | author (meta tag) | description (mata tag) |

sub4
|title | directory | filename | author | description |
|----- | --------- | -------- | ------ | ----------- |
|title | /app/html/sub4/e.html | g.tml | author (meta tag) | description (mata tag) |
|title | /app/html/sub4/sub3-1/f.html | h.tml | author (meta tag) | description (mata tag) |



## License
cruel32@nate.com
