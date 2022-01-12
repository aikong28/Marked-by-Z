function show() {
	document.getElementById('sidebar').classList.toggle('active');
  }

function displayReservation()
{

$.ajax({
    		url: 'http://localhost:8000/reservation',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                        {
                            reservation_id = resp.tasks[i].Reservation_id;
                            customer_id = resp.tasks[i].Customer_id;
                            date = resp.tasks[i].dates;
							r_status = resp.tasks[i].Reservation_status;
							p_status = resp.tasks[i].Payment_status;
							customer_reservation_time = resp.tasks[i].Customer_reservation_time;
									   /*
                                       $("#display").append(rowtask(customer_id, customer_name, customer_address, customer_contact_number));
                                       */
							$("#display").append("<tr>"+
							"<td>"+reservation_id+"</td>"+
							"<td>"+customer_id+"</td>"+
							"<td>"+date+"</td>"+
							"<td>"+r_status+"</td>"+
							"<td>"+p_status+"</td>"+
							"<td>"+customer_reservation_time+"</td>"+"</tr>");
	                    }
				} else
				{
					$("#display").html("");
					alert(resp.status);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},
			   beforeSend: function (xhrObj){
				 xhrObj.setRequestHeader("Authorization",
					   "Basic " + btoa("Zaide:Zaide001"));
			  }
		}); 
		
$.ajax({
    		url: 'http://localhost:8000/customer',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#dropdown").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                        {
                            customer_id = resp.tasks[i].Customer_id;
							$("#dropdown").append("<option>" +
							customer_id + "</option>"
							);
	                    }
				} else
				{
					$("#dropdown").html("");
					alert(resp.status);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},
			   beforeSend: function (xhrObj){
				 xhrObj.setRequestHeader("Authorization",
					   "Basic " + btoa("Zaide:Zaide001"));
			  }
		}); 
}

function newReservation(rid, cid, date, rstatus, pstatus, rt) {
	$.ajax({
		url: 'http://localhost:8000/reservation',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			Reservation_id: rid,
			Customer_id: cid,
			dates: date,
			Reservation_status: rstatus,
			Payment_status: pstatus,
			Customer_reservation_time: rt
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj){
		  xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("Zaide:Zaide001"));
	   }
	});
}

function editReservation(rid, cid, date, rstatus, pstatus, rt) {
	$.ajax({
		url: 'http://localhost:8000/reservation',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			Reservation_id: rid,
			Customer_id: cid,
			dates: date,
			Reservation_status: rstatus,
			Payment_status: pstatus,
			Customer_reservation_time: rt
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj){
		  xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("Zaide:Zaide001"));
	   }
	});
}

function delReservation(id) {
	$.ajax({
		url: 'http://localhost:8000/reservation/' + id,
		type: "DELETE",
		dataType: "json",
		success: function (resp) {
			alert(resp.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj){
		  xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("Zaide:Zaide001"));
	   }
	});
}

function searchReservation(id) {
$.ajax({
    		url: 'http://localhost:8000/reservation/'+ id,
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").append("<tr>"+
				"<td width='150px'>"+resp.Customer_id+"</td>"+
				"<td width='330px'>"+resp.Customer_name+"</td>"+
				"<td width='330px'>"+resp.Customer_address+"</td>"+
				"<td width='180px'>"+resp.Customer_contact_number+"</td>"+
				"</tr>");
    		},
    		error: function (e) {
        		alert("Please fill in the search box.");
   			},
			   beforeSend: function (xhrObj){
				 xhrObj.setRequestHeader("Authorization",
					   "Basic " + btoa("Zaide:Zaide001"));
			  }
		}); 
}

var Add = document.getElementById("Add");
var Clear = document.getElementById("Clear");
var Edit = document.getElementById("Edit");
var Delete = document.getElementById("Delete");
var Search = document.getElementById("Search");

Add.addEventListener('click', function(){
	var rid = document.getElementById("c_RID").value;
	var cid = document.getElementById("c_CID").value;
	var date = document.getElementById("c_date").value;
	var rstatus = document.getElementById("c_rstatus").value;
	var pstatus = document.getElementById("c_pstatus").value;
	var rt = document.getElementById("c_RT").value;
	newReservation(rid, cid, date, rstatus, pstatus, rt);
})

Clear.addEventListener('click', function(){
	document.getElementById("c_RID").value = '';
	document.getElementById("c_CID").value = '';
	document.getElementById("c_date").value = '';
	document.getElementById("c_rstatus").value = '';
	document.getElementById("c_pstatus").value = '';
	document.getElementById("c_RT").value = '';
})

Edit.addEventListener('click', function(){
	var rid = document.getElementById("c_RID").value;
	var cid = document.getElementById("c_CID").value;
	var date = document.getElementById("c_date").value;
	var rstatus = document.getElementById("c_rstatus").value;
	var pstatus = document.getElementById("c_pstatus").value;
	var rt = document.getElementById("c_RT").value;
	editReservation(rid, cid, date, rstatus, pstatus, rt);
})

Delete.addEventListener('click', function(){
	var rid = document.getElementById("c_RID").value;
	delReservation(rid);
})

Search.addEventListener('click', function(){
	var id = document.getElementById("id").value;
	searchReservation(id);
})