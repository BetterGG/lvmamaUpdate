//获取元素到文档顶部距离
function getTop(el){
	var top = el.offsetTop;
	while( el.offsetParent ){
		el = el.offsetParent;
		top += el.offsetTop;
	}
	return top;
}


//电梯
function to (end, rate, callback) {

	if(!window.requestAnimationFrame){
		 requestAnimationFrame = function(fn) {
	        setTimeout(fn, 17);
	    };	
	}
	//头判断
	end += 1;
	document.body.scrollTop += 1;
	document.documentElement.scrollTop += 1;
	var doc =  document.body.scrollTop ? document.body : document.documentElement;

	var pos = doc.scrollTop;
	function step(){
		pos = pos + ( end - pos )/ (rate || 2);
		doc.scrollTop = pos;
		if( Math.abs(end-pos) < 1 ){
			callback && callback();
			return;
		}
		requestAnimationFrame(step);
	}
	step();
}
	//数组乱序
	function unorder(array){
	if(typeof array !== 'string' && array.length){
		var arr = array.slice();
		arr.sort(()=>{
	        return Math.random() < 0.5 ? 1 : -1;
	    })
	    return arr;
	}else{
		throw TypeError("arr is not array or like array");
	}
}


function calender(container){
	function isLeapYear(year){
		if( year%4==0 && year%100!==0 || year%400==0){
			return true;
		}
		return false;
	}

	function getDays(year,month){
		switch(month){
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
				break;
			case 2:
				return isLeapYear(year) ? 29 : 28;

		}
	}

	function getNextDate(year,month){
		var m,y;
		if(month==12){
			m = 1;
			y = year+1;
		}else{
			m = month+1;
			y = year;
		}
		return {m,y};
	}
	function getPreDate(year,month){
		var m,y;
		if(month==1){
			m = 12;
			y = year-1;
		}else{
			m = month-1;
			y = year;
		}
		return {m,y};
	}


	function getBoxDate(){
		var cDate = document.getElementsByClassName("currentDate")[0];

		var date =  cDate.innerHTML.split("-");
	
		var y = Number(date[0]);

		var m = Number(date[1]);

		return {y,m};
	}

	function createCalender(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();

		var preM,preY;

		preY = getPreDate(y,m).y;
		preM = getPreDate(y,m).m;

		var pd  = getDays(preY,preM);

		var html = 
			`
				<table border="1">
					<thead>
						<tr>
							<td colspan="2"><button class="preMonth">上个月</button></td>
							<td colspan="3" class="currentDate">${y}-${m}</td>
							<td colspan="2"><button class="nextMonth">下个月</button></td>
						</tr>
						<tr>`;

		for(let i=0;i<7;i++){
			html += "<td>"+arr[i]+"</td>"
		}					
		
		html +=	`</tr></thead>`

		var w = date.getDay();
		
		var num = 0;
		var days = getDays(y,m);

		var start = w - d%7 + 1;
		start = start >= 0 ? start : start+7;
		var end = start + days;


		for(let i=0;i<6;i++){
			html += "<tbody><tr>";
			for(let j=0;j<7;j++){
				if(num>=start && num <end){	
					if(num-start+1 == d){
						if(m == new Date().getMonth()+1){
							html += "<td class='today remainDays'>今天</td>"
						}else{
							html += "<td>1</td>"
						}
					}else if(num-start+1 > d){
						html += "<td class='remainDays'>"+(num-start+1)+"</td>"
					}else{		
						html += "<td>"+(num-start+1)+"</td>"
					}
				}else if(num<start){
					html += "<td style='color:#ccc'>"+(pd-start+1+num)+"</td>"
				}else{
					html += "<td style='color:#ccc'>"+(num-end+1)+"</td>"
				}
				num++;
			}
			html += "</tr>";
		}
		html += "</tbody></table";
		container.innerHTML = html;

		//next month
		document.getElementsByClassName("nextMonth")[0].onclick = function(){
			
			var date = getBoxDate();
			var newDate = new Date();
			var nextDate = getNextDate(date.y,date.m);

			var d = 1;
            var nextDate=getNextDate(date.y,date.m);

            if(  nextDate.y==newDate.getFullYear() && nextDate.m==newDate.getMonth()+1 ){
                d = newDate.getDate();
                console.log("equal")
            }


            var nDate = new Date( `${nextDate.y}-${nextDate.m}-${d}`)

            createCalender(nDate);

		}
		// previous month
		document.getElementsByClassName("preMonth")[0].onclick = function(){
			
			var date = getBoxDate();
            var newDate = new Date();
            var d = 1;
            var preDate=getPreDate(date.y,date.m);

            if(  preDate.y==newDate.getFullYear() && preDate.m==newDate.getMonth()+1 ){
                d = newDate.getDate();
            }


            var pDate = new Date( `${preDate.y}-${preDate.m}-${d}`)

            createCalender(pDate);

		}
	}

	var arr = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六",]
	var cDate = new Date();

	createCalender(cDate);
}