var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var p_a_Canvas = [];
    var p_o_CurrentCanvas = null;
    var p_o_Container = null;
    
    var Vault = function()
    {
        nenkraftjs.Log('...', 'warning');
        throw '[Cannot be instantiated]';
    };
    Vault.SetContainer = function(_o_Container)
    {
        p_o_Container = _o_Container;
    };
    Vault.SetCurrentCanvas = function(_s_ID)
    {
        var i_Length = p_a_Canvas.length,
            i_Inc = 0,
            o_Canvas = null;

        for (i_Inc; i_Inc < i_Length; ++i_Inc)
        {
            o_Canvas = p_a_Canvas[i_Inc];
            if (o_Canvas.id === _s_ID)
            {
                p_o_CurrentCanvas = o_Canvas;
                return;
            }
        }
        return false;
    };
    Vault.ClearCurrentCanvas = function()
    {
        var o_Canvas = Vault.GetCurrentCanvas();
        var ctx_Context = Vault.GetContext();  
        ctx_Context.clearRect(0, 0, o_Canvas.width, o_Canvas.height);
    };
    Vault.CreateCanvas = function(_s_ID, _s_ContainerID, _i_Width, _i_Height)
    {
        var o_Canvas = document.createElement('canvas');
        o_Canvas.id = _s_ID;
        o_Canvas.width = _i_Width || 600;
        o_Canvas.height = _i_Height || 400;
        p_a_Canvas.push(o_Canvas);
        if (_s_ContainerID === undefined || _s_ContainerID === null) p_o_Container.appendChild(o_Canvas);
        else document.getElementById(_s_ContainerID).appendChild(o_Canvas);
        p_o_CurrentCanvas = o_Canvas;
        return(o_Canvas);
    };
    Vault.DeleteCanvas = function(_s_ID)
    {
        var i_Length = p_a_Canvas.length,
            i_Inc = 0,
            o_Canvas = null;
        
        for (i_Inc; i_Inc < i_Length; ++i_Inc)
        {
            o_Canvas = p_a_Canvas[i_Inc];
            if (o_Canvas.id === _s_ID)
            {
                if (o_Canvas === p_o_CurrentCanvas) p_o_CurrentCanvas = null;
                p_a_Canvas.splice(i_Inc, 1);
                o_Canvas.parentElement.removeChild(o_Canvas);
                return;
            }
        }
        return false;
    };
    Vault.DeleteCurrentCanvas = function()
    {
        p_a_Canvas.splice2(p_o_CurrentCanvas);
        p_o_CurrentCanvas.parentElement.removeChild(p_o_CurrentCanvas);
        p_o_CurrentCanvas = null;
    };
    Vault.Empty = function()
    {
        var i_Length = p_a_Canvas.length,
            i_Inc = 0,
            o_Canvas = null;
        
        for (i_Inc; i_Inc < i_Length; ++i_Inc)
        {
            o_Canvas = p_a_Canvas[i_Inc];
            o_Canvas.parentElement.removeChild(o_Canvas);
        }
        p_a_Canvas = [];
    };
    Vault.GetCanvas = function(_s_ID)
    {
        var i_Length = p_a_Canvas.length,
            i_Inc = 0,
            o_Canvas = null;
        
        for (i_Inc; i_Inc < i_Length; ++i_Inc)
        {
            o_Canvas = p_a_Canvas[i_Inc];
            if (o_Canvas.id === _s_ID) return o_Canvas;
        }
        return false;
    };
    Vault.GetAll = function()
    {
        if (p_a_Canvas.length === 0) nenkraftjs.Log('Empty');
        return p_a_Canvas;  
    };
    Vault.GetCurrentCanvas = function()
    {
        if (p_o_CurrentCanvas === undefined || p_o_CurrentCanvas === null)
        {
            return false;
        } 
        return p_o_CurrentCanvas;
    };
    Vault.GetContext = function()
    {
         return this.GetCurrentCanvas().getContext('2d');
    };
    nenkraftjs.Vault = Vault;
}());
