var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var TextureVector = function()
    {
        
    };
    var q = TextureVector.prototype = new nenkraftjs.Texture();
    q.Initialise = function()
    {
        nenkraftjs.Texture.prototype.Initialise.call(this);
        this.a_Color = [nenkraftjs.Color.Mix(), nenkraftjs.Color.Mix()];
        this.i_LineWidth = 1;
    };
    q.SetColor = function(_a_Color)
    {
        this.a_Color = _a_Color;
        return this;
    };
    q.SetFill = function(_s_Fill)
    {
        this.a_Color[0] = _s_Fill;
        return this;
    };
    q.SetStroke = function(_s_Stroke)
    {
        this.a_Color[1] = _s_Stroke;
        return this;
    };
    q.SetLineWidth = function(_i_LineWidth)
    {
        this.i_LineWidth = _i_LineWidth;
        return this;
    };
    q.GetColor = function()
    {
        return this.a_Color;
    };
    q.GetFill = function()
    {
        return this.a_Color[0];
    };
    q.GetStroke = function()
    {
        return this.a_Color[1];
    };
    q.GetLineWidth = function()
    {
        return this.i_LineWidth;
    };
    TextureVector.Create = function()
    {
        var o_TextureVector = new TextureVector();
        o_TextureVector.Initialise();
        return o_TextureVector;
    };
    TextureVector.Rectangle = function(_ctx_Context)
    {
        var a_Color = this.GetColor(),
        a_Size = this.GetSize(),
        a_RegistrationPoint = this.GetRegistrationPoint();

        if (a_Color[0] === null && a_Color[1] === null) return;

        if (a_Color[0] !== null) _ctx_Context.fillStyle = a_Color[0];
        if (a_Color[1] !== null) _ctx_Context.strokeStyle = a_Color[1];
        _ctx_Context.lineWidth = this.i_LineWidth;
        _ctx_Context.beginPath();
        
        _ctx_Context.rect
        (
            a_RegistrationPoint[0],
            a_RegistrationPoint[1],
            a_Size[0],
            a_Size[1]
        );
        if (a_Color[0] !== null) _ctx_Context.fill();
        if (a_Color[1] !== null) _ctx_Context.stroke();
        
        _ctx_Context.closePath(); 
    };
    TextureVector.Circle = function(_ctx_Context)
    {
        var a_Color = this.GetColor(),
            a_Size = this.GetSize(),
            a_RegistrationPoint = this.GetRegistrationPoint();
        
        if (a_Color[0] === null && a_Color[1] === null) return;
        
        if (a_Color[0] !== null) _ctx_Context.fillStyle = a_Color[0];
        if (a_Color[1] !== null) _ctx_Context.strokeStyle = a_Color[1];
        
        _ctx_Context.lineWidth = this.i_LineWidth;
        _ctx_Context.beginPath();
        _ctx_Context.arc
        (
            a_RegistrationPoint[0],
            a_RegistrationPoint[1], 
            a_Size[2], 
            0, 
            Math.PI2,
            false
        );
        if (a_Color[0] !== null) _ctx_Context.fill();
        if (a_Color[1] !== null) _ctx_Context.stroke();
        _ctx_Context.closePath();
    };
    nenkraftjs.TextureVector = TextureVector;
}());