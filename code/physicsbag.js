var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var PhysicsBag = function()
    {
        
    };
    var q = PhysicsBag.prototype = new nenkraftjs.Bag();
    q.Initialise = function()
    {
        nenkraftjs.Bag.prototype.Initialise.call(this);
        this.b2d_World = null;
        this.b2d_DebugDraw = null;
        
        this.f_FrameRate = 1 / 60;
        this.f_VelocityIterations = 10;
        this.f_PositionIterations = 10;
    };
    q.Process = function(_i_Delta)
    {
        var b2d_World = this.GetWorld();
        b2d_World.Step
        (
            this.GetFrameRate(),
            this.GetVelocityIterations(),
            this.GetPositionIterations()  
        );
        if (this.GetDebugDraw()) b2d_World.DrawDebugData();
        b2d_World.ClearForces(); 
        var a_Entity = this.GetEntitys(),
            i_Length = a_Entity.length,
            i_Inc = 0,
            o_Entity = null;
        for (i_Inc; i_Inc < i_Length; ++i_Inc)
        {
            o_Entity = a_Entity[i_Inc];
            if (o_Entity) o_Entity.Process(_i_Delta);
        }
    };
    q.AddEntity = function(_o_Entity)
    {
        _o_Entity.SetFixture(this.GetWorld().CreateBody(_o_Entity.GetBodyDef()).CreateFixture(_o_Entity.GetFixtureDef()));
        return nenkraftjs.Bag.prototype.AddEntity.call(this, _o_Entity);
    };
    q.RemoveEntity = function(_o_Entity)
    {
        this.GetWorld().DestroyBody(_o_Entity.GetBody());
        nenkraftjs.Bag.prototype.RemoveEntity.call(this, _o_Entity);  
    };
    q.CreateBasicWorld = function(_b_DebugDraw)
    {
        var b2d_World = new Box2D.Dynamics.b2World
        (
            new Box2D.Common.Math.b2Vec2(0, 10),
            true
        );
        if (_b_DebugDraw === true)
        {
            var b2d_DebugDraw = new Box2D.Dynamics.b2DebugDraw();
            b2d_DebugDraw.SetEntity(nenkraftjs.Vault.GetContext());
            b2d_DebugDraw.SetDrawScale(50.0);
            b2d_DebugDraw.SetFillAlpha(0.3);
            b2d_DebugDraw.SetLineThickness(1.0);
            b2d_DebugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
            b2d_World.SetDebugDraw(b2d_DebugDraw);
            this.SetDebugDraw(b2d_DebugDraw);
        }
        this.SetWorld(b2d_World);
    };
    q.SetWorld = function(_b2d_World)
    {
        this.b2d_World = _b2d_World;
        return this;
    };
    q.SetDebugDraw = function(_b2d_DebugDraw)
    {
        this.b2d_DebugDraw = _b2d_DebugDraw;
        return this;
    };
    q.GetWorld = function()
    {
        return this.b2d_World;  
    };
    q.GetDebugDraw = function()
    {
        return this.b2d_DebugDraw;  
    };
    q.GetFrameRate = function()
    {
        return this.f_FrameRate;
    };
    q.GetVelocityIterations = function()
    {
        return this.f_VelocityIterations;
    };
    q.GetPositionIterations = function()
    {
        return this.f_PositionIterations;
    };
    
    PhysicsBag.Create = function()
    {
        var o_PhysicsBag = new PhysicsBag();
        o_PhysicsBag.Initialise();
        return o_PhysicsBag;  
    };
    PhysicsBag.Scale = 50.0;
    
    nenkraftjs.PhysicsBag = PhysicsBag;
    
}());