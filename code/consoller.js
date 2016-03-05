var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var p_b_Log = true;
    
    var Log = function(_o_Object, _s_Type)
    {
        if (p_b_Log === true)
        {
            var _s_CSS = 'background: #000; color: #0F0';
            if (_s_Type === 'warning')
            {
                _s_CSS = 'background: #000; color: #0ff';
                console.warn(String('%c nenkraftjs: [' + _o_Object + '] '), _s_CSS);
                return;
            }
            if (_s_Type === 'error')
            {
                _s_CSS = 'background: #000; color: #f0f';
                console.error(String('%c nenkraftjs: [' + _o_Object + '] '), _s_CSS);
                return;
            }
            if (_s_Type === 'important')
            {
                _s_CSS = 'background: #000; color: #ff0';
            }
            console.log(String('%c nenkraftjs: [' + _o_Object + '] '), _s_CSS);
        }
    };
    Log.Toggle = function()
    {
        p_b_Log = !p_b_Log;  
    };
    nenkraftjs.Log = Log;
}());