chai = require('chai')
chai.should()

groupCssMediaQueries = require '..'
fs = require 'fs'

describe 'groupCssMediaQueries', ->
	fixturesPath = "#{__dirname}/fixtures"
	allFiles = fs.readdirSync fixturesPath
	inputFiles = allFiles.filter (path) ->
		path.indexOf(".sorted.css") is -1 and path.indexOf(".css") isnt -1

	testInputFile = (inputFilename)->
		it inputFilename, ->
			outputFilename = inputFilename.replace ///\.css$///, '.sorted.css'
			input = fs.readFileSync "#{fixturesPath}/#{inputFilename}", encoding: "utf8"
			output = fs.readFileSync "#{fixturesPath}/#{outputFilename}", encoding: "utf8"
			groupCssMediaQueries(input.trim()).should.eql(output.trim())

	testInputFile inputFilename for inputFilename in inputFiles
