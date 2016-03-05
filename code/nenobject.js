var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";  
    var NenObject = function()
    {
        
    };
    
    var q = NenObject.prototype;
    q.Initialise = function()
    {
        this.a_Position = [0, 0];
        this.a_Offset = [0, 0];
        this.a_Scale = [1.0, 1.0];
        
        this.f_Alpha = 1.0;
        
        this.f_Rotation = 0;
    };
    q.SetAlpha = function(_f_Alpha)
    {
        this.f_Alpha = _f_Alpha;
        if (this.f_Alpha < 0) this.f_Alpha = 0;
        if (this.f_Alpha > 1) this.f_Alpha = 1;
        return this;
    };
    q.SetAlphaRelative = function(_f_Alpha)
    {
        this.f_Alpha += _f_Alpha;
        if (this.f_Alpha < 0) this.f_Alpha = 0;
        if (this.f_Alpha > 1) this.f_Alpha = 1;
        return this;
    };
    q.SetRotation = function(_f_Rotation)
    { 
        this.f_Rotation = _f_Rotation;
        return this;  
    };
    q.SetRotationRelative = function(_f_Rotation)
    {
        this.f_Rotation += _f_Rotation;
        return this;  
    };
    q.SetPosition = function(_a_Position)
    {
        this.a_Position = _a_Position;
        return this;
    };
    q.SetPositionRelative = function(_a_Position)
    {
        this.a_Position[0] += _a_Position[0];
        this.a_Position[1] += _a_Position[1];
        return this;
    };
    q.SetX = function(_i_X)
    {
        this.a_Position[0] = _i_X;
        return this;
    };
    q.SetXRelative = function(_i_X)
    {
        this.a_Position[0] += _i_X;
        return this;
    };
    q.SetY = function(_i_Y)
    {
        this.a_Position[1] = _i_Y;
        return this;
    };
    q.SetYRelative = function(_i_Y)
    {
        this.a_Position[1] += _i_Y;
        return this;
    };
    q.SetScale = function(_a_Scale)
    {
        this.a_Scale = _a_Scale;
        return this;
    };
    q.SetScaleRelative = function(_a_Scale)
    {
        this.a_Scale[0] += _a_Scale[0];
        this.a_Scale[1] += _a_Scale[1];
        return this;
    };
    q.SetScaleX = function(_i_X)
    {
        this.a_Scale[0] = _i_X;
        return this;
    };
    q.SetScaleXRelative = function(_i_X)
    {
        this.a_Scale[0] += _i_X;
        return this;
    };
    q.SetScaleY = function(_i_Y)
    {
        this.a_Scale[1] = _i_Y;
        return this;
    };
    q.SetScaleYRelative = function(_i_Y)
    {
        this.a_Scale[1] += _i_Y;
        return this;
    };
    q.SetScaleMultiple = function(_a_Scale)
    {
        this.a_Scale[0] *= _a_Scale[0];
        this.a_Scale[1] *= _a_Scale[1];
        return this;  
    };
    q.SetOffset = function(_a_Offset)
    {
        this.a_Offset = _a_Offset;
        return this; 
    };
    q.SetOffsetX = function(_i_X)
    {
        this.a_Offset[0] = _i_X;
        return this;
    };
    q.SetOffsetY = function(_i_Y)
    {
        this.a_Offset[1] = _i_Y;
        return this;
    };
    
    q.GetAlpha = function()
    {
        return this.f_Alpha;
    };
    q.GetRotation = function()
    {
        return this.f_Rotation;  
    };
    q.GetPosition = function()
    {
        return this.a_Position;  
    };
    q.GetX = function()
    {
        return this.a_Position[0];  
    };
    q.GetY = function()
    {
        return this.a_Position[1];  
    };
    q.GetScale = function()
    {
        return this.a_Scale;  
    };
    q.GetScaleX = function()
    {
        return this.a_Scale[0];  
    };
    q.GetScaleY = function()
    {
        return this.a_Scale[1];  
    };
    q.GetOffset = function()
    {
        return this.a_Offset;  
    };
    q.GetOffsetX = function()
    {
        return this.a_Offset[0];  
    };
    q.GetOffsetY = function()
    {
        return this.a_Offset[1];  
    };
    
    NenObject.Create = function()
    {
        var o_NenObject = new NenObject();
        o_NenObject.Initialise();
        return o_NenObject;
    };
    
    nenkraftjs.NenObject = NenObject;
}());