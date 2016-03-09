var nenkraftjs = nenkraftjs || {};
(function()
{
    "use strict";
    var TextureImage = function()
    {
        
    };
    var q = TextureImage.prototype = new nenkraftjs.Texture();
    q.Initialise = function()
    {
        nenkraftjs.Texture.prototype.Initialise.call(this);
        this.o_Img = null;
        this.i_Rows = 0;
        this.i_Columns = 0;
        this.a_ImgClipRectangle = [0,0,0,0];   
    };
    q.Render = function(_ctx_Context)
    {
        var a_Size = this.GetSize(),
            a_ImgClipRectangle = this.GetImgClipRectangle(),
            a_RegistrationPoint = this.GetRegistrationPoint();
        _ctx_Context.drawImage
        (
            this.o_Img,
            a_ImgClipRectangle[0],
            a_ImgClipRectangle[1],
            a_ImgClipRectangle[2],
            a_ImgClipRectangle[3],
            a_RegistrationPoint[0],
            a_RegistrationPoint[1],
            a_Size[0],
            a_Size[1]  
        );
    };
    q.SetImage = function(_o_Img, _i_Rows, _i_Columns, _i_Width, _i_Height)
    {
        this.o_Img = _o_Img;
        if (_i_Rows !== undefined && _i_Columns !== undefined)
        {
            var i_Width = (_i_Width || _o_Img.width) / _i_Columns;
            var i_Height = (_i_Height || _o_Img.height) / _i_Rows
            this.i_Rows = _i_Rows;
            this.i_Columns = _i_Columns;
            this.SetSize([i_Width, i_Height]);
            this.SetImgClipRectangle([0,0,i_Width,i_Height]);
            this.SetRegistrationPoint([-i_Width * 0.5, -i_Height * 0.5]);
        }
        else
        {
            this.SetSize([_o_Img.width, _o_Img.height]);
            this.SetImgClipRectangle([0,0,_o_Img.width,_o_Img.height])
        }
        return this;
    };
    q.SetIndex = function(_i_Index)
    {
        var i_Columns = this.i_Columns,
            i_Row = Math.floor(_i_Index / i_Columns),
            i_Column = _i_Index - i_Row * i_Columns;
        
        this.SetImgClipRectangleX(this.GetWidth() * i_Column);
        this.SetImgClipRectangleY(this.GetHeight() * i_Row);
        
        return this;
    };
    q.SetCell = function(_i_Cell)
    {
        return this.SetIndex(_i_Cell - 1);  
    };
    q.SetImgClipRectangle = function(_a_ImgClipRectangle)
    {
        this.a_ImgClipRectangle = _a_ImgClipRectangle;
        return this;  
    };
    q.SetImgClipRectangleX = function(_i_X)
    {
        this.a_ImgClipRectangle[0] = _i_X;
        return this;
    };
    q.SetImgClipRectangleY = function(_i_Y)
    {
        this.a_ImgClipRectangle[1] = _i_Y;
        return this;
    };
    q.SetImgClipRectangleWidth = function(_i_Width)
    {
        this.a_ImgClipRectangle[2] = _i_Width;
        return this;
    };
    q.SetImgClipRectangleHeight = function(_i_Height)
    {
        this.a_ImgClipRectangle[3] = _i_Height;
        return this;
    };
    q.GetImage = function()
    {
        return this.o_Img;
    };
    q.GetImgClipRectangle = function()
    {
        return this.a_ImgClipRectangle;
    };
    q.GetImgClipRectangleX = function()
    {
        return this.a_ImgClipRectangle[0];
    };
    q.GetImgClipRectangleY = function()
    {
        return this.a_ImgClipRectangle[1];
    };
    q.GetImgClipRectangleWidth = function()
    {
        return this.a_ImgClipRectangle[2];
    };
    q.GetImgClipRectangleHeight = function()
    {
        return this.a_ImgClipRectangle[3];
    };
    TextureImage.Create = function()
    {
        var o_TextureImage = new TextureImage();
        o_TextureImage.Initialise();
        return o_TextureImage;
    };
    nenkraftjs.TextureImage = TextureImage;
}());