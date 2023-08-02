
//get os type then return path of respective platform library 
var knowos=function()
{
if (process.platform === 'darwin') {

    return 'lib/libwebp_osx/bin/webpmux';//return osx library path

}else if (process.platform === 'linux') {

   return 'lib/libwebp_linux/bin/webpmux';//return linux library path

}else if (process.platform === 'win32') {

    if (process.arch === 'x64') {
       return 'lib/libwebp_win64/bin/webpmux.exe';//return windows 64bit library path
    } else {
        return 'lib/libwebp_win32/bin/webpmux.exe';//return windows 32(X86)bit library path
    }

} else {
    console.log('Unsupported platform:', process.platform, process.arch);//show unsupported platform message 
}
};

module.exports = knowos;