# take gorgeous visionmedia's css utilities
parseCss = require 'css-parse'
stringifyCss = require 'css-stringify'

module.exports = (css) ->
	# parse it
	parsed = parseCss css

	# extract and group medias and root rules
	medias = {}
	rootRules = []
	for rule in parsed.stylesheet.rules
		if rule.type is 'media'
			medias[rule.media] = [] if not medias[rule.media]
			medias[rule.media] = medias[rule.media].concat rule.rules
		else
			rootRules.push rule

	# generate media rules
	mediaRules = []
	for media, rules of medias
		rule =
			type: "media"
			media: media
			rules: rules
		# extract min-width and max-width values
		if media.indexOf("min-width") isnt -1
			m = media.match ///min-width:\s*(\d+)(px|em)?///
			rule.minWidth = parseInt m[1] if m && m[1]
			rule.unit = m[2] if m[2]
		if media.indexOf("max-width") isnt -1
			m = media.match ///max-width:\s*(\d+)(px|em)?///
			rule.maxWidth = parseInt m[1] if m && m[1]
			rule.unit = m[2] if m[2]
		mediaRules.push rule

	# break rules into only-min, only-max, intervals and others
	onlyMinRules = mediaRules.filter (rule) ->
		rule.minWidth? and not rule.maxWidth?
	onlyMaxRules = mediaRules.filter (rule) ->
		rule.maxWidth? and not rule.minWidth?
	intervalRules = mediaRules.filter (rule) ->
		rule.minWidth? and rule.maxWidth?
	otherRules = mediaRules.filter (rule) ->
		rule not in onlyMinRules.concat(onlyMaxRules).concat(intervalRules)

	emToPxRatio = 16 # 1em = 16px

	# sort media rules
	onlyMinRules.sort (a, b) ->
		aPxValue = a.minWidth
		bPxValue = b.minWidth
		aPxValue *= emToPxRatio if a.unit is 'em'
		bPxValue *= emToPxRatio if b.unit is 'em'
		aPxValue - bPxValue # ascending
	onlyMaxRules.sort (a, b) ->
		aPxValue = a.maxWidth
		bPxValue = b.maxWidth
		aPxValue *= emToPxRatio if a.unit is 'em'
		bPxValue *= emToPxRatio if b.unit is 'em'
		bPxValue - aPxValue # descending

	# modify parsed AST
	parsed.stylesheet.rules = rootRules
		.concat(onlyMinRules)
		.concat(onlyMaxRules)
		.concat(intervalRules)
		.concat(otherRules)

	# output
	stringifyCss parsed
