
// CSE 190 M, Homework 6: ASCIImation
// This file contains the ASCII animations as large strings.
//
// You can refer to them by variable names such as blank or dive, or by indexes
// into an array ANIMATIONS, such as ANIMATIONS["Bike"] or ANIMATIONS["Dive"].
//
// The former is probably more intuitive for new programmers, but the latter
// may allow you to write more elegant code by indexing using the text of the
// menu option selected in the HTML.  (See bottom of file.)
//
// (Hint: The array index you want is the same as the select box's selected value...)
//
// YOU SHOULD NOT EDIT THIS FILE IN ANY WAY.
// TO ADD YOUR CUSTOM ANIMATION, CREATE YOUR OWN FILE myanimation.js AND
// PUT YOUR CODE IN THERE.  In myanimation.js, it is legal for you to modify
// the variables that have been declared in this file.

var BLANK = "";

var CUSTOM = "";   // you could change the value of this variable in your code

var EXERCISE = "  o\n" +
    " /#\\\n" +
    " _|_\n" +
    "=====\n" +
    " \\o/\n" +
    "  #\n" +
    "_/ \\_\n";

var JUGGLER = "   o\n" +
    "   O\n" +
    " o/|\\o\n" +
    "  / \\\n" +
    "=====\n" +
    "    o\n" +
    " o_O\n" +
    "   |o\n" +
    "  / \\\n" +
    "=====\n" +
    " o   o\n" +
    "  \\O\n" +
    "   o\\\n" +
    "  / \\\n" +
    "=====\n" +
    "  o\n" +
    "  _O_o\n" +
    "  o|\n" +
    "  / \\\n";

var BIKE = "\n" +
    "   _o\n" +
    " _< \\\\_\n" +
    "(_)>(_)            .\n" +
    "=====\n" +
    "\n" +
    "     _o\n" +
    "   _< \\\\_\n" +
    "  (_)>(_)          .\n" +
    "=====\n" +
    "\n" +
    "       _o\n" +
    "     _< \\\\_\n" +
    "    (_)>(_)        .\n" +
    "=====\n" +
    "          o\n" +
    "         /\\\\_\n" +
    "       _< (_)\n" +
    "      (_)          .\n" +
    "=====\n" +
    "            o\n" +
    "           /\\\\_\n" +
    "         _< (_)\n" +
    "        (_)        .\n" +
    "=====\n" +
    "             _\n" +
    "           _ \\\\\\\\o\n" +
    "          (_)/<_\n" +
    "              (_)  .\n" +
    "\n" +
    "=====\n" +
    "               _\n" +
    "             _ \\\\\\\\o\n" +
    "            (_)/<_\n" +
    "                (_).\n" +
    "=====\n" +
    "                  _\n" +
    "                 (_)\\\\__/o\n" +
    "                   \\\\_| \\\\\n" +
    "                  .(_)\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\' \\\\/\n" +
    "                  .  (_)\'  _\\\\o_\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\'  \\\\/\n" +
    "                  .  (_)\'   _\\\\o_\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\'   \\\\/\n" +
    "                  .  (_)\'    _\\\\o_\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\'    \\\\/\n" +
    "                  .  (_)\'     _\\\\o_\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\'    \\\\/\n" +
    "                  .  (_)\'     _\\\\_o\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\'    \\\\/\n" +
    "                  .  (_)\'     _\\\\__o\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\'    \\\\/\n" +
    "                  .  (_)\'     _\\\\__ o\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\'    \\\\/\n" +
    "                  .  (_)\'     _\\\\__  o\n" +
    "=====\n" +
    "                       _\n" +
    "                      (_)\n" +
    "                      _|/\'    \\\\/\n" +
    "                  .  (_)\'     _\\\\__   o\n";

