var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";  
    var Entity = function()
    {
        
    };
    
    var q = Entity.prototype = new nenkraftjs.NenObject();
    q.Initialise = function()
    {
        nenkraftjs.NenObject.prototype.Initialise.call(this);   
        this.o_Texture = null;
    };
    q.Draw = function(_ctx_Context)
    {
        var a_Position = this.GetPosition(),
            o_Texture = this.GetTexture(),
            f_Alpha = this.GetAlpha(),
            a_Offset = this.GetOffset(),
            f_Rotation = this.GetRotation(),
            a_Scale = this.GetScale();
            
        if (Entity.RenderWithoutTexture === false)
        {
            if (o_Texture === null)
            {
                if (nenkraftjs.Loop.IsRunning()) nenkraftjs.Loop.Stop();
                throw '[Tried to render Entity without Texture]'; 
            }
        }     
        
        _ctx_Context.save();
        _ctx_Context.globalAlpha -= 1 - f_Alpha;
        if (Entity.SnapToPixel === true) _ctx_Context.translate(Math.floor(a_Position[0] + a_Offset[0]), Math.floor(a_Position[1 + a_Offset[1]]));
        else _ctx_Context.translate(a_Position[0] + a_Offset[0], a_Position[1] + a_Offset[1]);
        if (f_Rotation !== 0) _ctx_Context.rotate(f_Rotation);
        if (a_Scale[0] !== 0 && a_Scale[1] !== 0) _ctx_Context.scale(a_Scale[0], a_Scale[1]);
        if (o_Texture !== null) o_Texture.Render(_ctx_Context);
        _ctx_Context.restore();
    };
    q.SetTexture = function(_o_Texture)
    {
        if (typeof _o_Texture === 'object') this.o_Texture = _o_Texture;
        if (typeof _o_Texture === 'string')
        {
            this.o_Texture = nenkraftjs.Texture.Get(_o_Texture);
        } 
        return this;
    };

    q.GetTexture = function()
    {
        return this.o_Texture;  
    };
    Entity.Create = function()
    {
        var o_Entity = new Entity();
        o_Entity.Initialise();
        return o_Entity;
    };
    Entity.RenderWithoutTexture = false;
    Entity.SnapToPixel = false;
    
    nenkraftjs.Entity = Entity;
}());