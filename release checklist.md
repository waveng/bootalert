bootalert Release Checklist

1. Update bootalert Version
	* bootalert.js
	* bower.json (bootalert-bower repo)
	* package.json
	* nuget versions and dependency versions
	* readme file for github repo
	* Consider HotTowel VSIX
2. Gulp
	* run main demo
    * `gulp analyze`
	* `gulp test`
    * `gulp`
3. Nuget
	* Copy new files in
	* Build
	* Test
4. CDNJS
	* Update CDNJS
5. Update Website with New Downloads
6. Publish Bower
	* Include License and Readme
	* Test Locally
	* Update Github repo bootalert-bower
	* Github tag
	* Register with Bower
7. Publish Nugets
8. Release on Github 
	* Tag with semver
	* Attach all artifacts
9. Blog post