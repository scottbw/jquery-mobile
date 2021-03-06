/*
 * mobile navigation base tag unit tests
 */
(function($){
	var baseDir = $.mobile.path.parseUrl($("base").attr("href")).directory,
		contentDir = $.mobile.path.makePathAbsolute("../content/", baseDir);

	module('jquery.mobile.navigation.js - base tag', {
		setup: function(){
			if ( location.hash ) {
				stop();
				$(document).one("changepage", function() {
					start();
				} );
				location.hash = "";
			}
		}
	});

	asyncTest( "can navigate between internal and external pages", function(){
		$.testHelper.pageSequence([
			function(){
				// Navigate from default internal page to another internal page.
				$.testHelper.openPage("#internal-page-2"); 
			},

			function(){
				// Verify that we are on the 2nd internal page.
				same(location.hash, "#internal-page-2", "navigate to internal page");

				// Navigate to a page that is in the base directory. Note that the application
				// document and this new page are *NOT* in the same directory.
				$("#internal-page-2 .bp1").click();
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#" + baseDir + "base-page-1.html", "navigate from internal page to page in base directory");

				// Navigate to another page in the same directory as the current page.
				$("#base-page-1 .bp2").click();
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#" + baseDir + "base-page-2.html", "navigate from base directory page to another base directory page");

				// Navigate to another page in a directory that is the sibling of the base.
				$("#base-page-2 .cp1").click();
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#" + contentDir + "content-page-1.html", "navigate from base directory page to a page in a different directory hierarchy");

				// Navigate to another page in a directory that is the sibling of the base.
				$("#content-page-1 .cp2").click();
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#" + contentDir + "content-page-2.html", "navigate to another page within the same non-base directory hierarchy");

				// Navigate to an internal page.
				$("#content-page-2 .ip1").click();
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#internal-page-1", "navigate from a page in a non-base directory to an internal page");

				// Try calling changePage() directly with a relative path.
				$.mobile.changePage("base-page-1.html");
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#" + baseDir + "base-page-1.html", "call changePage() with a filename (no path)");

				// Try calling changePage() directly with a relative path.
				$.mobile.changePage("../content/content-page-1.html");
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#" + contentDir + "content-page-1.html", "call changePage() with a relative path containing up-level references");

				// Try calling changePage() with an id
				$.mobile.changePage("content-page-2.html");
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#" + contentDir + "content-page-2.html", "call changePage() with a relative path should resolve relative to current page");

				// Try calling changePage() with an id
				$.mobile.changePage("#internal-page-2");
			},

			function(){
				// Verify that we are on the expected page.
				same(location.hash, "#internal-page-2", "call changePage() with a page id");

				// Try calling changePage() with an id
				$.mobile.changePage("internal-page-1");
			},

			function(){
				// Previous load should have failed and left us on internal-page-2.
				same(location.hash, "#internal-page-2", "calling changePage() with a page id that is not prefixed with '#' should not change page");
				start();
			}]);
	});
})(jQuery);
