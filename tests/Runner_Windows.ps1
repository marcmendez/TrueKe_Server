
foreach ($file in Get-ChildItem) {
	if ($file -Match "_spec.js$") {
		echo $file.name
    	cmd /c jasmine-node.cmd $file.name
	}
}