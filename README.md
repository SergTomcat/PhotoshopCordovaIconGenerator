# Photoshop Cordova icon generator

Generate pack of icons and splashscreens using Photoshop script for Cordova app project.

## Usage
1. Get one square image that would be the icon. Preferably a high res png with transparency.
2. Optionally, prepare square image, preferably with solid color fill at the edges.
3. Open Photoshop CS5+.
4. Select "Scripts" -> "Browse..." from the menu, and select this jsx script.
5. First dialog will ask for the image from step 1.
6. Second dialog will ask for the image from step 2. You can cancel it, then image from step 1 will be used for splashscreens.

*NB: with every splashscreen resize, empty areas will be filled with the color of the closest pixel at the center of corresponding source image edge.*

7. "res" folder will be placed near the source file from step 1.


## License
No license, free to use.