var DIVE = "  o\n" +
    " /|\\\n" +
    ",/ \\\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "..,..,,.,...,,|.,|..,.,,...,..,,,..,..,..,.,\n" +
    "=====\n" +
    "     o\n" +
    "    -|-\n" +
    "    / \\\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,..,,.,..,,.,|..|.,.,,,...,.,,...,,,.,..,,,\n" +
    "=====\n" +
    "      \\o/\n" +
    "       |\n" +
    "      / \\\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,..,,.,..,,.,|..|.,.,,,...,.,,...,,,.,..,,,\n" +
    "=====\n" +
    "        \\o/\n" +
    "        /\n" +
    "       / \\\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,..,,.,..,,.,|..|.,.,,,...,.,,...,,,.,..,,,\n" +
    "=====\n" +
    "            |o__\n" +
    "            /\n" +
    "          /\\\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,.,.,.,.,.,|.,|..,,..,,.,.,..,,,,.,,.,.,.\n" +
    "=====\n" +
    "              o/__\n" +
    "           __/\n" +
    "             \\\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,.,.,.,.,.,|.,|..,,..,,.,.,..,,,,.,,.,.,.\n" +
    "=====\n" +
    "\n" +
    "                  __ o__\n" +
    "                 /)  \\\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "...,,,...,.,.,|..|.,.,...,,,.,..,.,.,,,..,..\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "                           \\)\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/    \\\n" +
    "-|----------|-|--|-|--\'    /o\\\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "....,...,...,,|,,|,.,.,.,.,.,.,.,....,,,,,..\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |           \\|\n" +
    "              |  |            \\o\n" +
    "              |  |            ( \\\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,,....,,...|.,|.,.,.,.,.,.,.,.,.,.,.,.,,,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |                \\)\n" +
    "              |  |                |\n" +
    "              |  |               /o\\\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,,,...,.,,,,,|.,|.,,,.,.,,.,..,.,,....,,,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |                 \\ /\n" +
    "              |  |                  |\n" +
    "              |  |                 /o\\\n" +
    ",..,.,..,,.,.,|,,|.,,,.,,.,,.,...,,..,,.,..,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,,.,,.,,.,,.,|.,|.,,...,,.,.,..,,.,\\|.,..,.\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |                `.\' \'.\n" +
    ".,,.,,.,,.,,.,|.,|.,,...,,.,.,..,,.,`\'.,..,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.,.,,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.,.,,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.,.,,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.\\o/,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.\\o/,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |           .--.-.--.-.---.--.\n" +
    "              |  |          (YEA, that was fun!)\n" +
    "              |  |           `-\'.\'\'--\'-\'--\'`--\'\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.\\o/,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |           .--.-.--.-.---.--.\n" +
    "              |  |          (YEA, that was fun!)\n" +
    "              |  |           `-\'.\'\'--\'-\'--\'`--\'\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.\\o/,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |           .--.-.--.-.---.--.\n" +
    "              |  |          (YEA, that was fun!)\n" +
    "              |  |           `-\'.\'\'--\'-\'--\'`--\'\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.\\o/,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |           .--.-.--.-.---.--.\n" +
    "              |  |          (YEA, that was fun!)\n" +
    "              |  |           `-\'.\'\'--\'-\'--\'`--\'\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.\\o/,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.\\o/,.,\n" +
    "=====\n" +
    "\n" +
    "\n" +
    "\n" +
    "\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"\'\"/\n" +
    "-|----------|-|--|-|--\'\n" +
    "/            \\ \\/ /\n" +
    "              )  (\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    "              |  |\n" +
    ".,.,,,,.,.,,.,|..|.,,,,.,..,,.,.,,.,.\\o/,.,\n";


// can also access the animations as an associative array / hash map,
// such as ANIMATIONS["Bike"] or ANIMATIONS["Dive"]
var ANIMATIONS = [];
ANIMATIONS["Blank"] = ANIMATIONS["blank"] = ANIMATIONS["BLANK"] = "";
ANIMATIONS["Custom"] = ANIMATIONS["custom"] = ANIMATIONS["CUSTOM"] = CUSTOM;   // you could change the value of this in your code
ANIMATIONS["Exercise"] = ANIMATIONS["exercise"] = ANIMATIONS["EXERCISE"] = EXERCISE;
ANIMATIONS["Juggler"] = ANIMATIONS["juggler"] = ANIMATIONS["JUGGLER"] = JUGGLER;
ANIMATIONS["Bike"] = ANIMATIONS["bike"] = ANIMATIONS["BIKE"] = BIKE;
ANIMATIONS["Dive"] = ANIMATIONS["dive"] = ANIMATIONS["DIVE"] = DIVE;

let timer = null;
let content = "";
function setTextAreaContent(content) {
    textArea.value = content;
    alert("hello world");
}
function onStart () {

   document.getElementById("stop").disabled = false;
   let args = ANIMATIONS[this.value].split("=====");
   let argsLength = args.length; 
   let idx = 0;
}

function draw(timePassed, draft) {
    document.getElementById("text-area").value = draft;
}
function onChoose () {
    
    if (timer != null ) clearInterval(timer);
    let speed = document.getElementById("turbo").checked == true ?  50 : 2500;
    content = document.getElementById("text-area").value;
    document.getElementById("stop").disabled = false;
 
    let args = ANIMATIONS[this.value].split("=====");
    let argsLength = args.length; let i = 0;
    let start = Date.now(); 

    timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (i === argsLength ) i = 0;
        draw(timePassed, args[i]); i++;
    },speed);

}
function onStop () {
    document.getElementById("text-area").value = content;
    clearInterval(timer);
}
function onCheck () {
    let data = document.getElementById("turbo").checked == true ?  50 : 2500;
    asciiAnimation(data);
}
function asciiAnimation(data) {
    if (timer != null ) clearInterval(timer);
    content = document.getElementById("text-area").value;
 
    let args = ANIMATIONS[this.value].split("=====");
    let argsLength = args.length; let i = 0;
    let start = Date.now(); 

    timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (i === argsLength ) i = 0;
        draw(timePassed, args[i]); i++;
    },data);
}
function onFontSizeSelected () {
    let size = 0;
    if (this.value == "Tiny") size = 7;
    else if (this.value == "Small") size = 7;
    else if (this.value == "Medium") size = 12;
    else if (this.value == "Large") size = 16;
    else  size = 24;

    document.getElementById("text-area").style.fontSize = size + 'pt';
}
window.onload = function() {
    let startButt = document.getElementById("start");
    startButt.onclick = onStart;
    document.getElementById("stop").onclick = onStop;
    document.getElementById("animation").onchange = onChoose;
    document.getElementById("turbo").onchange = onCheck;
    document.getElementById("fontsize").onchange = onFontSizeSelected;
}

