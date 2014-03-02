/**
 * hexagon geometry - evenly subdivided
 * @param radius
 * @param {int=} segments - subdivisions
 * @param {Number=} theta - default "pointy top" (Math.PI/2 for "flat top")
 * @constructor
 * @author lmg / https://github.com/kishalmi
 */

THREE.HexGeometry = function (radius, segments, startSegment, theta) {

    THREE.Geometry.call(this);

    this.radius = radius || 50;
    this.segments = (segments !== undefined) ? Math.max(1, segments) : 1;
    this.startSegment = (startSegment !== undefined) ? Math.max(0, startSegment) : 1;
    this.theta = (theta !== undefined) ? theta : 0;

    var n = new THREE.Vector3(0, 0, 1);

    var z = 0;

// center
    var drawCenter = false;
    if(this.startSegment == 0){
        this.startSegment = 1;
        drawCenter = true;
        this.vertices.push(new THREE.Vector3(0, 0, z));
    }
    var nVertex = 0;
    var nVertexRing = 1;

    var buildFace = false;

// add rings
    for (var iRing = this.startSegment; iRing <= this.segments; iRing++) {
        if (iRing > this.startSegment || drawCenter) {
            buildFace = true;
        }
//   for (var iRing = 1; iRing <= this.segments; iRing++) {
        var r = this.radius * iRing / this.segments;
        var nVertexInner = nVertex;
        nVertex = this.vertices.length;
        var nVertexRingInner = nVertexRing;
        nVertexRing = iRing * 6;

        for (var iSide = 0; iSide < 6; iSide++) {
            var a1 = this.theta + iSide / 6 * 2 * Math.PI;
            var a2 = this.theta + (iSide + 1) / 6 * 2 * Math.PI;
            var v1 = new THREE.Vector3(r * Math.sin(a1), r * Math.cos(a1), z);
            var v2 = new THREE.Vector3(r * Math.sin(a2), r * Math.cos(a2), z);

            for (var iLerp = 0; iLerp < iRing; iLerp++) {
                var l = iLerp / iRing;
                var iVertex = this.vertices.push(v1.clone().lerp(v2, l)) - 1;
                if (buildFace) {
                    var iVertexRight = nVertex + (iVertex - nVertex + 1) % nVertexRing;
                    var iVertexInnerRight = nVertexInner + (iVertex - nVertex - iSide) % nVertexRingInner;
                    this.faces.push(new THREE.Face3(
                        iVertexRight, iVertex, iVertexInnerRight,
                        [n.clone(), n.clone(), n.clone()]
                    ));

                    if (iLerp) {
                        var iVertexInnerLeft = iVertex - nVertexRingInner - iSide - 1;
                        this.faces.push(new THREE.Face3(
                            iVertex, iVertexInnerLeft, iVertexInnerRight,
                            [n.clone(), n.clone(), n.clone()]
                        ));
                    }
                }
            }
        }
    }

// set UVs
    var geo = this;
    var v2uv = function (vIndex) {
        return new THREE.Vector2(
            0.5 + r / 2 * geo.vertices[vIndex].x,
            0.5 + r / 2 * geo.vertices[vIndex].y
        );
    };
    for (var f = 0, fl = this.faces.length; f < fl; f++) {
        var face = this.faces[f];
        geo.faceVertexUvs[0].push([v2uv(face.a), v2uv(face.b), v2uv(face.c)]);
    }

    this.computeCentroids();
    this.computeFaceNormals();

    this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);

};
THREE.HexGeometry.prototype = Object.create(THREE.Geometry.prototype);
