Math.randomBetween = function(min,max,floor)
{
	var ao = 0;
	if (floor) ao = 1;
	var n = Math.random() * (max - min + ao) + min;
	if (floor) n = Math.floor(n);
	return(n);
};
Math.thisOrThat = function(one, two)
{
    if (Math.random() > 0.5) return one;
    return two;
};
Math.clamp = function(value, min , max)
{
	if (value < min) return min;
	else if (value > max) return max;
	else return value;
};
Math.delta = function(p1,p2)
{
	if (p1 instanceof Array && p2 instanceof Array)
	{
		return([p1[0] - p2[0], p1[1] - p2[1]]);	
	}
	if (p1 instanceof Object && p2 instanceof Object)
	{
		return([p1.x - p2.x, p1.y - p2.y]);
	}
};
Math.rotateVectorRelative = function(v, a)
{
	var nv =
	[
		v[0] * Math.cos(a) - v[1] * Math.sin(a),
		v[0] * Math.sin(a) + v[1] * Math.cos(a)
	];
	return(nv);
};
Math.rotateVectorAbsolute = function(v, a)
{
    var va = Math.vectorAngle(v);
    var nv = Math.rotateVectorRelative(v, a - va);
    return(nv);
};
Math.normalizeVector = function(v)
{
	var l = Math.vectorLength(v),
		nv =
	[
		v[0] /= l,
		v[1] /= l	
	];
	return(nv);
};
Math.vectorAngle = function(v)
{
    return(Math.atan2(v[1], v[0]));
};
Math.vectorLength = function(v)
{
	return(Math.sqrt((v[0] * v[0]) + (v[1] * v[1])))
};
Math.distanceBetween = function(p1, p2)
{
	var l = Math.vectorLength
	(
		Math.delta(p1, p2)
	);
	return(l);
};
Math.circlesIntersect = function(c1, c2)
{
	if ((c1[2] + c2[2]) > Math.distanceBetween(c1,c2))
	{
		return(true);
	}
	return(false);
};
Math.triCross = function(p1, p2, p3)
{
	return((p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]));	
};
Math.pointInTriangle = function(p, p1, p2, p3)
{
	var b1 = false,
		b2 = false,
		b3 = false;
	b1 = Math.triCross(p,p1,p2) < 0;
	b2 = Math.triCross(p,p2,p3) < 0;
	b3 = Math.triCross(p,p3,p1) < 0;
	
	return((b1 === b2) && (b2 === b3));
};
Math.round2 = function(n, p)
{
	var d = Math.pow(10, p);
	return(Math.round(d * n) / d);
};
Math.degtorad = function(d)
{
	return(d * Math.PI / 180);
};
Math.radtodeg = function(r)
{
	return(r * 180 / Math.PI);	
};
Math.pfp = function(p1,p2)
{
	var d = Math.delta(p1, p2),
		r = Math.atan2(d[1], d[0]);
	return(r);
};
Math.opangdeg = function(a)
{
	return(a - 180);
};
Math.opangrad = function(a)
{
	return(a - Math.PI);	
};
Math.spread = function(s, a, sp, i)
{
	return(s - (sp * (a-1) * 0.5) + (i * sp));	
};
//Example spreading 10 with a spread of 10 from 180
/*
var i = 0,
    start = 180,
	amount = 10,
	spread = 10,
	degs = [];
for (i; i < a; ++i)
{
	degs[i] = Math.spread(start, amount, spread, i);
}
*/

Math.PI2 = Math.PI * 2;

Array.prototype.splice2 = function(item)
{
    var i = this.indexOf(item);
    if (i > -1) this.splice(i, 1);
    else return null;
};
Number.prototype.toHex = function()
{
    return this.toString(16);  
};
Number.prototype.toBinary = function()
{
    return this.toString(2);  
};
function isInt(val)
{
    return Number(val) === val && val % 1 === 0;
}
function isFloat(val)
{
    return Number(val) === val && val % 1 !== 0;
}