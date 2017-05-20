# gulp-sitemap-generator
auto generate sitemap for development

## Installation

<pre><code>
npm install gulp-sitemap-generator
</code></pre>

## Code Example

*gulpfile.js
<pre><code>
gulp.task('html', () => {
    return gulp.src([`/app/**/*.html`])
        .pipe(sitemap({
          'dest': 'dest', //*Required Options
          'app': 'app' //*Required Options
        }))
        .pipe(gulp.dest(`/dest/map`))
});
</code></pre>

*your-template.html
<pre><code>
<!doctype html>
<html>
  <head>
    .....
    <title>INDEX</title>
    <meta name="description" content="Good Contents">
    <meta name='author' content="cruel32">
</head>
<table class="table">
    <thead>
        <tr class="tr">
            <th class="th"><span class="txt">타이틀</span></th>
            <th class="th"><span class="txt">파일경로</span></th>
            <th class="th"><span class="txt">파일명</span></th>
            <th class="th"><span class="txt">작업자</span></th>
            <th class="th"><span class="txt">설명</span></th>
        </tr>
    </thead>
    <tbody>
        <% _.each(maps, function(m) { %>
        <tr class="tr">
            <td class="td"><span class="txt"><%= m.title %></span></td>
            <td class="td"><span class="txt left"><%= m.href %></span></td>
            <td class="td"><a href="<%= m.href %>" class="txt" target="_blank"><%= m.name %></a></td>
            <td class="td"><span class="txt"><%= m.author %></span></td>
            <td class="td"><span class="txt left"><%= m.description %></span></td>
        </tr>
        <% }); %>
    </tbody>
</table>
</code></pre>



## Options

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.


## License
cruel32@nate.com
