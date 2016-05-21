
@echo off
set basepath=%cd%
set confpath=%basepath%\conf\nginx.promesync.conf
set temppath=%basepath%\conf\temp.promesync.conf
set savepath=%basepath%\conf\save.promesync.conf
set ip=127.0.0.1
set port=3377
set port1=3388
set port2=3399

if exist %temppath% (del %temppath%)
copy /y %confpath% %temppath%
if exist %savepath% (del %savepath%)

::--------------------------------------------------------
::-- 函数部分开始
::--------------------------------------------------------
:inputIP
set /p ip="enter IP:"
set /p port="enter port:(default is 3377)"
setlocal enabledelayedexpansion
for /f "delims=" %%i in (%temppath%) do (
	set str=%%i
	set str=!str:{{ip}}=%ip%!
	set str=!str:{{port}}=%port%!
	set str=!str:{{port1}}=%port1%!
	set str=!str:{{port2}}=%port2%!
	echo !str!>>%savepath%
)
goto:startNginx

::--------------------------------------------------------
::-- 函数部分开始
::--------------------------------------------------------
:startNginx
nginx -s stop -c "%savepath%"
start nginx -c "%savepath%"
echo all is start , now coding
pause
goto:eof

call:inputIP
