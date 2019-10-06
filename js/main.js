
var result = `
	/*
	大家好，作为一个工程师
	我当然要用代码装个(失败的)x了
	*/

	*{ transition: all 1s;}

	body{
		background: white;
		font-size: 14px;
	}

	#displayCode{
		border: 1px solid #ddd;
		padding: 14px;
	}

	/* 现在掏出我的魔法棒把代码高亮 */

	.token.selector{
		color: #690;
	}
	.token.property{
		color: #905;
	}

	.token.function{
		color: #DD4A68;
	}

	/* 加点可怕的 3D 效果 */

	#displayCode{
		transform: rotate(360deg);
	}

	/* 加点失败的呼吸效果 */

	#displayCode{
		animation: breath 0.5s infinite alternate-reverse;
	}

	/* 我要一张白纸 */

	#displayCode{
		width: 49%;
		height: 95%;
		position: fixed;
		left: 9px;
		margin-top: 9px;
	}
	#resumePaper{
		width: 49%;
		height: 95%;
		background: white;
		position: fixed;
		right: 9px;
		margin-top: 9px;
		padding: 3px;
		border: 1px solid brown;
	}
	.content{
		width: 100%;
		height: 100%;
		background: white;
	}
`

var result2 = `
	#resumePaper{}
`

var md = `
	# 简介
	我叫 Jonson ，学习前端半年，想应聘前端工程师岗位。

	# 技能
	- Javascript
	- CSS
	- HTML

	# 项目
	- xx 轮播
	- xx 简历
	- xx 画板

	# 联系
	- 手机：13083974493
	- QQ：8739839
	- 微博：Jonson

	# 联系
	- 手机：13083974493
	- QQ：8739839
	- 微博：Jonson

	# 联系
	- 手机：13083974493
	- QQ：8739839
	- 微博：Jonson

	# 联系
	- 手机：13083974493
	- QQ：8739839
	- 微博：Jonson

	# 联系
	- 手机：13083974493
	- QQ：8739839
	- 微博：Jonson
`

writeDisplayCode('',result,()=>{
	createPaper( ()=>{
		writeDisplayCode(result, result2, ()=>{
			writeMarkdown(md)
		})
	})
})

function writeMarkdown(markdown, fn){
	var domPaper = document.querySelector('#resumePaper > .content')
	var n = 0

	var id = setInterval( ()=>{
		n += 1
		domPaper.innerHTML = markdown.slice(0,n)
		domPaper.scrollTop = domPaper.scrollHeight
		if(n >= markdown.length){
			window.clearInterval(id)
			fn()
		}
	},10)
}

function writeDisplayCode(prefix,code,fn){
	displayCode.innerHTML = prefix || ''
	var n = 0
	var id = setInterval( ()=>{
		n += 1
		displayCode.innerHTML = Prism.highlight(prefix + code.slice(0,n), Prism.languages.css, 'css')
		styleEffect.innerHTML = prefix + code.slice(0,n)
		displayCode.scrollTop = displayCode.scrollHeight
		if(n >= code.length){
			window.clearInterval(id)
			fn.call()
		}
	},10 )
}

function createPaper(fn){
	var paper = document.createElement('div')
	paper.id = 'resumePaper'
	var content = document.createElement('pre')
	content.className = 'content'
	paper.appendChild(content)
	document.body.appendChild(paper)
	fn.call()
}


