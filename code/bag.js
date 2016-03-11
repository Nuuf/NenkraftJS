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
        this.o_CameraTarget = null;
		this.a_ViewportRect = [0,0,0,0];
    };
    q.Draw = function(_ctx_Context)
    {
        
        var a_Position = this.GetPosition(),
            f_Alpha = this.GetAlpha(),
            a_Offset = this.GetOffset(),
            f_Rotation = this.GetRotation(),
            a_Scale = this.GetScale(),
            o_CameraTarget = this.GetCameraTarget();
        
        _ctx_Context.save();
        if (o_CameraTarget !== null)
        {
            var a_CameraTargetPosition = o_CameraTarget.GetPosition(),
                a_ViewportRect = this.GetViewportRect();
            _ctx_Context.translate(-a_CameraTargetPosition[0] + a_ViewportRect[2] * 0.5, -a_CameraTargetPosition[1] + a_ViewportRect[3] * 0.5);
        }
        else
        {
            _ctx_Context.translate(a_Position[0] + a_Offset[0], a_Position[1] + a_Offset[1]);
        }
        
        _ctx_Context.globalAlpha -= 1 - f_Alpha;
        
        if (f_Rotation !== 0) _ctx_Context.rotate(f_Rotation);
        if (a_Scale[0] !== 0 && a_Scale[1] !== 0) _ctx_Context.scale(a_Scale[0], a_Scale[1]);
        var a_Entity = this.GetEntities(),
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
    q.Process = function(_i_Delta)
    {
        var a_Entity = this.GetEntities(),
            i_Length = a_Entity.length,
            i_Inc = 0,
            o_Entity = null;
        for (i_Inc; i_Inc < i_Length; ++i_Inc)
        {
            o_Entity = a_Entity[i_Inc];
            if (o_Entity)
            {
                if (o_Entity.Process instanceof Function === false) continue;
                o_Entity.Process(_i_Delta);
            }
        }  
    };
    q.AddEntity = function(_o_Entity)
    {
        this.a_Entity.push(_o_Entity);
        return _o_Entity;
    };
    q.RemoveEntity = function(_o_Entity)
    {
        this.a_Entity.splice2(_o_Entity);
    };
    q.GetEntities = function()
    {
        return this.a_Entity;  
    };
    q.SetCameraTarget = function(_o_CameraTarget)
    {
        this.o_CameraTarget = _o_CameraTarget;
        return this;
    };
    q.GetCameraTarget = function()
    {
        return this.o_CameraTarget;  
    };
	q.SetViewportRect = function(_a_ViewportRect)
	{
		this.a_ViewportRect = _a_ViewportRect;
		return this;
	};
	q.GetViewportRect = function()
	{
		return this.a_ViewportRect;
	};
    
    Bag.Create = function()
    {
        var o_Bag = new Bag();
        o_Bag.Initialise();
        return o_Bag;
    };
    
    nenkraftjs.Bag = Bag;
}());