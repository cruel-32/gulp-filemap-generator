# gulp-filemap-generator
* auto generate filemap for development.
* It finds Web page files in the project and collects the path, file name and meta tag.

빌드된 폴더 내에 웹페이지파일(html)을 찾아 경로와 파일명 그리고 메타태그(title,author,description)를 수집합니다. 그리고 템플릿 파일을 기준으로 file-tree 생성합니다. (lodash)

It finds files in the built folder, collects path, file name, and meta tag(title,author,description). And it creates a tree file-tree on the template file. (lodash)

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


### webpage in your dest folder
<pre>
.
└── app
    └── html
        ├── a.html
        ├── b.html
        └── sub1
            ├── c.html
            ├── sub1-1
                 ├── f.html
                 └── g.html
</pre>

### return file-tree
```json
[
    {
        "type" : "folder",
        "folderName" : "app",
        "parentPath" : "" || config.directory,
        "depth" : 1,
        "children" : [
            {
                "type" : "folder",
                "folderName" : "html",
                "parentPath" : "app",
                "depth" : 2,
                "children" : [
                    {
                        "type" : "file",
                        "fileName" : "c.html",
                        "parentPath" : "html",
                        "depth" : 3,
                        "data" : {
                            "title" : "-", //html meta data || config.title,
                            "author" : "-", //html meta data || config.author,
                            "description" : "-", //html meta data || config.description,
                            "href" : "/app/html/c.html"
                        }
                    },
                    {
                        "type" : "folder",
                        "folderName" : "sub1-1",
                        "parentPath" : "html",
                        "depth" : 3,
                        "children" : [
                            ...
                        ]
                    }
                ]
            }
        ]
    }
]


### template example (lodash)
```html
<div class="wrap">
    <h1 class="title">gulp-filemap-generator</h1>
    <% if(maps) {%>
        <h2><i class="far fa-folder"></i> root (build)</h2>
        <div class="map_tree">
            <% _.each(maps,function(map,index){ %>
                <% if(map.type === 'folder'){%>
                    <h2 class="page"><i class="far fa-folder"></i> <%= map.folderName %></h2>
                <% }%>

                <% if(map.children.length){ %>
                    <ul class="file_list">
                    <% _.each(map.children,function(child,idx){ %>
                        <% if(child.type === 'folder') { %>
                            <li>
                                <span><i class="far fa-folder"></i> <%= child.folderName %>/</span>
                                <ul class="file_list">
                                    <% _.each(child.children,function(grandChild,idx){ %>
                                        <% if(grandChild.type === 'folder') { %>
                                            <li>
                                                <span><i class="far fa-folder"></i> <%= child.folderName %>/</span>
                                            </li>
                                        <% } else if(grandChild.type === 'file') { %>
                                            <li>
                                                <div class="file_info">
                                                    <span>
                                                        <i class="far fa-file-code"></i>
                                                        <a href="<%= grandChild.data.href %>" class="txt" target="_blank"><%= grandChild.fileName %></a>
                                                    </span>
                                                    <span>title(<%= grandChild.data.title %>)</span>
                                                    <span>author(<%= grandChild.data.author %>)</span>
                                                    <span>description(<%= grandChild.data.description %>)</span>
                                                </div>
                                            </li>
                                        <% } %>
                                    <% }) %>
                                </ul>
                            </li>
                        <% } else if(child.type === 'file') { %>
                            <li>
                                <div class="file_info">
                                    <span>
                                        <i class="far fa-file-code"></i>
                                        <a href="<%= child.data.href %>" class="txt" target="_blank">/<%= child.fileName %></a>
                                    </span>
                                    <span>title(<%= child.data.title %>)</span>
                                    <span>author(<%= child.data.author %>)</span>
                                    <span>description(<%= child.data.description %>)</span>
                                </div>
                            </li>
                        <% } %>
                    <% }) %>
                    </ul>
                <% } %>
            <% }) %>
        </div>
    <% } %>
</div>  
```


## Options
hrefBaseDir```javascript
    pipe(filemap({
        'listName', 'maps', //file-tree name
        'baseDir':``, //href base directory
        'template':`map.html`, //template file name (lodash)
        'templatePath' : `./`, //template file path
        'title':'-', //default html title
        'author':'-', //default author name
        'description':'-', //default html description
        'stream' : true, //Only the map.html file passes through the stream. (true: All files)
        "hrefBaseDir" : '' //Deletes unwanted characters from the current directory and generates an address.
    }))
```

## License
cruel32@nate.com
