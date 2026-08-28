frappe.pages["realtime_demo"].on_page_load=function(wrapper){
	let page=frappe.ui.make_app_page({
		parent:wrapper,
		title:"Realtime Demo",
		single_column:true
	});
	let dialog=new frappe.ui.Dialog({
		title:"Enter Contact Details",
		fields:[
			{
				label:"First Name",
				fieldname:"first_name",
				fieldtype:"Data",
				reqd:1
			},
			{
				label:"Last Name",
				fieldname:"last_name",
				fieldtype:"Data",
				reqd:1
			}
		],
		primary_action_label:"Continue",
		primary_action(values){
			console.log(values.first_name);
			console.log(values.last_name);
			dialog.hide();
			frappe.route_options={
				first_name:values.first_name,
				last_name:values.last_name
			};
			frappe.new_doc("Contact");
		}
	});
	dialog.show();
}