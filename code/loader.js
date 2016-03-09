var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    
    var p_a_Item = [];
    
    var Loader = function()
    {
        
    };
    Loader.LoadImages = function(_a_Item, _f_Loaded)
    {
        function LoadImage(_i_Count)
        {
            
            var o_Item = _a_Item[_i_Count];
            if (o_Item)
            {
                if (Loader.Get(o_Item.id, true)) throw '[ID in use]';
                var o_Img = new Image();
                o_Img.onload = function()
                {
                     nenkraftjs.Log('Loaded: ' + this.src);
                     this.s_ID = o_Item.id;
                     p_a_Item.push(this);
                     LoadImage(++_i_Count);
                }
                o_Img.src = o_Item.path;
            }
            else
            {
                nenkraftjs.Log('Done');
                if (_f_Loaded instanceof Function) _f_Loaded();
                else nenkraftjs.Log(_f_Loaded + ' - no function provided');
            }
        }
        LoadImage(0);
    };
    Loader.Get = function(_s_ID, o_Suppress)
    {
        o_Suppress = o_Suppress || false;
        var i_Length = p_a_Item.length,
        i_Inc = 0,
        o_Item = null;

        for (i_Inc; i_Inc < i_Length; ++i_Inc)
        {
            o_Item = p_a_Item[i_Inc];
            if (o_Item.s_ID === _s_ID)
            {
                return o_Item;
            }
        }
        if (o_Suppress === false) throw '[Not found, has it finished loading?]';  
    };
    
    nenkraftjs.Loader = Loader;
}());