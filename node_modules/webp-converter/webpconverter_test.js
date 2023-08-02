var exec = require('child_process').execFile;//get child_process module
var enwebp=require('./cwebp_test.js');//get cwebp module(converts other image format to webp)
var dewebp=require('./dwebp_test.js');//get dwebp module(converts webp format to other image)
var gifwebp=require('./gwebp_test.js');//get gif2webp module(convert git image to webp)
var webpmux=require('./webpmux_test.js');//get webpmux module(convert non animated webp images to animated webp) 


/******************************************************* cwebp *****************************************************/

//now convert image to .webp format 
module.exports.cwebp =function(input_image,output_image,option,callback)
{

// input_image: input image(.jpeg, .pnp ....)
//output_image: output image .webp 
//option: options and quality,it should be given between 0 to 100

var query = option +' '+ input_image +' -o '+ output_image;//command to convert image 

console.log(query);

//enwebp() return which platform webp library should be used for conversion
 exec(enwebp(),query.split(/\s+/), function (error, stdout, stderr) //execute command 
 	{ 
 		if(error){
 			callback("101",error);//return error code
 		}else {
  			callback("100","");//return success code
 	      }
 });
};

/******************************************************* dwebp *****************************************************/

//now convert .webp to other image format 
module.exports.dwebp =function(input_image,output_image,option,callback)
{

// input_image: input image .webp
//output_image: output image(.jpeg, .pnp ....)
//option: options and quality,it should be given between 0 to 100

var query = input_image + ' ' + option + ' ' + output_image;//command to convert image 


console.log(query);

//dewebp() return which platform webp library should be used for conversion
 exec(dewebp(),query.split(/\s+/), function (error, stdout, stderr) //execute command 
 	{ 
 		if(error){
 			callback("101",error);//return error code
 		}else {
  			callback("100","");//return success code
 	      }
 });
};

/******************************************************* gif2webp *****************************************************/

//now convert .gif image to .webp format 
module.exports.gwebp =function(input_image,output_image,option,callback)
{

// input_image: input image(.jpeg, .pnp ....)
//output_image: /output image .webp 
//option: options and quality,it should be given between 0 to 100


var query = option +' '+ input_image +' -o '+ output_image;//command to convert image 

//gifwebp() return which platform webp library should be used for conversion
 exec(gifwebp(),query.split(/\s+/), function (error, stdout, stderr) //execute command 
 	{ 
 		if(error){
 			callback("101",error);//return error code
 		}else {
  			callback("100","");//return success code
 	      }
 });
};

/******************************************************* webpmux *****************************************************/

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Add ICC profile,XMP metadata and EXIF metadata

module.exports.webpmux_add =function(input_image,output_image,icc_profile,option,callback)
{

// input_image: input image(.webp)
//output_image: output image .webp  
//icc_profile: icc profile
//option: get or set option (icc,xmp,exif)

var query = '-set '+ option +' '+ icc_profile +' '+ input_image +' -o '+ output_image;

//webpmux() return which platform webp library should be used for conversion
 exec(webpmux(),query.split(/\s+/), function (error, stdout, stderr) //execute command 
 	{ 
 		if(error){
 			callback("101",error);//return error code
 		}else {
  			callback("100","");//return success code
 	      }
 });
};

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Extract ICC profile,XMP metadata and EXIF metadata

module.exports.webpmux_extract =function(input_image,icc_profile,option,callback)
{

// input_image: input image(.webp) 
//icc_profile: icc profile

var query = '-get '+ option +' '+ input_image +' -o '+ icc_profile;

//webpmux() return which platform webp library should be used for conversion
 exec(webpmux(),query.split(/\s+/), function (error, stdout, stderr) //execute command 
 	{ 
 		if(error){
 			callback("101",error);//return error code
 		}else {
  			callback("100","");//return success code
 	      }
 });
};

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Strip ICC profile,XMP metadata and EXIF metadata 

module.exports.webpmux_strip =function(input_image,output_image,option,callback)
{

// input_image: input image(.webp) 
//output_image: output image .webp

var query = '-strip '+ option +' '+ input_image +' -o '+ output_image;

//webpmux() return which platform webp library should be used for conversion
 exec(webpmux(),query.split(/\s+/), function (error, stdout, stderr) //execute command 
 	{ 
 		if(error){
 			callback("101",error);//return error code
 		}else {
  			callback("100","");//return success code
 	      }
 });
};

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Create an animated WebP file from Webp images 

module.exports.webpmux_animate =function(input_images,output_image,loop,bgcolor,callback)
{

// input_images: array of image(.webp) 
//output_image: animatedimage .webp
//loop:Loop the frames n number of times
//bgcolor: Background color of the canvas

var files='-frame '+input_images[0];

var j=input_images.length;

for (i = 1; i < j; i++) { 
    files=files+' -frame '+input_images[i];
	console.log(files);
}

var query = files+' -loop '+ loop +' -bgcolor '+ bgcolor +' -o '+ output_image;

//webpmux() return which platform webp library should be used for conversion
 exec(webpmux(),query.split(/\s+/), function (error, stdout, stderr) //execute command 
 	{ 
 		if(error){
 			callback("101",error);//return error code
 		}else {
  			callback("100","");//return success code
 	      }
 });
};

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Get the a frame from an animated WebP file

module.exports.webpmux_getframe =function(input_image,output_image,frame_number,callback)
{

// input_image: input image(.webp) 
//output_image: output image .webp
//frame_number: frame number

var query = '-get frame '+ frame_number +' '+ input_image +' -o '+ output_image;

//webpmux() return which platform webp library should be used for conversion
 exec(webpmux(),query.split(/\s+/), function (error, stdout, stderr) //execute command 
 	{ 
 		if(error){
 			callback("101",error);//return error code
 		}else {
  			callback("100","");//return success code
 	      }
 });
};