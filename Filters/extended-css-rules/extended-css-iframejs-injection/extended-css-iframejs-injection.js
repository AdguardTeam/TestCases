/**
 * Before doing the test, import extended-css-iframejs-injection.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function() {

    QUnit.test("1. Test rules injection into iframe created by JS", function(assert) {
        const frame = document.querySelector("#case1 > #frame1");
        const innerDoc = frame.contentDocument || frame.contentWindow.document;
        assert.ok(innerDoc.querySelector("#inframe1").style.display === "none", "Extended CSS rules should work inside of iframes created by JS");
    });
});
