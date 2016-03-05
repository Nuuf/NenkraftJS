var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var Bag = function()
    {
        
    };
   
    var q = Bag.prototype = new nenkraftjs.NenObject();
    q.Initialise = function()
    {
        nenkraftjs.NenObject.prototype.Initialise.call(this);
        this.a_Entity = [];
    };
    q.Draw = function(_ctx_Context)
    {
        
        var a_Position = this.GetPosition(),
            f_Alpha = this.GetAlpha(),
            a_Offset = this.GetOffset(),
            f_Rotation = this.GetRotation(),
            a_Scale = this.GetScale()
        
        _ctx_Context.save();
        _ctx_Context.globalAlpha -= 1 - f_Alpha;
        _ctx_Context.translate(a_Position[0] + a_Offset[0], a_Position[1] + a_Offset[1]);
        if (f_Rotation !== 0) _ctx_Context.rotate(f_Rotation);
        if (a_Scale[0] !== 0 && a_Scale[1] !== 0) _ctx_Context.scale(a_Scale[0], a_Scale[1]);
        var a_Entity = this.GetEntitys(),
            i_Length = a_Entity.length,
            i_Inc = 0,
            o_Entity = null;
        for(i_Inc; i_Inc < i_Length; ++i_Inc)
        {
            o_Entity = a_Entity[i_Inc];
            if (o_Entity)
            {
                //if (o_Entity.GetOffsetX() !== this.GetX()) o_Entity.SetOffsetX(this.GetX());
                //if (o_Entity.GetOffsetX() !== this.GetX()) o_Entity.SetOffsetX(this.GetX());
                o_Entity.Draw(_ctx_Context);
            } 
        }
        _ctx_Context.restore();
    };
    q.AddEntity = function(_o_Entity)
    {
        this.a_Entity.push(_o_Entity);
        return(_o_Entity);
    };
    q.RemoveEntity = function(_o_Entity)
    {
        this.a_Entity.splice2(_o_Entity);
    };
    q.GetEntitys = function()
    {
        return this.a_Entity;  
    };
    
    Bag.Create = function()
    {
        var o_Bag = new Bag();
        o_Bag.Initialise();
        return o_Bag;
    };
    
    nenkraftjs.Bag = Bag;
}());