'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var faAdobe = require('@fortawesome/free-brands-svg-icons/faAdobe');
var faGitAlt = require('@fortawesome/free-brands-svg-icons/faGitAlt');
var faLinux = require('@fortawesome/free-brands-svg-icons/faLinux');
var faNodeJs = require('@fortawesome/free-brands-svg-icons/faNodeJs');
var faPhp = require('@fortawesome/free-brands-svg-icons/faPhp');
var faPython = require('@fortawesome/free-brands-svg-icons/faPython');
var faRust = require('@fortawesome/free-brands-svg-icons/faRust');
var faUbuntu = require('@fortawesome/free-brands-svg-icons/faUbuntu');
var faWindows = require('@fortawesome/free-brands-svg-icons/faWindows');
var faArrowDown = require('@fortawesome/free-solid-svg-icons/faArrowDown');
var faBalanceScale = require('@fortawesome/free-solid-svg-icons/faBalanceScale');
var faBoxOpen = require('@fortawesome/free-solid-svg-icons/faBoxOpen');
var faChevronDown = require('@fortawesome/free-solid-svg-icons/faChevronDown');
var faChevronRight = require('@fortawesome/free-solid-svg-icons/faChevronRight');
var faCircleNotch = require('@fortawesome/free-solid-svg-icons/faCircleNotch');
var faCogs = require('@fortawesome/free-solid-svg-icons/faCogs');
var faCopy = require('@fortawesome/free-solid-svg-icons/faCopy');
var faCubes = require('@fortawesome/free-solid-svg-icons/faCubes');
var faDatabase = require('@fortawesome/free-solid-svg-icons/faDatabase');
var faDownload = require('@fortawesome/free-solid-svg-icons/faDownload');
var faEraser = require('@fortawesome/free-solid-svg-icons/faEraser');
var faExclamationTriangle = require('@fortawesome/free-solid-svg-icons/faExclamationTriangle');
var faExternalLinkAlt = require('@fortawesome/free-solid-svg-icons/faExternalLinkAlt');
var faEyeSlash = require('@fortawesome/free-solid-svg-icons/faEyeSlash');
var faFile = require('@fortawesome/free-solid-svg-icons/faFile');
var faFileAlt = require('@fortawesome/free-solid-svg-icons/faFileAlt');
var faFileArchive = require('@fortawesome/free-solid-svg-icons/faFileArchive');
var faFileCode = require('@fortawesome/free-solid-svg-icons/faFileCode');
var faFileExcel = require('@fortawesome/free-solid-svg-icons/faFileExcel');
var faFileImage = require('@fortawesome/free-solid-svg-icons/faFileImage');
var faFilePdf = require('@fortawesome/free-solid-svg-icons/faFilePdf');
var faFileWord = require('@fortawesome/free-solid-svg-icons/faFileWord');
var faFilm = require('@fortawesome/free-solid-svg-icons/faFilm');
var faFistRaised = require('@fortawesome/free-solid-svg-icons/faFistRaised');
var faFolder = require('@fortawesome/free-solid-svg-icons/faFolder');
var faFolderOpen = require('@fortawesome/free-solid-svg-icons/faFolderOpen');
var faFolderPlus = require('@fortawesome/free-solid-svg-icons/faFolderPlus');
var faInfoCircle = require('@fortawesome/free-solid-svg-icons/faInfoCircle');
var faKey = require('@fortawesome/free-solid-svg-icons/faKey');
var faLevelUpAlt = require('@fortawesome/free-solid-svg-icons/faLevelUpAlt');
var faList = require('@fortawesome/free-solid-svg-icons/faList');
var faLock = require('@fortawesome/free-solid-svg-icons/faLock');
var faMinus = require('@fortawesome/free-solid-svg-icons/faMinus');
var faMusic = require('@fortawesome/free-solid-svg-icons/faMusic');
var faObjectGroup = require('@fortawesome/free-solid-svg-icons/faObjectGroup');
var faPaste = require('@fortawesome/free-solid-svg-icons/faPaste');
var faRunning = require('@fortawesome/free-solid-svg-icons/faRunning');
var faSearch = require('@fortawesome/free-solid-svg-icons/faSearch');
var faShareAlt = require('@fortawesome/free-solid-svg-icons/faShareAlt');
var faSortAmountDownAlt = require('@fortawesome/free-solid-svg-icons/faSortAmountDownAlt');
var faSortAmountUpAlt = require('@fortawesome/free-solid-svg-icons/faSortAmountUpAlt');
var faTerminal = require('@fortawesome/free-solid-svg-icons/faTerminal');
var faTh = require('@fortawesome/free-solid-svg-icons/faTh');
var faThLarge = require('@fortawesome/free-solid-svg-icons/faThLarge');
var faThList = require('@fortawesome/free-solid-svg-icons/faThList');
var faTimes = require('@fortawesome/free-solid-svg-icons/faTimes');
var faToggleOff = require('@fortawesome/free-solid-svg-icons/faToggleOff');
var faToggleOn = require('@fortawesome/free-solid-svg-icons/faToggleOn');
var faTrash = require('@fortawesome/free-solid-svg-icons/faTrash');
var faUpload = require('@fortawesome/free-solid-svg-icons/faUpload');
var faUsers = require('@fortawesome/free-solid-svg-icons/faUsers');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var chonky = require('chonky');
var React = _interopDefault(require('react'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var _IconMap;
var IconMap = (_IconMap = {}, _IconMap[chonky.ChonkyIconName.loading] = faCircleNotch.faCircleNotch, _IconMap[chonky.ChonkyIconName.dropdown] = faChevronDown.faChevronDown, _IconMap[chonky.ChonkyIconName.placeholder] = faMinus.faMinus, _IconMap[chonky.ChonkyIconName.dndDragging] = faFistRaised.faFistRaised, _IconMap[chonky.ChonkyIconName.dndCanDrop] = faArrowDown.faArrowDown, _IconMap[chonky.ChonkyIconName.dndCannotDrop] = faTimes.faTimes, _IconMap[chonky.ChonkyIconName.openFiles] = faBoxOpen.faBoxOpen, _IconMap[chonky.ChonkyIconName.openParentFolder] = faLevelUpAlt.faLevelUpAlt, _IconMap[chonky.ChonkyIconName.copy] = faCopy.faCopy, _IconMap[chonky.ChonkyIconName.paste] = faPaste.faPaste, _IconMap[chonky.ChonkyIconName.share] = faShareAlt.faShareAlt, _IconMap[chonky.ChonkyIconName.search] = faSearch.faSearch, _IconMap[chonky.ChonkyIconName.selectAllFiles] = faObjectGroup.faObjectGroup, _IconMap[chonky.ChonkyIconName.clearSelection] = faEraser.faEraser, _IconMap[chonky.ChonkyIconName.sortAsc] = faSortAmountDownAlt.faSortAmountDownAlt, _IconMap[chonky.ChonkyIconName.sortDesc] = faSortAmountUpAlt.faSortAmountUpAlt, _IconMap[chonky.ChonkyIconName.toggleOn] = faToggleOn.faToggleOn, _IconMap[chonky.ChonkyIconName.toggleOff] = faToggleOff.faToggleOff, _IconMap[chonky.ChonkyIconName.list] = faList.faList, _IconMap[chonky.ChonkyIconName.compact] = faThList.faThList, _IconMap[chonky.ChonkyIconName.smallThumbnail] = faTh.faTh, _IconMap[chonky.ChonkyIconName.largeThumbnail] = faThLarge.faThLarge, _IconMap[chonky.ChonkyIconName.folder] = faFolder.faFolder, _IconMap[chonky.ChonkyIconName.folderCreate] = faFolderPlus.faFolderPlus, _IconMap[chonky.ChonkyIconName.folderOpen] = faFolderOpen.faFolderOpen, _IconMap[chonky.ChonkyIconName.folderChainSeparator] = faChevronRight.faChevronRight, _IconMap[chonky.ChonkyIconName.download] = faDownload.faDownload, _IconMap[chonky.ChonkyIconName.upload] = faUpload.faUpload, _IconMap[chonky.ChonkyIconName.trash] = faTrash.faTrash, _IconMap[chonky.ChonkyIconName.fallbackIcon] = faExclamationTriangle.faExclamationTriangle, _IconMap[chonky.ChonkyIconName.symlink] = faExternalLinkAlt.faExternalLinkAlt, _IconMap[chonky.ChonkyIconName.hidden] = faEyeSlash.faEyeSlash, _IconMap[chonky.ChonkyIconName.file] = faFile.faFile, _IconMap[chonky.ChonkyIconName.license] = faBalanceScale.faBalanceScale, _IconMap[chonky.ChonkyIconName.code] = faFileCode.faFileCode, _IconMap[chonky.ChonkyIconName.config] = faCogs.faCogs, _IconMap[chonky.ChonkyIconName.model] = faCubes.faCubes, _IconMap[chonky.ChonkyIconName.database] = faDatabase.faDatabase, _IconMap[chonky.ChonkyIconName.text] = faFileAlt.faFileAlt, _IconMap[chonky.ChonkyIconName.archive] = faFileArchive.faFileArchive, _IconMap[chonky.ChonkyIconName.image] = faFileImage.faFileImage, _IconMap[chonky.ChonkyIconName.video] = faFilm.faFilm, _IconMap[chonky.ChonkyIconName.info] = faInfoCircle.faInfoCircle, _IconMap[chonky.ChonkyIconName.key] = faKey.faKey, _IconMap[chonky.ChonkyIconName.lock] = faLock.faLock, _IconMap[chonky.ChonkyIconName.music] = faMusic.faMusic, _IconMap[chonky.ChonkyIconName.terminal] = faTerminal.faTerminal, _IconMap[chonky.ChonkyIconName.users] = faUsers.faUsers, _IconMap[chonky.ChonkyIconName.linux] = faLinux.faLinux, _IconMap[chonky.ChonkyIconName.ubuntu] = faUbuntu.faUbuntu, _IconMap[chonky.ChonkyIconName.windows] = faWindows.faWindows, _IconMap[chonky.ChonkyIconName.rust] = faRust.faRust, _IconMap[chonky.ChonkyIconName.python] = faPython.faPython, _IconMap[chonky.ChonkyIconName.nodejs] = faNodeJs.faNodeJs, _IconMap[chonky.ChonkyIconName.php] = faPhp.faPhp, _IconMap[chonky.ChonkyIconName.git] = faGitAlt.faGitAlt, _IconMap[chonky.ChonkyIconName.adobe] = faAdobe.faAdobe, _IconMap[chonky.ChonkyIconName.pdf] = faFilePdf.faFilePdf, _IconMap[chonky.ChonkyIconName.excel] = faFileExcel.faFileExcel, _IconMap[chonky.ChonkyIconName.word] = faFileWord.faFileWord, _IconMap[chonky.ChonkyIconName.flash] = faRunning.faRunning, _IconMap);
var ChonkyIconFA = /*#__PURE__*/React.memo(function (props) {
  var _IconMap$icon;

  var icon = props.icon;
  var faIcon; // FontAwesome `IconDefinition`

  if (typeof icon === 'object') faIcon = icon;else faIcon = (_IconMap$icon = IconMap[icon]) != null ? _IconMap$icon : IconMap.fallbackIcon;

  var faProps = _extends({}, props, {
    icon: faIcon
  });

  return React.createElement(reactFontawesome.FontAwesomeIcon, Object.assign({}, faProps));
});

exports.ChonkyIconFA = ChonkyIconFA;
//# sourceMappingURL=chonky-icon-fontawesome.cjs.development.js.map
