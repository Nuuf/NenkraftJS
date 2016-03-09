var nenkraftjs = nenkraftjs || {};
(function()
{
    var p_i_Value = 0;
    var Ease = function()
    {
        
    };
    Ease.CubicInOut = function (_i_WaveTime, _f_StartValue, _f_Amplification, _i_Duration) 
    {
        _i_WaveTime /= _i_Duration / 2;
        if (_i_WaveTime < 1) return _f_Amplification / 2 * _i_WaveTime * _i_WaveTime * _i_WaveTime + _f_StartValue;
        _i_WaveTime -= 2;
        return(_f_Amplification / 2 * ( _i_WaveTime * _i_WaveTime * _i_WaveTime + 2) + _f_StartValue);
    };
    Ease.CubicInOut.d = {val: ++p_i_Value, name: 'Cubic In Out'};
    Ease.CubicIn = function(_i_WaveTime, _f_StartValue, _f_Amplification, _i_Duration)
    {
        _i_WaveTime /= _i_Duration;
        return(_f_Amplification * _i_WaveTime * _i_WaveTime + _f_StartValue);
    };
    Ease.CubicIn.d = {val: ++p_i_Value, name: 'Cubic In'};
    Ease.SinWave = function(_i_WaveTime, _f_StartValue, _f_Amplification, _i_Duration)
    {
        _i_WaveTime = Math.degtorad(_i_WaveTime);
        return(_f_Amplification * (Math.sin(_i_WaveTime * Math.PI * 2 - (Math.PI * 0.5))) * 0.5);
    };
    Ease.SinWave.d = {val: ++p_i_Value, name: 'Sine Wave'};
    Ease.SinInOut = function (_i_WaveTime, _f_StartValue, _f_Amplification, _i_Duration)
    {
	   return(-_f_Amplification * 0.5 * (Math.cos(Math.PI * _i_WaveTime / _i_Duration) - 1) + _f_StartValue);
    };
    Ease.SinInOut.d = {val: ++p_i_Value, name: 'Sine In Out'};
    nenkraftjs.Ease = Ease;
    nenkraftjs.Ease.List = 
    [
        null,
        Ease.CubicInOut,
        Ease.CubicIn,
        Ease.SinWave,
        Ease.SinInOut,
    ];
}());