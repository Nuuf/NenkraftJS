var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var Texture = function()
    {
        
    }
    
    var q = Texture.prototype;
    q.Initialise = function()
    {
        this.s_ID = null;
        this.a_Size = [0,0,0];
        this.a_RegisterPoint = [0,0];
    };
    q.Render = function(_ctx_Context){};
    q.SetRenderingFunction = function(_f_RenderingFunction)
    {
        this.Render = _f_RenderingFunction;
        return this;  
    };
    q.SetID = function(_s_ID)
    {
        this.s_ID = _s_ID;
        return this;
    };
    q.SetSize = function(_a_Size)
    {
        this.a_Size = _a_Size;
        return this;  
    };
    q.SetWidth = function(_i_Width)
    {
        this.a_Size[0] = _i_Width;
        return this;  
    };
    q.SetHeight = function(_i_Height)
    {
        this.a_Size[1] = _i_Height;
        return this;  
    };
    q.SetRadius = function(_i_Radius)
    {
        this.a_Size[2] = _i_Radius;
        return this;
    }
    q.SetRegisterPoint = function(_a_RegisterPoint)
    {
        this.a_RegisterPoint = _a_RegisterPoint;
        return this;  
    };
    q.SetRegisterPointX = function(_i_X)
    {
        this.a_RegisterPoint[0] = _i_X;
        return this;  
    };
    q.SetRegisterPointY = function(_i_Y)
    {
        this.a_RegisterPoint[1] = _i_Y;
        return this;  
    };
    q.GetID = function()
    {
        return this.s_ID;
    };
    q.GetSize = function()
    {
        return this.a_Size;
    };
    q.GetWidth = function()
    {
        return this.a_Size[0];
    };
    q.GetHeight = function()
    {
        return this.a_Size[1];
    };
    q.GetRadius = function()
    {
        return this.a_Size[2];  
    };
    q.GetRegisterPoint = function()
    {
        return this.a_RegisterPoint;
    };
    q.GetRegisterPointX = function()
    {
        return this.a_RegisterPoint[0];
    };
    q.GetRegisterPointY = function()
    {
        return this.a_RegisterPoint[1];
    };
    
    Texture.Create = function()
    {
        var o_Texture = new Texture();
        o_Texture.Initialise();
        return o_Texture;
    };
    
    nenkraftjs.Texture = Texture;
}());