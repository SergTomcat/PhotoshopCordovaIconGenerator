//version 1.0.2

#target photoshop

function calculateCurrentAspect()
{
	var fW = parseFloat(app.activeDocument.width.toString().replace("px","")),
		fH = parseFloat(app.activeDocument.height.toString().replace("px","")),
		aAspect = [fW/fH, fH/fW, fW, fH];
	
	return aAspect;
}
function getSrcAspect()
{
	if (aSrcAspect == null)
	{
			aSrcAspect = calculateCurrentAspect();
	}
	return aSrcAspect;
}
function makeSelection(x1,y1,x2,y2){
	if (arguments.length > 0)
	{
		app.activeDocument.selection.deselect();
		app.activeDocument.selection.select([ [x1,y1], [x1,y2], [x2,y2], [x2,y1] ]);
	}
	else
	{
		app.activeDocument.selection.deselect();
	}
}

function selectionColorFill(probeX, probeY)
{
	try {var SB = activeDocument.selection.bounds} 
	catch (e) {alert('color fill needs a selection'); return};
	
	var pixelLoc = [probeX, probeY];
	var colorSamplerRef = app.activeDocument.colorSamplers.add(pixelLoc);
	try
	{
		app.activeDocument.selection.fill(colorSamplerRef.color);
	}
	catch(e)
	{
	}
	
	app.activeDocument.colorSamplers.removeAll();
}

function contentAwareFill() {	

	try {var SB = activeDocument.selection.bounds} 
	catch (e) {alert('content aware fill needs a selection'); return};

	var desc = new ActionDescriptor();
	desc.putEnumerated( charIDToTypeID( "Usng" ), charIDToTypeID( "FlCn" ), stringIDToTypeID( "contentAware" ) );
	executeAction( charIDToTypeID( "Fl  " ), desc, DialogModes.NO ); 
}

function processArray(aInstruction, filePic, bSmartFill)
{
	var doc, fldSaveCur,saveoptions,fldSaveFolder,flags;
	var operSize, i;
	for (i = aInstruction.length;i--;)
	{
		app.open(filePic);
		doc = app.activeDocument;
		
		if (aInstruction[i][2]/aInstruction[i][3] > getSrcAspect()[0])
		{
				//width increase
				doc.resizeCanvas(getSrcAspect()[2]*(aInstruction[i][2]/aInstruction[i][3]) / getSrcAspect()[0], UnitValue(100,"%"), AnchorPosition.MIDDLECENTER);
				
				if (bSmartFill == true)
				{
					operSize = calculateCurrentAspect()[2];
					makeSelection(0, 0, (operSize - getSrcAspect()[2]) / 2, getSrcAspect()[3]);
					//contentAwareFill();
					selectionColorFill((operSize - getSrcAspect()[2]) / 2 + 1, getSrcAspect()[3] / 2);
					
					makeSelection((operSize + getSrcAspect()[2]) / 2 - 1, 0, operSize, getSrcAspect()[3]);
					//contentAwareFill();
					selectionColorFill((operSize + getSrcAspect()[2]) / 2 - 2, getSrcAspect()[3] / 2);
				}
		}
		else if (aInstruction[i][3]/aInstruction[i][2] > getSrcAspect()[1])
		{
				//height increase
				doc.resizeCanvas(UnitValue(100,"%"),UnitValue(getSrcAspect()[3]*(aInstruction[i][3]/aInstruction[i][2]) / getSrcAspect()[1],"px"), AnchorPosition.MIDDLECENTER);
				
				if (bSmartFill == true)
				{
					operSize = calculateCurrentAspect()[3];
					makeSelection(0, 0, getSrcAspect()[2], (operSize - getSrcAspect()[3]) / 2);
					//contentAwareFill();
					selectionColorFill(getSrcAspect()[2] / 2, (operSize - getSrcAspect()[3]) / 2 + 1);
					makeSelection(0, (operSize + getSrcAspect()[3]) / 2 - 1, getSrcAspect()[2], operSize);
					//contentAwareFill();
					selectionColorFill(getSrcAspect()[2] / 2, (operSize + getSrcAspect()[3]) / 2 - 2);
				}
		}
		else
		{
			// ascpect fit
		}
	
		doc.resizeImage(UnitValue(aInstruction[i][2],"px"),UnitValue(aInstruction[i][3],"px"),null,ResampleMethod.BICUBIC);
		
		saveoptions = new ExportOptionsSaveForWeb();
		saveoptions.quality = 80;
		saveoptions.format = (aInstruction[i][4] == "png"? SaveDocumentType.PNG : SaveDocumentType.JPEG);
		saveoptions.optimized = true;
		
		if (aInstruction[i].length > 5)
		{
			flags = aInstruction[i][5] + "";
			if (flags.indexOf("flat") >= 0)
			{
				saveoptions.transparency = false;
				saveoptions.PNG8 = false;
			}
		}
		
		fldSaveFolder = Folder(sFolderPath + aInstruction[i][0]);
		if (!fldSaveFolder.exist)
			fldSaveFolder.create();
		
		doc.exportDocument(File(sFolderPath + aInstruction[i][0] + aInstruction[i][1]),ExportType.SAVEFORWEB,saveoptions);
		doc.close(SaveOptions.DONOTSAVECHANGES);
	}
}


