/**
 * Spectra.js
 * 
 * Wrapping a value with Spectra() returns a Spectra object.
 * 
 * The object's color value is as follows:
 * {
 *   rgb: {
 *     r: 0 to 255,
 *     g: 0 to 255,
 *     b: 0 to 255,
 *   }
 *   hsv: {
 *     h: 0 to 360,
 *     s: 0 to 1,
 *     v: 0 to 1
 *   }
 *   a: 0 to 1 // Alpha
 * }
 */

 (function() {
  var root = this;
  var oldSpectra = root.Spectra;
  /** Conversion functions between formats. */
  var rgbToHsv = function(rgb) {
    var hsv = {};
    var r = Number(rgb.r || rgb.red || 0) / 255;
    var g = Number(rgb.g || rgb.green || 0) / 255;
    var b = Number(rgb.b || rgb.blue || 0) / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;

    hsv.v = max;
    if (hsv.v === 0) {
      hsv.h = 0;
      hsv.s = 0;
    } else {
      hsv.s = (max - min) / max;
      if (hsv.s === 0) {
        hsv.h = 0;
      } else {
        if (max === r) {
          hsv.h = (g - b) / delta;
        } else if (max === g) {
          hsv.h = 2 + (b - r) / delta;
        } else {
          hsv.h = 4 + (r - g) / delta;
        }
        hsv.h *= 60;
        if (hsv.h < 0) {
          hsv.h += 360;
        }
      }
    }

    return hsv;
  };

  var hsvToRgb = function(hsv) {
    var rgb = {r: 0, g: 0, b: 0};

    var h = Number(hsv.r || hsv.red || 0);
    var s = Number(hsv.g || hsv.green || 0);
    var v = Number(hsv.b || hsv.blue || 0);
    var chroma = s * v;
    var hDash = h / 60;
    var x = chroma * (1 - abs((hDash % 2) - 1));

    if(Hdash < 1.0) {
      rgb.r = chroma;
      rgb.g = x;
    } else if(hDash < 2) {
      rgb.r = x;
      rgb.g = chroma;
    } else if(hDash < 3) {
      rgb.g = chroma;
      rgb.b = x;
    } else if(hDash < 4) {
      rgb.g= x;
      rgb.b = chroma;
    } else if(hDash < 5) {
      rgb.r = x;
      rgb.b = chroma;
    } else if(hDash <= 6) {
      rgb.r = chroma;
      rgb.b = x;
    }

    var min = v - chroma;

    rgb.r += min;
    rgb.g += min;
    rgb.b += min;

    return rgb;
  };

  /** Normalization functions */
  var normalize = function(arg) {
    var color = arg;
    color.a = color.a || 1;

    if (color.rgb !== undefined) {
      color.hsv = rgbToHsv(color.rgb);
    } else if (color.hsv !== undefined) {
      color.rgb = hsvToRgb(color.hsv);
    }

    if (color.rgb.red !== undefined) {
      color.rgb.r = color.rgb.red;
    }
    if (color.rgb.green !== undefined) {
      color.rgb.g = color.rgb.green;
    }
    if (color.rgb.blue !== undefined) {
      color.rgb.b = color.rgb.blue;
    }

    return color;
  };

  /** Wrapper */
  var Spectra = function(arg) {
    if (typeof arg == 'object') {
      if (arg.r !== undefined || arg.red !== undefined) {
        this.color = normalize({rgb: arg});
      }
    }
    return this;
  };

  /** Getters and Setters */
  Spectra.prototype.red = function(arg) {
    var color = this.color;
    if (arg) {
      color.rgb.r = arg;
      this.color = normalize({rgb: color.rgb});
      return this;
    } else {
      return color.rgb.r;
    }
  };
  Spectra.prototype.green = function(arg) {
    var color = this.color;
    if (arg) {
      color.rgb.g = arg;
      this.color = normalize({rgb: color.rgb});
      return this;
    } else {
      return color.rgb.g;
    }
  };
  Spectra.prototype.blue = function(arg) {
    var color = this.color;
    if (arg) {
      color.rgb.b = arg;
      this.color = normalize({rgb: color.rgb});
      return this;
    } else {
      return color.rgb.b;
    }
  };

  /** Wrapper */
  var spectraWrapper = function(arg) {
    return new Spectra(arg);
  };

  Spectra.noConflict = function() {
    root.Spectra = oldSpectra;
    return this;
  };

  root.Spectra = spectraWrapper;
}).call(this);