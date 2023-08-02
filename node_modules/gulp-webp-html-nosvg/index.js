const Vinyl = require('vinyl')
const PluginError = Vinyl.PluginError
const through = require('through2')
const pluginName = 'gulp-webp-html-nosvg'

module.exports = function () {
	const extensions = ['.jpg', '.png', '.jpeg', '.GIF', '.gif', '.JPG', '.PNG', '.JPEG']
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file)
			return
		}
		if (file.isStream()) {
			cb(new PluginError(pluginName, 'Streaming not supported'))
			return
		}
		try {
			let inPicture = false
			const data = file.contents
				.toString()
				.split('\n')
				.map(function (line) {
					// Вне <picture/>?
					if (line.indexOf('<picture') + 1) inPicture = true
					if (line.indexOf('</picture') + 1) inPicture = false
					// Проверяем есть ли <img/>
					if (line.indexOf('<img') + 1 && !inPicture) {
						// Новый урл с .webp
						const Re = /<img([^>]*)src=\"(\S+)\"([^>]*)>/gi
						let regexpItem,
							regexArr = [],
							imgTagArr = [],
							newUrlArr = [],
							newHTMLArr = []
						while (regexpItem = Re.exec(line)) {
							regexArr.push(regexpItem)
						}
						regexArr.forEach(item => {
							if (item[0].includes('srcset=')) {
								newUrlArr.push(`${item[2]}, ${getSrcUrl(item[0], 'srcset')}`)
							} else {
								newUrlArr.push(item[2])
							}
							imgTagArr.push(item[0])
						})
						// Если в урле есть .gif или .svg, пропускаем
						for (let i = 0; i < newUrlArr.length; i++) {
							if (newUrlArr[i].includes('.svg') || newUrlArr[i].includes('.gif')) {
								newHTMLArr.push(imgTagArr[i])
								continue
							} else {
								for (k of extensions) {
									k = new RegExp(k, 'g')
									newUrlArr[i] = newUrlArr[i].replace(k, '.webp')
								}
								newHTMLArr.push(pictureRender(newUrlArr[i], imgTagArr[i]))
							}
							line = line.replace(imgTagArr[i], newHTMLArr[i])
						}
						return line;
					}
					return line;
				})
				.join('\n')
			function pictureRender(url, imgTag) {
				if (imgTag.indexOf('data-src') > 0) {
					imgTag = imgTag.replace('<img', '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" ');
					return (`<picture><source data-srcset="${url}" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" type="image/webp">${imgTag}</picture>`)
				} else {
					return (`<picture><source srcset="${url}" type="image/webp">${imgTag}</picture>`)
				}
			}
			function getSrcUrl(markup, attr) {
				let srcArr = []
				const rexp = new RegExp(`${attr}=\"(.*?)\"`, 'i')
				markup.split(' ').forEach((item, index, arr) => {
					if (attr && item.includes(attr)) {
						srcArr.push(item)
						srcArr.push(arr[index + 1])
					}
				})
				return srcArr.join(' ').match(rexp)[1]
			}
			file.contents = new Buffer.from(data)
			this.push(file)
		} catch (err) {
			console.log('[ERROR] Убедитесь, что в названии файла картинки нет проблелов и/или кириллицы')
			this.emit('error', new PluginError(pluginName, err))
		}
		cb()
	})
}
