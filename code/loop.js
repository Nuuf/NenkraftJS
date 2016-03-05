var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var p_f_Then = null;
    var p_af_ID = null;
    var p_b_Clear = true;
    var p_b_ClearFade = false;
    var p_f_ClearFadeColor = 'rgba(0, 0, 0, 0.1)';
    var p_b_FPS = false;
    var p_o_FPSDIV = null;
    var p_f_Now = null;
    var p_f_Delta = null;
    var p_ctx_Context = null;
    var p_i_ClearWidth = null;
    var p_i_ClearHeight = null;
    
    var Loop = function()
    {
        nenkraftjs.Log('...', 'warning');
        throw '[Cannot be instantiated]';  
    };
    Loop.Begin = function(_fn_Handle)
    {
        if (_fn_Handle instanceof Function === false) return;
        if (Loop.IsRunning() === false) nenkraftjs.Log('Begin'); 
        if (p_ctx_Context === null) p_ctx_Context = nenkraftjs.Vault.GetContext();
        if (p_i_ClearWidth === null) p_i_ClearWidth = nenkraftjs.Vault.GetCurrentCanvas().width;
        if (p_i_ClearHeight === null) p_i_ClearHeight = nenkraftjs.Vault.GetCurrentCanvas().height;
        p_f_Now = new Date().getTime();
        p_f_Delta = p_f_Now - (p_f_Then || p_f_Now);
            
        p_f_Then = p_f_Now;
            
        if (p_b_FPS === true)
        {
            p_o_FPSDIV.innerHTML = Loop.GetFPS();
        }
        
        p_af_ID = requestAnimationFrame(function()
        {
            Loop.Begin(_fn_Handle);
        });
        
        if (p_f_Delta > 0)
        {
            if (p_b_ClearFade === true)
            {
                p_ctx_Context.fillStyle = p_f_ClearFadeColor;
                p_ctx_Context.fillRect(0, 0, p_i_ClearWidth, p_i_ClearHeight);
            }
            if (p_b_Clear === true) p_ctx_Context.clearRect(0, 0, p_i_ClearWidth, p_i_ClearHeight);
            
            _fn_Handle(p_ctx_Context, p_f_Delta);
        }
        
        
    };
    Loop.Stop = function()
    {
        cancelAnimationFrame(p_af_ID);
        p_f_Then = null;
        p_f_Delta = null;
        p_f_Now = null;
        p_i_ClearHeight = null;
        p_i_ClearWidth = null;
        p_ctx_Context = null;
        if (p_o_FPSDIV) p_o_FPSDIV.innerHTML = '';
        nenkraftjs.Log('Stop');
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
        p_f_ClearFadeColor = _s_Color;  
    };
    Loop.IsRunning = function()
    {
        return p_f_Then != null;  
    };
    Loop.ShowFPS = function()
    {
        p_o_FPSDIV = document.createElement('div');
        p_o_FPSDIV.id = 'FPSDIV';
        var o_Style = document.createElement('style');
        o_Style.id = 'FPSDIVSTYLE';
        o_Style.innerHTML = '#FPSDIV{background-color: white; position: fixed; bottom: 0px; width: 100px; font-family: monospace; font-size: 20px; -webkit-user-select: none; pointer-events: none;}';
        document.head.appendChild(o_Style);
        document.body.appendChild(p_o_FPSDIV);
        p_b_FPS = true;
    };
    Loop.GetFPS = function()
    {
        if (p_f_Delta === null) nenkraftjs.Log('The Loop is not running');
        return Math.round2(1 / p_f_Delta * 1000, 2);  
    };
    nenkraftjs.Loop = Loop;
    
}());