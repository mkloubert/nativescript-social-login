@ECHO OFF
CLS

CALL tns plugin remove nativescript-social-login

CD ..
CD plugin
ECHO Rebuild plugin...
CALL tsc
ECHO Done

CD ..
CD demo

CALL tns plugin add ..\plugin

CALL tns livesync --watch
