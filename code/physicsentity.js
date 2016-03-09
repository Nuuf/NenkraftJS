var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var PhysicsEntity = function()
    {
        
    };
    var q = PhysicsEntity.prototype = new nenkraftjs.Entity();
    q.Initialise = function()
    {
        nenkraftjs.Entity.prototype.Initialise.call(this);
        this.b2d_FixtureDef = null;
        this.b2d_BodyDef = null;
        
        this.b2d_Fixture = null;
        
        this.SetFixtureDef(new Box2D.Dynamics.b2FixtureDef());
        this.SetBodyDef(new Box2D.Dynamics.b2BodyDef());
    };
    q.Process = function(_i_Delta)
    {
        var o_Position = this.GetBody().GetPosition();
        var f_Rotation = this.GetBody().GetAngle();
        if (this.GetX() !== o_Position.x)
        {
            this.SetX(o_Position.x * nenkraftjs.PhysicsBag.Scale);
        }
        if (this.GetY() !== o_Position.y)
        {
            this.SetY(o_Position.y * nenkraftjs.PhysicsBag.Scale);
        }
        if (this.GetRotation() !== f_Rotation)
        {
            this.SetRotation(f_Rotation);
        }
    };
    q.SetDefinition = function(_a_Size, _a_Position, _i_Shape, _i_Type, _f_Density, _f_Friction, _f_Restitution)
    {
        var f_Scale = nenkraftjs.PhysicsBag.Scale,
            o_BodyDef = this.GetBodyDef(),
            o_FixtureDef = this.GetFixtureDef();
        if (_i_Shape === PhysicsEntity.Shapes.Rectangle)
        {
            o_FixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            o_FixtureDef.shape.SetAsBox(_a_Size[0] / 2 / f_Scale, _a_Size[1] / 2 / f_Scale);
        }
        else if (_i_Shape === PhysicsEntity.Shapes.Circle)
        {
            o_FixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape();
            o_FixtureDef.shape.m_radius = _a_Size[2] / f_Scale;
        }
        o_BodyDef.type = _i_Type;
        o_BodyDef.position = new Box2D.Common.Math.b2Vec2(_a_Position[0] / f_Scale, _a_Position[1] / f_Scale);
        o_FixtureDef.density = _f_Density || o_FixtureDef.density;
        o_FixtureDef.friction = _f_Friction || o_FixtureDef.friction;
        o_FixtureDef.restitution = _f_Restitution || o_FixtureDef.restitution;
        return this;
    }; 
    q.SetFixtureDef = function(_b2d_FixtureDef)
    {
        this.b2d_FixtureDef = _b2d_FixtureDef;
        return this;
    };
    q.SetBodyDef = function(_b2d_BodyDef)
    {
        this.b2d_BodyDef = _b2d_BodyDef;
        return this;
    };
    q.SetFixture = function(_b2d_Fixture)
    {
        this.b2d_Fixture = _b2d_Fixture;
    };
    q.GetFixture = function()
    {
        return this.b2d_Fixture;
    };
    q.GetBody = function()
    {
        return this.GetFixture().GetBody();
    };
    q.GetFixtureDef = function()
    {
        return this.b2d_FixtureDef;
    };
    q.GetBodyDef = function()
    {
        return this.b2d_BodyDef;
    };
    PhysicsEntity.Create = function()
    {
        var o_PhysicsEntity = new PhysicsEntity();
        o_PhysicsEntity.Initialise();
        return o_PhysicsEntity;  
    };
    PhysicsEntity.Shapes = 
    {
        Rectangle: 0,
        Circle: 1    
    };
    PhysicsEntity.Types = 
    {
        Static: 0,
        Kinematic: 1,
        Dynamic: 2
    };
    nenkraftjs.PhysicsEntity = PhysicsEntity;
}());