searchSounds = function(fileSystem) {
	
	root = fileSystem.root;
	root = root.fullPath.substr(8);
	root = root.split('/');
	root = '/'+root[0]+'/';

	collectSounds(root, true);

//    cordova.exec(function(d){
//
//         collectSounds("file://"+d+"/", true);
//
//    }, errorConvert, "Thumbs", "pathSound", [""]);
	
};

showMusicas = function(){
	
	// arrSounds = storage.getItem('music_list_path').split('|');
	// arrSoundsName = storage.getItem('music_list').split('|');
	
	// var i;
	// for(i=0; i<arrSounds.length; i++ ){
	// 	$('.lista_musicas').append('<label class="clickable"><div class="radio" data-file="'+arrSounds[i]+'" data-id="'+i+'" data-role="none"></div><span>'+arrSoundsName[i]+'</span></label>');
	// }
	
}

var total = 0;
collectSounds = function(path, recursive, level) {
	
	if (level === undefined)
        level = 0;
	
     var directoryEntry = new DirectoryEntry('', path);
     
     var directoryReader = directoryEntry.createReader();
     
     var arrExt = ['.mp3'];
     
     directoryReader.readEntries(
		function (entries) {
			
			var extension;
			
			for (var i = 0; i < entries.length; i++) {
				if (entries[i].name === '.')
					continue;

				extension = entries[i].name.substr(entries[i].name.lastIndexOf('.'));
				
				if (entries[i].isDirectory === true && recursive === true)
					collectSounds(entries[i].fullPath, recursive, level + 1);
				else if (entries[i].isFile === true && $.inArray(extension, arrExt) >= 0){
					console.log(entries[i].fullPath);
					if(storage.getItem('music_list_path') != undefined){
						storage.setItem('music_list_path', storage.getItem('music_list_path')+'|'+entries[i].fullPath);
						storage.setItem('music_list', storage.getItem('music_list')+'|'+entries[i].name);
					}else{
						storage.setItem('music_list_path', entries[i].fullPath);
						storage.setItem('music_list', entries[i].name);
					}
					$('.lista_musicas').append('<label class="clickable"><div class="radio" data-file="'+entries[i].fullPath+'" data-id="'+total+'" data-role="none"></div><span>'+entries[i].name+'</span></label>');
					total++;
				}
			}
		},
		function(error) {
			alert('erro ao processar musicas.');
		}
     );
}
