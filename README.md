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
        "parentPath" : "default : option.directory",
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
                            "title" : "option.title (default : - )",
                            "author" : "option.author (default : - )",
                            "description" : "option.description (default : - )",
                            "href" : "/app/html/c.html"
                        }
                    },
                    {
                        "type" : "folder",
                        "folderName" : "sub1-1",
                        "parentPath" : "html",
                        "depth" : 3,
                        "children" : [
                            "..."
                        ]
                    }
                ]
            }
        ]
    }
]
```

### Write a lodash template (example)
``` html
<div class="wrap">
    <h1 class="title">gulp-filemap-generator</h1>
    <h2><i class="far fa-folder"></i> root (build)</h2>
    <div class="map_tree">
        <!--
            maps라는 변수(array)로 파일맵이 반환됩니다. 이것을 기준으로 template을 그려넣으세요.

            The file map is returned by a variable called maps (type:array).
        -->

        <!--
            <% _.each(maps,function(map,index){ %>
            <% }) %>
        -->
    </div>
</div>  
```

### map.html after build (sample)
```html
<div class="wrap">
    <h1 class="title">gulp-filemap-generator</h1>
    <h2><i class="far fa-folder"></i> root 폴더 (build)</h2>
    <div class="map_tree">
        <h2 class="page"><i class="far fa-folder"></i> html</h2>
        <ul class="file_list">
            <li>
                <div class="file_info">
                    <span>
                        <i class="far fa-file-code"></i>
                        <a href="\html\test.html" class="txt" target="_blank">/test.html</a>
                    </span>
                    <span>타이틀(함수형-프로그래밍 기초)</span>
                    <span>작업자(최승희)</span>
                    <span>설명(함수형-프로그래밍)</span>
                </div>
            </li>
            <li>
                <span><i class="far fa-folder"></i> 20180318/</span>
                <ul class="file_list">
                    <li>
                        <div class="file_info">
                            <span>
                                <i class="far fa-file-code"></i>
                                <a href="\html\20180318\functional-programming-1.html" class="txt"
                                    target="_blank">functional-programming-1.html</a>
                            </span>
                            <span>타이틀(함수형-프로그래밍 기초)</span>
                            <span>작업자(최승희)</span>
                            <span>설명(함수형-프로그래밍)</span>
                        </div>
                    </li>
                    <li>
                        <div class="file_info">
                            <span>
                                <i class="far fa-file-code"></i>
                                <a href="\html\20180318\functional-programming-2.html" class="txt"
                                    target="_blank">functional-programming-2.html</a>
                            </span>
                            <span>타이틀(함수형-프로그래밍 기초)</span>
                            <span>작업자(최승희)</span>
                            <span>설명(함수형-프로그래밍)</span>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <span><i class="far fa-folder"></i> 20181017/</span>
                <ul class="file_list">
                    <li>
                        <div class="file_info">
                            <span>
                                <i class="far fa-file-code"></i>
                                <a href="\html\20181017\flex_test.html" class="txt"
                                    target="_blank">flex_test.html</a>
                            </span>
                            <span>타이틀(flex를 익혀봅시다.)</span>
                            <span>작업자(최승희 flex)</span>
                            <span>설명(flex를 익혀봅시다.)</span>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <span><i class="far fa-folder"></i> 20190321/</span>
                <ul class="file_list">
                    <li>
                        <div class="file_info">
                            <span>
                                <i class="far fa-file-code"></i>
                                <a href="\html\20190321\structures&algorithms.html" class="txt"
                                    target="_blank">structures&algorithms.html</a>
                            </span>
                            <span>타이틀(자바스크립트 - 자료구조와 알고리즘)</span>
                            <span>작업자(최승희)</span>
                            <span>설명(자료구조와 알고리즘)</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
```

## Options
```javascript
    {
        'listName', 'maps', //file-tree name
        'baseDir':``, //href base directory
        'template':`map.html`, //template file name (lodash)
        'templatePath' : `./`, //template file path
        'title':'-', //default html title
        'author':'-', //default author name
        'description':'-', //default html description
        'stream' : false, //Only the map.html file passes through the stream. (true: All files)
        "hrefBaseDir" : '' //Deletes unwanted characters from the current directory and generates an address.
    }
```

## License
cruel32@nate.com
