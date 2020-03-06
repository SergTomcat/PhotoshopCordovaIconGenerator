# Photoshop Cordova icon generator

Generate pack of icons and splashscreens using Photoshop script for Cordova app project.

## Usage

1. Get one square image that would be the icon. Preferably a high res png with transparency.
2. Optionally, prepare square image, preferably with solid color fill at the edges.
3. Open Photoshop CS5+.
4. Select "*Scripts*" -> "*Browse...*" from the menu, and select this **jsx** script.
5. First dialog will ask for the image from step 1.
6. Second dialog will ask for the image from step 2. You can cancel it, then image from step 1 will be used for splashscreens.

*NB: with every splashscreen resize, empty areas will be filled with the color of the closest pixel at the center of corresponding source image edge.*

7. "res" folder will be placed near the source file from step 1.


## config.xml

```
    <platform name="android">
        <icon density="ldpi" src="res/icons/android/icon-36-ldpi.png" />
        <icon density="mdpi" src="res/icons/android/icon-48-mdpi.png" />
        <icon density="hdpi" src="res/icons/android/icon-72-hdpi.png" />
        <icon density="xhdpi" src="res/icons/android/icon-96-xhdpi.png" />
    </platform>
    <platform name="ios">
        <icon height="88" src="res/icons/ios/icon-44@2x.png" width="88" />
        <icon height="48" src="res/icons/ios/icon-24@2x.png" width="48" />
        <icon height="55" src="res/icons/ios/icon-27.5@2x.png" width="55" />
        <icon height="172" src="res/icons/ios/icon-86@2x.png" width="172" />
        <icon height="196" src="res/icons/ios/icon-98@2x.png" width="196" />
        <icon height="216" src="res/icons/ios/icon-108@2x.png" width="216" />
        <icon height="70" src="res/icons/ios/icon-35@2x.png" width="70" />
        <icon height="84" src="res/icons/ios/icon-28@3x.png" width="84" />
        <icon height="56" src="res/icons/ios/icon-28@2x.png" width="56" />
        <icon height="54" src="res/icons/ios/icon-18@3x.png" width="54" />
        <icon height="36" src="res/icons/ios/icon-18@2x.png" width="36" />
        <icon height="20" src="res/icons/ios/icon-20.png" width="20" />
        <icon height="180" src="res/icons/ios/icon-60@3x.png" width="180" />
        <icon height="60" src="res/icons/ios/icon-60.png" width="60" />
        <icon height="120" src="res/icons/ios/icon-60@2x.png" width="120" />
        <icon height="76" src="res/icons/ios/icon-76.png" width="76" />
        <icon height="152" src="res/icons/ios/icon-76@2x.png" width="152" />
        <icon height="40" src="res/icons/ios/icon-40.png" width="40" />
        <icon height="80" src="res/icons/ios/icon-40@2x.png" width="80" />
        <icon height="57" src="res/icons/ios/icon-57.png" width="57" />
        <icon height="114" src="res/icons/ios/icon-57@2x.png" width="114" />
        <icon height="72" src="res/icons/ios/icon-72.png" width="72" />
        <icon height="144" src="res/icons/ios/icon-72@2x.png" width="144" />
        <icon height="29" src="res/icons/ios/icon-small.png" width="29" />
        <icon height="58" src="res/icons/ios/icon-small@2x.png" width="58" />
        <icon height="87" src="res/icons/ios/icon-small@3x.png" width="87" />
        <icon height="50" src="res/icons/ios/icon-50.png" width="50" />
        <icon height="100" src="res/icons/ios/icon-50@2x.png" width="100" />
        <icon height="167" src="res/icons/ios/icon-83.5@2x.png" width="167" />
        <icon height="1024" src="res/icons/ios/icon-1024.png" width="1024" />
    </platform>
    <platform name="android">
        <splash density="land-hdpi" src="res/screens/android/screen-hdpi-landscape.png" />
        <splash density="land-ldpi" src="res/screens/android/screen-ldpi-landscape.png" />
        <splash density="land-mdpi" src="res/screens/android/screen-mdpi-landscape.png" />
        <splash density="land-xhdpi" src="res/screens/android/screen-xhdpi-landscape.png" />
        <splash density="port-hdpi" src="res/screens/android/screen-hdpi-portrait.png" />
        <splash density="port-ldpi" src="res/screens/android/screen-ldpi-portrait.png" />
        <splash density="port-mdpi" src="res/screens/android/screen-mdpi-portrait.png" />
        <splash density="port-xhdpi" src="res/screens/android/screen-xhdpi-portrait.png" />
    </platform>
    <platform name="ios">
        <splash src="res/screens/ios/Default@2x~universal~anyany.png" />
        <splash src="res/screens/ios/Default@2x~universal~comany.png" />
        <splash src="res/screens/ios/Default@2x~universal~comcom.png" />
        <splash src="res/screens/ios/Default@3x~universal~anyany.png" />
        <splash src="res/screens/ios/Default@3x~universal~anycom.png" />
        <splash src="res/screens/ios/Default@3x~universal~comany.png" />
    </platform>
```

## License
No license, free to use.
