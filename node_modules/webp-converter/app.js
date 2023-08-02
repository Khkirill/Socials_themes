
//get module
var webp=require('./webpconverter_test.js');

/******************************************************* cwebp *****************************************************/

//pass input_image(.jpeg,.pnp .....) path ,output_image(give path where to save and image file name with .webp file type extension)
webp.cwebp("nodejs_logo.jpg","nodejs_logo.webp","-q 80",function(status,error)
	{
		//if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
	});

/******************************************************* dwebp *****************************************************/

//pass input_image(.webp image) path ,output_image(.jpeg,.pnp .....)
/*webp.dwebp("nodejs_logo.webp","nodejs_logo.jpg","-o",function(status,error)
	{
		//if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
	});*/

/******************************************************* gif2webp *****************************************************/

/*	//pass input_image(.gif) path ,output_image(give path where to save and image file name with .webp file type extension)
webp.gwebp("linux_logo.gif","linux_logo.webp","-q 80",function(status,error)
	{
		//if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
	});*/

/******************************************************* webpmux *****************************************************/

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Add ICC profile,XMP metadata and EXIF metadata

//pass input_image(.webp image) path ,output_image,set options(icc image profile,XMP metadata or EXIF metadata) and file.
//for options use keywords as below
//for ICC: icc
//for XMP metadata: xmp
//for EXIF metadata: exif

/*webp.webpmux_add("in.webp","icc_container.webp","image_profile.icc","icc",function(status,error){

         //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	

});*/

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Extract ICC profile,XMP metadata and EXIF metadata

//pass input_image(.webp image) path ,output_image,set options(icc image profile,XMP metadata or EXIF metadata) and file.
//for options use keywords as below
//for ICC: icc
//for XMP metadata: xmp
//for EXIF metadata: exif

/*webp.webpmux_extract("anim_container.webp","image_profile.icc","icc",function(status,error){

		//if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
		

});*/

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Strip ICC profile,XMP metadata and EXIF metadata 

//pass input_image(.webp image) path ,output_image,set options(icc image profile,XMP metadata or EXIF metadata) and file.
//for options use keywords as below
//for ICC: icc
//for XMP metadata: xmp
//for EXIF metadata: exif

/*webp.webpmux_strip("icc_container.webp","without_icc.webp","icc",function(status,error){

         //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);		

});*/

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Create an animated WebP file from Webp images 

//pass input_images(.webp image) path with FRAME_OPTIONS, as array,ouput image will be animated .webp image 


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

/*var inpu=["./frames/tmp-0.webp +100","./frames/tmp-1.webp +100","./frames/tmp-2.webp +100"];
webp.webpmux_animate(inpu,"anim_container.webp","10","255,255,255,255",function(status,error)
	{
		//if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);	
	});*/

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Get the a frame from an animated WebP file

//pass input_image(.webp image) path ,output_image and frame number

/*webp.webpmux_getframe("anim_container.webp","frame_2.webp","2",function(status,error){

        //if conversion successful status will be '100'
		//if conversion fails status will be '101'
		console.log(status,error);		

});*/