const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
// 部署任务
gulp.task('print', function() {
    return new Promise((resolve, reject) => {
        console.log('1');
        resolve();
    })
});
// gulp.src()    源
// gulp.pipe()   管道(通道)
// gulp.dest()   目的地
gulp.task('copy', function() {
    return gulp.src('./README.md')
        .pipe(gulp.dest('./src/html'));
});

gulp.task('copyjs', function() {
    // 使用数组进行传参，可以过滤不需要的文件
    return gulp.src(['./src/js/*.js', '!src/js/*.min.js'])
        .pipe(gulp.dest('./dist/js'));
});

// 使用rename第三方模块进行重命名
gulp.task('rename', function() {
    return gulp.src('./do.md')
        .pipe(rename('do.min.md'))
        .pipe(gulp.dest('./src/html'));
});

// 使用htmlmin进行html文件压缩
// $ cnpm i gulp-htmlmin -D
gulp.task('htmlmin', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./src/html'));
});

// 使用cssmin进行css文件压缩
// $ cnpm i gulp-cssmin -D
gulp.task('cssmin', function() {
    return gulp.src('./*.css')
        .pipe(cssmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./src/css'));
});

// 3. 压缩js
// gulp-uglify
// $ cnpm i gulp-uglify -D
gulp.task('jsmin', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

// 4. 图片压缩
// gulp-imagemin
// $ cnpm i gulp-imagemin -D
gulp.task('imagemin', function() {
    return gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

// 5. 合并文件
// gulp-concat
// $ cnpm i gulp-concat -D
// 减少HTTP请求次数(前端优化手段)
gulp.task('concatjs', function() {
    return gulp.src(['./src/js/jquery.js', './src/js/index.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./src/js'));
});

// 6. 精灵图
// gulp.spritesmith
// $ cnpm i gulp.spritesmith -D
gulp.task('sprite', function() {
    return gulp.src('./src/img/*')
        .pipe(sprite({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest('./src/css'));
});

// 7. less编译
// gulp-less
// $ cnpm i gulp-less -D
gulp.task('less', function() {
    return gulp.src('./src/styles/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./src/css'));
});

// 8. 文件监听
gulp.task('watchless', function() {
    // 监听less文件 如果文件发生改变
    // 自动执行less任务
    gulp.watch('./src/styles/*.less', gulp.series('less'));
});

// 9. 自动构建
gulp.task('dev', function() {
    gulp.watch(['./src/styles/*.less', './src/html/*.html', './src/js/*.js'], gulp.series('htmlmin', 'concatjs', 'less', 'cssmin', 'jsmin'));
});