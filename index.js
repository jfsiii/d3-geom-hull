(function() {
    !function() {
        var d3 = {
            version: "3.4.4"
        };
        function d3_functor(v) {
            return typeof v === "function" ? v : function() {
                return v;
            };
        }
        d3.functor = d3_functor;
        var π = Math.PI, τ = 2 * π, halfπ = π / 2, ε = 1e-6, ε2 = ε * ε, d3_radians = π / 180, d3_degrees = 180 / π;
        function d3_sgn(x) {
            return x > 0 ? 1 : x < 0 ? -1 : 0;
        }
        function d3_cross2d(a, b, c) {
            return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
        }
        function d3_acos(x) {
            return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
        }
        function d3_asin(x) {
            return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
        }
        function d3_sinh(x) {
            return ((x = Math.exp(x)) - 1 / x) / 2;
        }
        function d3_cosh(x) {
            return ((x = Math.exp(x)) + 1 / x) / 2;
        }
        function d3_tanh(x) {
            return ((x = Math.exp(2 * x)) - 1) / (x + 1);
        }
        function d3_haversin(x) {
            return (x = Math.sin(x / 2)) * x;
        }
        d3.geom = {};
        function d3_geom_pointX(d) {
            return d[0];
        }
        function d3_geom_pointY(d) {
            return d[1];
        }
        d3.geom.hull = function(vertices) {
            var x = d3_geom_pointX, y = d3_geom_pointY;
            if (arguments.length) return hull(vertices);
            function hull(data) {
                if (data.length < 3) return [];
                var fx = d3_functor(x), fy = d3_functor(y), i, n = data.length, points = [], flippedPoints = [];
                for (i = 0; i < n; i++) {
                    points.push([ +fx.call(this, data[i], i), +fy.call(this, data[i], i), i ]);
                }
                points.sort(d3_geom_hullOrder);
                for (i = 0; i < n; i++) flippedPoints.push([ points[i][0], -points[i][1] ]);
                var upper = d3_geom_hullUpper(points), lower = d3_geom_hullUpper(flippedPoints);
                var skipLeft = lower[0] === upper[0], skipRight = lower[lower.length - 1] === upper[upper.length - 1], polygon = [];
                for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);
                for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);
                return polygon;
            }
            hull.x = function(_) {
                return arguments.length ? (x = _, hull) : x;
            };
            hull.y = function(_) {
                return arguments.length ? (y = _, hull) : y;
            };
            return hull;
        };
        function d3_geom_hullUpper(points) {
            var n = points.length, hull = [ 0, 1 ], hs = 2;
            for (var i = 2; i < n; i++) {
                while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0) --hs;
                hull[hs++] = i;
            }
            return hull.slice(0, hs);
        }
        function d3_geom_hullOrder(a, b) {
            return a[0] - b[0] || a[1] - b[1];
        }
        if (typeof define === "function" && define.amd) {
            define(d3);
        } else if (typeof module === "object" && module.exports) {
            module.exports = d3;
        } else {
            this.d3 = d3;
        }
    }();
})();