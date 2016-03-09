var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    function PrivateMagnetCalculation(_a_PositionOne, _a_PositionTwo, _a_Velocity, _i_MagneticRadius, _f_MagneticStrength)
    {
        var a_Delta = Math.delta(_a_PositionOne, _a_PositionTwo),
            f_Distance = Math.vectorLength(a_Delta);

        if (_i_MagneticRadius > f_Distance) 
        {
            var f_Angle = Math.vectorAngle(a_Delta);
            _a_Velocity[0] = _a_Velocity[0] + Math.cos(f_Angle) * _f_MagneticStrength;
            _a_Velocity[1] = _a_Velocity[1] + Math.sin(f_Angle) * _f_MagneticStrength;
        } 
    }
    
    
    var ParticleEntity = function()
    {
        
    };
   
    var q = ParticleEntity.prototype = new nenkraftjs.Entity();
    q.Initialise = function()
    {
        nenkraftjs.Entity.prototype.Initialise.call(this);
        this.a_Time = [0,0];
        this.a_Velocity = [0.0,0.0];
        this.a_InitialVelocity = [0.0,0.0];
        this.a_Friction = [0.0,0.0];
        this.a_Gravity = [0.0,0.0];
        this.a_MagneticPoint = null;
        this.o_Magnet = null;
        this.f_MagneticRadius = 0.0;
        this.f_MagneticStrength = 0.0;
        this.f_Spin = 0.0;
        this.f_Shrowth = 0.0;
        this.f_Torque = 0.0;
        this.f_TorquePower = 0.0;
        this.f_Wavetime = 0;
        this.fn_TorqueEase = null;
    };
    q.Process = function(_i_Delta)
    {
        var a_Velocity = this.GetVelocity(),
            a_NewVelocity = [0,0],
            f_Spin = this.GetSpin(),
            a_Friction = this.GetFriction(),
            a_Gravity = this.GetGravity(),
            o_Magnet = this.GetMagnet(),
            a_MagneticPoint = this.GetMagneticPoint(),
            i_Duration = this.GetDuration(),
            f_TorquePower = this.GetTorquePower(),
            f_Wavetime = this.GetWavetime(),
            f_Shrowth = this.GetShrowth();
            
        a_NewVelocity[0] = a_Velocity[0];
        a_NewVelocity[1] = a_Velocity[1];
        
        if (a_Friction[0] !== 0) a_NewVelocity[0] *= a_Friction[0];
        if (a_Friction[1] !== 0) a_NewVelocity[1] *= a_Friction[1];
        
        if (a_Gravity[0] !== 0) a_NewVelocity[0] += a_Gravity[0];
        if (a_Gravity[1] !== 0) a_NewVelocity[1] += a_Gravity[1];
        
        if (f_Spin !== 0) this.SetRotationRelative(Math.degtorad(f_Spin));
        
        if (f_Shrowth !== 0) this.SetScaleMultiple([f_Shrowth, f_Shrowth]);
        
        if (a_MagneticPoint !== null) PrivateMagnetCalculation(a_MagneticPoint, this.GetPosition(), a_NewVelocity, this.GetMagneticRadius(), this.GetMagneticStrength());
        else if (o_Magnet !== null) PrivateMagnetCalculation(o_Magnet.GetPosition(), this.GetPosition(), a_NewVelocity, this.GetMagneticRadius(), this.GetMagneticStrength());
        
        if (this.fn_TorqueEase instanceof Function) this.SetTorque(this.fn_TorqueEase(f_Wavetime, -f_TorquePower, f_TorquePower, i_Duration));
        if (this.GetTorque() !== 0) a_NewVelocity = Math.rotateVectorRelative(a_NewVelocity, Math.degtorad(this.GetTorque()));
        
        a_Velocity[0] = a_NewVelocity[0];
        a_Velocity[1] = a_NewVelocity[1];
        
        this.SetPositionRelative(a_Velocity);
        
        this.SetWavetimeRelative(1);
        this.SetLifespanRelative(-1);
    };

    q.SetLifespan = function(_i_Lifespan)
    {
        this.a_Time = [_i_Lifespan, _i_Lifespan];
        return this;
    };
    q.SetLifespanRelative = function(_i_Lifespan)
    {
        this.a_Time[0] += _i_Lifespan;
        return this;        
    };
    q.SetVelocity = function(_f_VelocityX, _f_VelocityY, _i_Angle)
    {
        var a_Velocity = this.a_Velocity, a_InitialVelocity = this.a_InitialVelocity;
        a_Velocity[0] = a_InitialVelocity[0] = _f_VelocityX;
        a_Velocity[1] = a_InitialVelocity[1] = _f_VelocityY;
        if (_i_Angle !== null && _i_Angle !== undefined) this.a_Velocity = Math.rotateVectorAbsolute(a_Velocity, Math.degtorad(_i_Angle));
        return this;
    };
    q.SetVelocityRelative = function(_f_VelocityX, _f_VelocityY)
    {
        var a_Velocity = this.a_Velocity;
        a_Velocity[0] += _f_VelocityX;
        a_Velocity[1] += _f_VelocityY;
        return this;
    };
    q.SetFriction = function(_f_FrictionX, _f_FrictionY)
    {
        var a_Friction = this.a_Friction;
        a_Friction[0] = _f_FrictionX;
        a_Friction[1] = _f_FrictionY;
        return this;
    };
    q.SetGravity = function(_f_GravityX, _f_GravityY)
    {
        var a_Gravity = this.a_Gravity;
        a_Gravity[0] = _f_GravityX;
        a_Gravity[1] = _f_GravityY;
        return this;
    };
    q.SetSpin = function(_f_Spin)
    {
        this.f_Spin = _f_Spin;
        return this;
    };
    q.SetShrowth = function(_f_Shrowth)
    {
        this.f_Shrowth = _f_Shrowth;
        return this; 
    };
    q.SetTorque = function(_f_Torque)
    {
        this.f_Torque = _f_Torque;
        return this;  
    };
    q.SetTorquePower = function(_f_TorquePower)
    {
        this.f_TorquePower = _f_TorquePower;
        return this;    
    };
    q.SetTorqueEaseFunction = function(_fn_TorqueEase)
    {
        this.fn_TorqueEase = _fn_TorqueEase;
        return this;  
    };
    q.SetMagnet = function(_o_Magnet)
    {
        this.o_Magnet = _o_Magnet;
        return this;  
    };
    q.SetMagneticPoint = function(_f_PointX, _f_PointY)
    {
        var a_MagneticPoint = this.a_MagneticPoint = this.a_MagneticPoint || [];
        a_MagneticPoint[0] = _f_PointX;
        a_MagneticPoint[1] = _f_PointY;
        return this;
    };
    q.SetMagneticPointRef = function(_a_Ref)
    {
        this.a_MagneticPoint = _a_Ref;
        return this;  
    };
    q.SetMagneticRadius = function(_i_Radius)
    {
        this.i_MagneticRadius = _i_Radius;
        return this;  
    };
    q.SetMagneticStrength = function(_f_Strength)
    {
        this.f_MagneticStrength = _f_Strength;
        return this;
    };
    q.SetWavetime = function(_f_Wavetime)
    {
        this.f_Wavetime = _f_Wavetime;
        return this;
    };
    q.SetWavetimeRelative = function(_f_Wavetime)
    {
        this.f_Wavetime += _f_Wavetime; 
        return this; 
    };
    
    q.GetLifespan = function()
    {
        return this.a_Time[0];
    };
    q.GetDuration = function()
    {
        return this.a_Time[1];  
    };
    q.GetWavetime = function()
    {
        return this.f_Wavetime;  
    };
    q.GetVelocity = function()
    {
        return this.a_Velocity;
    };
    q.GetFriction = function()
    {
        return this.a_Friction;  
    };
    q.GetGravity = function()
    {
        return this.a_Gravity;  
    };
    q.GetSpin = function()
    {
        return this.f_Spin;  
    };
    q.GetShrowth = function()
    {
        return this.f_Shrowth;  
    };
    q.GetTorque = function()
    {
        return this.f_Torque;  
    };
    q.GetTorquePower = function()
    {
        return this.f_TorquePower;
    };
    q.GetMagnet = function()
    {
        return this.o_Magnet;  
    };
    q.GetMagneticPoint = function()
    {
        return this.a_MagneticPoint;  
    };
    q.GetMagneticRadius = function()
    {
        return this.i_MagneticRadius;
    };
    q.GetMagneticStrength = function()
    {
        return this.f_MagneticStrength;
    };
    
    ParticleEntity.Create = function()
    {
        var o_ParticleEntity = new ParticleEntity();
        o_ParticleEntity.Initialise();
        return o_ParticleEntity;  
    };
    
    nenkraftjs.ParticleEntity = ParticleEntity;
}());