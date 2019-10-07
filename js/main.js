var md = `
## 自我介绍
我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

## 技能介绍
熟悉 JavaScript CSS
## 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

## 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

## 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

## 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`

var css1 =`
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

	#displayCode{
		width: 49%;
		height: 95%;
		position: fixed;
		left: 9px;
		margin-top: 9px;
	}

	/* 加点可怕的 3D 效果 */

	#displayCode{
		transform: rotate(360deg);
	}

	/* 加点失败的呼吸效果 */

	#displayCode{
  		animation: breath 3s infinite alternate-reverse;
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
		color: white;
		background: no-repeat url('https://w.wallhaven.cc/full/p8/wallhaven-p8gj8j.jpg');
		box-shadow: 2px 2px 6px 2px rgba(184,178,184,1);
		position: fixed;
		right: 9px;
		margin-top: 9px;
		padding: 3px;
	}
	.content{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0)
		font-size: 16px;
		overflow: auto;
	}
`

var css2 =`
	/*接下来用 marked.js 库
	把 markdown 变成 HTML*/
`

var css3 =`
	/*以上，感谢观看。*/
`

writeDisplayCode('',css1,()=>{
	createPaper(()=>{
		writeMarkdown(md, ()=>{
			writeDisplayCode(css1,css2,()=>{
				convertMarkdownToHtml(()=>{
					writeDisplayCode(css1 + css2, css3, ()=>{
						alert('完成')
					})
				})
			})
		})
	})
})

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

function writeMarkdown(markdown, fn){
	var domPaper = document.querySelector('#resumePaper > .content')
	var n = 0
	var id = setInterval( ()=>{
		n += 1
		domPaper.innerHTML = markdown.slice(0,n)
		domPaper.scrollTop = domPaper.scrollHeight
		if(n >= markdown.length){
			window.clearInterval(id)
			fn.call()
		}
	},10)
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


function convertMarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdownBody'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#resumePaper > .content')
  markdownContainer.replaceWith(div)
  fn.call()
}










