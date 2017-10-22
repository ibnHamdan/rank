'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var created = Array.from(document.querySelectorAll('[data-dates]'));
console.log(created);
var cretedDate = created.map(function (node) {
    //node.innerText;
    var _node$innerText$split = node.innerText.split(' '),
        _node$innerText$split2 = _slicedToArray(_node$innerText$split, 7),
        dayName = _node$innerText$split2[0],
        month = _node$innerText$split2[1],
        day = _node$innerText$split2[2],
        year = _node$innerText$split2[3],
        time = _node$innerText$split2[4],
        GMT = _node$innerText$split2[5],
        area = _node$innerText$split2[6];

    node.innerText = month + ' ' + year;
});