var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var Color = function()
    {
        throw 'Cannot be instantiated';  
    };
    Color.Mix = function(_a_Colors)
    {
        _a_Colors = _a_Colors || {};
        var s_Color = '#';
        if (_a_Colors._R1 === undefined) s_Color += Math.randomBetween(0, 15, true).toHex();
        else if (_a_Colors._R1 === 0) s_Color += '0';
        else if (_a_Colors._R1 === 1) s_Color += 'f';
        else if (typeof _a_Colors._R1 === 'string') s_Color += _a_Colors._R1;
        
        if (_a_Colors._R2 === undefined) s_Color += Math.randomBetween(0, 15, true).toHex();
        else if (_a_Colors._R2 === 0) s_Color += '0';
        else if (_a_Colors._R2 === 1) s_Color += 'f';
        else if (typeof _a_Colors._R2 === 'string') s_Color += _a_Colors._R2;
        
        if (_a_Colors._G1 === undefined) s_Color += Math.randomBetween(0, 15, true).toHex();
        else if (_a_Colors._G1 === 0) s_Color += '0';
        else if (_a_Colors._G1 === 1) s_Color += 'f';
        else if (typeof _a_Colors._G1 === 'string') s_Color += _a_Colors._G1;
        
        if (_a_Colors._G2 === undefined) s_Color += Math.randomBetween(0, 15, true).toHex();
        else if (_a_Colors._G2 === 0) s_Color += '0';
        else if (_a_Colors._G2 === 1) s_Color += 'f';
        else if (typeof _a_Colors._G2 === 'string') s_Color += _a_Colors._G2;
        
        if (_a_Colors._B1 === undefined) s_Color += Math.randomBetween(0, 15, true).toHex();
        else if (_a_Colors._B1 === 0) s_Color += '0';
        else if (_a_Colors._B1 === 1) s_Color += 'f';
        else if (typeof _a_Colors._B1 === 'string') s_Color += _a_Colors._B1;
        
        if (_a_Colors._B2 === undefined) s_Color += Math.randomBetween(0, 15, true).toHex();
        else if (_a_Colors._B2 === 0) s_Color += '0';
        else if (_a_Colors._B2 === 1) s_Color += 'f';
        else if (typeof _a_Colors._B2 === 'string') s_Color += _a_Colors._B2;
        
        return(s_Color);
    };
    Color.MixGrey = function(_MAX, _MIN)
    {
        _MAX = _MAX || 15;
        _MIN = _MIN || 0;
        var s_Hex = Math.randomBetween(_MIN, _MAX, true).toHex();
            s_Hex += Math.randomBetween(_MIN, _MAX, true).toHex();
        var s_Color = '#' + s_Hex + s_Hex + s_Hex;
        return s_Color; 
    };
    Color.MixRed = function()
    {
        return Color.Mix({_G1: 0, _G2: 0, _B1: 0, _B2: 0});
    };
    Color.MixGreen = function()
    {
        return Color.Mix({_R1: 0, _R2: 0, _B1: 0, _B2: 0});
    };
    Color.MixBlue = function()
    {
        return Color.Mix({_R1: 0, _R2: 0, _G1: 0, _G2: 0});
    };
    Color.MixRedGreen = function()
    {
        return Color.Mix({_B1: 0, _B2: 0});
    };
    Color.MixRedBlue = function()
    {
        return Color.Mix({_G1: 0, _G2: 0});
    };
    Color.MixGreenBlue = function()
    {
        return Color.Mix({_R1: 0, _R2: 0});
    };
    Color.MixRedFullGreen = function()
    {
        return Color.Mix({_G1: 1, _G2: 1, _B1: 0, _B2: 0});
    };
    Color.MixRedFullBlue = function()
    {
        return Color.Mix({_G1: 0, _G2: 0, _B1: 1, _B2: 1});
    };
    Color.MixGreenFullRed = function()
    {
        return Color.Mix({_R1: 1, _R2: 1, _B1: 0, _B2: 0});
    };
    Color.MixGreenFullBlue = function()
    {
        return Color.Mix({_R1: 0, _R2: 0, _B1: 1, _B2: 1});
    };
    Color.MixBlueFullRed = function()
    {
        return Color.Mix({_G1: 0, _G2: 0, _R1: 1, _R2: 1});
    };
    Color.MixBlueFullGreen = function()
    {
        return Color.Mix({_G1: 1, _G2: 1, _R1: 0, _R2: 0});
    };
    Color.MixRedFullGreenFullBlue = function()
    {
        return Color.Mix({_G1: 1, _G2: 1, _B1: 1, _B2: 1});
    };
    Color.MixGreenFullRedFullBlue = function()
    {
        return Color.Mix({_R1: 1, _R2: 1, _B1: 1, _B2: 1});
    };
    Color.MixBlueFullRedFullGreen = function()
    {
        return Color.Mix({_G1: 1, _G2: 1, _R1: 1, _R2: 1});
    };
	Color.Convert = function(_s_Color)
	{
		var s_Color = _s_Color.toHex();
		return '#'+('000000'.substr(0,6-s_Color.length) + s_Color.toLowerCase());
	};
    nenkraftjs.Color = Color;
}());