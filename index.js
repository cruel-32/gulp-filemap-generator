let Stream = require('stream'),
    path = require('path'),
    gutil = require('gulp-util'),
	_ = require('lodash'),
	consolidate = require('consolidate');

const PLUGIN_NAME = 'gulp-filemap-generator';

function fileMapGenerator(options){
    let config = Object.assign({
        'baseDir':``,
        'template':`map.html`,
        'templatePath' : `./`,
        'title':'-',
        'author':'-',
        'directory':'상위',
        'description':'-',
        'division':false,
        'stream' : true
    },options),
    outputFile,
    stream,
    folders = {
        [config.directory] : 0
    },
    folderNames=[config.directory],
    depthIndex = 1,
    maps = config.division ? [[]] : [];
	stream = Stream.PassThrough({
		objectMode: true
    });
    
    stream._transform = function(file, encoding, cb) {
        let contents = file.contents.toString().replace(/\n/g,' ').replace(/\r/g,' '),
            filepath = file.path,
            cwd = file.cwd,
            relative = path.relative(cwd, filepath),
            dir = relative.replace(`${config.baseDir}`,''),
            head = contents.match(/\<head\>.+\<\/head\>/im),
            name = path.parse(filepath).base,
            title,author,description,folder;

		if (!outputFile) {
			outputFile = new gutil.File({
				base: file.cwd+config.templatePath,
				cwd: file.cwd,
				path: path.join(file.cwd+config.templatePath, config.template),
				contents: file.isBuffer() ? new Buffer(0) : new Stream.PassThrough()
			});
        }

        let getMeta = function(res,text){
            let reg = new RegExp(`\\\<meta\\s+[^\\>]*name\=[\\"\\']${text}[\\"\\'].*?\\>`,'im');
            return res.match(reg);
        }

        let getContent = function(res){
            let reg = new RegExp(`content\=[\"\'](.{0,}?)[\"\']`,'im');
            return res.match(reg);
        }

        let pushDataObject = function(arr){
            arr.push({
                title:title?title[1]:config.title,
                author:author?author[1]:config.author,
                description:description?description[1]:config.description,
                name:name,
                href:dir
            })
        }

        if(head){
            title = head[0].match(/\<title\>(.{0,}?)\<\/title\>/im);
            author = getMeta(head[0],'author');
            if(author){
                author = getContent(author[0]);
            }
            description = getMeta(head[0],'description');
            if(description){
                description = getContent(description[0]);
            }
        }

        if(config.division){
            if(dir.replace(name,'').includes(config.division)){
                let reg = new RegExp(`[\\\\\\\/]${config.division}[\\\\\\\/](.{1,}?)[\\\\\\\/].{0,}${name}`, 'im');
                let match = dir.match(reg);
                if(match){
                    if(match[1] in folders){
                        pushDataObject(maps[folders[match[1]]]);
                    } else {
                        maps.push([]);
                        folderNames.push(match[1]);
                        folders[match[1]]=depthIndex;
                        depthIndex+=1;
                        pushDataObject(maps[folders[match[1]]]);
                    }
                } else {
                    pushDataObject(maps[0])
                }
            }
        } else {
            pushDataObject(maps);
        }
        if(config.stream){
            this.push(file);
        }
        cb();
    };
    
    stream._flush = function(cb) {
		if (maps.length) {
			consolidate['lodash'](path.join(config.templatePath,config.template), {
                maps:maps,
                folderNames:folderNames
            }, function(err, html) {
                if(err){
                    throw new gutil.PluginError(`${err.message} by ${PLUGIN_NAME}`);
                }
                let content = Buffer(html);
                if(outputFile.isBuffer()){
                    outputFile.contents = content;
                } else {
                    outputFile.contents.write(content);
                    outputFile.contents.end();
                }
                stream.push(outputFile);
                cb();
			});
		} else {
			cb();
		}
	};
    return stream;
}
module.exports = fileMapGenerator;