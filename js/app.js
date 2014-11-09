window.onload=function(){
var canvas=document.getElementById("can");
var context=canvas.getContext("2d");

context.beginPath();

context.arc(400,300,275,0,2*3.142,false);
context.strokeStyle = "blue";
context.lineWidth= "50";

context.stroke();
context.closePath();


for(i=5;i<=360;i=i+10){
y=300+(250*Math.sin(rad(i)));

x=400+(250*Math.cos(rad(i)));
yo=300+(300*Math.sin(rad(i)));

xo=400+(300*Math.cos(rad(i)));

context.beginPath();
context.lineWidth= "5";
context.strokeStyle = "red";
context.moveTo(x,y);
context.lineTo(xo,yo);
context.stroke();
context.closePath();

}
function rad(angle){
var rad=angle*(3.142/180);
return rad;
}








}
