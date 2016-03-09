var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    
    var p_f_Then = null;
    var p_f_Now = null;
    var p_f_Delta = null;
    
    var p_f_Framerate = 1000 / 60;
    
    var p_ctx_Context = null;
    
    var p_i_ClearWidth = null;
    var p_i_ClearHeight = null;
    
    var p_af_ID = null;
    var p_interval_ID = null;
    
    var p_b_Clear = true;
    var p_b_ClearFade = false;
    var p_s_ClearFadeColor = 'rgba(0, 0, 0, 0.1)';
    
    var p_a_Handlers = [];
    
    function PrivateHandler()
    {
        if (Loop.IsRunning() === false) nenkraftjs.Log('Loop Start');
        if (p_ctx_Context === null) p_ctx_Context = nenkraftjs.Vault.GetContext();
        if (p_i_ClearWidth === null) p_i_ClearWidth = nenkraftjs.Vault.GetCurrentCanvas().width;
        if (p_i_ClearHeight === null) p_i_ClearHeight = nenkraftjs.Vault.GetCurrentCanvas().height;
        p_f_Now = new Date().getTime();
        p_f_Delta = p_f_Now - (p_f_Then || p_f_Now);   
        p_f_Then = p_f_Now;
        
        if (p_af_ID) p_af_ID = requestAnimationFrame(PrivateHandler);
        
        if (p_f_Delta > 0)
        {
            if (p_b_ClearFade === true)
            {
                p_ctx_Context.fillStyle = p_s_ClearFadeColor;
                p_ctx_Context.fillRect(0, 0, p_i_ClearWidth, p_i_ClearHeight);
            }
            if (p_b_Clear === true) p_ctx_Context.clearRect(0, 0, p_i_ClearWidth, p_i_ClearHeight);
            var a_Handlers = p_a_Handlers;
            var i_Inc = 0,
                i_Length = a_Handlers.length,
                fn_Handler = null;
            for (i_Inc; i_Inc < i_Length; ++i_Inc)
            {
                fn_Handler = a_Handlers[i_Inc];
                if (fn_Handler) fn_Handler(p_ctx_Context, p_f_Delta);
            }
        }
    }
    
    var Loop = function()
    {
        nenkraftjs.Log('...', 'warning');
        throw '[Cannot be instantiated]';
    };
    Loop.AddHandler = function(_fn_Handler)
    {
        if (_fn_Handler instanceof Function === false) return;
        p_a_Handlers.push(_fn_Handler);
    };
    Loop.BeginInterval = function()
    {
        if (p_af_ID) return;
        p_interval_ID = setInterval(PrivateHandler, p_f_Framerate);
    };
    Loop.BeginRAF = function()
    {
        if (p_interval_ID) return;
        p_af_ID = requestAnimationFrame(PrivateHandler);
    };
    Loop.Stop = function()
    {
        if (p_af_ID) cancelAnimationFrame(p_af_ID);
        if (p_interval_ID) clearInterval(p_interval_ID);
        p_af_ID = null;
        p_interval_ID = null;
        p_f_Then = null;
        p_f_Delta = null;
        p_f_Now = null;
        p_i_ClearHeight = null;
        p_i_ClearWidth = null;
        p_ctx_Context = null;
        nenkraftjs.Log('Stopping...');
    };
    Loop.SetClear = function(_b_Clear)
    {
        p_b_Clear = _b_Clear;
        p_b_ClearFade = false;
    };
    Loop.SetClearFade = function(_b_Clear)
    {
        p_b_ClearFade = _b_Clear;
        p_b_Clear = false;
    };
    Loop.SetClearFadeColor = function(_s_Color)
    {
        p_s_ClearFadeColor = _s_Color;  
    };
    Loop.SetFramerate = function(_f_Framerate)
    {
        p_f_Framerate = _f_Framerate;
    };
    Loop.IsRunning = function()
    {
        return p_f_Then != null;
    };
    Loop.GetFPS = function()
    {
        if (p_f_Delta === null) nenkraftjs.Log('The Loop is not running');
        return Math.round2(1 / p_f_Delta * 1000, 2);  
    };
    nenkraftjs.Loop = Loop;
}());