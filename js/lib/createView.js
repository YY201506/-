var controlId = 100;

/**
 * 绘画组件
 */
function createControl(model,datas){
	var html = "";
	for(var index in datas){
		var data = datas[index];
		if(data.type == "input"){
			html+='<div class="input-group w250">';
			html+= ('<div class="input-group-addon">'+ data.label + '</div>');
			html+= ('<input type="text" class="form-control input-sm" name="'+data.name+'" placeholder="'+(data.allowNull=='1'?'（必填）':'')+'" value = "'+(data.name=="password"?"":data.oldvalue)+'">');
			html+='</div>';
		}else if(data.type == "select"){
			html+='<div id="ps'+ controlId  +'" class="input-group w250">';
			html+= ('<div class="input-group-addon">'+ data.label +'</div>');
			html+= '<select name="'+data.name+'" class="form-control  input-sm" data-controlId="'+controlId+'"';
			if(data.changeFun){
				html+= 'onchange="'+data.changeFun+'(this.value,\'ps'+ controlId+'\','+JSON.stringify(model).replace(/\"/g,"'")+',\''+controlId+'ps\')"';
			}
			html+= '>';
			html+='<option value="">请选择'+(data.allowNull=='1'?'（必填）':'')+'</option>';
			for(var dv in data.defalutValue){
				dd = data.defalutValue[dv];
				result = (dd.value == data.oldvalue)?' selected ="selected" ':'';
				html+=('<option value="'+dd.value+'"'+result+'>'+dd.text+'</option>');
			}
			html+='</select>';
			html+='</div>';
		}else if(data.type == "checkbox"){
			
		}else if(data.type == "radio"){
			
		}else if(data.type == "password"){
			html+='<div class="input-group w250">';
			html+= ('<div class="input-group-addon">'+ data.label + '</div>');
			html+= ('<input type="password" class="form-control input-sm" name="'+data.name+'" placeholder="'+(data.allowNull=='1'?'（必填）':'')+'" value = "'+data.oldvalue+'">');
			html+='</div>';
			
		}else if(data.type == "textarea"){
			html+='<div class="input-group w250">';
			html+= ('<div class="input-group-addon">'+ data.label + '</div>');
			html+= ('<textarea type="text" class="form-control input-sm" name="'+data.name+'"  placeholder="'+(data.allowNull=='1'?'（必填）':'')+'">'+data.oldvalue+'</textarea>');
			html+='</div>';
		}
		controlId ++;
	}
	return html;
}

/**
 * 创建页面
 * @param data
 */
function createView(model,datas){
	var html = "";
	html+='<form id="form'+model.id+'">';
	html+='<div class="node-form">';
	html+=createControl(model,datas);
	html+='</div>';
	html+='</form>';
	return html;
}

/**
 * 创建动态服务页面
 * @param model
 * @param datas
 * @param vid
 * @returns
 */
function createSerView(model,datas,vid){
	var html = '<div class="'+vid+'">';
	html+=createControl(model,datas);
	html += '</div>'
	return html;
}

/**
 * 创建ETL页面
 */
function createETLView(model,datas){
	var html = "";
	html+='<form id="form'+model.id+'">';
	html+='<div class="node-form pull-left mode-form-half1">';
	html+=createControl(model,datas);
	html+='</div>';
	html+='<div class="pull-left mode-form-half2">';
	html+='<div class="aearch_box">';
	html+='<input name="txt2" type="text" class="form-control input_text_wid input-sm" id="txt2" placeholder="请选择文件" value="'+(model.formData?model.formData.txt2:'')+'" />'
	html+='<input type="button" class="btn_ty btn c_b btn-sm"  value="选择文件" />';
	html+='<input type="button" id="fileMapper" class="btn_ty btn btn-primary btn-sm" value="提交匹配"/>';
	html+='<input type="button" id="autoMapper" class=" c_g btn_add btn btn-success btn-sm" value="自动匹配"/>';
	html+='<input name="upFile" class="input_file" size="30" type="file" id="upFile" onchange="txt2.value=this.value" />';
	html+='</div>';
	html+='<div class="table-header"><span style="width:40%">源字段</span><span style="width:40%">目标字段</span><span style="width:20%"></span></div>';
	html+='<div class="dialog-form-table">'
	html+='<table width="100%" border="0" cellpadding="0" cellspacing="0" class="date_add_table txxy_add_table">';
	html+=' <tbody id="ipRange">'
		if(model.formData){
			var sourceFieldsArry = model.formData.sourceFields.split(',');
			var targetFieldsArry = model.formData.targetFields.split(',');
			for(var index in sourceFieldsArry){
				var sfdata = sourceFieldsArry[index];
				var tgdata = targetFieldsArry[index];
				html+='<tr id="col_'+index+'">';
				html+='<td style="width:40%">';
				html+='<input type="text" name="sourceFields" id="sourceFields'+index+'" class="form-control input-sm" value="'+sfdata+'"  onblur="nullCheck(\'#sourceFields'+index+'\')"/><font class="red warnMes" id="sourceFields'+index+'Mess">*</font>';
				html+='</td>';
				html+='<td style="width:40%">';
				html+='<input type="text" name="targetFields" id="targetFields'+index+'" class="form-control input-sm" value="'+tgdata+'"  onblur="nullCheck(\'#targetFields'+index+'\')"/><font class="red warnMes" id="targetFields'+index+'Mess">*</font>';
				html+='</td>';
				if(index==0){
					html+='<td>&nbsp;</td>';
				}else{
					html+='<td><a onclick="javascript:delIPRange('+index+')" title="删除 " class="add_but" href="javascript:void(0)">删除</a></td>';
				}
				html+='</tr>';
			}
		}else{
			html+='<tr id="col_100"> <td style="width:40%">';
			html+=' <input type="text" name="sourceFields" maxlength="500" class="form-control input-sm " onblur="nullCheck(\'#sourceFields100\')" value="" id="sourceFields100"><font class="red warnMes" id="sourceFields100Mess">*</font>';
			html+='</td>'
			html+='<td style="width:40%">'
			html+='<input type="text" name="targetFields" maxlength="500" class="form-control input-sm " onblur="nullCheck(\'#targetFields100\')" value="" id="targetFields100"><font class="red warnMes" id="targetFields100Mess">*</font>'
			html+='</td>'
			html+='<td style="width:40%">'
			html+='</td></tr>';
		}
    html+='</tbody></table>'	
	html+=' <a href="javascript:void(0)" onclick="javascript:addIPRange()" title="添加" class="mm-otheradd add_but">添加字段</a>'
	html+='</div>';
	html+='</div>';
	html+='</form>';
	return html;
}

//创建数据源
function createSource(model,stype){
	var url;
	if(stype == "wh"){
		url = "../businessTaskScreen/getWarehouse"
	}else{
		url = "../businessTaskScreen/getDatasource";
	}
	var type;
	if(model.genre == "file"){
		type = 0;
	}else{
		type = 1;
	}
	//console.log(model)
	$.ajax({
		type : "POST",
		async : false,
		dataType : "json",
		url : url,
		data : "type=" + type ,
		success : function(result) {
			var datas = [];
			if(stype != "wh"){
				var data1 = {
						"type":"select",
						"label":"采集服务",
						"name":"collectionSer",
						"check":"check",
						"checkValue":"a",
						"changeFun":"setService",
						"oldvalue":model.formData?model.formData.collectionSer:'',
						"allowNull":"1"
					}
				data1.defalutValue = createData(result.pservice,"etl");
				datas.push(data1);
			}else{
				var data2 = {
						"type":"select",
						"label":"目标服务",
						"name":"collectionSer",
						"check":"check",
						"checkValue":"a",
						"changeFun":"setService",
						"oldvalue":model.formData?model.formData.collectionSer:'',
						"allowNull":"1"
					}
				data2.defalutValue = createData(result.targetSer,"etl");
				datas.push(data2);
			}
			var data = {
				"type":"select",
				"label":"数据资源",
				"name":"dataSource",
				"check":"check",
				"checkValue":"a",
				"oldvalue":model.formData?model.formData.dataSource:'',
				"allowNull":"1"
			}
			
			data.defalutValue = createData(result.dataSource,stype);
			datas.push(data);
			var html = createView(model,datas);
			$('.formDialog .form-group').append(html);
			var htmlDom = $(html);
			/*设置选择项*/
			for(var index in datas){
				var data = datas[index];
				if(data.changeFun){
					var controlId = htmlDom.find(data.type+'[name ='+data.name+']').data('controlid');
					var cid = 'ps'+controlId;
					var vid = controlId+'ps';
					var st = data.changeFun+'(\''+data.oldvalue+'\',\''+ cid+'\','+JSON.stringify(model).replace(/\"/g,"'")+',\''+vid+'\')';
					eval(st);
				}
			}
		},
		error : function() {
			var dialog2 = {
			        "isajax": 0,
			        "autoclose":false, //可去掉,"true"
			        "contentype":'error',// "ok", "warn",'error'
			        "content": "网络异常！"
			    };
			 Dialog(dialog2);
		}
	});
}

//创建数据
function createData(result,type){
	var dv = [];
	for(var i in result){
		if(type == "ds"){
			dv.push({"value":result[i].id,
				 "text":result[i].resourceName});
		}else if(type == "dtfw"){
			dv.push({"value":result[i],
				 "text":result[i]});
		}else if(type == "server"){
			dv.push({"value":result[i].id,
				 "text":result[i].ip});
		}else if(type == "agent"){
			dv.push({"value":result[i].id,
				 "text":result[i].agentName +" - "+result[i].serverIp});
		}else{
			dv.push({"value":result[i].id,
				 "text":result[i].name});
		}
		
	}
	return dv;
}

//创建ETL
function createEtl(model){
	var url = "../businessTaskScreen/getETLParams"
		$.ajax({
			type : "POST",
			async : false,
			dataType : "json",
			url : url,
			data : "type=" + model.genre ,
			success : function(result) {
				var datas = [];
				var data = {
					"type":"select",
					"label":"ETL协议",
					"name":"etl",
					"check":"check",
					"checkValue":"a",
					"oldvalue":model.formData?model.formData.etl:'',
					"allowNull":"1"
					}
				
				data.defalutValue = createData(result.protocols,"etl");
				datas.push(data);
				
				var html = createETLView(model,datas);
				$('.formDialog .form-group').append(html);
			},
			error : function() {
				var dialog2 = {
				        "isajax": 0,
				        "autoclose":false, //可去掉,"true"
				        "contentype":'error',// "ok", "warn",'error'
				        "content": "网络异常！"
				    };
				 Dialog(dialog2);
			}
		});
}

//创建分析
function createAnalyze(model){
	var url = "../businessTaskScreen/getAnalyzeParams"
	$.ajax({
		type : "POST",
		async : false,
		dataType : "json",
		url : url,
		data : "type=" + model.mold ,
		success : function(result) {
			var datas = [];
			var data = {
				"type":"select",
				"label":"分析应用",
				"name":"app",
				"check":"check",
				"checkValue":"a",
				"oldvalue":model.formData?model.formData.app:'',
				"allowNull":"1"
			}
			
			data.defalutValue = createData(result.funcions,"app");
			datas.push(data);
			var data1 = {
					"type":"select",
					"label":"分析服务",
					"name":"analyzeSer",
					"check":"check",
					"checkValue":"a",
					"changeFun":"setService",
					"oldvalue":model.formData?model.formData.analyzeSer:'',
					"allowNull":"1"
				}
			data1.defalutValue = createData(result.service,"app");
			datas.push(data1);
			var data2 = {
					"type":"textarea",
					"label":"应用参数",
					"name":"appParams",
					"check":"check",
					"checkValue":"a",
					"oldvalue":model.formData?model.formData.appParams:'',
					"allowNull":"1"
				}
			datas.push(data2);
			var html = createView(model,datas);
			$('.formDialog .form-group').append(html);
			/*设置选择项*/
			for(var index in datas){
				var data = datas[index];
				if(data.changeFun){
					var controlId = $('.formDialog .form-group').find(data.type+'[name ='+data.name+']').data('controlid');
					var cid = 'ps'+controlId;
					var vid = controlId+'ps';
					var st = data.changeFun+'(\''+data.oldvalue+'\',\''+ cid+'\','+JSON.stringify(model).replace(/\"/g,"'")+',\''+vid+'\')';
					eval(st);
				}
			}
		},
		error : function() {
			var dialog2 = {
			        "isajax": 0,
			        "autoclose":false, //可去掉,"true"
			        "contentype":'error',// "ok", "warn",'error'
			        "content": "网络异常！"
			    };
			 Dialog(dialog2);
		}
	});
}

/*创建采集组件*/
function createCollect(model){
	var mold = model.mold;
	var data = [];
	if("flumeCustom" == mold){
		var item = {
			"type":"select",
			"label":"IP",
			"name":"ip",
			"check":"check",
			"checkValue":"a",
			//"changeFun":"setService",
			"oldvalue":model.formData?model.formData.ip:'',
			"allowNull":"1"
		}
		data.push(item);
		
		var item1 = {
			"type":"input",
			"label":"Flume_Home",
			"name":"homeDir",
			"oldvalue":model.formData?model.formData.homeDir:'',
			"allowNull":"1"
		}
		data.push(item1);
		
		var item2 = {
			"type":"input",
			"label":"conf文件名称",
			"name":"confFile",
			"oldvalue":model.formData?model.formData.confFile:'',
			"allowNull":"1"
		}
		data.push(item2);
		
		var item3 = {
				"type":"input",
				"label":"Agent名称",
				"name":"agentName",
				"oldvalue":model.formData?model.formData.agentName:'',
				"allowNull":"1"
			}
		data.push(item3);
		
		var item4 = {
				"type":"input",
				"label":"监控进程端口",
				"name":"monitorPort",
				"oldvalue":model.formData?model.formData.monitorPort:'',
				"allowNull":"1"
			}
		data.push(item4);
		
		$.ajax({
			type : "POST",
			async : false,
			dataType : "json",
			url : "../serverScreen/queryAll",
			success : function(data) {
				item.defalutValue = createData(data,"server");
			}
		});
		
		var html = createView(model,data);
		$('.formDialog .form-group').append(html);
		
	}else if("flume" == mold){
		$.ajax({
			type : "POST",
			async : true,
			dataType : "json",
			url : "../flumeScreen/queryAll",
			success : function(data) {
				var item = {
					"type":"select",
					"label":"Agent",
					"name":"agentId",
					"check":"check",
					"checkValue":"a",
					//"changeFun":"setService",
					"oldvalue":model.formData?model.formData.agentId:'',
					"allowNull":"1"
				}
				item.defalutValue = createData(data,"agent");
				data.push(item);
				
				var html = createView(model,data);
				$('.formDialog .form-group').append(html);
			}
		});
	}

}

/**
 * 动态设计服务参数
 */
function setService(id,cid,model,vid){
	var url = "../collectionTaskScreen/getServiceView";
	var tr = $("#" + cid);
	$.ajax({
		type : "POST",
		async : false,
		dataType : "json",
		url : url,
		data : "serviceId=" + id ,
		success : function(result) {
			var serList = result.service;
			$('.' + vid).remove();
			var datas = [];
			if(model.index == 1){
				validate[model.mold]={
						dataSource:'require',
						collectionSer :'require'
					}
			}else if(model.index == 2){
				validate[model.mold]={
						dataSource:'require',
						collectionSer :'require'
					}
			}else if(model.index == 3){
				validate[model.mold]={etl:'require',sourceFields:'require',	targetFields:'require'}
			}else if(model.index == 4){
				validate[model.mold]={}
			}else if(model.index == 5){
				validate[model.mold]={
						app:'require',
						analyzeSer:'require',
						appParams:'require'
				}
			}else if(model.index == 6){
				validate[model.mold]={}
			}
			
			for(var i in serList){
				var data = {}
				if(serList[i].controlType == 0){
					data.type = "input"
				}else if(serList[i].controlType == 1){
					data.type = "password"
				}else if(serList[i].controlType == 2){
					data.type = "input"
				}else if(serList[i].controlType == 3){
					data.type = "select"
					var vs = serList[i].value.split(",");
					data.defalutValue = createData(vs,"dtfw");
				}else if(serList[i].controlType == 4){
					data.type = "select"
					var vs = serList[i].value.split(",");
					data.defalutValue = createData(vs,"dtfw");
				}else if(serList[i].controlType == 5){
					data.type = "select"
					var vs = serList[i].value.split(",");
					data.defalutValue = createData(vs,"dtfw");
				}
				data.label = serList[i].cName;
				data.name = serList[i].key;
				data.oldvalue = model.formData?model.formData[data.name]:'';
				data.allowNull = serList[i].allowNull;
				if(data.allowNull == '1'){
					validate[model.mold][data.name] = 'require';
				}
				console.log(validate);
				datas.push(data);
			}
			var html = createSerView(model,datas,vid);
			tr.after(html);
		},
		error : function() {
			var dialog2 = {
			        "isajax": 0,
			        "autoclose":false, //可去掉,"true"
			        "contentype":'error',// "ok", "warn",'error'
			        "content": "网络异常！"
			    };
			 Dialog(dialog2);
		}
	});
}