[![webp-converter Logo](images/nlogo.gif)](https://www.npmjs.com/package/webp-converter)

[webp-converter v2.2.3](https://www.npmjs.com/package/webp-converter)

A small [node.js](http://nodejs.org) library for converting any image to webp file format or converting webp image to any image file format.


This library uses precompiled executables of WebP for more info visit [WebP](https://developers.google.com/speed/webp)

For converting other image formats to webp, please read this documentation  [cwebp Encoder](https://developers.google.com/speed/webp/docs/cwebp)

For converting webp image to other image format, please read this documentation  [dwebp Encoder](https://developers.google.com/speed/webp/docs/dwebp)

For converting gif image to webp, please read this documentation [gif2webp Converter](https://developers.google.com/speed/webp/docs/gif2webp)

For creating animated webp image using webp images, please read this documentation [webpmux Muxer](https://developers.google.com/speed/webp/docs/webpmux)


## What's New 
* Precompiled executables of WebP(v1.0.3) added


# How to use

# cwebp

## Convert other image format to webp

  ```js

var webp=require('webp-converter');

//pass input image(.jpeg,.pnp .....) path ,output image(give path where to save and image file name with .webp extension)
//pass option(read  documentation for options)

//cwebp(input,output,option,result_callback)

webp.cwebp("input.jpg","output.webp","-q 80",function(status,error)
	{
		 //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
	});


```

# dwebp

## Convert webp image to other image format

  ```js

var webp=require('webp-converter');

//pass input image(.webp image) path ,output image(.jpeg,.pnp .....)

//dwebp(input,output,option,result_callback)

webp.dwebp("input.webp","output.jpg","-o",function(status,error)
	{
		 //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
	});

```

# gif2webp

## Convert gif image to webp

  ```js

var webp=require('webp-converter');

//pass input image(.gif) path ,output image(give path where to save and image file name with .webp extension)
//pass option(read  documentation for options)

//gwebp(input,output,option,result_callback)

webp.gwebp("input.gif","output.webp","-q 80",function(status,error)
	{
		 //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
	});


```

# webpmux

## Add ICC profile,XMP metadata and EXIF metadata

  ```js

var webp=require('webp-converter');

//pass input image(.webp image) path ,output image,option profile,set options(icc image profile,XMP metadata or EXIF metadata) and file.
//for options use keywords as below
//for ICC: icc
//for XMP metadata: xmp
//for EXIF metadata: exif

//webpmux_add(input,output,option_profile,set_option,result_callback)

webp.webpmux_add("input.webp","output.webp","image_profile.icc","icc",function(status,error){

		 //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	

});


```

## Extract ICC profile,XMP metadata and EXIF metadata

  ```js

var webp=require('webp-converter');

//pass input image(.webp image) path ,output format(.icc,.xmp and .exif),get options(icc image profile,XMP metadata or EXIF metadata) and file.
//for options use keywords as below
//for ICC: icc
//for XMP metadata: xmp
//for EXIF metadata: exif

//webpmux_extract(input,output,option,result_callback)

webp.webpmux_extract("input.webp","output.icc","icc",function(status,error){

		 //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	

});


```

## Strip ICC profile,XMP metadata and EXIF metadata

  ```js

var webp=require('webp-converter');

//pass input image(.webp image) path ,output image(without icc),options(icc image profile,XMP metadata or EXIF metadata) and file.
//for options use keywords as below
//for ICC: icc
//for XMP metadata: xmp
//for EXIF metadata: exif

//webpmux_strip(input,output,option,result_callback)

webp.webpmux_strip("input.webp","ouput.webp","icc",function(status,error){

		//if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	

});


```

## Create an animated WebP file from Webp images

  ```js

var webp=require('webp-converter');

//pass input images(.webp image) path with FRAME_OPTIONS, as array,ouput image will be animated .webp image 


/*FRAME_OPTIONS

-file_i +di[+xi+yi[+mi[bi]]]

e.g -frame one.webp +100 -frame two.webp +100+50+50 -frame three.webp +100+50+50+1+b 

Where: file_i is the i'th frame (WebP format), xi,yi specify the image offset for this frame, 
di is the pause duration before next frame, mi is the dispose method for this frame (0 for NONE or 1 for BACKGROUND) and bi is the blending method for this frame (+b for BLEND or -b for NO_BLEND). 
Argument bi can be omitted and will default to +b (BLEND). Also, mi can be omitted if bi is omitted and will default to 0 (NONE). Finally, 
if mi and bi are omitted then xi and yi can be omitted and will default to +0+0.

-loop n

e.g 10

Loop the frames n number of times. 0 indicates the frames should loop forever. Valid range is 0 to 65535 [Default: 0 (infinite)].

-bgcolor A,R,G,B 

e.g 255,255,255,255

Background color of the canvas. Where: A, R, G and B are integers in the range 0 to 255 specifying the Alpha, Red, Green and Blue component values respectively [Default: 255,255,255,255].
*/

//webpmux_animate(input_images_array,output,bgcolor,result_callback)

var input=["./frames/tmp-0.webp +100","./frames/tmp-1.webp +100+50+50","./frames/tmp-2.webp +100+50+50+1+b"];

webp.webpmux_animate(input,"anim_container.webp","10","255,255,255,255",function(status,error)
	{
		 //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
	});


```

## Get a frame from an animated WebP file

  ```js

var webp=require('webp-converter');

//pass input image(.webp image) path ,output image and frame number

//webpmux_getframe(input,ouput,frame number,result_callback)

webp.webpmux_getframe("anim_container.webp","output.webp","2",function(status,error){

		 //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	

});


```

## Installation

```bash
$ npm install webp-converter
```

## License

  [MIT](LICENSE)
