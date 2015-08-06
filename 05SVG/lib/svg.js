/**
 *
 *
 *  Convert & Draw SVG based on preparsed JSON file
 *
 *
 */

function toAbsoluteSVG(data, scale, offsetX, offsetY) {
  var results = [];
  for (var i = 0; i < data.length; i++) {
    var letter = [];
    var curX, curY, ctrX, ctrY;
    for (var j = 0; j < data[i].length; j++) {
      var command = {};
      var one = data[i][j];
      switch (one.code) {
        case 'M':
          command.code = 'M';
          command.x = curX = one.x * scale + offsetX;
          command.y = curY = one.y * scale + offsetY;
          break;
        case 'l':
          command.code = 'L';
          command.x = curX += one.x * scale;
          command.y = curY += one.y * scale;
          break;
        case 'L':
          command.code = 'L';
          command.x = curX = one.x * scale + offsetX;
          command.y = curY = one.y * scale + offsetY;
          break;
        case 'v':
          command.code = 'L';
          command.x = curX;
          command.y = curY += one.y * scale;
          break;
        case 'V':
          command.code = 'L';
          command.x = curX;
          command.y = curY = one.y * scale + offsetY;
          break;
        case 'h':
          command.code = 'L';
          command.x = curX += one.x * scale;
          command.y = curY;
          break;
        case 'H':
          command.code = 'L';
          command.x = curX = one.x * scale + offsetX;
          command.y = curY;
          break;
        case 'c':
          command.code = 'C';
          command.x1 = curX + one.x1 * scale;
          command.y1 = curY + one.y1 * scale;
          command.x2 = ctrX = curX + one.x2 * scale;
          command.y2 = ctrY = curY + one.y2 * scale;
          command.x = curX += one.x * scale;
          command.y = curY += one.y * scale;
          break;
        case 'C':
          command.code = 'C';
          command.x1 = one.x1 * scale + offsetX;
          command.y1 = one.y1 * scale + offsetY;
          command.x2 = ctrX = one.x2 * scale + offsetX;
          command.y2 = ctrY = one.y2 * scale + offsetY;
          command.x = curX = one.x * scale + offsetX;
          command.y = curY = one.y * scale + offsetY;
          break;
        case 's':
          command.code = 'C';
          command.x1 = curX * 2 - ctrX;
          command.y1 = curY * 2 - ctrY;
          command.x2 = ctrX = curX + one.x2 * scale;
          command.y2 = ctrY = curY + one.y2 * scale;
          command.x = curX += one.x * scale;
          command.y = curY += one.y * scale;
          break;
        case 'S':
          command.code = 'C';
          command.x1 = curX * 2 - ctrX;
          command.y1 = curY * 2 - ctrY;
          command.x2 = ctrX = one.x2 * scale + offsetX;
          command.y2 = ctrY = one.y2 * scale + offsetY;
          command.x = curX = one.x * scale + offsetX;
          command.y = curY = one.y * scale + offsetY;
          break;
        case 'Z':
          command.code = 'Z';
          break;
        default:
          print(one.code);
      }
      letter.push(command);
    }
    results.push(letter);
  }
  return results;
}

function drawSVG(data) {
  for (var i = 0; i < data.length; i++) {
    var clipStart = false;
    for (var j = 0; j < data[i].length; j++) {
      var one = data[i][j];
      switch (one.code) {
        case 'M':
          if (j == 0) {
            beginShape();
          }
          vertex(one.x, one.y);
          break;
        case 'L':
          vertex(one.x, one.y);
          break;
        case 'C':
          bezierVertex(one.x1, one.y1, one.x2, one.y2, one.x, one.y);
          break;
        case 'Z':
          if (j != data[i].length - 1) {
            if (clipStart) {
              endContour();
            }
            beginContour();
            clipStart = true;
          } else {
            if (clipStart) {
              endContour();
            }
            endShape(CLOSE);
          }
          break;
        default:
          break;
      }
    }
  }
}