var aSrcAspect = null;
app.preferences.rulerUnits = Units.PIXELS;
var colorBG = new SolidColor();
colorBG.rgb.hexValue = "ffffff";
app.backgroundColor = colorBG;

var sPicPath = File.openDialog ("Давай свою картинку (желательно квадратную и желательно не меньше 2000пкс)", ["PNG:*.png","JPG:*.jpg","JPEG:*.jpeg"], false);
if (sPicPath != undefined)
{
	sPicPath = String(sPicPath);
	var icoPic = new File(sPicPath);
	var sFolderPath = sPicPath.slice(0,sPicPath.lastIndexOf("/") + 1) + "res",
		fldSave = Folder(sFolderPath);
	if (!fldSave.exist)
		fldSave.create();
	
	var aIconInfo = [
		// [path, name, width, height, format]
		["/icons/android/", "icon-36-ldpi.png", 36,36,"png"],
		["/icons/android/", "icon-48-mdpi.png", 48,48,"png"],
		["/icons/android/", "icon-72-hdpi.png", 72,72,"png"],
		["/icons/android/", "icon-96-xhdpi.png", 96,96,"png"],
		["/icons/android/", "icon-144-xxhdpi.png", 144,144,"png"],
		["/icons/android/", "icon-192-xxxhdpi.png",192,192,"png"],
		["/icons/ios/", "icon.png", 57,57,"png"],
		["/icons/ios/", "icon-2x.png", 114,114,"png"],
		["/icons/ios/", "icon-40.png", 40,40,"png"],
		["/icons/ios/", "icon-40-2x.png", 80,80,"png"],
		["/icons/ios/", "icon-50.png", 50,50,"png"],
		["/icons/ios/", "icon-50-2x.png", 100,100,"png"],
		["/icons/ios/", "icon-83.5-2x.png", 167,167,"png"],
		["/icons/ios/", "icon-57.png", 57,57,"png"],
		["/icons/ios/", "icon-57-2x.png", 114,114,"png"],
		["/icons/ios/", "icon-60.png", 60,60,"png"],
		["/icons/ios/", "icon-60-2x.png", 120,120,"png"],
		["/icons/ios/", "icon-60-3x.png", 180,180,"png"],
		["/icons/ios/", "icon-72.png", 72,72,"png"],
		["/icons/ios/", "icon-72-2x.png", 144,144,"png"],
		["/icons/ios/", "icon-76.png", 76,76,"png"],
		["/icons/ios/", "icon-76-2x.png", 152,152,"png"],
		["/icons/ios/", "icon-small.png", 29,29,"png"],
		["/icons/ios/", "icon-small-2x.png", 58,58,"png"],
		["/icons/ios/", "icon-1024.png", 1024,1024,"png","flat"],
		["/icons/windows/", "logo.png", 150,150,"png"],
		["/icons/windows/", "smalllogo.png", 30,30,"png"],
		["/icons/windows/", "Square30x30Logo.scale-100.png", 30,30,"png"],
		["/icons/windows/", "Square44x44Logo.scale-240.png", 106,106,"png"],
		["/icons/windows/", "Square70x70Logo.scale-100.png", 70,70,"png"],
		["/icons/windows/", "Square71x71Logo.scale-240.png", 170,170,"png"],
		["/icons/windows/", "Square150x150Logo.scale-100.png", 150,150,"png"],
		["/icons/windows/", "Square150x150Logo.scale-240.png", 360,360,"png"],
		["/icons/windows/", "Square310x310Logo.scale-100.png", 310,310,"png"],
		["/icons/windows/", "storelogo.png", 50,50,"png"],
		["/icons/windows/", "StoreLogo.scale-100.png", 50,50,"png"],
		["/icons/windows/", "StoreLogo.scale-240.png", 120,120,"png"],
		["/icons/windows/", "Wide310x150Logo.scale-100.png", 310,150,"png"],
		["/icons/windows/", "Wide310x150Logo.scale-240.png", 744,360,"png"],
		["/icons/windows8/", "logo.png", 150,150,"png"],
		["/icons/windows8/", "smalllogo.png", 30,30,"png"],
		["/icons/windows8/", "storelogo.png", 50,50,"png"],
		["/icons/wp8/", "ApplicationIcon.png", 99,99,"png"],
		["/icons/wp8/", "Background.png", 159,159,"png"]
	];
	
var sScreenPath = File.openDialog("Давай свой бэкграунд (очень очень квадратный и желательно не меньше 2000пкс). ЕСЛИ НЕ НАДО, НАЖМИ ОТМЕНА!", ["PNG:*.png","JPG:*.jpg","JPEG:*.jpeg"], false);

	aScreenInfo = [
		["/screens/android/", "screen-hdpi-landscape.png", 800,480,"png"],
		["/screens/android/", "screen-hdpi-portrait.png", 480,800,"png"],
		["/screens/android/", "screen-ldpi-landscape.png", 320,200,"png"],
		["/screens/android/", "screen-ldpi-portrait.png", 200,320,"png"],
		["/screens/android/", "screen-mdpi-landscape.png", 480,320,"png"],
		["/screens/android/", "screen-mdpi-portrait.png", 320,480,"png"],
		["/screens/android/", "screen-xhdpi-landscape.png",1280,720,"png"],
		["/screens/android/", "screen-xhdpi-portrait.png", 720,1280,"png"],
		["/screens/android/", "screen-xxhdpi-landscape.png", 1600,900,"png"],
		["/screens/android/", "screen-xxhdpi-portrait.png", 900,1600,"png"],
		["/screens/android/", "screen-xxxhdpi-landscape.png", 1920,1080,"png"],
		["/screens/android/", "screen-xxxhdpi-portrait.png", 1080,1920,"png"],
		/*
		["/screens/ios/", "screen-ipad-landscape.png", 1024,768,"png"],
		["/screens/ios/", "screen-ipad-landscape-2x.png", 2048,1536,"png"],
		["/screens/ios/", "screen-ipad-portrait.png", 768,1024,"png"],
		["/screens/ios/", "screen-ipad-portrait-2x.png", 1536,2048,"png"],
		["/screens/ios/", "screen-iphone-568h-2x.png", 640,1136,"png"],
		["/screens/ios/", "screen-iphone-landscape.png", 480,320,"png"],
		["/screens/ios/", "screen-iphone-landscape-2x.png", 960,640,"png"],
		["/screens/ios/", "screen-iphone-landscape-568h-2x.png",1136,640,"png"],
		["/screens/ios/", "screen-iphone-landscape-667h.png",1334,750,"png"],
		["/screens/ios/", "screen-iphone-landscape-736h.png",2208,1242,"png"],
		["/screens/ios/", "screen-iphone-portrait.png", 320,480,"png"],
		["/screens/ios/", "screen-iphone-portrait-2x.png", 640,960,"png"],
		["/screens/ios/", "screen-iphone-portrait-568h-2x.png",640, 1136,"png"],
		["/screens/ios/", "screen-iphone-portrait-667h.png", 750,1334,"png"],
		["/screens/ios/", "screen-iphone-portrait-736h.png", 1242,2208,"png"],
		["/screens/ios/", "screen-iphone-2732x2732.png", 2732,2732,"png"],
		["/screens/ios/", "screen-iphone-landscape-2732x1278.png", 2732,1278,"png"],
		["/screens/ios/", "screen-iphone-portrait-1278x2732.png", 1278,2732,"png"],
		*/
		["/screens/ios/", "Default@2x~universal~anyany.png", 2732,2732,"png"],
		["/screens/ios/", "Default@2x~universal~comany.png", 1278,2732,"png"],
		["/screens/ios/", "Default@2x~universal~comcom.png", 1334,750,"png"],
		["/screens/ios/", "Default@3x~universal~anyany.png", 2208,2208,"png"],
		["/screens/ios/", "Default@3x~universal~anycom.png", 2208,1242,"png"],
		["/screens/ios/", "Default@3x~universal~comany.png", 1242,2208,"png"],
		["/screens/windows/", "splashscreen.png", 620,300,"png"],
		["/screens/windows/", "splashscreen.scale-100.png", 620,300,"png"],
		["/screens/windows/", "SplashScreenPhone.scale-240.png", 1152,1920,"png"],
		["/screens/windows8/", "splashscreen.png", 620,300,"png"],
		["/screens/wp8/", "SplashScreenImage.png", 768,1024,"png"],
	];
	
	processArray(aIconInfo, icoPic);
	
	var screenPic = (sScreenPath != undefined ? new File(String(sScreenPath)) : icoPic);
	if (sScreenPath != undefined)
		aSrcAspect = null;
	
	processArray(aScreenInfo, screenPic, true);
	
	alert("КОНЕЦ.");
	
}
