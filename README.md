# gulp-sitemap-generator
auto generate sitemap for development

## Installation

<pre><code>
npm install gulp-sitemap-generator
</code></pre>

## Code Example

*gulpfile.js
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

*your-template.html
```html
&lt;html&gt;
  &lt;head&gt;
    .....
    &lt;title&gt;INDEX&lt;/title&gt;
    &lt;meta name="description" content="Good Contents"&gt;
    &lt;meta name='author' content="cruel32"&gt;
&lt;/head&gt;
&lt;table&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;&lt;span&gt;타이틀&lt;/span&gt;&lt;/th&gt;
            &lt;th&gt;&lt;span&gt;파일경로&lt;/span&gt;&lt;/th&gt;
            &lt;th&gt;&lt;span&gt;파일명&lt;/span&gt;&lt;/th&gt;
            &lt;th&gt;&lt;span&gt;작업자&lt;/span&gt;&lt;/th&gt;
            &lt;th&gt;&lt;span&gt;설명&lt;/span&gt;&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        &lt;% _.each(maps, function(m) { %&gt;
        &lt;tr&gt;
            &lt;td&gt;&lt;span&gt;&lt;%= m.title %&gt;&lt;/span&gt;&lt;/td&gt;
            &lt;td&gt;&lt;span&gt;&lt;%= m.href %&gt;&lt;/span&gt;&lt;/td&gt;
            &lt;td&gt;&lt;a href="&lt;%= m.href %&gt;" target="_blank"&gt;&lt;%= m.name %&gt;&lt;/a&gt;&lt;/td&gt;
            &lt;td&gt;&lt;span&gt;&lt;%= m.author %&gt;&lt;/span&gt;&lt;/td&gt;
            &lt;td&gt;&lt;span&gt;&lt;%= m.description %&gt;&lt;/span&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;% }); %&gt;
    &lt;/tbody&gt;
&lt;/table&gt;
```


## Options

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.


## License
cruel32@nate.com
