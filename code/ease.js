var nenkraftjs = nenkraftjs || {};
(function()
{
    var p_i_Value = 0;
    var Ease = function()
    {
        
    };
    Ease.cubicInOut = function (_i_WaveTime, _f_StartValue, _f_Amplification, _i_Duration) 
    {
        _i_WaveTime /= _i_Duration / 2;
        if (_i_WaveTime < 1) return _f_Amplification / 2 * _i_WaveTime * _i_WaveTime * _i_WaveTime + _f_StartValue;
        _i_WaveTime -= 2;
        return(_f_Amplification / 2 * ( _i_WaveTime * _i_WaveTime * _i_WaveTime + 2) + _f_StartValue);
    };
    Ease.cubicInOut.d = {val: ++p_i_Value, name: 'Cubic In Out'};
    Ease.cubicIn = function(_i_WaveTime, _f_StartValue, _f_Amplification, _i_Duration)
    {
        _i_WaveTime /= _i_Duration;
        return(_f_Amplification * _i_WaveTime * _i_WaveTime + _f_StartValue);
    };
    Ease.cubicIn.d = {val: ++p_i_Value, name: 'Cubic In'};
    Ease.sinWave = function(_i_WaveTime, _f_StartValue, _f_Amplification, _i_Duration)
    {
        _i_WaveTime = Math.degtorad(_i_WaveTime);
        return(_f_Amplification * (Math.sin(_i_WaveTime * Math.PI * 2 - (Math.PI * 0.5))) * 0.5);
    };
    Ease.sinWave.d = {val: ++p_i_Value, name: 'Sine Wave'};
    Ease.sinInOut = function (_i_WaveTime, _f_StartValue, _f_Amplification, _i_Duration)
    {
	   return(-_f_Amplification * 0.5 * (Math.cos(Math.PI * _i_WaveTime / _i_Duration) - 1) + _f_StartValue);
    };
    Ease.sinInOut.d = {val: ++p_i_Value, name: 'Sine In Out'};
    nenkraftjs.Ease = Ease;
    nenkraftjs.Ease.List = 
    [
        null,
        Ease.cubicInOut,
        Ease.cubicIn,
        Ease.sinWave,
        Ease.sinInOut,
    ];
}());