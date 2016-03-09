var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var TextureText = function()
    {
        
    };
    var q = TextureText.prototype = new nenkraftjs.Texture();
    q.Initialise = function()
    {
        nenkraftjs.Texture.prototype.Initialise.call(this);
        this.s_String = null;
        this.s_Font = null;
        this.s_Color = null;
        delete this.a_Size;
        delete this.SetSize;
        delete this.SetWidth;
        delete this.SetHeight;
        delete this.GetSize;
        delete this.GetWidth;
        delete this.GetHeight;
    };
    q.Render = function(_ctx_Context)
    {
        var a_RegistrationPoint = this.GetRegistrationPoint();
         _ctx_Context.fillStyle = this.s_Color;
         _ctx_Context.font = this.s_Font;
         _ctx_Context.fillText(this.s_String, a_RegistrationPoint[0], a_RegistrationPoint[1]);
    };
    q.SetString = function(_s_String)
    {
        this.s_String = _s_String;
        return this;
    };
    q.SetFont = function(_s_Font)
    {
        this.s_Font = _s_Font;
        return this;
    };
    q.SetColor = function(_s_Color)
    {
        this.s_Color = _s_Color;
        return this;
    };
    q.GetString = function()
    {
        return this.s_String;
    };
    q.GetFont = function()
    {
        return this.s_Font;
    };
    q.GetColor = function()
    {
        return this.s_Color;
    };
    TextureText.Create = function()
    {
         var o_TextureText = new TextureText();
         o_TextureText.Initialise();
         return o_TextureText;
    };
    nenkraftjs.TextureText = TextureText;
}());