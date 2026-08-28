frappe.pages["task-api-demo"].on_page_load=function(wrapper){
    let page=frappe.ui.make_app_page({
        parent:wrapper,
        title:"Task API Demo",
        single_column:true
    });
    let dialog=new frappe.ui.Dialog({
        title:"Create Task",
        fields:[
            {
                label:"Task Subject",
                fieldname:"task_subject",
                fieldtype:"Data",
                reqd:1
            }
        ],
        primary_action_label:"Create Task",
        primary_action(values){
            frappe.call({
                method:"practice_app.api.task_api.create_task",
                args:{
                    task_subject:values.task_subject
                },
                callback:function(response){
                    dialog.hide();
                    frappe.msgprint({
                        title:"Success",
                        message:"Task created successfully with name: "+response.message,
                        indicator:"green"
                    });
                }
            });
        }
    });
    dialog.show();
};