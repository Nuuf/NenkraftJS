var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var ParticleBag = function()
    {
        
    };
    
    var q = ParticleBag.prototype = new nenkraftjs.Bag();
    q.Initialise = function()
    {
        nenkraftjs.Bag.prototype.Initialise.call(this);
    };
    q.Process = function(_i_Delta)
    {
        var a_Particle = this.GetEntities(),
            i_Length = a_Particle.length,
            i_Inc = 0,
            o_Particle = null;
       for (i_Inc; i_Inc < i_Length; ++i_Inc)
       {
           o_Particle = a_Particle[i_Inc];
           if (o_Particle)
           {
               if (o_Particle.GetLifespan() > 0) o_Particle.Process(_i_Delta);
               else
               {
                   this.RemoveEntity(o_Particle);
                   o_Particle = null;
                   if (a_Particle.length === 0) this.HandleExtinction();
               }
           }
       }
    };
    q.HandleExtinction = function(){};
    
    ParticleBag.Create = function()
    {
         var o_ParticleBag = new ParticleBag();
         o_ParticleBag.Initialise();
         return o_ParticleBag;
    };
    
    nenkraftjs.ParticleBag = ParticleBag;
}());